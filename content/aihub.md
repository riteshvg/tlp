---
title: 'Agents and Applications developed using AI'
date: 2025-09-14
---

This page is my attempt at linking agents and applications developed using AI including AI agents, AI powered IDEs, LLM chatbot etc. Some applications are developed by me independently, whereas some are collaborative and some are created in my line of work. Applications developed by me will have free access, but for others, they will be given as just a link.

#### Adobe Experience League Chatbot

- Platform: AWS Bedrock + Streamlit
- Purpose: AI-powered chatbot for Adobe Analytics and Customer Journey Analytics documentation
- Features: Smart routing between Claude models, real-time chat interface, admin dashboard with cost tracking
- Data Sources: 4 Adobe GitHub repositories (Analytics APIs, User Docs, CJA, Analytics APIs)
- Architecture: S3 storage, Bedrock Knowledge Base, vector embeddings, cost-optimized model selection
- Status: Production-ready with admin panel, analytics tracking, and Railway deployment
- Key Benefits: 92% cost reduction with Haiku-only mode, comprehensive documentation coverage, real-time assistance

Links: <a href="https://chatbot.thelearningproject.in/" target="_blank">Experience League Chatbot</a>

#### TLP Airways

- Platform: React + Cursor + Claude
- Purpose: A dummy airline booking platform for flight search, booking, and payment with comprehensive event driven data layer for user journey tracking
- Features: Flight search, multi-booking flow, seat selection, baggage options, booking timer and Adobe Data Layer
- Data Sources: Static JSON files (flights.json, airports.json, ancillary/ configs), sessionStorage for booking state persistence
- Architecture: Monorepo with frontend (React + Material-UI), backend (Express.js), Railway deployment with Nixpacks, Auth0 integration for authentication, and comprehensive Adobe Analytics data layer implementation.
  Status
- Status: <a href = "https://tlpairways.thelearningproject.in/" target = "_blank"> Live </a> with all features functional
- Key Benefits: Complete Adobe Data Layer integration with fully functional user experience

Links: <a href="https://tlpairways.thelearningproject.in/" target="_blank">TLP Airways</a>
