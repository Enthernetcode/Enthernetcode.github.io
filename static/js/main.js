// ─── API Config ──────────────────────────────────────────────────────────────
const API_BASE = 'https://api.enthernetservice.com';

// Navigation
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.style.borderBottomColor = window.scrollY > 40 ? 'rgba(47,47,56,0.9)' : 'var(--border)';
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const open = navLinks?.classList.contains('open');
  if (spans.length === 3) {
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = open ? '0' : '1';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  }
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks?.classList.remove('open')));

// Active section indicator
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--text)' : '';
      });
    });
  }, { threshold: 0.35 });
  sections.forEach(section => observer.observe(section));
}

// Inquiry form
const qForm = document.getElementById('inquiry-form');
const qSuccess = document.querySelector('.q-success');
qForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const button = qForm.querySelector('[type="submit"]');
  if (button) { button.disabled = true; button.textContent = 'Sending...'; }

  const data = Object.fromEntries(new FormData(qForm).entries());
  try {
    const response = await fetch(`${API_BASE}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Inquiry API returned ${response.status}`);
    qForm.style.display = 'none';
    qSuccess?.classList.add('visible');
  } catch (error) {
    console.error(error);
    if (button) { button.disabled = false; button.textContent = 'Send Inquiry'; }
  }
});

// Subtle reveal animation. Content remains visible if JS or IntersectionObserver fails.
if ('IntersectionObserver' in window) {
  const revealEls = document.querySelectorAll('.identity-card, .project-card, .spec-point');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity .35s ease, transform .35s ease';
    revealObserver.observe(el);
  });
}
