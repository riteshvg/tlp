---
title: "Today I Learned"
date: 2025-01-05
---

Today I learned is my attempt at learning something new everyday and recording it daily for future references.

<!DOCTYPE HTML>
<html>
	<body>
	<h3>January 2025</h3>
    <h5>January 5, 2025</h5>
      <div>Today, I learned about essential git commands </div>
	<p><iframe height = '280' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/gitcodes.html"></iframe> </p>
	<h5>January 6, 2025</h5>
      <div>Today, I learned about basic CSS and built expanding cards which is part of the <a href = "https://learning.oreilly.com/course/50-projects-in/9781801079976/"> 50 projects in 50 days </a> tutorials on Oreily by Brad Traversy and Florin Pop. I plan to use it for creating a calendar for my daily learning schedule.</div>
	<p><iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/expandingCards.html"></iframe> </p>
	<h5>January 7, 2025</h5>
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
	This means we can refer <code>line-border-fill and line-border-empty</code> in any place in the entire CSS file. This and other points led me to create a progress tracker in HTML/JS/CSS which can be used for tracking multi-step forms.
	</div>
	<p><iframe height = '150' style = 'width: 100%' scrolling = 'yes' frameborder = 'no' allowtransparency = 'true' allowfullscreen = 'true' src = "/progressTracker.html"></iframe> </p>
	</body>
</html>


