---
title: 'Back to Basics : AEP Web SDK'
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

I have been trying to write and make a video of start to finish process about AEP Web SDK. But some or other priorities took over. This time I am committed to complete the entire Back to Basics series about AEP Web SDK, even if it takes a month or more. So, if you 'd like to know more about the nuts and bolts of AEP Web SDK, then stick around.

Let me first outline the **_Agenda_** that I have outlined for creating this blog series:

- What is AEP Web SDK?
- What is the difference between AEP and AEP Web SDK?
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

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/Screenshot%202025-02-03%20at%201.01.36%E2%80%AFPM.png">}}

**Remember these definitions:**

- Alloy.js - JavaScript library written from scratch to replace all four existing libraries
- AEP Web SDK - A broader framework that includes Alloy.js and other necessary components
- AEP Mobile SDK - A framework built for mobile applications
- AEP Web SDK Extension - An extension built around AEP Web SDK available for Adobe Tags for desktop data collection

#### How does AEP Web SDK work

With the introduction to AEP Web SDK out of the way, let's move forward with the different components that you need to setup for a successful implementation:

{{< alert info >}}
Please note: We will be only covering Web SDK implementation in this blog series
{{< /alert >}}

##### Characters in a Web SDK implementation

In a AEP Web SDK implementation, we have to take care of multiple components. They all need to work in parallel to deliver the desired output. Let's first look at the different components of an implementation

- Edge network
- Datastream
- Schema
- XDM vs Data Object
- AEP Web SDK extension

###### Edge network

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/edgeNetworkImage.png">}}

Edge Network is a high-performance, real-time data collection and delivery system to have faster, more efficient and privacy compliant data between websites, mobile apps and propreitary solutions of Adobe - Analytics, Target, Audience Manager, Campaign. Edge Network or AEP Edge Network is a mesh of services, servers, network devices, databases etc. The key features of AEP Edge Network enable websites and mobile apps to exchange interactions and provide a more personalized experience to the end customer through simpler, faster and more scalable implementations. You can read more about Edge Network [here](https://experienceleaguecommunities.adobe.com/t5/adobe-experience-platform-blogs/introduction-to-the-aep-edge-network/ba-p/658579)

{{< youtube KmrB7ocTiEI >}}

That is all for this blog post. In the next blog post, we will be covering other characters of a AEP Web SDK implementation. As always, if you have any doubts or just want to collaborate, leave me a line on ritesh@thelearningproject.in
