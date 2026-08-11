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

// ===== Active nav link on scroll + sliding indicator =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navLinksContainer = document.querySelector('.nav-links');
let navIndicator = null;
if (navLinksContainer) {
  navIndicator = document.createElement('div');
  navIndicator.className = 'nav-indicator';
  navLinksContainer.appendChild(navIndicator);
}

function moveNavIndicator(link) {
  if (!navIndicator) return;
  if (!link) { navIndicator.classList.remove('active'); return; }
  const containerRect = navLinksContainer.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  navIndicator.style.left = (linkRect.left - containerRect.left) + 'px';
  navIndicator.style.width = linkRect.width + 'px';
  navIndicator.classList.add('active');
}

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  let activeLink = null;
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
    if (isActive) activeLink = link;
  });
  moveNavIndicator(activeLink);
}
window.addEventListener('scroll', setActiveLink);
window.addEventListener('resize', setActiveLink);
setActiveLink();

// ===== Navbar shadow on scroll =====
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 8px 24px rgba(0,0,0,0.4)' : 'none';
});

// ===== Reveal on scroll =====
// Re-runnable: content-loader.js rebuilds several sections after live/admin
// content loads, so this is called again on "content-rendered" to catch the
// freshly-created cards (see bottom of file).
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initRevealTargets() {
  const targets = document.querySelectorAll(
    '.feature-card, .exp-card, .skill-card, .project-card, .cert-card, .social-card, .analytics-card, .research-card, .edu-card, .about-text, .photo-frame, .section-title, .testimonial-card'
  );
  targets.forEach(el => {
    if (el.classList.contains('reveal')) return; // already wired (persisted node)
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}
initRevealTargets();

// ===== Magnetic 3D tilt on cards =====
const tiltCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initTiltCards() {
  if (!tiltCapable) return;
  const cards = document.querySelectorAll(
    '.project-card, .cert-card, .skill-card, .feature-card, .social-card, .analytics-card, .testimonial-card, .exp-card, .edu-card, .research-card'
  );
  cards.forEach(card => {
    if (card.dataset.tiltReady) return;
    card.dataset.tiltReady = '1';
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.width / 2, cy = rect.height / 2;
      const rotateY = ((e.clientX - rect.left - cx) / cx) * 6;
      const rotateX = -((e.clientY - rect.top - cy) / cy) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.015)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
initTiltCards();

// ===== Magnetic pull on buttons (CTAs lean toward the cursor as it nears) =====
if (tiltCapable) {
  const magneticButtons = document.querySelectorAll('.btn');
  const magRadius = 70;
  let magX = 0, magY = 0, magTicking = false;
  window.addEventListener('mousemove', (e) => {
    magX = e.clientX; magY = e.clientY;
    if (magTicking) return;
    magTicking = true;
    requestAnimationFrame(() => {
      magneticButtons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
        const dx = magX - cx, dy = magY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < magRadius) {
          const pull = (1 - dist / magRadius) * 10;
          btn.style.transform = `translate(${dist ? (dx / dist) * pull : 0}px, ${dist ? (dy / dist) * pull : 0}px)`;
        } else if (btn.style.transform) {
          btn.style.transform = '';
        }
      });
      magTicking = false;
    });
  });
}

// ===== Subtle parallax on background glows =====
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const glow1 = document.querySelector('.bg-glow-1');
  const glow2 = document.querySelector('.bg-glow-2');
  let parallaxTicking = false;
  window.addEventListener('scroll', () => {
    if (parallaxTicking) return;
    parallaxTicking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (glow1) glow1.style.transform = `translateY(${y * 0.08}px)`;
      if (glow2) glow2.style.transform = `translateY(${-y * 0.05}px)`;
      parallaxTicking = false;
    });
  });
}

// Re-run reveal + tilt setup whenever content-loader.js swaps in live/admin
// content, so admin-edited sections get the same animations as the defaults.
window.addEventListener('content-rendered', () => {
  initRevealTargets();
  initTiltCards();
});
// feedback.js calls this after it renders/re-renders testimonial cards.
window.initTiltCards = initTiltCards;
window.initRevealTargets = initRevealTargets;

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
