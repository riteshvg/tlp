---
title: 'Rovr: Part 3 - Query Processing'
date: 2026-06-24
tags:
  main: post
  topic1: Adobe Tags
  topic2: Adobe Experience League

thumbnailImagePosition: left
thumbnailImage: https://d2coej5ollyd8p.cloudfront.net/tools/exl-annoucement.png
author:
  display_name: Ritesh Gupta
---

This is Part 3 of the deep dive series on [Rovr](https://thelearningproject.in/tools/rovr/) - a conversational chat bot I created covering docs for Adobe Experience League. The [intro](https://thelearningproject.in/2026/06/rovr-a-conversational-engine-for-adobe-experience-league/) covered the idea, the tech stack and a high level overview of the application. The [data ingestion](http://localhost:1313/2026/06/rovr-part-2-data-ingestion/) covered how documentation gets ingested all the way from GitHub to ChromaDB. This post covers what happens after that. The knowledge base is ready. Now a user types a question. What happens next?

<!--more-->

When a user enters a query in natural language in [Rovr](https://thelearningproject.in/tools/rovr/) there are precisely seven steps that the query has to travel through before it retrieves the answer on user's screen. Here's the end to end workflow from the moment the query lands at the FastAPI backend to the moment a streamed response begins flowing back.

![queryProcessing.png](https://d2coej5ollyd8p.cloudfront.net/tools/queryprocessing.png)

Now, let's deep dive into each of those seven steps one by one:

### Step 1: The Smart Router: First Decision Point

A query lands at the FastAPI backend. Before anything else touches it, the Smart Router reads it and makes a classification call: is this simple or complex?
This decision matters for two reasons — cost and quality. A simple question like "what is an eVar?" does not need a reasoning loop. Running it through a multi-pass Sonnet agent wastes money and adds latency. A complex question like "compare how CJA and Adobe Analytics handle cross-device attribution" is exactly the wrong thing to give a single-pass Haiku. It will produce a shallow answer because it doesn't have the horsepower to synthesise across multiple documentation sources.

The signals the router uses for classification:

- _Length and structure of the query — longer, multi-clause questions are likely complex_
- _Presence of comparative intent — "compare", "difference between", "vs" reliably signal multi-source synthesis_
- _Procedural framing — "walk me through", "how do I" questions often span multiple documentation pages_
- _Single-concept lookups — definitions, default values, product limits are fast-path by default_

_A quick diagrammatic view of the Smart Router at work_

![step1-qp](https://d2coej5ollyd8p.cloudfront.net/tools/step1-qp.png)

Getting this classification wrong in either direction is costly. An over-classified simple question adds ~2 seconds of latency unnecessarily. An under-classified complex question produces a confident but shallow answer — arguably the worse failure.

---

### Step 2: The Query Preprocessor: making the query retrieval-ready

Here is something that caught me off guard when building Rovr. **Vector retrieval is based entirely on cosine similarity between the query vector and stored chunk vectors** — and for a RAG system, there is a meaningful difference between "AEP" and "Adobe Experience Platform".

Modern embedding models understand they're related, but the similarity score for the abbreviated form is reliably lower than for the expanded form. Across 41000 chunks competing for the top-k slots, that score gap is enough to push the right documentation below the retrieval threshold entirely. And once the wrong chunks make it into the context block, the language model has no way to recover — it generates a response from what it was given. The retrieval miss becomes a response miss leading to incorrect answers, citations and a poor user experience.

The Query Preprocessor step solves this with explicit abbreviation expansion before the query hits the embedding model. The expansion dictionary covers the most common abbreviations in the Adobe Experience Cloud ecosystem:

CJA → Customer Journey Analytics
AEP → Adobe Experience Platform
AA → Adobe Analytics
RT-CDP → Real-Time Customer Data Platform
AJO → Adobe Journey Optimizer

This might look trivial. It is not. Adobe's documentation is inconsistent about which form it uses. Some pages use the abbreviated form throughout. Some switch between them. Without expansion, a query using abbreviations retrieves worse than it should, and that retrieval degradation propagates all the way to the final answer.

The preprocessor also injects the last turn of conversation history into the query. This is what makes follow-up questions work. Without this, "what about segment sharing?" has no reference — the embedding model treats it as a standalone question about segment sharing in general, not as a follow-up to whatever was discussed in the previous turn. With context injection, the query becomes something like "in the context of Customer Journey Analytics filters: what about segment sharing?" — now retrieval finds the right pages. I will be covering in detail the query response and other associated steps in another blog post.

---

### Step 3: Embedding: The query becomes a vector

The preprocessed query is passed to AWS Bedrock's Titan Embed v2, which returns a 1,024-dimension vector. This is the same model used during ingestion to embed every documentation chunk. That symmetry is not optional — it is a hard requirement. The vector similarity search in Step 4 only works correctly if the query vector and the chunk vectors live in the same embedding space. Using a different model for query-time embedding than for ingestion-time embedding produces wrong results silently. No errors, just degraded retrieval quality.

The query vectors are normalised before comparison. ChromaDB is configured with hnsw:space: cosine and Titan is called with normalize: True — these two settings need to agree or the similarity scores are meaningless.

---

### Step 4: Retrieval: finding the right chunks

ChromaDB receives the query vector and searches across 8,514 stored documentation chunks using cosine similarity. The top-k most similar chunks come back — each with its content and its metadata: product, URL, title, doc_type, s3_key, chunk_index, and any embedded media references.

Two things matter a lot here that aren't obvious from the description.

The similarity threshold. There is a minimum score below which a chunk is excluded from the results even if it is in the top-k. Setting this threshold is empirical, not intuitive. For general web content, a cosine similarity of 0.7 might be considered a strong match. For niche technical documentation in a specific product domain, 0.7 is conservative — many genuinely relevant chunks score in the 0.55–0.65 range because the queries are highly specific and the documentation uses precise technical vocabulary. Too high a threshold and the retrieval silently returns fewer chunks than expected. Too low and noise gets into the context block. I set this empirically by testing a set of known queries against known documentation pages and finding the threshold that balanced recall and precision.

The chunk count. How many chunks come back matters. Too few and the context block is thin — the model may not have enough to answer well. Too many and you're sending a lot of tokens to the LLM unnecessarily, increasing cost and sometimes diluting the most relevant content with loosely related material. The right number depends on the average chunk size (which is roughly 500 tokens in this pipeline) and the context window of the model being used.

![step4-chromadb](https://d2coej5ollyd8p.cloudfront.net/tools/retrieval-step3.png)

The metadata attached to each chunk is what makes citations work later. Without the URL and title stored at chunk level, there is no way to tell the user where the answer came from.

---

### Step 5: Divergence: Two paths diverge

The retrieved chunks are handed off differently depending on what the Smart Router decided in Step 1.

The Haiku path is direct. The chunks are assembled into a context block. A prompt is built: system instructions, the context block, conversation history, and the preprocessed query. One call goes to Claude Haiku via the Anthropic API. The response streams back. Fast, cheap, appropriate for well-scoped questions.

The Sonnet path is more deliberate. A LangGraph ReAct agent receives the retrieved chunks and evaluates whether it has enough to answer the question well. If it does, it proceeds to generation. If it doesn't — if the chunks are thin, or the question spans multiple product areas that weren't all captured in the first retrieval — it refines its search and retrieves again. This loop runs up to three passes.

What does "refining the search" look like in practice? The agent rewrites the query, often decomposing a compound question into sub-queries. "Compare CJA filters and Adobe Analytics segments for cross-device use cases" might decompose into two targeted retrievals — one for CJA filter documentation and one for Analytics segment documentation — before the agent synthesises both into a single answer.

This is what makes Sonnet effective for the hard questions. It is also why it costs more and takes longer. At current pricing the estimated cost is around $0.009 per query on the Sonnet path — still less than a cup of tea, but meaningfully more than the Haiku path.

---

### Step 6 — Convergence: generation and streaming

Both the Haiku path and the Sonnet path arrive at the same place: the Prompt Builder. This is where the two paths converge, and everything from here is shared.

The Prompt Builder assembles four things in a specific order: the system prompt, the retrieved context block, conversation history from the Session Store, and the preprocessed query. That ordering is deliberate. The system prompt sets the grounding rules. The context block comes next so the model has the documentation evidence before it reads anything else. History is injected after that, and the query comes last.

Why ordering matters: LLMs weight information that appears early in a long context more heavily. Putting the highest-scoring chunk at the top of the context block — and the context block before the conversation history — increases the likelihood that the most relevant documentation actually influences the answer.

The Session Store feeds into the Prompt Builder here via a separate channel — it is not just a pass-through from the preprocessor in Step 2. The preprocessor gets the last turn (to make the query retrieval-ready). The Prompt Builder gets the full conversation history (to make the response contextually coherent). Same store, two different reads, two different purposes.

Grounding the response: The system prompt tells the model explicitly: answer only from the context provided, do not invent information, and when the context does not contain a sufficient answer, say so. Without this instruction, the model's tendency to be helpful overrides its tendency to be accurate — it fills gaps with plausible-sounding information that may be outdated or wrong. For AJO, where Journey Canvas behaviour and suppression rules change across releases, that gap-filling is genuinely dangerous.

The prompt goes to the Anthropic API. The response streams back token by token. Three event types flow to the React frontend:

- Token events — individual words rendered with a typewriter effect as they arrive
- Citations payload — source URLs assembled from the metadata of the chunks the model drew on. When the response says "according to the AJO Journey Canvas documentation", there is a real URL behind that claim
- Done signal — triggers generation of contextual follow-up question suggestions

Streaming responses feel conversational in a way that a response appearing all at once does not — even when the final content is identical. This is a small UX detail that matters disproportionately to how the tool feels.

![step4-chromadb](https://d2coej5ollyd8p.cloudfront.net/tools/step4-qp.png)

---

### Key Takeaways

- The Smart Router saves money and protects answer quality at the same time — classify before you embed, not after
- Abbreviation expansion before embedding is non-negotiable for domain-specific RAG. The model can't fix retrieval misses it can't see — and Adobe's ecosystem is full of abbreviations the documentation itself uses inconsistently
- Similarity thresholds need to be calibrated empirically against your specific domain. Overloaded terms like "activity" score differently in a multi-product documentation corpus than they would in a single-product one
- Chunk ordering in the context block matters. Put the highest-scoring chunk first — the model reads it most carefully
- The Session Store is read twice — once by the Preprocessor (last turn only, for retrieval) and once by the Prompt Builder (full history, for generation). Same store, different reads, different purposes
- Both paths converge at the Prompt Builder. The Haiku and Sonnet paths differ only in how they retrieve and refine context — everything after that is identical
- The grounding instruction in the system prompt is not optional. For products like AJO and AEP where behaviour changes across releases, the gap between "what the LLM knows" and "what the documentation says" is real and consequential

### My Learnings

Building the query processing layer was less about individual clever decisions and more about understanding how each component's failure mode propagates downstream. A bad router classification means a wrong-sized model. A missing abbreviation expansion means a retrieval miss. A retrieval miss means a thin context block. A thin context block means a weak or hallucinated answer.

The pipeline is only as strong as its weakest step. Which also means you can test and improve each step independently — once you have observability. LangSmith traces were essential here. Being able to see the exact query that hit ChromaDB, the chunks that came back, the scores they carried, and the prompt that went to the LLM made debugging tractable in a way it simply wouldn't have been otherwise.

My one key learning from the data processing layer is:
Build your observability before you optimise. You can't improve what you can't see.

---

I appreciate you taking out time and taking [Rovr](https://thelearningproject.in/tools/rovr/) for a spin. If you have any difficulty in using [Rovr](https://thelearningproject.in/tools/rovr/), or have any feature request, please drop me a line at ritesh@thelearningproject.in.
