---
title: "B2B Series: Adobe Launch - Part 5.2 - Adobe Launch Rules: Conditions"
date: 2022-07-20
tags:
    main: adobe launch
    topic: adobe launch rules
thumbnailImagePosition: left
thumbnailImage: https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/5d8505ad-8b85-4893-1f2b-ef5d24ee4900/public
author:
     display_name: Ritesh Gupta
---

In the previous [blog post](/posts/b2b-series-adobe-launch-part-5.1-adobe-launch-rules-events/), we learn about _Events_ and the available _event types_ in Adobe Launch. We saw how we have a wide array of different events available to determine when to trigger an Adobe Launch rule. In this blog post, we will cover all about _Conditions_. 

<!--more-->

#### What are Conditions in Adobe Launch?

_Conditons_, as we recall, are constraints that get applied to further restrict when Adobe Launch can or cannot trigger a rule. Think of it as a filter available to be super specific about when Adobe Launch can execute a Rule. The _conditions_ can be as simple as telling Adobe Launch to trigger the rule only when the visitor is a new visitor. Or the traffic source equals to 'Search' etc. Let's dig in to see what options are available for us!

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/45cdfc6e-3a42-42fc-fdf4-1a8a282c7400/public">}}

###### Logic:

The first thing you notice when you open the _Conditions_ window is the _Logic Type_. Using the _logic type_ you can include or exclude the audience matching the condition by using the _Regular_ or _Exception_ logic. 

For e.g., you'd like a **Global Page Load** rule to be triggered only on pages ending in _.html_ and not on _.aspx_. You then need to use the _exception_ logic to prevent Adobe Launch from firing the Global Page Load rule on _.aspx_ pages.

###### Type of Conditions:

The next thing to select is the _Condition Type_. Conditions just like Event come in different flavors. Adobe Launch categorizes these conditions into a bucket called _Condition Type_ and the choices are determined by the _Extension_ that you have selected. We will look at options provided by the Core extension. 

The different _Condition Types_ in Core extension are categorized into: 

- Data
- Engagement
- Other
- Technology
- URL

Let's explore the options available under each category.

###### Condition Type: Data

The _data condition type_ looks for different data points to trigger or make an exception of a rule.

**Cookie**: The 'Cookie' condition checks for the _name:value_ of a cookie you have included. 

{{<figure src = "https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/f164c3b5-4471-4115-043e-3a86b1681200/public">}} 

**Custom Code**: The 'Custom Code' condition checks for the scope of the rule, and fires the rule if the code evaluates to true, or ignores the rule if the code returns a false. 
For e.g. building on the previous use case of checking for Page Type variable, we can trigger a rule if the _pageType_ value equals _content_, else ask Adobe Launch to ignore other values. Custom code conditions like custom code events should be used sparingly. Read this '[no Custom Code challenge](https://webanalyticsfordevelopers.com/2019/01/08/2019-challenge-no-custom-code/)' by Jan Exner.

```JavaScript
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pageType = urlParams.get('pageType');
    if(pageType == 'content') {
    return true;
    }
```

**Value Comparision**: This condition, I believe, should be a preferred one for any Technical Consultant. Even Jim Gordon from [jimalytics.com](https://jimalytics.com/adobe-launch-guides/adobe-launch-rule-conditions-guide/) reaffirms the thought. I agree to it completely. The _Value Comparision_ check is the easiest and a robust condition to configure. It checks for two values against one other, and if the expected value is returned then the rule is triggered. Else, Adobe Launch prevents the rule from being fired. You can even check for one data element against the other one, and that opens a whole new world of possibilities.

Let's understand with an example: Say you want to fire a marketing pixel for visitors whose shopping cart total is more than $275. You can track the cart total in a data element (Hint: use an EDDL), add the data element as a _left operand_, select a _operator_ and enter the value in the _right operand_ box. That's it. Now when Adobe Launch sees the value of shopping cart above $275 on the shopping cart page, it will trigger the rule. 

**Variable**: At a first glance, the _Variable_ condition looks similar to the _Value Comparision_ condition. Both the conditions are checking for a JavaScript variable. But the main difference is in how they reference the variable. With _Value Comparision_ you have an ability to check for a Data Element. But with _Variable_ you need to put in the actual variable path. You can't [check](https://experienceleaguecommunities.adobe.com/t5/adobe-experience-platform-launch/rule-condition-difference-between-variable-and-value-comparison/m-p/311375) for a Data Element value with this condition.

###### Condition Type: Engagement

The _engagement condition type_ looks for different engagement parameters of the visitor to trigger or block the rule. The choices are self explanatory. However, there are still some finer aspects to consider.

**Landing Page**: As the name suggests, this condition checks for specific strings in the URL of the landing page and triggers the rule if the string is matched. You can also write regular expressions to include multiple scenarios.

**New/Returning Visitor**: Checks if the visitor is a new or returning visitor and triggers the rule. It sets a permanent cookie to determine if the user is new or returning.

**Page Views**: This condition evaluates the number of page views of a visitor during the lifetime of the visit or during current session. You have options to select _greater than_ , _less than_ or _equal to_ parameters

**Sessions**: Similar to _Page Views_ this option allows you to trigger a rule based on the number of sessions that are recorded

**Time on Site**: This option allows you to trigger a rule if the user has spent more, less or equal to a 'X' number of minutes on site. Though honestly I am unable to think of a use case for using this condition

**Traffic Source**: Returns true if the page _traffic source_ matches the expected source in the condition

I will skip the rest of the _condition types_ available in the _Other_ and _Technology_ buckets. The options are very simple and self-explanatory. We will look at the last option: _URL_

###### Condition Type: Engagement

The _URL condition type_ checks for different parameters in the URL of the page to trigger or block the rule. Let's look at the options available:

**Domain**: This option is populated from the domains we included when setting up the Adobe Launch container. You have an option to change the values by going back to the _Configuration_ screen of the container

**Hash**: This option was a tricky one for me to understand. Until, I read the [blog post](https://jimalytics.com/adobe-launch-guides/adobe-launch-rule-conditions-guide/) by Jim Gordon. This condition checks for the _hashed value_ with the (#) symbol appended

**Path and Query String**: Checks for the value included in the URL Path along with the query string parameter. In short evaluates for value included in _document.location.pathname_ + _document.location.search_ attributes

**Path without Query String**: Checks for the value included ONLY in the URL Path. In short evaluates for value included in _document.location.pathname_ attribute

**Protocol**: Evaluates based on _HTTP_ or _HTTPS_ parameters

**Query String Parameter**: Evaluates based on _document.location.search_ attribute of the page

**Subdomain**: Checks for sub-domain values. This is great help when you want Adobe Launch to trigger or ignore a Rule when a redirect happens to a subdomain of the site

That's all for different types of conditions that are available in Adobe Launch. As I said earlier, using _Conditions_ is optional. But it is good to have knowledge of how you can further restrict Adobe Launch from being triggered. We are at the end of our B2B series for Adobe Launch. In the next blog post, we will cover all about _Action_ which will culiminate this series. 

I hope these updates are helpful to you. At least for me writing down the process is clearing a lot of confusion and helping me to become a better Technical Architect. Please drop me a line at : _ritesh(at)thelearningproject(dot)in_ and let me know what you think of the blog and different topics. See you in the next update!






