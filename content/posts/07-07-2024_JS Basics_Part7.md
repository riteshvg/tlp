---
title: "Back to Basics : JavaScript : Part 7"
date: 2024-07-07
tags:
    main: self learning
    topic1: javascript
    topic2: basics
 
thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20basics%20%20Part%207.png
author:
     display_name: Ritesh Gupta
---
Today we will be looking at how we can use localStorage to save form fields and use this feature to prefill forms or send the data to API for further processing!

<!--more-->

### Local Storage or Session Storage

Modern browsers provide storage APIs that enable browsers to save data locally and provide offline/cache mechanisms to web sites. This reduces the need to send data to server and then retrieve it back, let's say for form prefilling feature. Thus reducing the traffic load. 

There are ,primarily, three kinds of storage types available:

- localStorage
- sessionStorage
- Cookies

###### Local Storage: 
Local storage stores value in simple key-value pairs. Data is always stored in strings. The data is accessible to all pages of the domain and remains persistent even after the browser is closed.

###### Session Storage:
Session storage also stores value in simple key-value pairs, and is stored in strings. The data is accessible to all pages of the domain, but data is deleted on browser close. Data is accessible for the window/tab session only

###### Cookies
Cookies are the ubiquitious files stored by websites in the browser. Cookies send data back to server for every HTTP request thus increasing the amount of traffic between client and server.

### Accessing Local Storage

Browser storage in Chromium based browsers like Edge and Chrome, Storage module is available under the Application tab. However, in Firefox and Safari, it is located under the Storage tab.

To store data in local storage, you need to use the 'localStorage.setItem('myKey', data)' method where 'myKey' is the key under which data is available, and 'data' is the actual data you want to store. To access the data, you need to use the 'localStorage.getItem('myKey')' method. The 'myKey' is the key that you have used to store data

```
Using the localStorage API

//Declare a variable
let data = 'Data that I want to store!'

//Setting data in localStorage 
localStorage.setItem('dataKey', data);

//Get data from localStorage
let savedData = localStorage.getItem('dataKey') 
console.log(savedData); //Output: 'Data that I want to store!'

//Remove data from localStorage
localStorage.removeItem('dataKey');

Using the sessionStorage API

//Declare a variable
let data = 'Data that I want to store!'

//Setting data in localStorage 
sessionStorage.setItem('dataKey', data);

//Get data from localStorage
let savedData = sessionStorage.getItem('dataKey') 
console.log(savedData); //Output: 'Data that I want to store!'

//Remove data from localStorage
sessionStorage.removeItem('dataKey');

```

##### Using local storage API to create auto save forms

Objective: To create forms for a web app when reloaded automatically prefills the data

Head over to the [Playground](https://www.thelearningproject.in/samples/sign-up.html) to check out the project. Don't forget to switch the debug logs.

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.
