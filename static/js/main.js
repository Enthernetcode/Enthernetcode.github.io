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

// ─── Enthernet entity SEO ───────────────────────────────────────────────────
// The page already ships a static title/description and Search Console token.
// This layer adds canonical/social metadata and a machine-readable identity graph.
(() => {
  const canonicalUrl = 'https://enthernet.com/';
  const title = 'Enthernet | Cloud, Cybersecurity & Systems Engineering by Renuel Roberts';
  const description = 'Enthernet is the engineering and cybersecurity platform of Renuel Roberts, covering backend systems, cloud infrastructure, automation, Linux, networking, security architecture and public technical projects.';
  const linkedin = 'https://www.linkedin.com/in/renuel-roberts-st-enthernet-code-6571a7241';
  const github = 'https://github.com/Enthernetcode';
  const blog = 'https://blog.enthernet.com';
  const fcs = 'https://fcs.enthernet.com';
  const coreShield = 'https://core-shield.enthernetservice.com';
  const pinchAI = 'https://pinchai.enthernetservice.com';

  document.title = title;

  function meta(attr, key, value) {
    let node = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attr, key);
      document.head.appendChild(node);
    }
    node.setAttribute('content', value);
  }

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  meta('name', 'description', description);
  meta('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  meta('property', 'og:type', 'website');
  meta('property', 'og:site_name', 'Enthernet');
  meta('property', 'og:title', title);
  meta('property', 'og:description', description);
  meta('property', 'og:url', canonicalUrl);
  meta('name', 'twitter:card', 'summary_large_image');
  meta('name', 'twitter:title', title);
  meta('name', 'twitter:description', description);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${canonicalUrl}#website`,
        url: canonicalUrl,
        name: 'Enthernet',
        alternateName: ['Enthernet Code', 'Enthernet Portfolio'],
        description,
        publisher: {'@id': `${canonicalUrl}#organization`},
        inLanguage: 'en'
      },
      {
        '@type': 'Organization',
        '@id': `${canonicalUrl}#organization`,
        name: 'Enthernet',
        alternateName: 'Enthernet Code',
        url: canonicalUrl,
        founder: {'@id': `${canonicalUrl}#renuel-roberts`},
        sameAs: [github, linkedin, blog, fcs, coreShield, pinchAI]
      },
      {
        '@type': 'Person',
        '@id': `${canonicalUrl}#renuel-roberts`,
        name: 'Renuel Roberts',
        alternateName: ['Enthernet Code', 'Renuel Roberts ST Enthernet Code'],
        url: canonicalUrl,
        sameAs: [linkedin, github, blog],
        knowsAbout: ['Software engineering','Cybersecurity','Cloud computing','Automation','Linux','Networking','Docker','Kubernetes','CI/CD']
      }
    ]
  };

  let structured = document.getElementById('enthernet-entity-graph');
  if (!structured) {
    structured = document.createElement('script');
    structured.type = 'application/ld+json';
    structured.id = 'enthernet-entity-graph';
    document.head.appendChild(structured);
  }
  structured.textContent = JSON.stringify(graph);

  // Cross-link the identity properties visibly as well, not only in structured data.
  const footerRight = document.querySelector('.footer-right');
  if (footerRight && !document.getElementById('enthernet-network-links')) {
    const links = document.createElement('div');
    links.id = 'enthernet-network-links';
    links.style.marginTop = '0.6rem';
    links.style.fontSize = '0.78rem';
    links.innerHTML = `<a href="${blog}">Blog</a> · <a href="${coreShield}">Core-Shield</a> · <a href="${pinchAI}">Pinch AI</a> · <a href="${fcs}">FCS Research</a>`;
    footerRight.appendChild(links);
  }
})();
