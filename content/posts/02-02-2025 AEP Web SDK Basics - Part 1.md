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

I have been trying to write and make a video of start to finish process about AEP Web SDK. But some or other priorities took over. This time I am committed to complete the entire Back to Basics series about AEP Web SDK, even if it takes a month or more. So, if you 'd like to know more about the nuts and bolts of AEP Web SDK, then stick around.

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

But, the challenge that plagued these enterprises stemmed from the multitude of libraries that Adobe required for collecting the details. Here's how it looked:

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/Screenshot%202025-06-11%20at%201.53.50%E2%80%AFPM.png?updatedAt=1749630344804">}}

For a typical project which had the need to implement different Adobe Experience Cloud solutions, a company had to implement Adobe Analytics which required integrating **AppMeasurement.js** library. For personalization and targeting, there was a need to integrate Adobe Target via **Mbox and AT.js**. For visitor segmentation and to make logical cohorts of their visitors, companies implemented Adobe Audience Manager with the help of **DIL.js**, and underlying all the solutions was **Visitor API.js**, a library for visitor identification.

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

**How does AEP Web SDK work**

##### Characters in a Web SDK implementation

To understand how AEP Web SDK works and how it helps enterprises simplify data collection from their digital entity, we need to first understand the different components and how they come together to create a successful and all encompassing data collection methodology.

The different elements that work together are:

- Alloy.js - Alloy.js is the library that was created from scratch to streamline data collection and replace need to have multiple Adobe Experience Cloud solution libraries
- AEP Web SDK - AEP Web SDK is the framework that utilizes Alloy.js and other components to send data to the Aodbe Experience Platform Edge Network
- Edge Network - To streamline data collection through a single point, Adobe created the Edge network - a comprehensive collection of servers that support unified data collection. Edge Network offers a single endpoint for data collection reducing data latency and improving web page performance
- AEP Web SDK extension - AEP Web SDK extension used in Adobe's Data Collection simplifies integrating Alloy.js, AEP Web SDK and other components
- Datastream - Datastream is like the traffic police that determines how to reroute the collection of data to different Experience Cloud solutions. It is a server side configuration that dtermines where the incoming data from Edge Network should be sent
- XDM Schema - Since data is collected from different solutions, there was a need to have a standardized Schema for customer experience data which is called as the XDM (Experience Data Model). The purpose of XDM is to bring consistency across different applications and services
- Data Object - Data is sent to the Edge network in two forms:
  -- XDM Object - A structured object that conforms to the predefined XDM schema
  -- Data Object: A flexible and unstructured object introduced recently. The Data object removes the need to rewrite the entire data layer and utilizes existing paths

To summarize for this blog post, **Remember these definitions**

- Enterprises struggled with data collection due to multitiude of libraries which made data collection complex, degraded web page performance
- Alloy.js and the broader framework AEP Web SDK was introduced to simplify data collection while increasing performance and reducing burden on martech teams
- An enterprise can start by migrating their existing data collection to AEP Web SDK framework using the Data object and plan for the larger transition to utilize the XDM object

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some AEP Web SDK basics that you might be interested in sharing.
