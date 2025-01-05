---
title: "B2B Series: Adobe Launch - Part 5.1 - Adobe Launch Rules: Events"
date: 2022-07-15
tags:
    main: adobe launch
    topic: adobe launch rules
thumbnailImagePosition: left
thumbnailImage: https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/5a33b5a5-3111-414b-0ca7-3956d88c6b00/public
author:
     display_name: Ritesh Gupta
---

In the previous [blog post](/posts/b2b-series-adobe-launch-part-5-adobe-launch-rules/), we covered a primer on what are Rules in Adobe Launch. We saw how Rules imitate an _if...then_ structure, and how the three main components: **Events, Conditions** and **Actions** work. In this blog post, we will cover in depth the different types of _Events_ that are available for us to utilize. Let's dig in!

<!--more-->

#### What is an Event in Adobe Launch?

As we recall, Events are a way of telling Adobe Launch that a particular user action has been recorded. The action can be loading a page, loading of a media file, a mouse or keyboard click, etc. Adobe Launch categorizes these actions into a bucket called _Event Types_. And these _event types_ are dependent on the Extension that you select. 

#### Event Types in Core Extension

The _Core_ extension is available out of box when you set up a Launch property. It has multiple _event types_ that cover most of the common implementation scenarios. The available options are categorized in the below groups. There is a great guide available on the Experience League. I highly recommend bookmarking the article for [future](https://experienceleague.adobe.com/docs/experience-platform/tags/extensions/adobe/core/overview.html?lang=en) use.

- Browser
- Form
- Keyboard
- Media
- Mobile
- Mouse
- Other
- Page Load

In this article, we will be focusing primarily on the options that I mostly use in my implementation requirements. The most common ones that I have used are available in **_Other_** and **_Page Load_** category:

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/4689c4f3-04f3-4d51-46ba-8488ade32600/public">}} 

##### Event Category: Other

The different options available in _Other_ bucket are:

###### Event Type: Custom Code: 
For scenarios that don't fall into any of the available categories, using custom code is a good option. You will need to include the _trigger()_ function to execute the Rule. I have given an example below, but there is another very helpful example available in [Adobe Tech Blog](https://medium.com/adobetech/custom-code-event-type-6cde810ff09c) 

_Scenario_: 
Let's say you want to trigger a rule only when the _pageType_ parameter is available. You can easily do it using the QSP data element, but for now we focus on the _Custom Code_ type. This is how you will add the condition using the _Custom Code_ option:

```JavaScript



```
And when the _pageType_ query string parameter populates, Adobe Launch will trigger the Rule and fire the requested action. But I highly recommend to use the Custom Code method only in exceptional circumstances.

###### Event Type: Custom Event: 

> Thanks to Jenn Kunz from [digitaldatatactics.com](https://www.digitaldatatactics.com/index.php/2019/06/07/). 
> Her helpful blog cleared my doubts on how to use a Custom Event and attach it to a button click.

_Custom Event_ data types allows Consultants to listen for _custom events_ that a developer might add into the code to capture additional parameters. These parameters can be recorded and passed to Adobe Analytics. Referencing a definition from [jimalytics](https://jimalytics.com/adobe-launch-guides/adobe-launch-rule-events-guide/#Other_Events), _custom events are a way of forcing an event to trigger using native JavaScript functions. If you are considering using a Direct Call , Custom Events might be a better alternative. They allow passing of custom data layer parameters_. But now Direct Call Rules too have a feature to pass addtional info with the _\_satellite track()_ method. 

Let's understand _Custom Events_ with an example:

_Scenario_: On click of an _add to cart_ button, you'd like to pass additional parameters such as _name, price_ and _color_ to Adobe Analytics. You'll pass below code to the developer to include in the web app:

```JavaScript
 <button type = "button" class = "btn btn-primary" id = "cartAddButton">
    Add to Cart!
 </button>

    const addToCartButton = document.querySelector("#cartAddButton");
        addCartButton.addEventListener('click', fireMyEvent, false);
        
        function fireMyEvent(e){
        e.preventDefault();
        let myCustomEvent = new CustomEvent("cartAdd", 
        { detail: 
            { name:"iPhone 13 mini", 
              price:"1000", 
              color:"red" 
            }, 
            bubbles: true, 
            cancelable: true 
        }); 
        e.currentTarget.dispatchEvent(myCustomEvent)
        }
```
In Adobe Launch you will create a new rule using the Custom Event _Event Type_ and configure it as below. 

{{< youtube yWHomkXEZWo >}}

That's it. Now whenever a visitor clicks on the _Add to Cart_ button, Adobe Launch will trigger the rule and fire the requested action. Now you can pass the required data with _Custom Events_ and you can create any type of rule and configure condition to pass any level of related data into Adobe Analytics.

> The helpful _console.log_ code that I am using to debug what data is being passed on a button click is referenced from: [digitaldatatactics.com](https://www.digitaldatatactics.com/index.php/2019/06/07/enhanced-logging-for-direct-call-rules-and-custom-events-for-launch-dtm/)

```JavaScript
    var elem=document.getElementById("cartAddButton")
        elem.addEventListener('cartAdd', function (e) { 
        console.log("'CUSTOM EVENT 'cartAdd' fired with these details:",e.detail)
    }, false);
```

###### Event Type: Data Element Change: 

This is a self-explanatory _event type_ available for use. From the official definition on Experience League: 

"The event triggers if a specified data element changes. Adobe Launch will check a Data Element every second to see if its value has been changed. If it detects, the rule gets triggered". As per Jim Gordon from [jimalytics.com](https://www.jimalaytics.com), this _event type_ is best suited for detecting events in single page apps. 

###### Event Type: Direct Call: 

Direct Call Rules (DCR) _event type_ is similar to the _Custom Event_ type. This _event type_ was initially in its own category in Adobe DTM. But has now rightly been placed in the _Event Type_ menu. Direct Call Rule is a brute force way of firing an Adobe Launch rule when a developer wants it to. All you need to do is ask the developer to call a _\_satellite.track()_ method with the string name in the brackets. Adobe Launch will trigger the appropriate Rule and fire the requested action. 

Let's take the earlier example of passing product level data whenever a visitor clicks on _'Add to Cart'_. But instead of using _Custom Event_ method, we will be using _Direct Call_ method.

{{< youtube vdUh84vsY74 >}}

As you can see, we are able to achieve exactly the same objective like _Custom Event_ option. This seems like an easy option and is preferred in exceptional cases. But the important part to know is that many developers are wary of injecting _\_satellite.track('string')_ function in their code. 

###### Other Event Types:

The other _Event Types_ are self explanatory. I will reference the definiton from the official Experience League guide. 

- **Element Exists:** This _event type_ will check if the particular element is available at the time of the rule getting triggered
- **Enters Viewport:** This _event type_ will trigger a rule when the specified element within the rule exists within the browser viewport
- **History Change:** This _event type_ triggers if a pushState or a hashchange event occurs. There are no settings for this _event type_
- **Time on Page:** The Time on Page _event type_ will trigger the rule after a designated period of time after the library loads (measured in seconds)

##### Event Category: Page Load:

The _Page Load_ events condition trigger, as the name suggest, on the load of the page in the browser. Depending on your objective, you can use either of the options below to fire a Launch Rule. In my experience, _Window Loaded_ is the most used option followed closely by _Library Loaded(Page Top)_. The _Window Loaded_ option helps Adobe Launch wait on other elements such as the Data Layer to be completely built before firing the beacon.  

- **DOM Ready** The event triggers when the DOM is ready and the user can interact with the page. There are no settings for this event type.

- **Lbrary Loaded (Page Top)** The event triggers as soon as the tag library is loaded. There are no settings for this event type.

- **Page Bottom** The event triggers once _satellite.pageBottom(); has been called. When loading the tag library asynchronously, this event type should not be used. There are no settings for this event type.

- **Window Loaded** The event triggers when onLoad is called by the browser and the page has finished loading. There are no settings for this event type.

That's all for this edition of the **B2B : Adobe Launch Rules : Events** topic. Events are the most critical element when building an Adobe Launch Rule. It is thus important to understand the different ways you can use Events to your advantage based on your requirements. We will be diving into **Conditions** and **Actions** in the next blog post, and close the B2B : Adobe Launch series. 

As always, if you have any queries, comments or suggestions, please drop me a line at _ritesh(at)thelearningproject(dot)in_. See you in the next update!