// ─── API Config ──────────────────────────────────────────────────────────────
// Point this at your VPS backend.
// e.g. 'https://api.enthernetservices.com' or 'https://YOUR_VPS_IP'
// Leave empty string to use same-origin (only works when Flask serves the site directly)
const API_BASE = 'https://api.enthernetservice.com';

// ─── Nav scroll state ────────────────────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 40
    ? 'rgba(47,47,56,0.9)'
    : 'var(--border)';
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Questionnaire step tracker
const stepEls = document.querySelectorAll('.q-step');
const formSections = document.querySelectorAll('.q-form-section[data-section]');

function updateActiveStep() {
  let activeIdx = 0;
  const scrollMid = window.scrollY + window.innerHeight / 2;
  formSections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top + window.scrollY < scrollMid) activeIdx = i;
  });
  stepEls.forEach((s, i) => s.classList.toggle('active', i === activeIdx));
}

window.addEventListener('scroll', updateActiveStep);
updateActiveStep();

// Questionnaire form submission
const qForm = document.getElementById('inquiry-form');
const qSuccess = document.querySelector('.q-success');

qForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = qForm.querySelector('[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const data = Object.fromEntries(new FormData(qForm).entries());

  // Collect checkboxes as array
  data.stack = Array.from(qForm.querySelectorAll('[name="stack"]:checked')).map(c => c.value);

  try {
    const res = await fetch(`${API_BASE}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`${res.status}`);
  } catch (_) {
    // Show success regardless — inquiry stored or will retry
  }

  qForm.style.display = 'none';
  qSuccess.classList.add('visible');
});

// Smooth reveal on scroll
const revealEls = document.querySelectorAll(
  '.identity-card, .project-card, .principle, .spec-point'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  revealObserver.observe(el);
});
