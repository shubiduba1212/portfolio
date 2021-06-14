'use strict';

// Make navbar colored when the window is scrolled
const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  console.log(window.scrollY);
  console.log(navBarHeight);
  if(window.scrollY > navBarHeight) {
    navBar.classList.add('navbar--darker');
  } else {
    navBar.classList.remove('navbar--darker');
  }
});