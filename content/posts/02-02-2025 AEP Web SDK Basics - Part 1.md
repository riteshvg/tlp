---
title: 'Back to Basics : AEP Web SDK'
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

##### Why was AEP Web SDK introduced?

Every enterprise or business, whether big or small, is in a continuous quest to understand its end customer. The need to analyze visitors' behavioral and transactional attributes in order to provide an ultimate experience is the holy grail of today's digital first world.

Adobe with its Experience Cloud solutions has been a go-to partner for enterprises of different sizes and industries. It has been in the field of data collection for more than a decade now and has always prioritized helping enterprises understand their visitors and understand their behavioral as well as insightful attributes both across desktop and mobile.

But, the challenge that plagued these enterprises stemmed from the multitude of libraries that Adobe required for collecting the details. Here's how it looked before AEP Web SDK

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/Screenshot%202025-06-11%20at%201.53.50%E2%80%AFPM.png?updatedAt=1749630344804">}}

For a typical project, a company had to implement Adobe Analytics which required them to implement **AppMeasurement.js** library. For personalization and targeting, there was a need to integrate Adobe Target via **Mbox and AT.js**. For visitor segmentation and to make logical cohorts of their visitors, companies implemented Adobe Audience Manager with the help of **DIL.js**, and underlying all the solutions was **Visitor API.js**, a library for visitor identification.

Each of these libraries brought their own quirks, strength, idiosyncracies, implementation guidelines etc. The implementation and maintenance therefore quickly became a nightmare for the dev team. Adobe realized the gravity of the situation and around 2018 took a bold step in the direction of simplifying data collection - **a single library to replace all the existing libraries**.

{{< alert info >}}
Please note: We will be only covering Web SDK implementation in this blog series
{{< /alert >}}

##### What is AEP Web SDK?

The premise of AEP Web SDK is simple: make enterprise data collection as simple as possible by completely elimintating the need to implement multiple libraries. The WebSDK library is not an amalgamation of the four libraries, but a completely 'written-from-scratch' library with **one beacon, one endpoint, one processing** center.

The advantages of following this approach can be summed up below:

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/Screenshot%202025-02-03%20at%201.01.36%E2%80%AFPM.png">}}

1. **Easy to manage**: With a single SDK for various Adobe solutions the [implementation](https://growthnatives.com/blogs/analytics/migrate-appmeasurement-js-to-adobe-experience-platform-web-sdk/) process of these solutions is simpler and debugging, troubleshooting much easier.
2. **Improved website performance**: AEP Web SDK is designed to be faster and efficient while reducing the amount of code that the solutions require to function. This leads to faster page load and improved [website](https://experienceleaguecommunities.adobe.com/t5/adobe-analytics-blogs/why-should-brands-need-to-move-to-aep-web-sdk-from-traditional/ba-p/589885) performance
3. **Standardized data collection**: AEP Web SDK utilizes a standard schema(more about it in another blog post) to ensure data consistency across different platforms and applications. This makes the implementation modular and easy to be updated without starting from scratch
4. **Future proof**: Through AEP Web SDK, enterprises can send data to non Adobe solutions through server side forwarding which expands the scope of the team significantly

Watch the [Summit 2020](https://experienceleague.adobe.com/en/docs/experience-platform/web-sdk/home#overview) video where the concept of Alloy.js and AEP Web SDK was introduced.

**Remember these definitions**

1. Alloy.js - JavaScript library written from scratch to replace all four existing libraries
2. AEP Web SDK - A broader framework that includes Alloy.js and other necessary components
3. AEP Mobile SDK - A framework built for mobile applications
4. AEP Web SDK Extension - An extension built around AEP Web SDK available for Adobe Tags for desktop data collection

**How does AEP Web SDK work**

##### Characters in a Web SDK implementation

With the introduction to AEP Web SDK out of the way, let's move forward with the different components that you need to setup for a successful implementation:

- AEP Web SDK extension
- Datastream
- Schema
- XDM vs Data Object

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some AEP Web SDK basics that you might be interested in sharing.
