const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');
burger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navCta.style.display = open ? 'none' : 'inline-flex';
  if(!open){
    navLinks.style.cssText = 'display:flex; position:fixed; top:64px; left:0; right:0; background:#10141c; flex-direction:column; padding:24px 32px; gap:20px; border-bottom:1px solid rgba(242,239,232,0.09); align-items:flex-start;';
    navCta.style.cssText = 'display:inline-flex; margin:0 32px 20px; justify-content:center;';
  }
});

document.querySelectorAll('.nav-links > li > a').forEach(a => {
  a.addEventListener('click', () => {
    if(window.innerWidth <= 720){
      navLinks.style.display = 'none';
      navCta.style.display = 'none';
    }
  });
});

const navItem = document.querySelector('.nav-item');
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
