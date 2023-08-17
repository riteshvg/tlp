---
title: "B2B Series: Adobe Launch - Part 5 - Adobe Launch Rules"
date: 2022-07-08
tags:
    main: adobe launch
    topic: adobe launch rules
thumbnailImagePosition: left
thumbnailImage: https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/1645d396-c548-4771-502b-983635c73900/public
author:
     display_name: Ritesh Gupta
---

We move further up in the 'Authoring' section of Adobe Launch and will cover the last component: Rules. Adobe Launch Rules are a way to combine all the previously created components: extensions, data elements and libraries to trigger marketing or tracking pixels on a webpage.
<!--more-->

_There is a lot to be consumed and written in just one blog post on Rules. So I will divide the blog post into smaller articles for easy understanding and maintenance. Hence, there will be multiple blog posts on just the topic of Rules._

#### What is a Rule in Adobe Launch?

Adobe Launch is a Tag Management system just like Google Tag Manager. But the most important difference is that Adobe Launch looks at a business requirement first, and then incorporates the required actors. Referencing a definition from [Adobe Launch: Rule Events Guide](https://jimalytics.com/adobe-launch-guides/adobe-launch-rule-events-guide/) from jimalytics.com

> While the Rule Name can be considered analogous to GTM’s Triggers, Adobe tag management solutions begin the implementation workflow with that business objective (which should be what drives your implementation strategy). Each action can include any number of tags and it keeps the objectives front-and-center. If you’re naming your Rules after your tags, I would contend that you’re taking the wrong approach to leveraging DTM/Launch.

Rules in Adobe Launch are triggers that execute whatever tracking scripts or marketing pixels you want them to. And they do it on the basis of: 

- triggering of certain **EVENTS** by user like mouse down, tab blur, entered viewport, loading of page etc.,
- matching or excluding specific **CONDITIONS** like user visiting only a particular page, is he a new or returning visitor etc., 
- and then firing the required **ACTIONS** like sending a marketing beacon to Adobe Analytics, loading a custom script etc.

The structure of a Rule in Adobe Launch is something like [this](https://en.wikipedia.org/wiki/Conditional_(computer_programming)). Reproduced from jimaltytics.com:

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/51c10a38-6e22-48d2-b747-ab279a6a7900/public">}} 

And here's how a rule looks like when it is completely defined in Adobe Launch:

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/dcfe0851-71a2-4013-b806-123309707b00/public">}}

That's a very long definition. Let's break it down into smaller parts and see how it works.

**EVENTS**: Events are a way of telling Adobe Launch that this action has been recorded. The action can be anything that the user does on a website like clicking of a button or moving to a new tab (blurring of current tab) or loading of a page etc. Adobe Launch categorizes this events into _'Event Types'_. 

Event types are available because Adobe Launch wants you to trigger events satisfying your business objectives. **You don't want to record every event that the user is taking on our website. You want only specific ones that align with the requirements.** Event types are an easier way of translating the requirements into specific actions. 

So, what kind of event types are available? Event types are mainly supplied by the Extensions that you have installed. For e.g. Adobe Launch's default Core module provides event types in the categories of _page load, browser load, form actions, keyboard press, mouse actions, media specific events_ and the general category of _'Other'_. And when you install Search Discovery's Data Layer Manager extension, you get an event type called _Data Layer Push._

**CONDITIONS**: Conditions are the constraints mechanisms that are applied to further restrict when Launch should or not trigger the Rule. Adobe Launch conditions provides the option of either audience that either match or don't match the condition.  

Adobe Launch provides different types of conditions such as technology, user engagement, url parameters, other and data specific. For e.g.if you want a rule to be triggered when a particular cookie is made available, then you need to select conditon type as _'Cookie'_. Or if you want a rule to be executed only if the page URL contains a specific query string parameter parameter then you can select the _'Query String Parameter._ 

**ACTIONS**: Actions allow Adobe Launch to execute the desired action after it has validated events and conditions. Just like Events, Actions are determined by the Extension that is being utilized. Adobe Launch categorizes this action into _Action Type_.

Action type are again determined by the kind of Extension that has been selected. For e.g. if you select Adobe Analytics extension, then the different types of actions made available are 'set variables', 'send beacon' and 'clear variables'. Each type has a particular utility and the action interface allows you to define a relationship between the different types. Like this:

#### Use Case:

Let's combine all the three components that we have learnt above, and configure a Adobe Launch on the below conditions:

- Load Launch script at the bottom of the page 
- Trigger only on page title equals to 'geometrixx : home page'
- Set Adobe Analytics variables, send a beacon to Adobe Analytics server and then clear the variables

This is how it will look all combined:

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/11a1b77a-d003-4e3d-4049-c26e24b61700/public">}}

That's it! This is really simple, isn't it? And that's the power of Adobe Launch. With Adobe Launch, you can fire multiple marketing and tracking pixels without the hassle of writing any custom code. That's all for this blog article now. In the next part, we will dive deeper into Extensions, Conditions and Actions and check out the various options available for us. See you soon!



