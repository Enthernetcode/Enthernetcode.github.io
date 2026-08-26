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
  data.stack = Array.from(qForm.querySelectorAll('[name="stack"]:checked')).map(c => c.value);

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
    if (button) { button.disabled = false; button.textContent = 'Submit Inquiry →'; }
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

// ─── Portfolio maintenance: content only, no layout mutations ───────────────
(() => {
  // Keep the original four-stat layout and only update its current values.
  const stats = document.querySelectorAll('.hero-stats .stat-item');
  const currentStats = [
    ['85', 'Days of Cloud & Security'],
    ['6+', 'Live Enthernet Properties'],
    ['9', 'Roadmap Phases'],
    ['100', 'Day Engineering Target']
  ];
  stats.forEach((item, index) => {
    if (!currentStats[index]) return;
    const value = item.querySelector('.stat-value');
    const label = item.querySelector('.stat-label');
    if (value) value.textContent = currentStats[index][0];
    if (label) label.textContent = currentStats[index][1];
  });

  // snapshot.png is the preferred portrait. The old inline onerror replaced the
  // whole frame after one failed request, so rebuild the original frame content
  // if that placeholder has already appeared. snapshot.jpg is a real repo asset
  // and is used only as a network/cache fallback.
  const frame = document.querySelector('.photo-frame');
  if (frame) {
    const badgeText = frame.querySelector('.photo-badge')?.textContent || 'Available for Work';
    let portrait = frame.querySelector('img');

    const mountPortrait = () => {
      frame.innerHTML = '';
      portrait = document.createElement('img');
      portrait.alt = 'Renuel Roberts, Enthernet infrastructure, cloud and cybersecurity engineer';
      portrait.decoding = 'async';
      portrait.src = '/static/images/snapshot.png?v=20260827';
      portrait.onerror = () => {
        if (!portrait.dataset.fallback) {
          portrait.dataset.fallback = '1';
          portrait.src = '/static/images/snapshot.jpg?v=20260827';
        }
      };
      frame.appendChild(portrait);
      const badge = document.createElement('div');
      badge.className = 'photo-badge';
      badge.textContent = badgeText;
      frame.appendChild(badge);
    };

    if (!portrait || frame.querySelector('.photo-placeholder')) {
      mountPortrait();
    } else {
      portrait.removeAttribute('onerror');
      portrait.alt = 'Renuel Roberts, Enthernet infrastructure, cloud and cybersecurity engineer';
      portrait.src = '/static/images/snapshot.png?v=20260827';
      portrait.onerror = () => {
        if (!portrait.dataset.fallback) {
          portrait.dataset.fallback = '1';
          portrait.src = '/static/images/snapshot.jpg?v=20260827';
        }
      };
    }
  }

  // SEO/entity metadata only. Nothing below changes visible layout or sections.
  const canonicalUrl = 'https://enthernet.com/';
  const title = 'Enthernet | Cloud, Cybersecurity & Systems Engineering by Renuel Roberts';
  const description = 'Enthernet is the engineering portfolio and public evidence hub of Renuel Roberts, covering cloud infrastructure, cybersecurity, backend systems, Linux, AWS, automation, Docker, Kubernetes, Ansible and CI/CD.';
  const image = 'https://enthernet.com/static/images/snapshot.png';
  const linkedin = 'https://www.linkedin.com/in/renuel-roberts-st-enthernet-code-6571a7241';
  const github = 'https://github.com/Enthernetcode';
  const blog = 'https://blog.enthernet.com/';
  const fcs = 'https://fcs.enthernet.com/';
  const coreShield = 'https://core-shield.enthernetservice.com/';
  const pinchAI = 'https://pinchai.enthernetservice.com/';
  const paas = 'https://admin.enthernetservice.com/';

  document.title = title;

  function setMeta(attribute, key, value) {
    let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attribute, key);
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

  setMeta('name', 'description', description);
  setMeta('name', 'author', 'Renuel Roberts');
  setMeta('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Enthernet');
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:image', image);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);

  const entityGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${canonicalUrl}#website`,
        url: canonicalUrl,
        name: 'Enthernet',
        alternateName: ['Enthernet Code', 'Enthernet Portfolio'],
        description,
        publisher: { '@id': `${canonicalUrl}#organization` },
        inLanguage: 'en'
      },
      {
        '@type': 'Organization',
        '@id': `${canonicalUrl}#organization`,
        name: 'Enthernet',
        alternateName: 'Enthernet Code',
        url: canonicalUrl,
        founder: { '@id': `${canonicalUrl}#renuel-roberts` },
        sameAs: [github, linkedin, blog, fcs, coreShield, pinchAI, paas]
      },
      {
        '@type': 'Person',
        '@id': `${canonicalUrl}#renuel-roberts`,
        name: 'Renuel Roberts',
        alternateName: ['Enthernet Code', 'Renuel Roberts ST Enthernet Code'],
        url: canonicalUrl,
        image,
        sameAs: [github, linkedin, blog],
        knowsAbout: [
          'Cloud computing', 'Cybersecurity', 'AWS', 'Linux', 'Networking',
          'Ansible', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions',
          'Backend systems', 'Infrastructure automation'
        ]
      }
    ]
  };

  let structured = document.getElementById('enthernet-entity-graph');
  if (!structured) {
    structured = document.createElement('script');
    structured.id = 'enthernet-entity-graph';
    structured.type = 'application/ld+json';
    document.head.appendChild(structured);
  }
  structured.textContent = JSON.stringify(entityGraph);
})();
