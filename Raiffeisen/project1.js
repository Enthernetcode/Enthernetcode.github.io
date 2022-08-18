const bar = document.querySelector(".nav_menu_bar");
const exit = document.querySelector(".nav_menu_exit");
const nav = document.querySelector(".mobile_nav");

bar.addEventListener("click", ()=>{
let x = nav.classList
x.toggle("toggle");
})

exit.addEventListener("click", ()=>{
let x = nav.classList
x.toggle("toggle");
})


/* ...slide..........*/
// Select all slides
const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX property to index * 100% 
slides.forEach((x, i) => {
  x.style.transform = `translateX(${i * 100}%)`;
});


// select next slide button
const nextSlide = document.querySelector(".rightArrow");

// current slide counter
let currentSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

//   move slide by -100%
  slides.forEach((x, i) => {
    x.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
});

// select prev slide button
const prevSlide = document.querySelector(".leftArrow");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (currentSlide === 0) {
    currentSlide = maxslide;
  } else {
    currentSlide--;
  }

  //   move slide by 100%
  slides.forEach((x, i) => {
    x.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
});
