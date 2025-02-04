---
title: 'Back to Basics : AEP Web SDK : Part 1'
date: 2025-02-02
tags:
  main: self learning
  topic1: Adobe Experience Platform Web SDK
  topic2: basics

thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20basics%20%20Part%207.png
author:
  display_name: Ritesh Gupta
---

A placeholder for a blog series on AEP Web SDK. Topics to be covered - History of data collection; Introduction of Alloy.js; Sending streaming data into AEP and Analytics; Difference between data and XDM object; Characters of Web SDK integration (...)

<!--more-->

I have been trying to write and make a video of start to finish process about AEP Web SDK. But some or other priorities took over. This time I am committed to complete the entire Back to Basics series about AEP Web SDK, even if it takes a month. So, if you 'd like to know more about the nuts and bolts of AEP Web SDK, then stick around. But if you are just interested in getting started with the implementation, check out the video series.

Let me first outline the **_Agenda_** that I have outlined for creating this blog series:

- What is AEP Web SDK?
- Characters in a AEP Web SDK implementation
  - Edge network
  - Schema
  - Datastreams
  - Datasets
  - AEP Web SDK Extension
- How to implement AEP Web SDK in your project
- Migrating from AppMeasurement to AEP Web SDK

##### What is AEP Web SDK

Adobe has been in the field of data collection for more than a decade now. It has always prioritized helping enterprises understand their visitors and bring their behavioral as well as insightful attributes both across desktop and mobile.

But, the challenge that plagued these enterprises stemmed from the multitude of libraries that were used for data collection. For data and behavioral attributes, we had to implement **AppMeasurement**. Personalization and targeting use cases were achieved through **Mbox and AT.js** libraries. To segment their visitors, enterprises had to take help of **DIL.js** and then for visitor identification, it was **VisitorAPI.js**.

As you can imagine, an enterprise that had the license for all these solutions had to manage four libraries, each with their own quirks, strength, idiosyncracies, implementation guidelines etc. The implementation and maintenance use to quickly became a nightmare for the dev team. Adobe realized the gravity of the situation and around 2018 took a bold step in the direction of simplifying data collection - **a single library to replace all the existing libraries**.

The premise of AEP Web SDK is simple: make enterprise data collection as simple as possible by completely elimintating the need to implement multiple libraries. This library was not an amalgamation of the four libraries, but a brand new, written from scratch library with one beacon one endpoint giving enterprises total control of data. The library is codenamed alloy.js and AEP Web SDK is the broader framework that includes Alloy.js and other configuration settings to power enterprises. We will be talking more about the required components for AEP Web SDK later.

Watch the [Summit 2020](https://experienceleague.adobe.com/en/docs/experience-platform/web-sdk/home#overview) video where the concept of Alloy.js and AEP Web SDK was introduced.

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/Screenshot%202025-02-03%20at%201.01.36%E2%80%AFPM.png">}}

**Remember these definitions**

Alloy.js - JavaScript library written from scratch to replace all four existing libraries
AEP Web SDK - A broader framework that includes Alloy.js and other necessary components
AEP Mobile SDK - A framework built for mobile applications
AEP Web SDK Extension - An extension built around AEP Web SDK available for Adobe Tags for desktop data collection

{{< alert info >}}
Please note: We will be only covering Web SDK implementation in this blog series
{{< /alert >}}

**How does AEP Web SDK work**

##### Characters in a Web SDK implementation

With the introduction to AEP Web SDK out of the way, let's move forward with the different components that you need to setup for a successful implementation:

- AEP Web SDK extension:

But data collection was a challenge for many years now while keeping companies compliant with GDPR and other privacy guidelines.

Enterprise data collection. Real data collection needs, from the first milisecond to the next

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.
