---
title: 'ExL Unoffical: A conversational engine for Adobe Experience League'
date: 2026-06-09
tags:
  main: post
  topic1: Adobe Tags
  topic2: Adobe Experience League

thumbnailImagePosition: left
thumbnailImage: https://d2coej5ollyd8p.cloudfront.net/tools/tagscanner-preview.png
author:
  display_name: Ritesh Gupta
---

If you regularly work with Adobe Experience Cloud solutions, you have scratched your head trying to find an answer to the right question. The problem isn't the quality of the documentation. The Adobe Experience Leage (ExL) docs are genuinely good — comprehensive, well-maintained, regularly updated. The problem is something else.

<!--more-->

Guides and articles for each Adobe Experience Cloud solution can span hundreds of pages. The documents are well structured, but the problem comes when you're mid-implementation and need to know whether a Profile Dataset or an Event Dataset is the right choice for your use case. The answer exists somewhere in that corpus, but finding the answer means sifting through all details, distilling the responses and then implying the learning to the problem at hand.

The search is one way. There is no conversation. Therefore, the typical workflow — search, click, scan, refine, try again — costs 15–25 minutes on questions that, with the right tool, should take two.

### Presenting ExL Unofficial: An Unofficial Chatbot for Experience League

[ExL Unofficial](https://thelearningproject.in/tools/exlunofficialchatbot) is my attempt at creating a conversational tool for a subset of solutions found on Experience League. This project had been running in my mind for sometime. The first draft was a simple POC to get the basic viability check. And then began the task of translating the learning into a full fledged project.

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

The index currently covers three products:

Adobe Analytics — ~964 documentation pages
Adobe Experience Platform (AEP) — ~160 pages
Customer Journey Analytics (CJA) — ~136 pages

In total: 1,260 unique documentation pages, stored as 5,685 chunks after processing. 539 of those pages include inline media — screenshots, diagrams, or video references — which the ingestion pipeline captures in metadata. The knowledge base reflects documentation as of March 14, 2026.

Have feedback or feature requests? Drop me a line at ritesh@thelearningproject.in
