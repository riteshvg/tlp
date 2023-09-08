---
title: "Back to Basics : JavaScript : Part 2"
date: 2023-09-04
tags:
    main: self learning
    topic1: javascript
    topic2: basics
thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20Basics%20-%20JavaScript%20Part%201.png?
author:
     display_name: Ritesh Gupta
---
This is part 2 of the Back to Basics series covering my JavaScript learning journey. In this blog post, I will be covering how to check if an element matches a selector, working with multiple elements, data attributes and getting as well setting text in an element. These lessons are very well explained in the [Vanilla JS Academy](https://vanillajsacademy.com/) by Chris Ferdinandi. 

<!--more-->

The first part of the JavaScript learning series covered how to check for elements in DOM. We saw how to use the `document.querySelector` and `document.querySelectorAll` method to grab DOM elements and how to use `eventListener` method to attach events to the elements. In this blog post, we will be checking for `element.matches` method 

#### Check if an Element matches a selector

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)the `element.matches` determines whether the element will be selected by the specified CSS selector or not. 

To use the method, we query the element using the `document.querySelector` method. Then on the resulting variable, you will apply the `element.matches` method in a `if...else` condition. And in the condition, apply alternate paths based on the result

```
let btn = document.querySelector('.col-sm-3');
if btn.matches('.col-sm-3') {
  console.log('found a match!')
} else {
  console.log('found no match!')
}

//the console statement will return 'found a match' as the condition is satisified. 
// But, if we change the parameter, the console.log() statement will throw 
// the 'found no match' as the condition will be unsatisifed.

```

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/element_matches.png?updatedAt=1694066009595">}}

#### Listening for an event on multiple elements

The `EventTarget.addEventListener` method can only be attached to one individual element. But if you need to attach and listen for clicks on multiple elements, you are out of luck. To achieve click tracking you can use one of the below methods:

- using a for...of loop
- using the event delegation method

###### using the for...of loop

To achieve tracking of clicks on multiple elements, you can use the `for...of` loop. But Chris warns against using this method as it can cause performance issues having to force browser to loop through individual elements and attach event listeners to each element.

```

let btns = document.querySelectorAll('.services__item');
for (let btn of btns){
  btn.addEventListener('click', function(event){
    console.log(event);
    console.log(event.target);
  });
}

```

###### using event delegation 

According to (scaler.com)[https://www.scaler.com/topics/event-delegation-in-javascript/], event delegation is a pattern for efficiently handling events. Events can be added to parent element instead of adding to every single element. Because of the event bubbling phenomenon every time someone clicks on any element, the action bubbles up to its parent until it reaches the document element.

This means we attach the `eventListener` method to the document object. Browser will listen for clicks on any element inside the document node. When a click occurs, it will bubble up the action to the parent until it reaches the document node. We can then use a callback function to listen for specific conditions using `event.target.matches` method. Here is how it works:

We attach the event listener to the document node. In the call back function, we use CSS selector to check if the clicked element's CSS matches the condition and if it does then fire the method

```
document.addEventListener('click', function (event){
  if(event.target.matches('.services__item')){
    console.log('event triggered');
    console.log(event);
  } else {
    console.log('event not found!');
  }
});

```

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.
