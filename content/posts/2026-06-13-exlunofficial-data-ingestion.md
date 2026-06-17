---
title: 'Rovr: Part 2 - Data Ingestion'
date: 2026-06-12
tags:
  main: post
  topic1: Adobe Tags
  topic2: Adobe Experience League

thumbnailImagePosition: left
thumbnailImage: https://d2coej5ollyd8p.cloudfront.net/tools/exl-annoucement.png
author:
  display_name: Ritesh Gupta
---

This is Part 2 of the deep dive series on [Rovr](https://thelearningproject.in/tools/rovr/) - a conversational chat bot I created covering docs for Adobe Experience League. The [intro](https://thelearningproject.in/2026/06/rovr-a-conversational-engine-for-adobe-experience-league/) covered the idea, the tech stack and a high level overview of the application. I also covered the most important decision of moving from Streamlit to React + FastAPI. This post, and the future ones will talk about the application, architecture, technology, mistakes, learnings in detail.

<!--more-->

[Rovr](https://thelearningproject.in/tools/rovr/) is a RAG system that retrieves and presents data sourced from [Adobe Experience Cloud](https://experienceleague.adobe.com/docs/). And a RAG system is only as good as the underlying data that it has indexed. The retrieval can be well-designed, the prompt can be carefully engineered, and the UI can be polished — but if the knowledge base has bad chunks, wrong URLs, or stale content, the whole thing falls apart at query time.

I deliberately spent more time on this layer than on any other part of the project, and most of that time was on problems I didn't anticipate.

This post covers the full ingestion pipeline end to end: where the docs come from, how do they stay current, how they get chunked and embedded, the metadata registry that makes citations work, and the hard-won lessons at the end.

### The Full Data Ingestion Pipeline

Data Ingestion Pipeline: The data ingestion pipeline is a fundamental part of the entire application. So, it was imperative that I had to make it streamlined, expandable and agile from the intial design. There were a series of decisions that I'd to make even before I had began the actual work. The points ranged from:

- location of the documents
- recency and frequency of updates
- frequency of ingestion in the knowledge bank
- storage and retrieval of data
- multi media support
- expandabilty

All these decisions were important enough to spend weeks on them. I initially decided to cover only Adobe Analytics and Customer Journey Analytics, and just text. But then the design was getting text heavy and with just two solutions I was aiming for a very narrow audience. The scope kept on expanding and the ingestion architecture started taking shape. Here's the ingestion pipeline as it stands today.

![ingestionpipeline.png](https://d2coej5ollyd8p.cloudfront.net/tools/ingestionworkflow.png)

**Step 1** — _Source: AdobeDocs GitHub Repos_
Adobe maintains public Markdown documentation repos for each product (AdobeDocs/analytics.en, AdobeDocs/experience-platform.en, etc.). Every .md file is one documentation page, continuously updated by Adobe's technical writers. This is both the advantage (the source is always current) and the engineering challenge (the pipeline needs to track what changed without re-processing everything every time).

---

**Step 2** — _SHA Delta Sync: GitHub → S3_
Instead of downloading everything weekly, sync_docs_to_s3.py calls GitHub's tree API — one request per repo that returns every file's path and SHA hash. Only files whose SHA has changed since the last run get downloaded and uploaded to S3. A manifest (sync_manifest.json) stored in S3 records the last-seen SHA for each file so future runs know what to skip. This decision was important as it meant significant cost savings running the sync only for changed files that is uploaded by Adobe Engineering to Github.

---

**Step 3** — _Chunking: Markdown → Text Chunks_
Each changed document is split into ~500-token chunks. The strategy is hierarchical — first split on H2/H3 headers, then on paragraph breaks, then hard-split oversized paragraphs as a last resort. Each chunk gets a stable ID (s3_key#chunk_index) so re-ingesting an updated file overwrites the right records. This strategy took some time to finalize as it depends on the document design. So it makes sense to understand your content well before deciding on a chunking strategy. Don't go blind into it.

---

**Step 4** — _Embedding: Chunks → Vectors_
Each chunk is passed to AWS Bedrock Titan Embed v2, which returns a 1,024-dimension vector representing the semantic meaning of that text. Only changed documents get re-embedded — unchanged chunks already in ChromaDB are untouched. Three reasons Titan Embed v2 specifically: AWS credentials are already in the project for S3, so there is no refactoring for access, plus Titan Embed is Amazon's first-party model so no additional setup is required and you also get vector quality at reasonable size so dimensions are large enough to capture semantic nuance in technical documentation.

One practical limit: Titan Embed v2 has an 8,000-character input cap. Some AEP reference pages run 12,000+ characters. The chunking strategy mostly prevents this since chunks target ~2,000 characters, but an explicit text[:8000] guard sits in the ingest loop as a safety net.

---

**Step 5** — _Storage: Vectors → ChromaDB_
Each chunk is upserted into ChromaDB with its vector and metadata: product, url, title, doc_type, s3_key, chunk_index. ChromaDB uses a cosine-similarity. HNSW index for fast nearest-neighbour lookup at query time.

---

**Step 6** — _Media Enrichment_
A second pass over ChromaDB extracts video URLs (>[!VIDEO] tags), thumbnail CDN links (frontmatter thumbnail: field), and screenshot image paths from each chunk's raw Markdown. These are written back to the chunk metadata and later surfaced in the UI alongside text responses. This makes the responses richer mimicking the actual docs as published. This was also an important decision to ensure the difference between a regular text based chatbot and a rich multimedia one.

---

**Step 7** — _Publish: ChromaDB → S3_
The entire chroma_db/ directory is compressed to chroma_db.tar.gz and uploaded to S3. The production backend on Railway downloads this archive on cold start, so every deployment gets the latest vector index without needing to re-embed anything.

This 7 step ingestion is a crucial part contributing to Rovr's usability. And the steps look very logical and streamlined. But trust me this was the hardest part of the application. With no knowledge in data retrieval, it took me some iterations. But thanks to AI, I could iterate faster, learn quicker and get to the optimal workflow with minimal efforts.

Ultimately, it makes sense to understand the content, your audience, cost limitations and overall UX experience before you actually get to work.

Key Takeaways / Hard Learnt Lessons:

- SHA delta syncing via the GitHub tree API makes weekly ingestion fast — compare hashes first, download only what changed
- S3 as the intermediate store decouples sync timing from ingestion and makes re-embedding a product filter away
- Documentation has logical structure — respect it in your chunking strategy. Header → paragraph → hard-split with overlap is a reasonable three-level cascade
- Normalise embedding vectors and match the vector store's distance metric. For ChromaDB with cosine similarity: normalize: True in Titan and hnsw:space: cosine in the collection config
- Build the metadata registry before you build the UI. Wrong citation URLs destroy trust faster than missing citations
- The main branch name: AdobeDocs repos don't use master. Every raw GitHub CDN URL needs this right or images silently fail
- Search all chunks for images, not just chunk 0. Screenshots are in the body
- Set your similarity threshold empirically, not by intuition. Niche technical topics score lower than you expect
- Update the S3 snapshot before any production redeploy — Railway's ephemeral filesystem means the snapshot is the only persistence

I appreciate you taking out time and taking Rovr for a spin. If you have any difficulty in using Rovr, or have any feature request, please drop me a line at ritesh@thelearningproject.in.
