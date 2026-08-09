// ===== Typed role rotator =====
// Reads live from window.DEFAULT_CONTENT.hero.roles (content-schema.js), which
// content-loader.js mutates in place after fetching admin-customized data —
// so edits made in the admin panel show up here without a code change.
const roles = (window.DEFAULT_CONTENT && window.DEFAULT_CONTENT.hero.roles) || ["SmartComm Developer"];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIndex % roles.length];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ===== Mobile nav toggle =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
navToggle?.addEventListener('click', () => navbar.classList.toggle('open'));

document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('open'));
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink);

// ===== Navbar shadow on scroll =====
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 8px 24px rgba(0,0,0,0.4)' : 'none';
});

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll(
  '.feature-card, .exp-card, .skill-card, .project-card, .cert-card, .social-card, .research-card, .edu-card, .about-text, .photo-frame'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

// ===== Custom animated cursor =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (cursorDot && cursorRing && isFinePointer) {
  document.body.classList.add('cursor-ready');

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = 'a, button, input, textarea, .btn, .nav-link, .tag, .social-card, .project-card, .cert-card, .feature-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) cursorRing.classList.add('hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) cursorRing.classList.remove('hovering');
  });
  document.addEventListener('mousedown', () => {
    cursorDot.classList.add('clicking');
    cursorRing.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    cursorDot.classList.remove('clicking');
    cursorRing.classList.remove('clicking');
  });
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
}

// ===== Contact form -> mailto =====
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const email = data.get('email');
  const subject = data.get('subject');
  const message = data.get('message');
  const body = `From: ${name} (${email})\n\n${message}`;
  const mailto = `mailto:manideepyadav380@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});
