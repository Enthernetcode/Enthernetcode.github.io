// ─── API Config ──────────────────────────────────────────────────────────────
const API_BASE = 'https://api.enthernetservice.com';

// ─── Nav scroll state ────────────────────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 40 ? 'rgba(47,47,56,0.9)' : 'var(--border)';
});
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
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) navAnchors.forEach(a => { a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--text)' : ''; });
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// Questionnaire
const stepEls = document.querySelectorAll('.q-step');
const formSections = document.querySelectorAll('.q-form-section[data-section]');
function updateActiveStep() {
  let activeIdx = 0;
  const scrollMid = window.scrollY + window.innerHeight / 2;
  formSections.forEach((sec, i) => { if (sec.getBoundingClientRect().top + window.scrollY < scrollMid) activeIdx = i; });
  stepEls.forEach((s, i) => s.classList.toggle('active', i === activeIdx));
}
window.addEventListener('scroll', updateActiveStep); updateActiveStep();
const qForm = document.getElementById('inquiry-form');
const qSuccess = document.querySelector('.q-success');
qForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = qForm.querySelector('[type="submit"]'); btn.disabled = true; btn.textContent = 'Sending...';
  const data = Object.fromEntries(new FormData(qForm).entries());
  data.stack = Array.from(qForm.querySelectorAll('[name="stack"]:checked')).map(c => c.value);
  try { const res = await fetch(`${API_BASE}/api/inquiry`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); if (!res.ok) throw new Error(`${res.status}`); } catch (_) {}
  qForm.style.display = 'none'; qSuccess.classList.add('visible');
});

// Existing reveal behavior
const revealEls = document.querySelectorAll('.identity-card, .project-card, .principle, .spec-point');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity='1'; entry.target.style.transform='translateY(0)'; revealObserver.unobserve(entry.target); } });
}, { threshold: 0.1 });
revealEls.forEach(el => { el.style.opacity='0'; el.style.transform='translateY(16px)'; el.style.transition='opacity 0.4s ease, transform 0.4s ease'; revealObserver.observe(el); });

// ─── Enthernet entity SEO ───────────────────────────────────────────────────
(() => {
  const canonicalUrl='https://enthernet.com/';
  const title='Enthernet | Cloud, Cybersecurity & Systems Engineering by Renuel Roberts';
  const description='Enthernet is the engineering and cybersecurity platform of Renuel Roberts, covering backend systems, cloud infrastructure, automation, Linux, networking, containers, Kubernetes, CI/CD, security architecture and deployed technical products.';
  const linkedin='https://www.linkedin.com/in/renuel-roberts-st-enthernet-code-6571a7241';
  const github='https://github.com/Enthernetcode'; const blog='https://blog.enthernet.com'; const fcs='https://fcs.enthernet.com';
  const coreShield='https://core-shield.enthernetservice.com'; const pinchAI='https://pinchai.enthernetservice.com';
  document.title=title;
  function meta(attr,key,value){let node=document.head.querySelector(`meta[${attr}="${key}"]`);if(!node){node=document.createElement('meta');node.setAttribute(attr,key);document.head.appendChild(node);}node.setAttribute('content',value);}
  let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=canonicalUrl;
  meta('name','description',description);meta('name','robots','index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');meta('property','og:type','website');meta('property','og:site_name','Enthernet');meta('property','og:title',title);meta('property','og:description',description);meta('property','og:url',canonicalUrl);meta('name','twitter:card','summary_large_image');meta('name','twitter:title',title);meta('name','twitter:description',description);
  const graph={'@context':'https://schema.org','@graph':[{'@type':'WebSite','@id':`${canonicalUrl}#website`,url:canonicalUrl,name:'Enthernet',alternateName:['Enthernet Code','Enthernet Portfolio'],description,publisher:{'@id':`${canonicalUrl}#organization`},inLanguage:'en'},{'@type':'Organization','@id':`${canonicalUrl}#organization`,name:'Enthernet',alternateName:'Enthernet Code',url:canonicalUrl,founder:{'@id':`${canonicalUrl}#renuel-roberts`},sameAs:[github,linkedin,blog,fcs,coreShield,pinchAI]},{'@type':'Person','@id':`${canonicalUrl}#renuel-roberts`,name:'Renuel Roberts',alternateName:['Enthernet Code','Renuel Roberts ST Enthernet Code'],url:canonicalUrl,sameAs:[linkedin,github,blog],knowsAbout:['Software engineering','Cybersecurity','AWS','Cloud computing','Automation','Linux','Networking','Docker','Kubernetes','CI/CD','Ansible','Nginx']}]};
  let structured=document.getElementById('enthernet-entity-graph');if(!structured){structured=document.createElement('script');structured.type='application/ld+json';structured.id='enthernet-entity-graph';document.head.appendChild(structured);}structured.textContent=JSON.stringify(graph);
  const footerRight=document.querySelector('.footer-right');if(footerRight&&!document.getElementById('enthernet-network-links')){const links=document.createElement('div');links.id='enthernet-network-links';links.style.marginTop='0.6rem';links.style.fontSize='0.78rem';links.innerHTML=`<a href="${blog}">Blog</a> · <a href="${coreShield}">Core-Shield</a> · <a href="${pinchAI}">Pinch AI</a> · <a href="${fcs}">FCS Research</a>`;footerRight.appendChild(links);}
})();

// ─── 2026 portfolio refresh ──────────────────────────────────────────────────
(() => {
  // Use the current portrait committed to the portfolio.
  const portrait=document.querySelector('.about-photo img'); if(portrait) portrait.src='./static/images/snapshot.png';

  // Current public engineering evidence, not decorative vanity counters.
  const stats=document.querySelectorAll('.hero-stats .stat-item');
  const currentStats=[['85','Days of Cloud & Security'],['6+','Live Enthernet Properties'],['9','Roadmap Phases'],['100','Day Engineering Target']];
  stats.forEach((el,i)=>{if(!currentStats[i])return;el.querySelector('.stat-value').textContent=currentStats[i][0];el.querySelector('.stat-label').textContent=currentStats[i][1];});

  const tagline=document.querySelector('.hero-tagline');
  if(tagline) tagline.textContent='Infrastructure, cloud, backend automation and defensive security, backed by deployed systems and an 85-day public engineering record.';

  // Add current capabilities learned and demonstrated through the journey.
  const skillCards=document.querySelectorAll('#identity .identity-card');
  if(skillCards[0]) skillCards[0].querySelector('.skill-tags').insertAdjacentHTML('beforeend','<span class="tag">AWS</span><span class="tag">Kubernetes</span><span class="tag">Helm</span>');
  if(skillCards[2]) skillCards[2].querySelector('.skill-tags').insertAdjacentHTML('beforeend','<span class="tag">Ansible</span><span class="tag">GitHub Actions</span><span class="tag">CI/CD</span>');
  if(skillCards[3]) skillCards[3].querySelector('.skill-tags').insertAdjacentHTML('beforeend','<span class="tag">Container Security</span><span class="tag">GitHub Secrets</span>');

  const projects=document.querySelector('#projects .projects-grid');
  if(projects && !document.getElementById('current-platforms')) {
    const wrap=document.createElement('div'); wrap.id='current-platforms'; wrap.className='project-card featured';
    wrap.innerHTML=`<div class="project-info"><div class="project-meta"><span class="project-type">Current Work · 2026</span><span class="project-status live">Live</span></div><h3 class="project-title">Enthernet Engineering Ecosystem</h3><p class="project-desc">Three public properties now separate engineering evidence, hands-on cybersecurity education, and research tooling instead of cramming unrelated work into one portfolio page.</p><div class="metric-row"><div class="metric"><span class="metric-val">85/100</span><span class="metric-lbl">Cloud & Security journey published</span></div><div class="metric"><span class="metric-val">Live</span><span class="metric-lbl">Core-Shield Cyber Labs</span></div><div class="metric"><span class="metric-val">Live</span><span class="metric-lbl">Enthernet Pinch AI</span></div></div><div class="project-stack skill-tags"><span class="tag">AWS</span><span class="tag">Ansible</span><span class="tag">Docker</span><span class="tag">Kubernetes</span><span class="tag">GitHub Actions</span><span class="tag">DevSecOps</span></div></div><div class="project-architecture"><span class="arch-label">// public evidence</span><a href="https://blog.enthernet.com">blog.enthernet.com ↗</a><br><a href="https://core-shield.enthernetservice.com">core-shield.enthernetservice.com ↗</a><br><a href="https://pinchai.enthernetservice.com">pinchai.enthernetservice.com ↗</a><br><a href="https://fcs.enthernet.com">fcs.enthernet.com ↗</a></div>`;
    projects.prepend(wrap);
  }

  // Milestones / experience section. Deliberately excludes JHC Media.
  const projectSection=document.getElementById('projects');
  if(projectSection && !document.getElementById('milestones')) {
    const sec=document.createElement('section'); sec.id='milestones';
    sec.innerHTML=`<div class="container"><div class="projects-header"><p class="section-label">// experience & milestones</p><h2>Built, operated, documented.</h2><p>Recent engineering evidence through August 2026.</p></div><div class="projects-grid"><div class="project-card"><div class="project-meta"><span class="project-type">Cloud Engineering</span><span class="project-status live">Day 85</span></div><h3 class="project-title">#100DaysOfCloudAndSecurity</h3><p class="project-desc">Progressed from AWS foundations through Ansible, Linux administration, networking, Docker, Kubernetes and into CI/CD with GitHub Actions. Each stage is documented as public technical evidence rather than a skills checklist.</p><div class="skill-tags"><span class="tag">AWS</span><span class="tag">Linux</span><span class="tag">Networking</span><span class="tag">Docker</span><span class="tag">Kubernetes</span><span class="tag">CI/CD</span></div><p style="margin-top:1rem"><a class="accent" href="https://blog.enthernet.com/100-days/">Open 100 Days archive →</a></p></div><div class="project-card"><div class="project-meta"><span class="project-type">Cybersecurity Education</span><span class="project-status live">Live</span></div><h3 class="project-title">Core-Shield Cyber Labs</h3><p class="project-desc">Built a hands-on security learning platform around Concept over Syntax and Logic over Code, including browser-based playgrounds, bounded execution, technical courses, an AI mentor and certificate flows.</p><div class="skill-tags"><span class="tag">Security</span><span class="tag">Docker</span><span class="tag">Linux</span><span class="tag">Isolation</span><span class="tag">Education</span></div><p style="margin-top:1rem"><a class="accent" href="https://core-shield.enthernetservice.com">Visit Core-Shield →</a></p></div><div class="project-card"><div class="project-meta"><span class="project-type">Research Engineering</span><span class="project-status live">Live</span></div><h3 class="project-title">Enthernet Pinch AI</h3><p class="project-desc">Developed a research assistant integrating scholarly discovery providers including OpenAlex, Crossref and Semantic Scholar, with normalized source metadata, rate-limit handling and provenance-oriented audit trails.</p><div class="skill-tags"><span class="tag">Python</span><span class="tag">APIs</span><span class="tag">Research</span><span class="tag">Metadata</span><span class="tag">Audit Trail</span></div><p style="margin-top:1rem"><a class="accent" href="https://pinchai.enthernetservice.com">Visit Pinch AI →</a></p></div><div class="project-card"><div class="project-meta"><span class="project-type">Infrastructure Operations</span><span class="project-status live">Production</span></div><h3 class="project-title">Multi-Service Linux & Automation Operations</h3><p class="project-desc">Operated Python services behind Nginx with TLS, Redis/Celery workers, MySQL/PostgreSQL-oriented architectures, background jobs, mail integrations, service hardening and resource-constrained VPS troubleshooting.</p><div class="skill-tags"><span class="tag">Nginx</span><span class="tag">Redis</span><span class="tag">Celery</span><span class="tag">MySQL</span><span class="tag">TLS</span><span class="tag">VPS</span></div></div></div></div>`;
    projectSection.insertAdjacentElement('afterend',sec);
    const navList=document.querySelector('.nav-links'); const projectsLink=navList?.querySelector('a[href="#projects"]')?.parentElement;
    if(navList && projectsLink){const li=document.createElement('li');li.innerHTML='<a href="#milestones">Milestones</a>';projectsLink.insertAdjacentElement('afterend',li);}
  }
})();
