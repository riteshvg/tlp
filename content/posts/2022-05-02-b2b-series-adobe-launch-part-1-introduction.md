---
title: "B2B Series: Adobe Launch - Part 1 - Introduction"
date: 2022-06-02
tags:
    main: adobe launch
    topic: adobe launch overview
thumbnailImagePosition: left
thumbnailImage: https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/0892146a-ec48-4f38-2585-fdc70301c400/public
author:
     display_name: Ritesh Gupta
---

This series will be all about covering the basics of my knowledge about Adobe Analytics and its implementation using Adobe Launch as well as analysis of data using Analysis Workspace. In this blog post, we cover the introduction to Adobe Launch.

<!--more-->

## Back to Basic Series

In order to learn a new skill properly, we always need to start at the basics. Be it piano, sports, coding or any other venture - whether professional or personal, we need to begin at ground zero. 

My journey with Adobe Experience Cloud has been very enriching and fulfilling. But I have always missed understanding the foundational aspects and had to sometimes scramble for answers in Stack Overflow. So this Back to Basic series is my contribution to build a solid foundation for people who are at the starting phase and need a step by step guide to understand how to implement digital analytics tools.

Why read through this series you may ask, when you have so many expert guides, YouTube tutorials and Udemy courses readily available. Well, this is my spin on the basics. And even if one person reads and uses the material in his/her line of work, I will be glad. I am not expecting a huge set of followers. But I want to record my learning so that tomorrow it might come in handy for me and for someone else. Also, this B2B series is aimed at complete novice in the field of setting up Adobe Experience Cloud tools. Hence, I will go into extra details regarding each aspect of the setup.

Disclaimer: I will primarily be focusing on Adobe Experience Cloud of tools, but sometimes cover other tools in this series like Tealium, Power BI and Google Analytics. I believe each tool has its strengths and weakness. I am not going to waste my time listing the differences between these tools and which one is best and which one should be sunset forever.

## Rebranding of Adobe Launch
> "At the time of me writing this series of articles, the Adobe Product team has rebranded Adobe Launch to just 'tags'. However,
I will still be referring it as Adobe Launch. Please refer to the offical Experience League [documentation](https://experienceleague.adobe.com/docs/launch.html?lang=en) for more details.

## Adobe Launch

The first tool that I am going to talk about is Adobe Launch or what is now known as Data Collection. Adobe's Launch is a brilliant Tag Management System that comes inbuilt when you buy an Adobe Experience Cloud license. This tool is on the similar lines of Google Tag Manager and TealiumIQ. According to me each tool has its pros and cons and it should always remain that way. The official definition of Adobe Launch is:

> " With [Adobe Experience Platform Launch](https://business.adobe.com/products/experience-platform/launch.html), you can connect multiple technologies and turn data into action — so you can deliver powerful, memorable experiences."

I personally think it is very wordy and over promising. But hey it is a powerful tool. Anyway enough of the introduction. Let's move on with the setup.

### Adobe Launch UI Overview

The first thing that you need to do when accessing Adobe Launch is check whether you have the right permissions. We will be covering the Back to Basics for Adobe Admin Console in a separate blog. Assuming that you do have the right access, you got [experience.adobe.com](https://experience.adobe.com) where you will see links to different tools.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/7d7846da-f54c-4b9d-0982-2965e7c3d900/public">}}

We click on Data Collection, and we then get redirected to a Property List page where you see a list of the properties that you have created or have got access

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/a6297859-8666-42af-f22a-5abf7ee05100/public">}}

If you have logged in for the first time and haven't created any property, then you will not see any listed for you.

#### What is a Launch Property?

In simple terms, Adobe Launch property is a container. Think of it as the Downloads folder in your machine. It contains files, pdfs, jpgs etc. In the same way, Adobe Launch property carries all the necessary components that go into setting up different marketing technologies in your digital property. There is no guide to decide on the container structure. I have personally seen clients having just one container for each of their domain and subdomains, and then some clients just have one container from which the entire setup is running. It honestly depends on how you want to lay it out. You can create containers by different companies, or different regions or different websites.

##### The Use Case

It's pretty useless to discuss implementation of any marketing technology without a use case. I will take the most simplest use case: we have a website which is the main domain for our company and we want to implement Analytics via Adobe Launch.

##### Setting up a property

Moving on, we need to start setting up a property for implementing Adobe Analytics. Depending on what rights you have, the blue button to create a new property will be activated or deactivated. You can check with your Experience Cloud administrator on what rights you have. 

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/9a0a2613-bae2-4650-93de-733b96b4bc00/public">}}

Click on the New Property button, and you will be prompted to enter in a few details:

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/6f342dcc-03a4-4591-7f1b-abc03ce28b00/public">}}

- Enter the name of your Launch Property. The best practice is to always include the digital entity along
- Select the Platform: Web or Mobile. Depending on this step your implementation setup will change
- Include the site name but without http, https or any subdomain if you are selecting the Web platform
- We will not cover the Advanced Options now as it is for advance users, but 90% of the implementations don't need it

Remember these are one time settings and you can't change them later. So check the details before saving.

Once you hit the Save button you will be directed to the property listing page where you can see the property that you have just created or accesses to other property. We'll spend a few minutes on this page

The Name column lists down all the properties and links to open each one of them. The Platform column gives you a preview of the type of property (Web | Mobile). The Created column gives you a way to sort by date of creation and the Last Modified column gives you an option to sort the view by property that was last modified.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/2bf704aa-77f0-49d1-1aac-07079010a600/public">}}

After you have selected your property, you click on the title and you are redirected to the Property Overview page. This page contains a wealth of information and is a gateway to the setup. We first start with describing the left hand side elements

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/00e9d5e9-3f94-4ed0-2de2-567a39f63a00/public">}}

That was all about the introduction of Adobe Launch. In the next blog post, we will do a deep dive on Adobe Launch and cover in depth the publishing process.

I hope these updates are helpful to you in your implementation. I have tried covering all the scenarios that I have experienced in my implementation journey and will continue to keep adding more as I keep learning. Do share with me any feedback you might have on:
_ritesh(at)thelearningproject(dot)in_