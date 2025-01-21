---
title: "Today I Learned"
date: 2025-01-05
---

Today I learned is my attempt at learning something new everyday and recording it daily for future references.

<!DOCTYPE HTML>
<html>
<head>
	<title>
	</title>
</head>
<body>
	<h5>January 5, 2025 | Project 1</h5>
	Today, I learned about basic git commands for version control and republishing website 
	<p><iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/gitCodes.html"></iframe> </p>	
	<h5>January 6, 2025 | Project 2</h5>
	Today, I learned about basic CSS and built expanding cards which is part of the 
      <a href = "https://learning.oreilly.com/course/50-projects-in/9781801079976/" target = "_window"> 50 projects in 50 days </a> tutorials on Oreily by Brad Traversy and Florin Pop. I plan to use it for creating a calendar for my daily learning schedule. Here's the <a href = "https://codepen.io/riteshvg/pen/pvzLRZq" target = "_window">Codepen</a> link.
	<p><iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/expandingCards.html"></iframe> </p>
	<h5>January 7, 2025 | Project 3</h5>
	<div>
      <div>Today, I learned that you can use variable like methods in CSS. For e.g., </div> 
	  <div>we first define a root item:</div> 
	  <p></p>
	<code>
	  :root{
    	--line-border-fill: #3498db;
    	--line-border-empty: #e0e0e0;
		}
	</code>
	<p></p>
	and then we refer it to it when we are defining attributes for individual items such as 
	<p></p>
	<code>
		.progress-container::before{
    	content: '';
    	background-color: var(--line-border-empty)};
	</code>
	<p></p>
	This means we can refer <code>line-border-fill and line-border-empty</code> in any place in the entire CSS file. This and other points led me to create a progress tracker in HTML/JS/CSS which can be used for tracking multi-step forms. Here's the <a href = "https://codepen.io/riteshvg/pen/pvzLROq" target = "_window">Codepen</a> link.
	</div>
	<p>#50projectsin50days</p> 
	<p><iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/progressTracker.html"></iframe> </p>
	<h5>January 8, 2025 | Project 4</h5>
	<div>
      <div>Today, I learned that you can create some cool animations which are not dependent on libraries like JQuery etc. You can use vanilla javascript with a mix of CSS and HTML to create effects that were previously only possible via JQuery or other such helper libraries. This and other points led me to create a search widget that opens when in focused or remains shrunk when inactive. Here's the <a href = "https://codepen.io/riteshvg/pen/GgKxrYv" target = "_window">Codepen</a> link.</div>
	  <p>#50projectsin50days</p> 
	<p><iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/searchwidget.html"></iframe> </p>
	<h5>January 9, 2025 | Project 5</h5>
	<div>
      <div>Today, I learned that we can use calc() functions in CSS. This helped me in creating a blurry loading background page.Here's the <a href = "https://codepen.io/riteshvg/pen/mybxRGw" target = "_window">Codepen </a>link.</div>
	  <p>#50projectsin50days</p> 
	<p><iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/blurryBackground.html"></iframe> </p>
	<h5>January 10, 2025 | Project 6</h5>
	<div>
      <div>Today, I learned how to implement animation in your web pages using simple CSS methods and keeping things attractive. Maybe, this example can be used for creating dates in my web app.Here's the <a href = "https://codepen.io/riteshvg/pen/qEWoRQZ" target = "_window">Codepen</a> link.</div>
	  <p>#50projectsin50days</p> 
	<p><iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/scrollAnimation.html"></iframe> </p>
	<h5>January 11, 2025 | Project 7</h5>
	<div>
      <div>Today, I learned how to use CSS to style your forms and how to dynamically add span via JavaScript in the HTML to create some dynamic effect. The result is the form below. When a user focuses on the email /password field, the label moves upwards. Here's the <a href = "https://codepen.io/riteshvg/pen/KwPoaeG" target = "_window">Codepen</a> link.</p> 
	  #50projectsin50days
	<p><iframe height = '450' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/wavyform.html"></iframe> </p>
	<h5>January 12, 2025 | Project 8</h5>
	<div>
      <div>Today, I learned how to use the Fetch API with a config variable to pass the headers. I also learnt how to use the Async/Await operator and how to display the data fetched into HTML. The API here is available for free at <a href = "https://icanhazdadjoke.com" target = '_window'>'Dad Jokes' </a>. Here's the <a href = "https://codepen.io/riteshvg/pen/QwLmrre" target = "_window">Codepen</a> link.</p> 
	  #50projectsin50days
	<p><iframe height = '420' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/fetchAPI.html"></iframe> </p>
	<h5>January 13, 2025 | Project 9</h5>
	<div>
      <div>Today, I learned how to use the Ternary operator in HTML and how it essentially simplifies the logic and makes it more terse. For e.g.
		If I need to pass an 'if...then' condition, I can write it traditionally as 
	  <code>
	  		if()
	  			then{
					//condition to pass if true
	  		}
				else {
					//condition to pass if false
			}	 
	  </code>
	  Using the `ternary` operator, we can rewrite the condition as
	  <code>${event.key === ' '? 'condition to pass if true' : 'condition to pass if false'}</code>
	  Here's the <a href = "https://codepen.io/riteshvg/pen/GgKxbWj" target = "_window">Codepen</a> link.
	  </p> 
	  #50projectsin50days
	<p>
	<iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/keyCode.html"></iframe> 
	</p>
	<h5>January 14, 2025 | Project 10</h5>
	<div>
      <div>Today, I learned how to make an FAQ box with dynamic interactivity.
	  #50projectsin50days
	<p><iframe height = '420' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/faq.html"></iframe> </p>
	<h5>January 15, 2025 | Project 11</h5>
	<div>
      <div>Today, I learned about helper functions, how to use filter() and map() functions, how to use setTimeout and setInterval methods and how to display data from form input in HTML by creating HTML tags from within JavaScript. I also learned how to create highlight and unhighlight effect - helper functions. These learnings helped in creating a random picker application which randomly selects a choice from the available choices.
	  Here's the <a href = "https://codepen.io/riteshvg/pen/xbKzxje" target = "_window">Codepen</a> link.
	  #50projectsin50days
	<p><iframe height = '250' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/randomchoicepicker.html"></iframe> </p>
	<h5>January 16, 2025 | Project 12</h5>
	<div>
      <div>Today, I learned how to create an animated counter that stops spinning once the target is reached.
	  Here's the <a href = "https://codepen.io/riteshvg/pen/gbYKzyz" target = "_window">Codepen</a> link.
	  #50projectsin50days
	<p><iframe height = '250' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/animatedCounter.html"></iframe> </p>
	<h5>January 17, 2025 | Project 13</h5>
	<div>
      <div>Today, I learned how to create a water drinking tracker that tracks how much water you drank during the day. This project taught me how to use CSS variables, manipulate the DOM, use mathematical concepts in JavaScript and more.
	  Here's the <a href = "https://codepen.io/riteshvg/pen/gbYKzyz" target = "_window">Codepen</a> link.
	  #50projectsin50days
	<p><iframe height = '650' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/waterDrinking.html"></iframe> </p>
	<h5>January 18, 2025 | Project 14</h5>
	<div>
      <div>Today, I learned how to create a movie app using the async...await operator, use destructuring, how to get data from a search field and use it as a query string for search.
	  Here's the <a href = "https://codepen.io/riteshvg/pen/jENvrey" target = "_window">Codepen</a> link.
	  #50projectsin50days
	<p><iframe height = '350' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/themovieapp.html"></iframe> </p>
	<h5>January 19, 2025 | Project 15</h5>
	<div>
      <div>Today, I learned how to create a character count application that displays the number of characters a visitor types.
	  Here's the <a href = "https://codepen.io/riteshvg/pen/LEPJOwq" target = "_window">Codepen</a> link.
	  #50projectsin50days
	<p><iframe height = '350' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/characterCountN.html"></iframe> </p>
	<h5>January 20, 2025 | Project 16</h5>
	<div>
      <div>Today, I learned how to create a character and word count application that displays the number of characters and words a visitor types.
	  Here's the <a href = "https://codepen.io/riteshvg/pen/ZYzMvzv" target = "_window">Codepen</a> link.
	  #50projectsin50days
	<p><iframe height = '350' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/characterCountN1.html"></iframe> </p>
	<h5>January 21, 2025 | Project 17</h5>
	<div>
      <div>Today, I learned how to store and retrieve data in a form using the localStorage method. I learned how to create just in time status messages.
	  Here's the <a href = "https://codepen.io/riteshvg/pen/bNbxjxV" target = "_window">Codepen</a> link.
	  #50projectsin50days
	<p><iframe height = '350' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/formObject.html"></iframe> </p>
	</body>
</html>


