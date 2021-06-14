'use strict';

// Make navbar colored when the window is scrolled
const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navBarHeight) {
    navBar.classList.add('navbar--darker');
  } else {
    navBar.classList.remove('navbar--darker');
  }
});


// Handle scrolling when the navbar menu is clicked
const navBarMenu = document.querySelector('.navbar__menu');
navBarMenu.addEventListener('click', (event) => {  
  const target = event.target;
  const link = target.dataset.link;
  if(link == null) {
    return;
  }
  scrollIntoView(link);
});


// when Home Contact Button is clicked
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
  scrollIntoView('#contact');
});


// section Home faded by scrolling
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// show Top button when scrolling down
const topBtn = document.querySelector('.top__button');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }
});

// Top button clicked then scrolled to home
topBtn.addEventListener('click', () => {
  scrollIntoView('#home');
})


function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}




