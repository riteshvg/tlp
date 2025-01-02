---
title: "Introduction to AEP Web SDK"
date: 2021-10-07
tags:
    main: adobe experience platform web sdk
    topic: aep web sdk overview
thumbnailImagePosition: left
thumbnailImage: https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/76943120-356e-4551-2fab-0f9348838e00/public
author:
     display_name: Ritesh Gupta
---

This is a three part series covering the AEP Web SDK implementation and debugging series. AEP Web SDK is a new way of data collection in the Adobe Experience Platform stack. I believe it has great potential to simplify implementations of Adobe Experience Cloud tools. I will try to cover the basics and integration and we will see why should we advocate its use in our digital analytics projects.

<!--more-->
_Disclaimer. I am learning AEP Web SDK as it is being developed and modified by the Engineering team. So you might find changes in the content as the enhancements are being introduced._

#### Introduction

In the field of digital data collection, every year or two, a new tool or enhancement is introduced by companies like Google and Adobe. I remember when I joined Adobe in 2016 there was an entire active ecosystem around the now sunset tool - Adobe Dynamic Tag Management. Then around 2018, Adobe launched Adobe Launch. This was a significant milestone in the data collection space.

The extensibility of Adobe Launch saw an entirely new community of developers working to enhance the functionality of this tag management system through what we call as Extensions. The advantage of using Extensions is that we no longer need to rely on custom code for implementation purposes. And implementation has become much more simplified and modular. 

But the innovation journey didn't end here. In the first ever virtual Summit of 2020, Adobe introduced the concept of **Adobe Experience Platform** and **AEP Web SDK**. 

#### What is AEP Web SDK?

In its simplest definition, [AEP Web SDK](https://github.com/AdobeDocs/experience-platform.en/blob/master/help/edge/home.md) is a JavaScript SDK (_and Adobe Launch extension with the same name_) created to replace the hassle of integrating individual Adobe Experience Cloud solution libraries in a project. 

Let me back up a bit and try to explain what I mean by it: As Adobe kept acquiring different companies like Omniture, Everesttech, Demdex, Target etc., it also acquired the legacy integration method of these companies. For instance, Omniture had a propreitary technology called H-Code, Target has a library called at.js and so on. These libraries were required to be integrated in a specific order and maintained in a specific versioning for all of them to work in synchronicity. 

This meant that any organisation that required integration of Adobe Analytics, Adobe Target, Adobe Audience Manager and Visitor Identification services had to undergo a lot of tasks. It was a lot of work for the company as well as the implementation team. Not to mention upgrading mutliple libraries as new versions were released. Also, each library had different integration requirements and whatnot, and a developer/implementation consultant was seen grappling with multiple components. The problem exacerbated in large organisations and having multiple licenses.

AEP Web SDK was introduced with the aim of addressing this problem. This means that you no longer have to add 4 different libraries, but can integrate Analytics, Target, Audience Manager and Visitor ID service through a single, unified JS library.  While that reduces significant maintenance overheads, the other performance benefits are very well covered in this medium.com **[blog](https://medium.com/adobetech/boosting-website-performance-with-adobe-experience-platform-web-sdk-and-edge-network-329fcf70fdf9)** post by Aaron Hardy.

### What is the correlation between AEP and AEP Web SDK?

At this juncture, it is crucial to understand the inter-relation between [Adobe Experience Platform (AEP)](https://business.adobe.com/in/products/experience-platform/adobe-experience-platform.html) and AEP Web SDK. The concept of Adobe Experience Platform is a larger one, and difficult to summarize it in a couple of sentences. But I'll try. AEP is a platform developed by Adobe to help companies stream data from multiple sources, enhance the data with schemas and data governance, stitch different identities of users across different solutions into a single view and then send the profiled view and enhanced data to other tools for activation and personalization.

![](images/image-3-1024x633.png)

The above might be oversimplification of AEP, but then this blog post is not about AEP. It is about showing the correlation between AEP and AEP Web SDK. AEP comes bundled with AEP Web SDK. But AEP Web SDK doesn't required AEP to function. The only place where the two paths cross is in using a commonly identified data schema called Adobe Xperience Data Model ([XDM](https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html)).

### How to implement AEP Web SDK?

I will be covering the nuts and bolts of how to implement AEP Web SDK along with an Event Driven Data Layer in the next couple of blog posts, but let me share a few pre-requisites for AEP Web SDK to function:

- Adobe Experience Platform Edge Network: The main difference between traditional method of implementation and the AEP formula of implementation is the introduction of Adobe Experience Edge network. In its simplest definition, Edge network is a unified global distributed network of servers that enable a new methodology of deploying Adobe solutions

![](images/image-4.png)

- Adobe Experience Platform Web SDK extension: AEP Web SDK is not a tag manager of its own. It is a JavaScript library like AppMeasurement.js which requires either manual integration or implementation through TMS like Adobe Launch

![](images/image-5.png)

------


