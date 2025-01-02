---
title: "Back to Basics : JavaScript : Part 6"
date: 2024-02-09
tags:
    main: self learning
    topic1: javascript
    topic2: basics
 
thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20basics%20%20Part%202.png
author:
     display_name: Ritesh Gupta
---
Today we will be talking about getting and setting HTML and using Template Literals. These features are mostly used for dynamically changing HTML elements and string manipulation.

<!--more-->

### Getting and Setting HTML

Getting and Setting HTML means using the `innerHTML` property of an element and manipulating it to show a different markup or text than what is already available.

When you have a requirement to dynamically replace say a `<h1>` header based on what is returned via an API, this method is the most useful. 

Let's see how to get and set HTML for an element. Let's say you have a my fav movie header and a list of movies placed below

```
<div class = "movies">
<h1>
    <div> <p> My Fav Christopher Movies are</p></div>
</h1>
<h4>
    <ul>
        <li>The Dark Knight</li>
        <li>Inception</li>
        <li>Interstellar</li>
    </ul>
</h4>
</div>

```
#### Get HTML content

You begin by referencing the `<div>` element and passing it into a variable

let movieList = document.querySelector('movies')

We then use `movieList.innerHTML` to get the entire HTML object and log it to the console. Here's how the 'movieList' value will be returned. As you can see you have the entire HTML object being returned.

```
              <h2>
                  <div> <p> My Fav Christopher Nolan movies are</p>
              </div></h2>
              <h4>
                  <ul>
                      <li>The Dark Knight</li>
                      <li>Inception</li>
                      <li>Interstellar</li>
                  </ul>
              </h4>

```

#### Set HTML content

To set HTML in an element, you user the `innerHTML` property and pass a concatenated string that you'd like to replace or append the existing content. Continuing with our example:

```
<div class = "bookList">
              <h3>
                  <div> <p> My Fav movies inspired from books are</p>
              </h3>
              <h4>
                  <ul>
                      <li>The Godfather</li>
                      <li>Fight Club</li>
                      <li>The Silence of the Lambs</li>
                  </ul>
              </h4>
            </div>
</div>
<script>

                let bookList = document.querySelector('.bookList');

                //This will replace the entire HTML object

                bookList.innerHTML = '<h3>And that is a wrap!</h3>'

                //This will append a <h3> element to the end of the list

                bookList.innerHTML += '<h3>And that is a wrap</h3>'

                //This will append a <h3> element to the beginning of the list

                bookList.innerHTML = 'And this is just the beginning' + bookList.innerHTML;

</script>


```

##### Converting Arrays to HTML using 'for...of' or 'Array.map()' functions

An important feature of working with arrays is displaying data from an array into a HTML markup. This feature is used when you are requesting data from an array of items and then updating HTML with the returned output.

This objective is achieved using the for.Each loop or the Array.map() and Array.join() function

Let's see how it is done

```
<div id = "app"></div>

let app = document.querySelector('#app')

let movies = ['the dark knight', 'the prestige', 'interstellar'];

//using the map function

app.innerHTML = movies.map(function(movie){
    return movie;
}).join('');

// using the forEach() and .join() function

let movies = ['the dark knight', 'the prestige', 'interstellar'];

```

First we access the app `div` node and the `movies` array and save them to variables. We then use the `array.prototype.map()` method to access each item inside the `movies` variable. Using the `return` function, we then acces the individual items and append it using the `div` node via the `innerHTML` property. Using the `array.prototype.join()` method, we can conctatenate the values.

Head over to the [Playground](https://www.thelearningproject.in/samples/arrayManipulation.html) to see the above example in a real life scenario!

### Using Template Literal

According to [Understanding Template Literals](https://www.digitalocean.com/community/tutorials/understanding-template-literals-in-javascript) Template literals are a new form of making strings in JavaScript. Using Template Literals, you can create multi-line strings and use placeholders to embed expressions. 

Instead of quotes, template literals start and end with backticks `(``)`. We can use variables in template literals by wrapping the name of the variable in curly brackets with a leader dollar sign. Here is an example: 

```
Syntax: (${variable name})

Example 1:

const movieName = 'interstellar'
const movieStatement = `My most fav movie is ${movieName}`

console.log(movieStatement); Output: // My fav movie is interstellar

Example 2: 

let greeting = 'Howdy! how are you?'
let message = 'How is the weather today?'

let str2  = 
`
    <h1>${greeting}</h1>
    <h3>${message}</h1>

`
console.log(str2) //  Output: <h1>Howdy! how are you?</h1><h3>How is the weather today?</h1>

```

Using template literals also gives you the flexibility to use conditionals and functions. Let's see in the example below.

```
let movieName = ['interstellar', 'inception', 'the dark knight', 'the prestige']
let showHeader = true;

let str3 = 
`
   ${showHeader ? '<h1>Awesome movies </h1>' : '' }
   ${( function () {
        if(movieName == 'interstellar') {
        return 'The movie rocks'
        }   
        return 'the movie sucks'
})()}

<ul>
    ${movieName.map(function(movie){
        return `<li> ${movie}</li>`
    }).join(' ')}
</ul>
`;

console.log(str3);

Output:
<h1>Awesome movies </h1>
   the movie sucks

<ul>
    <li> interstellar</li> <li> inception</li> <li> the dark knight</li> <li> the prestige</li>
</ul>

```


That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.
