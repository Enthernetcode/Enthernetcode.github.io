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

// Questionnaire step tracking
const stepEls = document.querySelectorAll('.q-step');
const formSections = document.querySelectorAll('.q-form-section[data-section]');
function updateActiveStep() {
  let activeIdx = 0;
  const scrollMid = window.scrollY + window.innerHeight / 2;
  formSections.forEach((sec, i) => {
    if (sec.getBoundingClientRect().top + window.scrollY < scrollMid) activeIdx = i;
  });
  stepEls.forEach((s, i) => s.classList.toggle('active', i === activeIdx));
}
window.addEventListener('scroll', updateActiveStep);
updateActiveStep();

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

// ─── Portfolio maintenance: update content without replacing the design ─────
(() => {
  // Keep the existing four-stat visual structure and update only the data.
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

  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    tagline.textContent = 'Infrastructure, cloud, backend automation and defensive security, backed by deployed systems and an 85-day public engineering record.';
  }

  // snapshot.png is the preferred portrait. Do not destroy the frame on a failed load.
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

  // Add current capabilities to the existing skill cards only.
  const skillCards = document.querySelectorAll('#identity .identity-card');
  const addTags = (card, tags) => {
    const holder = card?.querySelector('.skill-tags');
    if (!holder) return;
    tags.forEach(tag => {
      if ([...holder.querySelectorAll('.tag')].some(el => el.textContent.trim() === tag)) return;
      holder.insertAdjacentHTML('beforeend', `<span class="tag">${tag}</span>`);
    });
  };
  addTags(skillCards[0], ['AWS', 'Kubernetes', 'Helm']);
  addTags(skillCards[2], ['Ansible', 'GitHub Actions', 'CI/CD']);
  addTags(skillCards[3], ['Container Security', 'GitHub Secrets']);

  // Restore the current ecosystem card inside the original project grid.
  const projects = document.querySelector('#projects .projects-grid');
  if (projects && !document.getElementById('current-platforms')) {
    const wrap = document.createElement('div');
    wrap.id = 'current-platforms';
    wrap.className = 'project-card featured';
    wrap.innerHTML = `
      <div class="project-info">
        <div class="project-meta">
          <span class="project-type">Current Work · 2026</span>
          <span class="project-status live">Live</span>
        </div>
        <h3 class="project-title">Enthernet Engineering Ecosystem</h3>
        <p class="project-desc">Enthernet now spans multiple public engineering, cybersecurity, research and platform properties rather than compressing unrelated work into one portfolio page.</p>
        <div class="metric-row">
          <div class="metric"><span class="metric-val">85/100</span><span class="metric-lbl">Cloud & Security journey published</span></div>
          <div class="metric"><span class="metric-val">6+</span><span class="metric-lbl">Live Enthernet properties</span></div>
          <div class="metric"><span class="metric-val">Live</span><span class="metric-lbl">Core-Shield & Pinch AI</span></div>
        </div>
        <div class="project-stack skill-tags">
          <span class="tag">AWS</span><span class="tag">Ansible</span><span class="tag">Docker</span><span class="tag">Kubernetes</span><span class="tag">GitHub Actions</span><span class="tag">DevSecOps</span>
        </div>
      </div>
      <div class="project-architecture">
        <span class="arch-label">// public evidence</span>
        <a href="https://blog.enthernet.com">blog.enthernet.com ↗</a><br>
        <a href="https://core-shield.enthernetservice.com">core-shield.enthernetservice.com ↗</a><br>
        <a href="https://pinchai.enthernetservice.com">pinchai.enthernetservice.com ↗</a><br>
        <a href="https://fcs.enthernet.com">fcs.enthernet.com ↗</a><br>
        <a href="https://admin.enthernetservice.com">admin.enthernetservice.com ↗</a>
      </div>`;
    projects.prepend(wrap);
  }

  // Restore Experience & Milestones after the existing Projects section.
  // JHC Media is intentionally excluded.
  const projectSection = document.getElementById('projects');
  if (projectSection && !document.getElementById('milestones')) {
    const sec = document.createElement('section');
    sec.id = 'milestones';
    sec.innerHTML = `
      <div class="container">
        <div class="projects-header">
          <p class="section-label">// experience & milestones</p>
          <h2>Built, operated, documented.</h2>
          <p>Recent engineering evidence through August 2026.</p>
        </div>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-meta"><span class="project-type">Cloud Engineering</span><span class="project-status live">Day 85</span></div>
            <h3 class="project-title">#100DaysOfCloudAndSecurity</h3>
            <p class="project-desc">Progressed from AWS foundations through Ansible, Linux administration, networking, Docker, Kubernetes and into CI/CD with GitHub Actions. Each stage is documented as public technical evidence rather than a skills checklist.</p>
            <div class="skill-tags"><span class="tag">AWS</span><span class="tag">Linux</span><span class="tag">Networking</span><span class="tag">Docker</span><span class="tag">Kubernetes</span><span class="tag">CI/CD</span></div>
            <p style="margin-top:1rem"><a class="accent" href="https://blog.enthernet.com/100-days/">Open 100 Days archive →</a></p>
          </div>
          <div class="project-card">
            <div class="project-meta"><span class="project-type">Cybersecurity Education</span><span class="project-status live">Live</span></div>
            <h3 class="project-title">Core-Shield Cyber Labs</h3>
            <p class="project-desc">Built a hands-on security learning platform around Concept over Syntax and Logic over Code, including browser-based playgrounds, bounded execution, technical courses, an AI mentor and certificate flows.</p>
            <div class="skill-tags"><span class="tag">Security</span><span class="tag">Docker</span><span class="tag">Linux</span><span class="tag">Isolation</span><span class="tag">Education</span></div>
            <p style="margin-top:1rem"><a class="accent" href="https://core-shield.enthernetservice.com">Visit Core-Shield →</a></p>
          </div>
          <div class="project-card">
            <div class="project-meta"><span class="project-type">Research Engineering</span><span class="project-status live">Live</span></div>
            <h3 class="project-title">Enthernet Pinch AI</h3>
            <p class="project-desc">Developed a research assistant integrating scholarly discovery providers including OpenAlex, Crossref and Semantic Scholar, with normalized source metadata, rate-limit handling and provenance-oriented audit trails.</p>
            <div class="skill-tags"><span class="tag">Python</span><span class="tag">APIs</span><span class="tag">Research</span><span class="tag">Metadata</span><span class="tag">Audit Trail</span></div>
            <p style="margin-top:1rem"><a class="accent" href="https://pinchai.enthernetservice.com">Visit Pinch AI →</a></p>
          </div>
          <div class="project-card">
            <div class="project-meta"><span class="project-type">Infrastructure Operations</span><span class="project-status live">Production</span></div>
            <h3 class="project-title">Multi-Service Linux & Automation Operations</h3>
            <p class="project-desc">Operated Python services behind Nginx with TLS, Redis/Celery workers, MySQL/PostgreSQL-oriented architectures, background jobs, mail integrations, service hardening and resource-constrained VPS troubleshooting.</p>
            <div class="skill-tags"><span class="tag">Nginx</span><span class="tag">Redis</span><span class="tag">Celery</span><span class="tag">MySQL</span><span class="tag">TLS</span><span class="tag">VPS</span></div>
          </div>
        </div>
      </div>`;
    projectSection.insertAdjacentElement('afterend', sec);

    const projectsLink = navLinks?.querySelector('a[href="#projects"]')?.parentElement;
    if (navLinks && projectsLink && !navLinks.querySelector('a[href="#milestones"]')) {
      const li = document.createElement('li');
      li.innerHTML = '<a href="#milestones">Milestones</a>';
      projectsLink.insertAdjacentElement('afterend', li);
    }
  }

  // Apply reveal animation after dynamically-added cards exist.
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.identity-card, .project-card, .principle, .spec-point');
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
})();
