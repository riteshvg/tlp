---
title: "Back to Basics : JavaScript : Part 4"
date: 2023-10-07
tags:
    main: self learning
    topic1: javascript
    topic2: basics
 
thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20basics%20%20Part%204.png?
author:
     display_name: Ritesh Gupta
---
This is part 4 of the Back to Basics series covering my JavaScript learning journey. In this blog post, I will be covering how Chris talked about converting a `string` into an `array`, `filtering an array` and more.

<!--more-->

#### Using Split method and converting a string into an array

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), the `split` method of string takes a pattern and divides the string into an ordered list of substrings. 

```
    let str = 'the best things in life are rarely free'

    let words = str.split(' '); // "the" "best" "things" "in" "life" "are" "rarely" "free"

    let hyperWords = str.split(' ', 2) // "the" "best"

```

You can also convert the `string` into an `array` just by passing the variable into split method

```
 let str = 'the best things in life are rarely free'

 let strArray = str.split(); //[the best things in life are rarely free]
 
```
#### Array.filter() method

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), the `filter()` method of Array creates a shallow copy of a portion of a given array with just the elements from the given array matching the condition. 

What this means is using the `array.filter()` method creates a new copy of the original array, but only with the values that match the condition. Here's how to use the `filter()` method

I am a huge fan of Christopher Nolan, and have watched all his movies right from Prestige to Oppenheimer. But the movie that really piqued my fandom for him is and will always be 'The Dark Knight'. I want to single out this movie from the array of movies. 

```
let moviesDirected = ['the dark knight', 'the prestige', 'inception', 'interstellar'];

let myAllTimeFavMovie = moviesDirected.filter(function(movie){
    
    if (movie.includes("dark"))
        console.log('your fav movie is: ' + movie)
})

```

Tip: If you copy the above code and execute it in the console, you will get the output. I have also tried adding a codepen below.

The `array.filter()` method takes creates a new array with the only elements that pass a test you include as a callback function. The callback accepts three arguments: the current item in the loop's value, its index, and the array itself.

#### Project : Counting Words and Character

This project is in addition to what was covered in the previous blog post. We found a way of tracking number of characters. In addition, we will cover on how to track the number of words. Head over to [Playground](https://www.thelearningproject.in/samples/charactercount.html) to check the addition.

That is all for this blog post. Leave me a line on ritesh@thelearningproject.in to share some JavaScript basics that you might be interested in sharing.
