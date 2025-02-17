//Add a div to contain the text above the buttons
const textContainer = document.createElement('div');
textContainer.classList.add('click-info');

//Insert the div before the first button
document
  .querySelector('.ripple')
  .parentNode.insertBefore(textContainer, document.querySelector('.ripple'));

const buttons = document.querySelectorAll('.ripple');
let inactivityTimer;

buttons.forEach((button, index) => {
  button.addEventListener('click', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    //Clear any existing timer
    clearTimeout(inactivityTimer);

    textContainer.innerHTML = `Button ${
      index + 1
    } clicked at coordinates: X: ${xInside} and Y: ${yInside}`;

    //set new timer to clear text after 1 minute
    inactivityTimer = setTimeout(() => {
      textContainer.innerHTML = '';
    }, 10000);

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
});

/***
 * In this project, I learned how to
 * - make an element scale and disappear completely after it appears with CSS's transform and animation property
 * - remove elements from DOM after animation is complete to prevent performance degradation from excessive DOM elements
 * - to add properties to elements dynamically using the appendChild() method
 * - when using the 'this' keyword, we need to use traditional functions
 * - creating a new span element on click to show the ripple effect
 * - determine the position where a mouse click happens on x and y axis
 * - allow dynamic positioning inside the butotn based on click coordinates
 * - how to use index parameter to track button numbers
 * - create a div element and add it before anoter node using the parentNode property
 */
