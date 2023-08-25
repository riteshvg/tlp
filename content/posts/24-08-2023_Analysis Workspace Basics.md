---
title: "Back to Basics : Analysis Workspace : Part 1"
date: 2023-08-24
tags:
    main: self learning
    topic1: analysis workspace
    topic2: basics
thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20Basics%20-%20JavaScript%20Part%201.png?
author:
     display_name: Ritesh Gupta
---
As an Analytics Technical Consultant, I have always been piqued by the need to create wonderful looking, insightful dashboards using Adobe Analysis Workspace. This Back to Basics series will cover all my learning about Adobe Analysis Workspace and hopefully spur me on a different path later.

<!--more-->

Analysis Workspace is Adobe's premier data visualization and analysis engine. Analysis Workspace provides ability to visualize data and answer business questions that are critical to turn your company into an Analytics powerhouse.

#### Setting up Analysis Workspace

To get an element in DOM, you need to use the document.querySelector method. The document.querySelector method gets the first item that matches the condition. The method can be combined with multiple attributes to get the desired result:

```
//To get a class, we use the dot(.) notation and to get an ID we use the hash(#) notation

// Uses the class :
let btnClass = document.querySelctor('.services__item')
console.log(btnClass);

//Uses the ID
let btnID = document.querySelector('#services');
console.log(btnID);

// Uses the data-* attribute available
let btnDA = document.querySelector('[data-analytics = "item1"]');
console.log(btnDA);

```

{{< youtube L3NykWlR4ME >}}

#### Listening for event interactions

To listen for event interactions, we use the element.addEventListener method. The addEventListener method listens for the interaction type such as 'click' , 'hover' 'keypress' and passes a callback function to run for when the event happens. There is a bunch of event listener methods available on the MDN [link](https://developer.mozilla.org/en-US/docs/Web/Events).

For our use case, we will listen for 'clicks' on the services section of our page, and when the event occurs we fire a 'addEventListener' method. In the callback function, we will pass the 'event' object which will give us access to properties - related to the event that was clicked and other values. One of the most useful properties is the 'target' property which will get us more details of the element that triggered the event.

```
let btn = document.querySelector('#services');
btn.addEventListener('click', function(event){
   console.log(event);
   console.log(event.target);
   console.log(event.srcElement.outerText) // will return the text of the element that is clicked
});

```
{{< youtube eihoummYYFk >}}

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.