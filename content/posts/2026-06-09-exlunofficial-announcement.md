---
title: 'Rovr: A conversational engine for Adobe Experience League'
date: 2026-06-09
tags:
  main: post
  topic1: Adobe Tags
  topic2: Adobe Experience League

thumbnailImagePosition: left
thumbnailImage: https://d2coej5ollyd8p.cloudfront.net/tools/exl-annoucement.png
author:
  display_name: Ritesh Gupta
---

If you regularly work with [Adobe Experience Cloud](https://experienceleague.adobe.com/docs/) solutions, you have scratched your head trying to find an answer to the right question. The problem isn't the quality of the documentation. The Adobe Experience Leage (ExL) docs are genuinely good — comprehensive, well-maintained, regularly updated. The problem is something else.

<!--more-->

Guides and articles for each Adobe Experience Cloud solution can span hundreds of pages. The documents are well structured, but the problem comes when you're mid-implementation and need to know whether a Profile Dataset or an Event Dataset is the right choice for your use case. The answer exists somewhere in that corpus, but finding the answer means sifting through all details, distilling the responses and then implying the learning to the problem at hand.

The search is one way. There is no conversation. Therefore, the typical workflow — search, click, scan, refine, try again — costs 15–25 minutes on questions that, with the right tool, should take two.

### Presenting Rovr: An Unofficial Chatbot for Experience League

{{< youtube N_E9dN2Av54 >}}

Rovr is my attempt at creating a conversational tool for a subset of solutions found on Experience League. This project had been running in my mind for sometime. The first draft was a simple POC to get the basic viability check. And then began the task of translating the learning into a full fledged project.

![exl_hero.png](https://d2coej5ollyd8p.cloudfront.net/tools/exl-annoucement.png)

### Why a Chatbot?

A conversational RAG chatbot is one of the most complete learning surfaces in AI engineering. To build one properly, you have to make real decisions at every layer of the stack:

- how to scrape and clean source documents,
- how to chunk them so retrieval works well,
- which embedding model to use and why,
- how to store and query vectors efficiently,
- how to manage conversation state across turns,
- how to design prompts that keep answers grounded, and
- how to stream responses in a way that feels natural.

These aren't toy decisions — they compound. A poor chunking strategy degrades retrieval quality regardless of how good the language model is. State management that loses context mid-conversation makes the whole thing feel broken. Building a chatbot forces you to care about all of it, not just the parts that are interesting in isolation.

Experience League documentation was also a deliberate choice on one specific dimension: all of it is publicly available. Adobe publishes their product documentation for practitioners to read, reference, and share. Building a search interface over public documentation doesn't cross any lines — it's the same content, made faster to query.

### What it does?

The chatbot lets you ask natural language questions against a curated index of Adobe Experience League documentation and get answers grounded in actual documentation pages — with citations.

Not summaries generated from a model's training memory. Not plausible-sounding responses that might be six months out of date. Answers retrieved from specific documentation pages and synthesised by the model with those pages as its source material. When the response says "according to the AEP Identity Service documentation", it means it. And how can I be so sure about it. This is because there is a pipeline that retrieves the latest updates to the documents regularly and feeds it into the backend.

![exl-image.png](https://d2coej5ollyd8p.cloudfront.net/tools/kbscreenshot.png)

The index currently covers AEP, Adobe Analytics, Adobe Target, Customer Journey Analytics and Adobe Data Collection. All in all total 1656 pages of content including inline media - screenshots, diagrams and video references is captured in the metadata. The knowledge base reflects documentation updated on May 9, 2026. This is a great deal when comparing knowledge freshness with external tools like Claude, ChatGPT etc.

### How is the chatbot built?

The architecture has two distinct phases: a retrieval phase that finds the relevant documentation, and a generation phase where the language model synthesises an answer from what was retrieved. This pattern — Retrieval-Augmented Generation, or RAG — is what keeps the responses grounded rather than hallucinated.

![exl-flow.png](https://d2coej5ollyd8p.cloudfront.net/tools/chatbotflow.png?v=1)

A question enters at the top, an answer streams out at the bottom.

The React frontend sends the query to FastAPI, which authenticates the request and immediately hands it to the Smart Router. This is the first real decision point — the router classifies the query and sends it down one of two paths. Simple factual questions ("what is an eVar?", "what's the default session timeout in CJA?") go left to the faster, cheaper Haiku path. Complex or multi-step questions ("compare CJA filters vs Analytics segments", "walk me through cross-device attribution") go right to the more capable Sonnet path.

Both paths run the same retrieval sequence independently. The Query Preprocessor first expands Adobe abbreviations — CJA becomes Customer Journey Analytics, AEP becomes Adobe Experience Platform — so the query matches the language of the documentation. It also injects the last turn of conversation history, so follow-up questions have enough context to retrieve meaningfully. The preprocessed query is then converted into a vector by AWS Bedrock's Titan Embed v2, and ChromaDB searches 8,514 stored documentation chunks by cosine similarity, returning the most relevant ones.

Where the paths diverge is in how they use what they retrieved. The Haiku path takes the retrieved chunks, builds a context block, and makes a single Claude call — fast and direct, suited to questions with a clear answer. The Sonnet path runs a LangGraph ReAct agent that reads the retrieved chunks and decides whether it has enough to answer. If not, it refines its search and retrieves again — up to three passes. This is what makes it effective for questions that span multiple product areas or require synthesis across several documentation sources.

Both paths converge at the Anthropic API, which streams the response back token by token. Three event types flow to the frontend: individual tokens rendered word by word using a typewriter effect, a citations payload carrying the source URLs for every chunk the model drew on (currently a work in progress), and a done signal that triggers follow-up question suggestions.

The Session Store sits quietly in the centre because it touches both paths in two places — conversation history feeds into the preprocessor before retrieval, and into the LLM call after retrieval. This is what makes multi-turn conversations coherent: the model always knows what was asked before.

### How It Got Here

The first commit was September 10, 2025 — a Streamlit UI, AWS Bedrock Knowledge Base for retrieval, and Claude 3 via Bedrock for generation, all wired together in a single app.py. It worked. Then it kept growing. Query routing, conversation memory, prompt engineering, citation extraction, admin tooling — all accumulating in one place until app.py hit 3,700 lines and the Streamlit execution model made a fluid conversational interface impossible to build. Bedrock Knowledge Base had abstracted away the retrieval controls that clearly needed tuning.

The rewrite to React + FastAPI + ChromaDB was the only sensible path forward.

The project sat on the backburner for months while other work took priority — TLP Airways, TagScanner upgrades. When it was time to pick it back up, the migration took 5–7 days of roughly two hours each. The original Streamlit prototype had taken around 10 days. Neither sprint would have been achievable without AI tooling - Claude.ai and Claude Code; the scope simply isn't viable for a solo practitioner working evenings otherwise.

Getting it running on Railway introduced a different class of problem. The FastAPI backend deploys there; the React frontend builds locally and deploys to Cloudflare Pages as static files inside the Hugo blog. Railway's filesystem is ephemeral — every restart wipes the disk, which means ChromaDB's on-disk index disappears. The fix was an S3 cold-start restore: on startup, if the index is empty, download a pre-built archive from S3 and extract it. This was discovered from a real failure, not anticipated. The production push also surfaced a CORS misconfiguration, a startup crash on empty ChromaDB, a placeholder URL in .env.production, and a LangGraph streaming type mismatch that only appeared on complex queries. None of these showed up in development.

The estimated cost is roughly $0.009 per query at current Claude Sonnet 4.6 pricing. The time saved is roughly around 20 - 30 mins per query. I am not opening this utility to others for now due to cost implications. But, hopefully, I will soon.

## Tech Stack

### Frontend

| Component             | Technology                   | Purpose                                            |
| --------------------- | ---------------------------- | -------------------------------------------------- |
| Framework             | React 19 + TypeScript + Vite | UI and build tooling                               |
| State Management      | Zustand                      | Chat sessions, auth, message history               |
| Styling               | Tailwind CSS + shadcn/ui     | Component design system                            |
| Markdown Rendering    | ReactMarkdown + remark-gfm   | Render LLM responses with tables, code, and images |
| Static Site Generator | Hugo                         | Wraps the React app inside thelearningproject.in   |

### Hosting

| Component      | Technology           | Purpose                                                     |
| -------------- | -------------------- | ----------------------------------------------------------- |
| Frontend       | Cloudflare Pages     | Static site hosting via wrangler deploy                     |
| Backend        | Railway              | Container hosting, auto-restarts, environment variables     |
| Database       | PostgreSQL (Railway) | Feedback storage and analytics                              |
| Object Storage | AWS S3               | Doc source files + ChromaDB snapshot for cold-start restore |

### Backend

| Component        | Technology            | Purpose                                                 |
| ---------------- | --------------------- | ------------------------------------------------------- |
| API Server       | FastAPI (Python)      | REST + SSE API server                                   |
| Query Routing    | Custom Smart Router   | Classifies query → Haiku or Sonnet path                 |
| Query Processing | Custom QueryProcessor | Adobe abbreviation expansion, session context injection |

### LLM and AI

| Component       | Technology                       | Purpose                                           |
| --------------- | -------------------------------- | ------------------------------------------------- |
| Fast path       | Claude Haiku 4.5                 | Single-pass answers, definitions, factual lookups |
| Complex path    | Claude Sonnet 4.6                | Multi-step reasoning, comparisons, procedures     |
| Orchestration   | LangChain LCEL + LangGraph ReAct | Chain (Haiku path) and agent loop (Sonnet path)   |
| Embeddings      | AWS Bedrock Titan Embed v2       | 1,024-dimension vectors for semantic search       |
| Vector Database | ChromaDB (persistent)            | Stores 8,514 chunks with full metadata            |

### Data and Ingestion

| Component          | Technology                      | Purpose                                          |
| ------------------ | ------------------------------- | ------------------------------------------------ |
| Doc Sources        | GitHub (AdobeDocs repos)        | Markdown source for all ingested documentation   |
| Ingestion Pipeline | Python scripts + GitHub Actions | Weekly sync → chunk → embed → upsert to ChromaDB |
| CI/CD              | GitHub Actions                  | Scheduled weekly documentation refresh workflow  |

### Authorization and Observability

| Component     | Technology  | Purpose                                 |
| ------------- | ----------- | --------------------------------------- |
| Auth          | JWT (PyJWT) | Site login, demo account, admin panel   |
| Observability | LangSmith   | LLM trace logging, latency, token usage |

### Code Support

| Component | Technology  | Purpose                                 |
| --------- | ----------- | --------------------------------------- |
| Assist    | Claude Code | Editing the files and creating the work |
| Research  | Claude.ai   | Researching and prompting Claude Code   |

Have feedback or feature requests? Drop me a line at ritesh@thelearningproject.in
