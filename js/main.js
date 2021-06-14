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


// Handle scrolling  when the navbar menu is clicked
const navBarMenu = document.querySelector('.navbar__menu');
navBarMenu.addEventListener('click', (event) => {  
  const target = event.target;
  const link = target.dataset.link;
  if(link == null) {
    return;
  }
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({behavior: 'smooth'});
})

