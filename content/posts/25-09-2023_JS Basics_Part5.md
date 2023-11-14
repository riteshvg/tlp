---
title: "Back to Basics : JavaScript : Part 5"
date: 2023-11-13
tags:
    main: self learning
    topic1: javascript
    topic2: basics
 
thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20basics%20%20Part%205.png?
author:
     display_name: Ritesh Gupta
---
This is part 5 of the Back to Basics series covering my JavaScript learning journey. In this blog post, I will be covering and explaining the concept of `Promises`, do a live project on how to fetch data from an API using `standard` and `async/await` operators as well as cover different `array` modification methods such as `array.shift()`, `array.pop()`, `array.slice()` etc.

<!--more-->

I adopted a different method to write this blog post. I first wrote the entire blog post as a JS file replete with code snippets and then just copied over the same to this MD file. Hopefully, this will help me cover lot of ground. 

### Promise. What is a Promise?

A promise is a proxy for a value not necessarily known when the promise is created. Certain situations like calling an API before taking further action on the result
  is a promise. We don't know if the promise will be completed, meaning the API will return a value or stay incompleted, meaning the API will not return a value.
  In the world of Promises, the 'completed' state is called 'fulfilled'  and the 'incompleted' state is called 'rejected'. But there is another state before 
  that which is when the action is being executed. This is called 'pending' state which means the action is neither completed nor rejected.
  
  When the action is either completed (fulfilled) or incompleted (rejected), the promise is said to be settled. 
  
  Again according to MDN, once the promise is settled - means if the state is either returned or rejected, we have three methods .then(), .catch() and .finally()
  to associate further action. These methods too return promises, and therefore they can be chained or clubbed together.

A promise object has the following internal properties

 state - A property can have pending, fufilled or rejected values
 pending - when the executor starts the function
 fufilled - when the promise is resolved
 rejected - when the promise is rejected
  
 result - a property can have the following values
 undefined -  When the state value is pending
 value - When the resolve(value) method is called
 error - When the reject(error) method is called
 

A promise's state can be pending, fulfilled or rejected. A promise that is either resolved or rejected is called settled

##### Let's try out!
  Let's try to create a Promise. We create Promises in JavaScript by using the 'new Promise' constructor object. 
  
  ```
  let myFirstPromise = new Promise(function(reject, resolve){
   // Code or function to run
  })

  ```
  
  In the above line of code, we create a Promise variable 'myFristPromise' by using the 'new Promise' constructor. When you create a Promise, you pass
  in a callback function as an argument. Inside the callback function, we define two parameters: resolve and reject. When the Promise is completed, we 
  run the resolve() method. 
  
  Let's try to expand on our myFirstPromise variable by adding in a function that will executed when the Promise is resolved.
  
  ```
  let myFirstPromise = new Promise(function(reject, resolve){
   setTimeout(function(){
       resolve('Hello! I am done!)
   }, 5000);
  });
  
  ```
  
  In the above snippet, we create a Promise using the 'new Promise' constructor and attach it to the variable called 'myFirstPromise'. In the callback function, 
  we have two parameters 'resolve' and 'reject'. In the next line, we use the 'setTimeout()' function to mimic an async function. We set a timer for 5 seconds
  in which the function will run. Once the Promise is completed, we run the resolve() method, and then pass in arguments that can be passed into the Promise.then() 
  method.
  
  Let's expand further

  ```
  let myFirstPromise = new Promise(function(reject, resolve){
   setTimeout(function(){
   resolve('Hello! I am done!')
  }, 5000);
  });
  
  myFirstPromise.then(function(msg){
   console.log(msg);
  });
  
  ```
    
  But what happens if the Promise fails. We then use the reject() method to capture the error and pass it into the '.catch()' method. Let's modify our snippet to understand it further.

  ```
  let myFirstPromise = new Promise(function(resolve, reject){
        reject("Unable to resolve!");
  
       setTimeout(function(){
            resolve("Hello! I am done!")
   },5000);
  });
  
  myFirstPromise.then(function(msg){
  console.log(msg);
  }).catch(function(error){
   console.warn(error);
  });
  
  ```
    
  It is very important to note that in both cases, whether the Promise is 'resolved' or 'rejected', we see that the 'PromiseState' is set to 'fulfilled'
  which means the Promise is now settled.
  
  Let's try to encapsulate all the learning in a simple example. I try to console.log my fav movie based on the time elapsed. Copy the below code and use it in the Console tab to see the details. 

  ```

  let myFavMovie = new Promise(function(resolve, reject){
     setTimeout(function(){
           resolve('My fav movie is The Prestige')
    }, 5000);
     
    setTimeout(function(){
           reject('No, my fav movie is The Dark Knight!')
   },2000);  
  });
  
   myFavMovie.then(function(favMovie){
       console.log(favMovie);
   }).catch(function(favMovies){
       console.log(favMovies);
   });
  
  ```
  
Let's use the knowledge in a live project. 

We learn how to create a Promise and fetch results from an API. Accessing external API is best done using the Promise method. This
is because we are not sure when will the API return back the results. We also need to consider the aspect of the API rejecting our request, plus network result. Combining all these requests is best done using the fetch() method. The fetch() method takes a url as a parameter. The URL is typically an API endpoint. There are various APIs available for testing. One such is the jsonplaceholder API.
  
On accessing the endpoint, the API returns a response. We store the response as a parameter in an anonymous callback function. The response is returned as a readable stream. This response is not of any value. 
  
```

fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
	// The API call was successful!
	console.log(response);
}).catch(function (error) {
	// There was an error
	console.warn(error);
});

//Returns a readable stream!
//Promise {pending}
//Response {type: 'cors', url:'https://jsonplaceholder.typicode.com/posts', 
//redirected: false, status: 200, ok: true, ...}

```
The above snippet returns a readable stream which is not of any use to use. To make the response readable, we attach a then() method that reads the response and stores it in a variable called data. The data object is returned either as a JSON response or as text.

```
fetch('https://jsonplaceholder.typicode.com/posts')
.then(function(response){
    //The API call was successful
    return response.json()
    console.log(response);
}).then(function(data){
    //This is the JSON from our response
    console.log(data);
});

//Returns a JSON response!
//Promise {pending}
//(100) [{}...{}]

```
 
The above snippet returns back a JSON response which can be used to extract the attribute we need.

##### Error Handling

One of the crucial aspects of using a promise method is to bake in error handling methods. When you try to hit an API Endpoint, there are chances that you might get an error response. Maybe the URL is incorrect or the endpoint is failing. Whatever the reason may be, you need to handle the errors. Fortunately, in the Fetch API there is a catch() method. The catch() method is responsible for catching any errors that the API returns. 

We again use an anonymous callback function and pass the error retrieved by the catch method into a variable.

```
fetch('https://jsonplaceholder.typicode.com/post') //Removed 'posts' as the endpoint
.then(function(response){
    //The API call was successful
    return response.json()
    console.log(response);
}).then(function(data){
    //This is the JSON from our response
    console.log(data);
}).catch(function(error){
    console.warn(error);
});

//Promise {<pending>}
// GET 'https://jsonplaceholder.typicode.com/post' 404 (not found)
// {}

```
 I have created a page that combines the above methods and fetches response from 'The Stoic API', as well as 'The BhagavadGita API'. My next project will be to use the HAPI API to create a library of books. Head over to the [Playground](https://www.thelearningproject.in/samples/promises.html) to check for more details.

 ### Array Methods

 We will now see how to use different methods available in an Array to push a new item, check if an Array includes an item and get the first and last item in an Array.
 
 ##### Array.prototype.push()

 The array.push() method is used to add items to an existing array. We define an array with the number of items and then use the array.push() method to add new items to the end of the array

 ```
 let favMovies = ['interstellar', 'the dark knight', 'the prestige'];
 console.log(favMovies); //(3)['interstellar', the dark knight', 'the prestige']
 favMovies.push('oppenheimer','memento');
 console.log(favMovies); //(5) ['interstellar', 'the dark knight' , 
 'the prestige', 'oppenheimer', 'memento'] 
 ```

##### Array.prototype.slice()

The array.slice() method is used to a copy a segment/part of an array into a new array. This method creates a copy of the array into a new array

```
let favMovies = ['the dark knight', 'interstellar']
let newFavMovies = favMovies.slice();
console.log(newFavMovies); //(2)['the dark knight', 'interstellar'];

```

##### Array.prototype.shift()

The array.shift() method is used to remove the first item from an array and returns it. The original array is modified

```
let favMovies = ['the dark knight', 'the prestige', 'interstellar'];
console.log(favMovies); //(3)['the dark knight', 'the prestige', 'interstellar'];
let shift = favMovies.shift();
console.log(shift); // (1)['the dark knight'];
console.log(favMovies); // (2)['the prestige', 'interstellar'];

```

##### Array.prototype.pop()

The array.pop() method is used to remove the last item from an array and return the array. The original array is modified

```
let favMovies = ['the dark knight', 'the prestige', 'interstellar'];
console.log(favMovies); //(3)['the dark knight', 'the prestige', 'interstellar'];
let pop = favMovies.pop();
console.log(pop); //(1)['interstellar']
console.log(favMovies); //(2)['the dark knight', 'the prestige']

```

###### Array.prototype.includes()

The array.includes() method checks if an array includes an aitem. It returns true if the array contains the item, else false if not

```
let favMovies = ['the dark knight', 'the prestige', 'interstellar'];
console.log(favMovies); //(3)['the dark knight', 'the prestige', 'interstellar'];

let myFavMovie = favMovies.includes('interstellar')
console.log(myFavMovie); // true;

let myNotSoFavMovie = favMovies.includes('the star wars');
console.log(myNotSoFavMovie); //false;

```

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.
