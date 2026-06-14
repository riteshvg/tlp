---
title: 'Rovr: Part 1 - Data Ingestion'
date: 2026-06-12
tags:
  main: post
  topic1: Adobe Tags
  topic2: Adobe Experience League

thumbnailImagePosition: left
thumbnailImage: https://d2coej5ollyd8p.cloudfront.net/tools/exlheroimage.png
author:
  display_name: Ritesh Gupta
---

This is next part of the series on Rovr - a conversational chat bot I created to access the documents on Adobe Experience League. The intro covered the idea, the tech stack and a high level overview of the application. I also covered the most important decision of moving from Streamlit to React + FastAPI. This and the next set of posts will talk about the application in detail. We start by covering in-depth the process behind what makes Docsy useful: building a knowledge base worth querying — and keeping it current.

<!--more-->

Rovr is a RAG system based on the open sourced Experience League Docs. And a RAG system is only as good as what you put into it. The retrieval can be well-designed, the prompt can be carefully engineered, and the UI can be polished — but if the knowledge base has bad chunks, wrong URLs, or stale content, the whole thing falls apart at query time. I spent more time on this layer than on any other part of the project, and most of that time was on problems I didn't anticipate.

This post covers the full ingestion pipeline end to end: where the docs come from, how they stay current, how they get chunked and embedded, the metadata registry that makes citations work, and the hard-won lessons at the end..

### The Full Data Ingestion Pipeline

Data Ingestion Pipeline

Step 1 — Source: AdobeDocs GitHub Repos
Adobe maintains public Markdown documentation repos for each product (AdobeDocs/analytics.en, AdobeDocs/experience-platform.en, etc.). Every .md file is
one documentation page, continuously updated by Adobe's technical writers.

---

Step 2 — SHA Delta Sync: GitHub → S3
Instead of downloading everything weekly, sync_docs_to_s3.py calls GitHub's tree API — one request per repo that returns every file's path and SHA hash.
Only files whose SHA has changed since the last run get downloaded and uploaded to S3. A manifest (sync_manifest.json) stored in S3 records the last-seen
SHA for each file so future runs know what to skip.

---

Step 3 — Chunking: Markdown → Text Chunks
Each changed document is split into ~500-token chunks. The strategy is hierarchical — first split on ##/### headers, then on paragraph breaks, then
hard-split oversized paragraphs as a last resort. Each chunk gets a stable ID (s3_key#chunk_index) so re-ingesting an updated file overwrites the right
records.

---

Step 4 — Embedding: Chunks → Vectors
Each chunk is passed to AWS Bedrock Titan Embed v2, which returns a 1,024-dimension vector representing the semantic meaning of that text. Only changed
documents get re-embedded — unchanged chunks already in ChromaDB are untouched.

---

Step 5 — Storage: Vectors → ChromaDB
Each chunk is upserted into ChromaDB with its vector and metadata: product, url, title, doc_type, s3_key, chunk_index. ChromaDB uses a cosine-similarity
HNSW index for fast nearest-neighbour lookup at query time.

---

Step 6 — Media Enrichment
A second pass over ChromaDB extracts video URLs (>[!VIDEO] tags), thumbnail CDN links (frontmatter thumbnail: field), and screenshot image paths from
each chunk's raw Markdown. These are written back to the chunk metadata and later surfaced in the UI alongside text responses.

---

Step 7 — Publish: ChromaDB → S3
The entire chroma_db/ directory is compressed to chroma_db.tar.gz and uploaded to S3. The production backend on Railway downloads this archive on cold
start, so every deployment gets the latest vector index without needing to re-embed anything.

### Presenting ExL Unofficial: An Unofficial Chatbot for Experience League

{{< youtube N_E9dN2Av54 >}}

ExL Unofficial is my attempt at creating a conversational tool for a subset of solutions found on Experience League. This project had been running in my mind for sometime. The first draft was a simple POC to get the basic viability check. And then began the task of translating the learning into a full fledged project.

![exl_hero.png](https://d2coej5ollyd8p.cloudfront.net/tools/exlheroimage.png)

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

![exl-image.png](https://d2coej5ollyd8p.cloudfront.net/tools/exl_unofficial.png)

And here is how the answers are retrieved

<!--
  PLACEHOLDER — insert 1–2 real Q&A examples here before publishing.
  Ideal examples: one factual lookup (e.g. Dataset types in AEP) and one
  procedural/cross-product question (e.g. cross-device attribution in CJA).
  Pull from the live tool or LangSmith traces.
-->

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
