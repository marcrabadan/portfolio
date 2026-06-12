// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link tracking
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const updateActiveNav = () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 90) {
      current = section.id;
    }
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// Hero typewriter
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const phrases = [
    'Distributed Systems',
    'Event-Driven Platforms',
    'Kubernetes at Scale',
    'Real-Time Analytics',
    'Platform Engineering',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  const type = () => {
    const phrase = phrases[phraseIdx];
    charIdx += deleting ? -1 : 1;
    typewriterEl.textContent = phrase.slice(0, charIdx);

    let delay = deleting ? 40 : 75;
    if (!deleting && charIdx === phrase.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 350;
    }
    setTimeout(type, delay);
  };

  type();
}

// Fade-in on scroll via IntersectionObserver
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);

const animatedEls = document.querySelectorAll(
  '.skill-group, .arch-card, .timeline-item, .project-card, .contact-card, .about-grid'
);

animatedEls.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  observer.observe(el);
});
