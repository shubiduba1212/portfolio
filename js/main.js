'use strict';

// Make navbar colored when the window is scrolled
const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;
const navBarToggleBtn = document.querySelector('.navbar__toggle-btn');
document.addEventListener('scroll', () => {
  if(window.scrollY > navBarHeight) {
    navBar.classList.add('navbar--darker');
    navBarToggleBtn.style.top = `15px`;
  } else {
    navBar.classList.remove('navbar--darker');
    navBarToggleBtn.style.top = `23px`;
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
  navBarMenu.classList.remove('open');  
  scrollIntoView(link);
  selectNavItem(target);
});

// Navbar toggle button
navBarToggleBtn.addEventListener('click', () => {
  navBarMenu.classList.toggle('open');
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

// Projects Sorting 
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) => {
  const sort = event.target.dataset.sort || event.target.parentNode.dataset.sort;
  if(sort == null) {
    return;
  }   

  // work category button
  const active = document.querySelector('.category__btn.active');
  const target = event.target.nodeName === 'BUTTON'? event.target : event.target.parentNode;
  active.classList.remove('active');  
  if(sort == '*') {
    const allActive = document.querySelector('.category__btn.all');
    allActive.classList.remove('active'); 
    allActive.classList.add('active');
  } else {  
  target.classList.add('active');
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

// 1. 모든 섹션 요소들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = ['#home', '#about', '#skills', '#work', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
let selectedNavIndex = 0; 
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3,};
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);      
      // 스크롤링이 아래로 되어서 페이지가 올라올 때
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }         
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});




// pop-up
const popUp = document.querySelector('.pop__up');
const popImg = document.querySelector('.pop__img');
projectContainer.addEventListener('click', (event) => { 
  popImg.className = 'pop__img';
  const img = event.target.nodeName === 'DIV' ? event.target.dataset.image : event.target.parentNode.dataset.image;     
  const className = event.target.className;
  const nodeName = event.target.nodeName;
  if(className == 'project__description design' || nodeName == 'SPAN' || nodeName == 'H3' ) {    
    popUp.classList.add('active');
    popImg.setAttribute('style', `background-image: url('/img/${img}.png')`);    
    popImg.classList.add(img);        
  } else {
    popUp.classList.remove('active');
  }
});


