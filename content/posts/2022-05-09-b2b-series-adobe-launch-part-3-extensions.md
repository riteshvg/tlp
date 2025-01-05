---
title: "B2B Series: Adobe Launch - Part 3 - Extensions"
date: 2022-06-09
tags:
    main: adobe launch
    topic: adobe launch extensions overview
thumbnailImagePosition: left
thumbnailImage: https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/4a239d57-efc0-447d-ecb6-acfb0d585000/public
author:
     display_name: Ritesh Gupta
---

In article one and two, we covered introduction and overview of Adobe Launch in previous articles. In this post, we will be doing a deep dive into the Adobe Launch extensions and how they simplify adding marketing and tracking pixels into your site without need for using custom code.

<!--more-->

##### The Deep Dive: Extensions

The official [Experience League](https://experienceleague.adobe.com/docs/experience-platform/tags/ui/extensions/overview.html?lang=en) documentation describes extensions as a packaged set of code that extends the functionalities provided by tags or event forwarding. To simplify the definition, Adobe Launch extensions are a simpler and UI driven way of integrating the required marketing technology without having to write any custom method or complicated logic.

So, if you move over to the Extensions tab, you will, by default, see a Core extension enabled. This extension is the main engine. It lets you add events, conditions, data element types and extensions. But integrating other extensions is optional but highly recommended. It depends a lot on what marketing technologies you would like to integrate for now versus later.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/45e8e60b-49ac-404f-351a-880f0ff18000/public">}}

To see what other extensions are available for use, click on the Catalog. Depending on the the configuration, each extension has its own settings. I highly recommend going through the developer documentation to understand the requirements. I recommend every integration to atleast have the below extensions enabled.

- Adobe Analytics
- Experience Cloud ID Service
- AA Product String Builder
- Common Analytics Plugins
- Data Layer Manager

```I developed an extension in my previous job as a Technical Architect. You can search for it in the catalog by the name of Call Tracking Metrics.```

Let's look at atleast two extensions Adobe Analytics & Experience Cloud ID Service and their settings in details.

In the search box, search for Adobe Analytics and click on install. Once, in the Install Extension window you will be presented with a page filled with setup options. These options will help you implement Adobe Analytics into your website. We will focus on Library Management, General, Global Variables, Link Tracking and Custom Code options.

##### Library Management Module

The Library Management module helps you to manage the Adobe Analytics library. You have an option of letting Adobe Launch manage the library (tip: highly recommended) or you can use one the following settings:

**Use the library already installed on the page**: This option is for existing implementation where you already have the Adobe Analytics library also known as AppMeasurement.js available

**Load the library from a custom URL**: In my seven years of implementation experience, I have only seen one client - a financial institution - selecting this option as they preferred security over other parameters. When you select this option, you need to give a link to where the AppMeasurement.js is hosted. It can be any cloud hosting services

**Let me provide custom library code**: If you'd like to control the finer aspects of implementing Adobe Analytics, you can select this option. It allows you to include the entire analytics library in the Custom Code editor window. More details [here](https://experienceleague.adobe.com/docs/analytics/implementation/js/overview.html?lang=en)

For our purposes, we will stick to the default option of 'Manage the Library for me'. Once you select this option, you need to add in your report suites (RSID) from the Adobe Analytics setup. I'll be covering the report suite setup when I touch upon Adobe Analytics in the Back to Basic series. But for now think of report suite in Adobe Analytics as a container of sorts where all the data from your website is stored in variables.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/2fc2c833-9cd7-4447-807f-3cbb4a253000/public">}}

You have an option of adding a report suite for each environment in Adobe Analytics. You can select more than one report suite per environment. In the Adobe Analytics setup this is called multi-report suite tagging. This means sending the data to more than one report suite. Generally this kind of setup is preferred in large corporations where they prefer having a global report suite for an overall view of data across their subsidiaries and then each subsidiary has its own report suite.

You also keep the Use Activity Map selection as checked. Activity Map is a wonderful [feature](https://experienceleague.adobe.com/docs/analytics/analyze/activity-map/activity-map.html?lang=en) in Adobe Analytics. It ranks link activity of users, basically which link is most clicked and which one isn't. We leave the second option as unchecked which is only for advanced users.

##### General Module

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/62820764-8a86-4fee-0f40-c58e59328900/public">}}

We move on to the General module. Once you open the module, you will see options to change your currency code, and add the tracking server. Tracking server is a place to enter link to the Adobe Analytics servers that collect and process analytics data. It is in the format of **<companyname>.sc.omtrdc.net**. This is also the place where you add the first party cookie tracking server details in case your company has opted for it. Be wary of selecting Enable EU Compliance for Adobe Analytics. If you select the option, you will see no visitor tracking available in your web setup.

**Global Variables**

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/7a1d5e67-22ba-4730-a3ec-ae2f12d20700/public">}}

Global Variables are the type of variables that are send to Adobe Analytics on every page view or hit. We will be covering the variables setup in relation to Adobe Analytics separately. Global variables setup is mostly used for common variables such as page name, page url, domain name, campaign id, state, zipcode etc. The extension provides you a place to input the variables one time, either through a data element or via JavaScript and then the extension will pass it on every user action.

````There is a very important point to mention here: The extension gets the last priority in the processing order. What this means is the variables that are set here will over ride the variables that might also be set in a Rule based setup. For example, you set the Page Name variable in a Rule, and also set Page Name in the General module. Since this module gets executed at end, you will see Adobe Analytics passing Page Name as set in the extension instead of passing Page Name from the rule setup.````

**Link Tracking**

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/b802ec92-9396-476c-360c-61390943b100/public">}}

The Link Tracking feature helps you to track links automatically on your website without the need for any additional custom coding. If you disable the checkboxes then you will not see any out of the box link tracking firing in your implementation.

Links in Adobe Analytics are divided into three types: general links, download links and external links. We already covered capturing general links which is tracked by enabling Activity Map as seen in the General Module above.

The download links checkbox helps you to track names of different files that are being downloaded across your website. If you don't see a particular file type included, go ahead and include the extension types in the box.

Outbound links also called as external links are links to websites that you don't consider as part of your domain. Basically, Adobe Analytics helps you to configure which links are considered as internal and which ones are external to your domain.

When you enable the 'Track outbound links' you are supposed to add at least one more parameter: either domain names of sites that you consider as internal - e.g. your own sub-domains, or domain names of sites that you consider as external. I have found it easier to just include my own domain name in the 'Never track' box. By doing so, I can tell Adobe Analytics that any link that contains these domain names are internal, and the rest are classified as external. It is important to know that Adobe Analytics considers the entire URL when trying to do these classification. But if I select the 'Keep URL Parameters' checkbox enabled then Adobe Analytics considers the query string parameters too.

For e.g. If I need to track all domains that have 'thelearningproject.in' as a part of its name, then I will go ahead and add 'thelearningproject.in' in the 'Never Track' box. This way any links that carry my domain name such as blog.learningproject.in or reach.learningproject.in will be considered as internal, and the rest any link will be considered as external.

**Configure tracker using Custom Code**

This section is for the advanced users of Adobe Launch. It typically allows you to write custom JavaScript to help you customize the values that are being passed into Adobe Analytics. It can be helpful for e.g. in lowercasing all the values that are being passed, or splitting the domain name into multiple parts etc. I advise to use this section with caution as sometimes an error here can prevent Launch from loading in your website which can lead to some very weird stares and heartburn.

We covered all the necessary modules in the Adobe Analytics extension. We will explore Cookies and Adobe Audience Manager section separately. We now move onto covering one more extension: **Experience Cloud ID Service**

The Experience Cloud ID Service extension helps you to implement the Adobe Experience Cloud ID system in your website. This system is responsible for generating a unique 32 digit numerical ID and assign it to a visitor who is browsing your website. In the Adobe Analytics universe, this ID is known by multiple names - ECID, MCID, Visitor ID. The reason why it is important to have the ECID service enabled for your domain is because this ID provides an identifier to your visitor which is persistent and universal. It means that if your organisation has license for other Adobe Experience Cloud solutions such as Adobe Target, Adobe Audience Manager, Adobe Campaign etc. then the ECID is a common identifier of your visitor that is used in the other tools.

According to official documentation, when an organisation implements the ID service, this ID lets you identify the same visitor and their data in different Experience Cloud solutions. The image below from the [Experience League](https://experienceleague.adobe.com/docs/id-service/using/intro/overview.html?lang=en) documentation sums it up very well.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/23979b19-f925-4c10-404e-9271636cc200/public">}}

The Experience Cloud ID Service extension provides an easy way to setup the Experience Cloud ID Service. There isn't much in terms of customisation as all the required parameter are auto-populated when you install the extension. Again there might be an edge case where you need to go and customise the settings, but I haven't come across any such scenarios yet.

That pretty much covers the two main extensions that I highly recommend besides the Core service. All other Extensions are optional and depends on your level of comfortability with either using a pre-packaged UI or using a custom code. I highly recommend using Extensions if you want to have a very easier way of managing Adobe Launch integration in your organisation.

That is all for this blog post. Let's do a hands on exercise to set up Adobe Analytics and Experience Cloud ID extensions. We will

- See the available Extensions in the Catalog page
- Integrate the Adobe Analytics and Experience Cloud ID extensions
- Customize Adobe Analytics extension with required parameters
- Validate if the Adobe Analytics extension is sending the required beacon

{{< youtube aJU6qBfpAOA >}}

We now move on to covering the building blocks of Adobe Launch - Data Elements and Rules.

I hope these updates are helpful to you in your implementation. I have tried covering all the scenarios that I have experienced in my implementation journey and will continue to keep adding more as I keep learning. Do share with me any feedback you might have on:
_ritesh(at)thelearningproject(dot)in_