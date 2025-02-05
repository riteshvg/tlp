---
title: 'Back to Basics : AEP Web SDK : Part 1'
date: 2025-02-02
tags:
  main: self learning
  topic1: Adobe Experience Platform Web SDK
  topic2: basics

thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20basics%20%20-%20Web%20SDK%20Part%201.png
author:
  display_name: Ritesh Gupta
---

A placeholder for a blog series on AEP Web SDK. Topics to be covered - History of data collection; Introduction of Alloy.js; Sending streaming data into AEP and Analytics; Difference between data and XDM object; Characters of Web SDK integration (...)

<!--more-->

I have been trying to write and make a video of start to finish process about AEP Web SDK. But some or other priorities took over. This time I am committed to complete the entire Back to Basics series about AEP Web SDK, even if it takes a month. So, if you 'd like to know more about the nuts and bolts of AEP Web SDK, then stick around. But if you are just interested in getting started with the implementation, check out the video series.

Let me first outline the **_Agenda_** that I have outlined for creating this blog series:

- What is AEP Web SDK?
- Benefits of adopting AEP Web SDK over other libraries
- What is the difference between AEP and AEP Web SDK?
- Characters in a AEP Web SDK implementation
  - Edge network
  - Schema
  - Datastreams
  - Datasets
  - AEP Web SDK Extension
- How to implement AEP Web SDK in your project
- What is XDM? What is the difference between Data and XDM objects?
- Migrating from AppMeasurement to AEP Web SDK

##### What is AEP Web SDK

Adobe has been in the field of data collection for more than a decade now. It has always targeted solutions that can help enterprises understand their visitors and bring their behavioral as well as insightful attributes both across desktop and mobile.

The challenge that plagued these data collection requirements stemmed from the multitude of libraries. Each solution that Adobe recommended had its own specific library. These libraries were part of the legacy companies that Adobe purchased. For instance, for data and behavioral attributes, Adobe acquired Omniture in 2007. Omniture brough **S-Code** which was later ugpraded to **AppMeasurement**.

For personalization and targeting requirements, Adobe acquired Touch Clarity which brought **Mbox** which was later upgraded to **AT.js**. To segment their visitors, Adobe provided **DIL.js** and for visitor identification, enterprises had to implement **VisitorAPI.js**.

As you can imagine, an enterprise that had the license for all these solutions had to manage multiple libraries. Each library had its specific quirks, strength, idiosyncracies, implementation guidelines etc. Trying to implement and maintain them became a major task for the dev teams. Adobe realized the gravity of the situation, and around 2018 took a bold step in the direction of simplifying data collection. It decided to write from scratch a unified libary- **to replace all the existing libraries**.

This library was codenamed **Alloy.js** and it is now rebranded as **Adobe Experience Platform Web SDK** or simply **AEP Web SDK**.

The premise of AEP Web SDK is simple: make enterprise data collection as simple as possible by elimintating the need to implement multiple libraries. AEP Web SDK is designed to provide a one beacon one endpoint solution, giving enterprises total control of data. We will be talking more about the required components for AEP Web SDK later. I highly encourage you to watch the [Summit 2020](https://experienceleague.adobe.com/en/docs/experience-platform/web-sdk/home#overview) video where the concept of Alloy.js and AEP Web SDK was introduced.

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/Screenshot%202025-02-03%20at%201.01.36%E2%80%AFPM.png">}}

**Remember these definitions:**

- Alloy.js - Original javaScript library written from scratch to replace all four existing libraries
- AEP Web SDK - Rebranded Alloy.js
- AEP Mobile SDK - Library available for mobile applications just like AEP Web SDK
- AEP Web SDK Extension - An extension built around AEP Web SDK available for Adobe Tags for desktop data collection

##### Benefits of adopting AEP Web SDK in your enterprises

Besides the fact that your dev team doesn't have to grapple with a multitude of updates and maintaining multiple libraries, AEP Web SDK offers the following benefits

- Significantly faster loading times
- One SDK for multiple needs
- Better flexibility and privacy compliance with feaures for consent management
- Option to enable event forwarding that can send data in real time to other solutions instead of just Adobe
- Native integration with Adobe Experience Platform for real time data streaming

##### What is the difference between AEP and AEP Web SDK?

At this juncture, I think it is important to introduce the concept of Adobe Experience Platform or AEP, and how are they inter-related. [AEP](https://experienceleague.adobe.com/en/docs/experience-platform/landing/home). It is an flexible and open system built on REST APIs that allow organizations to send in data from any source - web, call center, purchase, offline, mobile etc. along with profile data and other datasets to centralize customer data. Data can be sent via batch or streaming or even data connectors.

Enterprises that have invested in Adobe Experience Cloud applications such as Adobe Anayltics, Adobe Target, Adobe Campaign will significantly benefit by merging together data from all these applications, and non-Adobe applications to deliver a rich a customer experience.

The difference between the two is that AEP Web SDK is <mark>another streaming data source that feeds in behavioral and transactional data from a website</mark>.

##### How does AEP Web SDK work?

With the introduction to AEP Web SDK out of the way, let's move forward with the different components that you need to setup for a successful implementation:

{{< alert info >}}
Please note: We will be only covering Web SDK implementation in this blog series
{{< /alert >}}

To understand how to implement, we first need to understand the different components that work synchronously in a project of this kind:

###### Characters in a Web SDK implementation

- Edge network: In its simplest definition, Edge network is a collection of servers spread across the globe that provides a solution-agnostic data network to enable enterprises to not only send multiple requests to one endpoint, but also receive it. You can read more about [Edge network](https://business.adobe.com/products/experience-platform/experience-platform-edge-network.html) here.

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/Edge%20Network?updatedAt=1738724289259">}}

- AEP Web SDK extension: If you are using Adobe Tags ~~previously called Adobe Launch~~, then you will greatly benefit from implementing the AEP Web SDK extension in your project.This extension has got native support to implement the library, plus significant upgrades that make implementation journey a lot easy. However, if you are not using Adobe Tags, you can always download the alloy.js library to continue with the implementation. Coming soon: a video walkthrough of the AEP WEb SDK extension.

Coming soon:

- Datastream
- Schema
- XDM vs Data Object

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.
