---
title: 'TLP Airways'
date: 2026-06-01
showDate: false
showSocial: false
platform: 'Adobe Analytics, CJA, AEP, AEP Web SDK'
developer: 'Self'
developed_for: 'Self'
description: 'A dummy airline booking platform built to demonstrate end-to-end Adobe data engineering — AEP, AEP Web SDK, CJA, Schema modelling and Adobe Data Layer.'
status: 'Live'
links:
  - text: 'Visit TLP Airways'
    url: 'https://tlpairways.thelearningproject.in/'
---

TLP Airways is a dummy airline booking platform built from the ground up as a hands-on exploration of end-to-end Adobe data engineering. It ties together AEP, AEP Web SDK, Customer Journey Analytics, Schema modelling, and a comprehensive Adobe Data Layer — all wired into a fully functional user experience.

## What it is

A simulated airline booking site — flight search, multi-step booking flow, seat selection, baggage options, and a booking timer — built entirely to serve as a realistic data collection playground.

## Tech Stack

- **Frontend**: React + Material-UI, built with Cursor + Claude
- **Backend**: Express.js
- **Deployment**: Railway with Nixpacks
- **Auth**: Auth0
- **Data Layer**: Adobe Data Layer with event-driven tracking across the full user journey

## Data Architecture

| Layer                 | Detail                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| **Data Sources**      | Static JSON files (`flights.json`, `airports.json`, ancillary configs) |
| **State persistence** | `sessionStorage` for booking state across steps                        |
| **Schema**            | XDM-aligned event schema for all user interactions                     |
| **Collection**        | AEP Web SDK sending to Edge Network → AEP → CJA                        |

## Key Features

- Flight search with origin/destination/date filtering
- Multi-step booking flow with real-time seat selection
- Baggage options and ancillary add-ons
- Booking countdown timer
- Full Adobe Data Layer implementation tracking every step of the user journey

## Why I built it

Most Adobe Analytics implementations I encounter use generic e-commerce or lead-gen scenarios. Travel and airline booking is one of the richest domains for testing event sequencing, session stitching, and journey analytics. TLP Airways gave me a realistic canvas to validate Schema design, XDM mapping, and CJA workspace analysis end-to-end.

**[→ Visit TLP Airways](https://tlpairways.thelearningproject.in/)**
