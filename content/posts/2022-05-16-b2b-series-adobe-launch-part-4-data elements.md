---
title: "B2B Series: Adobe Launch - Part 4 - Data Elements and Data Layer"
date: 2022-06-11
tags:
    main: adobe launch
    topic: adobe launch data layer overview
thumbnailImagePosition: left
thumbnailImage: https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/1b42e624-cb22-4a4d-7c15-1e8368235e00/public
author:
     display_name: Ritesh Gupta
---

So far we have covered all items related to the Publishing Flow in Adobe Launch as well as covered briefly about Adobe Launch Extensions and their utility. We will now cover Data Elements and Data Layer. And see how are they rightly referred to as building blocks for Adobe Launch.

<!--more-->

We move up in the 'Authoring' section of Adobe Launch and will talk in detail about 'Data Elements' and 'Data Layer'. Both of the components are intrinsically related to each other and they help to make your implementation stay modular and flexible. 

#### Data Elements

I'd like to begin this article by referencing a simple definition for Data Elements by [Jim Gordon](https://www.jimalytics.com): "You’re missing the boat if you aren’t using Data Elements in Adobe Launch. Data Elements are built so you don’t have to rely on JavaScript or type the same text over and over again. Using Data Elements saves a whole lot of time and makes your rules leaner/cleaner!"

> Please do check out his [resourceful](https://jimalytics.com/tag-management/adobe-launch-data-elements-guide/) blog. It is an excellent repository covering various topics related to Adobe Analytics, especially about Event Driven Data Layer. The concept of EDDL and its extension developed by Search Discovery was a saviour during one of my key projects in Adobe India.

Jim's definition is 100% right. [Data elements](https://experienceleague.adobe.com/docs/experience-platform/tags/ui/data-elements.html?lang=en) are the building blocks of Adobe Launch. They are blank variables whose value can be easily mapped to **query strings**, **URLs**, **cookie values**, **JavaScript variables**, and so on. The best part about data elements is that they can then be easily referenced across Adobe Launch through a nifty button in the visual interface or in the custom code by using the _satellite.getVar_ function and adding the data element name like below:

```
_satellite.getVar('data element name');
```
Let's say for thelearningproject.in, I reference each post name by its document.title element. At the outset let me say that this is not a best practice. I highly recommend using a [data layer](https://jimalytics.com/data-layers/event-driven-data-layer-eddl-demo/) in your implementation. It is a best practice and I can't stress enough. But for now, I capture _document.title_ as my Page Name. I go ahead and create a data element called _Page Name_ and set the Data Element Type (more on the different Data Element Types below!) to _Page Info_ and then select _Title_ as my attribute. That's it. I am done. 

I can reference this data element wherever I need through out the entire implementation. I can do it via the UI by clicking on the small database icon or reference it in the custom code using the below code:

```
_satellite.getVar('Page Name');
```

But tomorrow, I add a data layer in my blog. I now want the _Page Name_ data element to capture the _digtalData.page.pageInfo.pageTitle_ node. I go ahead and easily make the change in my data element by changing the Data Element type from _Page Info_ to _JavaScript Variable_ type, refer it via the node above and voila! I am done.

##### The working of a data element

We need to understand the finer aspect of how a Data Element works? To explain, I will refer a lot of the material again from jimalytics.com from [this blog post](https://jimalytics.com/tag-management/adobe-launch-data-elements-guide)!

> A Data Element will try to reset its value each time it is referenced. Repeat it slowly, _a Data Element will try to reset its value each time it is referenced_. What this means is every time that you reference a data element it will first check for an existing value from the [source](https://medium.com/adobetech/data-persistence-from-dtm-to-launch-466a6ab9d168). The source can be a data layer, cookie, DOM element, whatever that has been defined. If the value that is returned **is not** _null_ or _undefined_, then the Data Element will be set to the new returned value. But if the returned value is _null_ or _undefined_, Adobe Launch will look inside the data element storage to determine if there is any existing stored value. If the condition returns true, then that value is used. But, if the condition returns false, then Launch will set the data element value to the default value which is stored by a user. This process is run and validated every single time a data element is referenced on the page.

The below flow [diagram](https://jimalytics.com/tag-management/adobe-launch-data-elements-guide/#How_to_Use_Data_Elements) does a great job of simplifying the concept 

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/740f7dc0-b14d-4a1e-6f40-eb5b14a79f00/public">}}

##### Storage Types

The other most important aspect to consider while creating a data element is the 'storage type'. Storage type indicates for how long will Adobe Launch retain the stored value in a Data Element. There are four different scope types available: Visitor, Session, Pageview and None.

From the [Medium](https://medium.com/adobetech/data-persistence-from-dtm-to-launch-466a6ab9d168) blog on data persistence, here's what the scoping looks like for each data element storage duration:

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/5067e335-42fe-4dfa-f164-4b3160863800/public">}}

Most implementation requests are fine with the 'Visitor', 'Session' and 'Pageview' scoping, but the 'None' scoping was done to tackle issues with single page applications. Aaron Hardy in his [Medium](https://medium.com/adobetech/none-data-element-storage-duration-bce063e7fd73) blog post has explained the reasoning behind introducing the _None_ scoping.

>'None' prevents Launch from "remembering" a Data Element's value. Adobe Launch first tries to find the value from the defined source. If the value that the source returns is _null_ or _undefined_ , then it looks for a value in the storage. In case of 'None', no value is found. Finally, the default value is used which is configured in the UI. This is actually a great support especially for single page applications. 'None' option is a default every time you try to setup a Data Element in Launch.

##### Data element types

The last part of this blog post will cover different Data Element types that is available for use. As you can see from below, you have a wide variety of settings available for use when creating Data Elements. I will only be covering a few of the available options. You can always refer to the official [Experience League](https://experienceleague.adobe.com/docs/experience-platform/tags/ui/data-elements.html) or the helpful [blog post](https://jimalytics.com/tag-management/adobe-launch-data-elements-guide/#How_to_Use_Data_Elements) again by Jim Gordon to read about the different types.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/877b047c-53a5-4c0b-c593-2563eaa2c000/public">}}

Cookie: It grabs the value of any cookie being stored on a web property. You can refer the cookie name in the Data Element type UI

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/519073a7-9516-497b-6e61-b0a7fefd4a00/public">}}

Constant: Another gem in the arsenal. Frederik Werner from Full Stack Analyst has written an [entire blog post](https://www.fullstackanalyst.io/blog/adobe-launch/why-you-should-use-the-constant-data-element-more-often-in-adobe-launch/) about "why you should use the Constant Data Element type more often in Adobe Launch. Do read and bookmark it for future help. Constant Data Element Type does a great job of passing a constant value whenever referenced.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/20d4516d-2d49-4154-4fba-1980800ca400/public">}}

Custom Code: A powerful Data Element type. It helps you to write custom JavaScript, and returns it as a value.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/54657a38-f8ef-446b-604c-1bb906c45600/public">}}

Dom Attribute: Dom Attribute refers to an existing value in the Document Object Model like id, href, class or any other attribute, and returns it when referenced. You need to select the element in the CSS selector and then refer what attribute value would you like to pass when referenced.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/38a70f8f-78ce-4908-cedf-ec07d7a5be00/public">}}

JavaScript variable: It is the most preferred method that I always resort to and I suggest you the same. A robust data layer is one of the most essential elements of a successful implementation. Always, always resort to this option when creating Data Elements. Once you select this type, you can refer to it in the exact path that is made available in the data layer.

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/4f2a2b88-5ad1-449e-8ac7-e77c0c9fb200/public">}}

As you can see there are multiple options that are available to you to set the value of a Data Element. What type you choose is totally dependent on the use case and available resources. But definitely explore all the different available types in your implementation.

##### Data Layer

At this point it is important to introduce the concept of Data Layer. You can again refer to Jim Gordon from [jimalytics.com](https://jimalytics.com/tag-management/the-event-driven-data-layer/) and The Data Layer primer from [annealytics.com](https://annealytics.com/2017/08/29/the-data-layer-a-primer/). Both articles do a much better job of explaining why use a Data Layer, and especially Event Driven Data Layer (EDDL) 

I will keep it precise and simple: A data layer is a key part of most implementations. It is a JSON object that gets defined by the developers. It is a standard way of passing page level and now event level variables (read EDDL), and helps the Implementation Team of an organisation to not rely on using CSS or DOM elements. I highly, highly recommended spending time creating a standard Data Layer dictionary and forcing the Development team to implement it. If not, be ready for a lot of headaches and heartburns.

Here is a simple data layer that I have defined in my sandbox project:

``` JSON
    // Page Level Data Layer 

        // Declaring the dataLayer object
            window.dataLayer = window.dataLayer || [];

        //Setting only Page Level variables
            window.dataLayer.push({
                "event":"Page Loaded",
                    "page":{
                    "pageInfo":{
                        "pageName": "home page : geometrixx",
                        "pageURL":  "www/geometrixx",
                        "siteDomain": "web",
                    }
                },
                "category":{
                    "siteSection": "web",
                    "siteSubSection1": "geomextrixx",
                    "siteSubSection2": " ",
                    "siteSubSection3": " ",
                    "siteSubSection4": " ",
                    "siteSubSection5": " ",
                },
                "userInfo":{
                    "userName":"ABCDEDFER",//set to the username 
                    "userType" : "platinum"
                    
                },
                "profile":{
                    "incompleteSections" : "mail|mobile",
                    "gender" : "male",
                    "isFavStoreSelected" : true,
                }
            });
```

You can download my sample [Event Driven Data Layer](https://github.com/riteshvg/DataLayer) for using it in your implementation. Be sure to not remove the credits!

##### Hands on:

We covered a lot of ground in this blog post. Let's try to do a hands on exercise in which we will:

- Add an Event Driven Data Layer and customize it for our webpage
- Add the Search Discovery Data Layer Manager extension and activate it
- Modify the Page Name and Page URL data elements to capture the Data Layer values from the Event Driven Data Layer
- Validate the changes

{{< youtube UAwPxshJL9Q >}}

With this we complete talking about Data Elements including why and how to define a Data Layer. In the next blog post, we will be covering all about Rules and start combining all the previous elements. 

I hope these updates are helpful to you in your implementation. I have tried covering all the scenarios that I have experienced in my implementation journey and will continue to keep adding more as I keep learning. Do share with me any feedback you might have on:
_ritesh(at)thelearningproject(dot)in_