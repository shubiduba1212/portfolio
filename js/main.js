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

//Projects Sorting 
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) => {
  const sort = event.target.dataset.sort || event.target.parentNode.dataset.sort;
  console.log(sort);
  if(sort == null) {
    return;
  }   
  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if(sort === '*' || sort === project.dataset.category) {
        project.classList.remove('inactive');
      } else {
        project.classList.add('inactive');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300)
});


function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}

