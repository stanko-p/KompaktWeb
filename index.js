// mobile menu toggle
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');
burger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navCta.style.display = open ? 'none' : 'inline-flex';
  if(!open){
    navLinks.style.cssText = 'display:flex; position:fixed; top:64px; left:0; right:0; background:#10141c; flex-direction:column; padding:24px 32px; gap:20px; border-bottom:1px solid rgba(242,239,232,0.09);';
    navCta.style.cssText = 'display:inline-flex; margin:0 32px 20px; justify-content:center;';
  }
});

// usluge dropdown: click toggle (touch-friendly), closes on outside click
const navItem = document.querySelector('.nav-item');
const ddTrigger = document.querySelector('.dropdown-trigger');
if(ddTrigger){
  ddTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    navItem.classList.toggle('open');
  });
  document.addEventListener('click', () => navItem.classList.remove('open'));
}

// close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    if(window.innerWidth <= 720){
      navLinks.style.display = 'none';
      navCta.style.display = 'none';
    }
  });
});

// pre-select package from pricing card CTA
document.querySelectorAll('[data-plan]').forEach(btn => {
  btn.addEventListener('click', () => {
    const select = document.getElementById('package');
    const plan = btn.getAttribute('data-plan');
    for(const opt of select.options){
      if(opt.value === plan){ select.value = plan; break; }
    }
  });
});

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// header shadow on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.borderBottomColor = window.scrollY > 10 ? 'rgba(0,217,163,0.25)' : 'rgba(242,239,232,0.09)';
});

// contact form (Netlify Forms submit)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  })
    .then(() => {
      note.textContent = 'Hvala! Vaš upit je poslat — javljamo se u roku od 24h.';
      form.reset();
      document.getElementById('package').value = 'Standard (Do 5 stranica)';
      setTimeout(() => { note.textContent = ''; }, 6000);
    })
    .catch(() => {
      note.textContent = 'Došlo je do greške. Pokušajte ponovo ili nam pišite direktno na email.';
      setTimeout(() => { note.textContent = ''; }, 6000);
    });
});