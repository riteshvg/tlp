---
title: "Back to Basics : JavaScript : Part 3"
date: 2023-09-25
tags:
    main: self learning
    topic1: javascript
    topic2: basics
 
thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20basics%20%20Part%203.png
author:
     display_name: Ritesh Gupta
---
This is part 3 of the Back to Basics series covering my JavaScript learning journey. In this blog post, I will be covering using the `textContent` method and other methods. For lesson 1 and 2 in this series, be sure to check out this [link](https://www.thelearningproject.in/posts/back-to-basics-javascript-part-1/) and this [link](https://www.thelearningproject.in/posts/back-to-basics-javascript-part-2/). 

<!--more-->

In this blog post, we will be checking how to use the `innerText` and `textContent` methods. You can use this method to set or get text for an element.

#### Node.textContent

The `Node.textContent` property is used to get and set the text of element including its CSS properties. Ayn HTML elements included are automatically encoded and rendered as is. 

#### Element.innerText

The `element.innerText` method does the same task as node.textContent, but it gets and sets the `rendered text` of an element and omits the markup. It returns only rendered text, similar to what a user sees in the final page

We can get the text content of an element by accessing either the `innerText` or `textContent` property. You can append in the beginning or at the end of an element's existing content. 

```
/*
Getting the Text Content
*/

//Storing the output in a variable

let headerText = document.querySelector('.block-header');
console.log(headerText);

//Using the `innerText` or `textContent` property we can get the text content 

// `innerText` will only return the rendered message
headerText.innerText // WELCOME MESSAGE

// `textContent will return the output with trailing spaces and HTML code`
headerText.textContent //'\n         Welcome message\n       '

/*
Setting the Text Content
*/

let headerText = document.querySelector('.block-header');
console.log(headerText);

//Using the `innerText` or `textContent` property we can set the text content 

// `innerText` will only return the rendered message
headerText.innerText += ' THIS IS SPARTA! // WELCOME MESSAGE THIS IS SPARTA!

// `textContent will return the output with trailing spaces and HTML code`
headerText.textContent //'\n         Welcome message\n         This is SPARTA!'

```

###### Project Work

Now, let's apply this learning into a live project. In this project, we will track the number of characters a visitor is typing in a text area. The counter will increase/decrease based on user interaction 

Head over to the [Playground](https://www.thelearningproject.in/samples/charactercount.html) to check out the project. Don't forget to switch the debug logs. 

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.
