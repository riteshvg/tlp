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

This is next part of the series on Rovr - a conversational chat bot I created to access the documents on Adobe Experience League. The intro covered the idea, the tech stack and a high level overview of the application. I also covered the most important decision of moving from Streamlit to React + FastAPI. This and the next set of posts will talk about the application in detail. We start by covering in-depth the process behind what makes Rovr useful: building a knowledge base worth querying — and keeping it current.

<!--more-->

Rovr is a RAG system based on the open sourced Experience League Docs. And a RAG system is only as good as what you put into it. The retrieval can be well-designed, the prompt can be carefully engineered, and the UI can be polished — but if the knowledge base has bad chunks, wrong URLs, or stale content, the whole thing falls apart at query time. I spent more time on this layer than on any other part of the project, and most of that time was on problems I didn't anticipate.

This post covers the full ingestion pipeline end to end: where the docs come from, how they stay current, how they get chunked and embedded, the metadata registry that makes citations work, and the hard-won lessons at the end..

### The Full Data Ingestion Pipeline

Data Ingestion Pipeline

![ingestionpipeline.png](https://d2coej5ollyd8p.cloudfront.net/tools/ingestionworkflow.png)

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

Have feedback or feature requests? Drop me a line at ritesh@thelearningproject.in
