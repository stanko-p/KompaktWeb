const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');
const navItem = document.querySelector('.nav-item');

function closeMobileMenu(){
  navLinks.classList.remove('mobile-open');
  navCta.classList.remove('mobile-open');
  if(navItem) navItem.classList.remove('open');
}

burger.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('mobile-open');
  navCta.classList.toggle('mobile-open');
  if(navItem) navItem.classList.remove('open');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    closeMobileMenu();
  });
});

const ddTrigger = document.querySelector('.dropdown-trigger');
if(ddTrigger){
  ddTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    navItem.classList.toggle('open');
  });
  document.addEventListener('click', () => navItem.classList.remove('open'));
}

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.borderBottomColor = window.scrollY > 10 ? 'rgba(0,217,163,0.25)' : 'rgba(242,239,232,0.09)';
});
