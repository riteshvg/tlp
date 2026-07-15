---
title: 'Back to Basics : AEP Web SDK : Part 2'
date: 2025-02-17
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

In the previous blog post, we covered the in-depth defintion of AEP Web SDK. We also looked at the characters that play a role in the implementation of AEP Web SDK. We discussed about the Edge Network and how it plays a critical role in personalization of data through Adobe services.

##### Characters in a Web SDK implementation

###### Datastream

Let's talk about Datastream in this blog post

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/edgenetwork_DS.png?updatedAt=1739783916319">}}

A Datastream is an integral part of the data collection process. In the previous blog post, we covered how the new Web SDK library (codenamed alloy.js) was created with the intention to have one library one collection center setup. Now, if there multiple solutions are sending data through one collection center, we need a way to manage the traffic.

Datstream is that traffic warden controlling the traffic flowing through the collection center. All the data that is collected in the Edge network from a company's website or mobile app gets routed to multiple Experience Cloud solutions via Datastream. You can configure different servcies via the Datastream and

Let's see a video explaining how to setup a Datastream and how does it route data to different Adobe Experience Cloud solutions.

Click on the lin to know more about [Datastreams](https://experienceleague.adobe.com/en/docs/platform-learn/implement-web-sdk/initial-configuration/configure-datastream)

tells the Edge Network where to send the data that is collected by the AEP Web SDK. Through Datastream you can configure the Edge Network to send data to Adobe Experience Cloud solutions such as Adobe Analytics, Adobe Target etc. As I mentioned earlier, AEP Web SDK is a framewwork containing an instance of Alloy.s

That is all for this blog post. In the next blog post, we will be covering other characters of a AEP Web SDK implementation. As always, if you have any doubts or just want to collaborate, leave me a line on ritesh@thelearningproject.in
