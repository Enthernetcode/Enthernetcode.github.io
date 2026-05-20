<div align="center">

<img src="./static/images/snapshot.jpg" width="140" alt="Enthernet" />

<br />

# Enthernet
**Roberts Samuel Thankgod**

`Infrastructure-First Systems Engineer`

<br />

[![Email](https://img.shields.io/badge/enthernet%40enthernetservices.com-161619?style=flat-square&logo=gmail&logoColor=00e5a0)](mailto:enthernet@enthernetservices.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-161619?style=flat-square&logo=linkedin&logoColor=0A66C2)](https://www.linkedin.com/in/renuel-roberts-st-enthernet-code)
[![GitHub](https://img.shields.io/badge/GitHub-161619?style=flat-square&logo=github&logoColor=white)](https://github.com/enthernetcode)

<br />

![](https://img.shields.io/badge/10%2B_Applications_Shipped-00e5a0?style=flat-square&labelColor=161619)
![](https://img.shields.io/badge/6_Services_Behind_Proxy-00e5a0?style=flat-square&labelColor=161619)
![](https://img.shields.io/badge/~80%25_API_Boilerplate_Eliminated-00e5a0?style=flat-square&labelColor=161619)
![](https://img.shields.io/badge/1_Auth_Layer_/_10_Apps-00e5a0?style=flat-square&labelColor=161619)

</div>

---

## About

> Most systems look simple until production traffic, infrastructure constraints, or 2am debugging sessions expose the real architecture underneath.

Software engineer and cybersecurity specialist focused on backend systems, automation engineering, infrastructure tooling, and deployment architecture.

Interested in reverse proxies, Linux systems, container networking, scalable backend architecture, and operational automation. Prefers understanding how systems work internally rather than blindly consuming abstractions.

---

## Technical Identity

### 🖥 Infrastructure
![Nginx](https://img.shields.io/badge/Nginx-161619?style=flat-square&logo=nginx&logoColor=00e5a0)
![Docker](https://img.shields.io/badge/Docker-161619?style=flat-square&logo=docker&logoColor=2496ED)
![Cloudflare](https://img.shields.io/badge/Cloudflare-161619?style=flat-square&logo=cloudflare&logoColor=F38020)
![Linux](https://img.shields.io/badge/Linux-161619?style=flat-square&logo=linux&logoColor=FCC624)
![SSL/TLS](https://img.shields.io/badge/SSL%2FTLS-161619?style=flat-square&logoColor=white)
![VPS](https://img.shields.io/badge/VPS-161619?style=flat-square&logoColor=white)

Reverse proxies, container networking, SSL termination, Linux systems, and deployment architecture.

### 🔧 Backend Engineering
![Python](https://img.shields.io/badge/Python-161619?style=flat-square&logo=python&logoColor=3776AB)
![Django](https://img.shields.io/badge/Django-161619?style=flat-square&logo=django&logoColor=092E20)
![Flask](https://img.shields.io/badge/Flask-161619?style=flat-square&logo=flask&logoColor=white)
![REST APIs](https://img.shields.io/badge/REST_APIs-161619?style=flat-square&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-161619?style=flat-square&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-161619?style=flat-square&logo=mysql&logoColor=4479A1)

APIs, authentication systems, realtime services, service orchestration, and database interaction.

### ⚡ Automation
![Selenium](https://img.shields.io/badge/Selenium-161619?style=flat-square&logo=selenium&logoColor=43B02A)
![Playwright](https://img.shields.io/badge/Playwright-161619?style=flat-square&logo=playwright&logoColor=2EAD33)
![Bash](https://img.shields.io/badge/Bash_Scripting-161619?style=flat-square&logo=gnubash&logoColor=white)
![Cron](https://img.shields.io/badge/Cron-161619?style=flat-square&logoColor=white)
![SEO](https://img.shields.io/badge/SEO-161619?style=flat-square&logoColor=white)
![Web Hosting](https://img.shields.io/badge/Web_Hosting-161619?style=flat-square&logoColor=white)

Browser automation, workflow orchestration, infrastructure scripting, and API automation pipelines.

### 🛡 Security
![Auth Layers](https://img.shields.io/badge/Auth_Layers-161619?style=flat-square&logoColor=white)
![RBAC](https://img.shields.io/badge/RBAC-161619?style=flat-square&logoColor=white)
![Rate Limiting](https://img.shields.io/badge/Rate_Limiting-161619?style=flat-square&logoColor=white)
![Secret Mgmt](https://img.shields.io/badge/Secret_Mgmt-161619?style=flat-square&logoColor=white)
![Cryptography](https://img.shields.io/badge/Cryptography-161619?style=flat-square&logoColor=white)
![Blockchain](https://img.shields.io/badge/Blockchain-161619?style=flat-square&logoColor=white)

Secure architecture, validation layers, access control, attack surface reduction, and defensive engineering.

### 🧠 ML & Blockchain
![Machine Learning](https://img.shields.io/badge/Machine_Learning-161619?style=flat-square&logo=scikitlearn&logoColor=F7931E)
![Cryptography](https://img.shields.io/badge/Cryptography-161619?style=flat-square&logoColor=white)
![Blockchain](https://img.shields.io/badge/Blockchain-161619?style=flat-square&logoColor=white)

Machine learning pipelines, cryptographic systems, blockchain architecture, and SEO-aware deployment.

---

## Reverse Proxy Specialization

Reverse proxies are not "just config files." They are traffic control systems sitting at the intersection of networking, security, routing, scaling, SSL handling, and service isolation.

### Request Flow

```
┌───────────────┐        ┌─────────────────────┐
│ Client Browser│───────▶│  Cloudflare CDN      │
└───────────────┘        │  DDoS · WAF · SSL    │
                         └──────────┬────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Nginx Reverse      │
                         │   Proxy              │
                         │   routing · SSL      │
                         │   rate limiting      │
                         │   headers            │
                         └────┬─────┬──────┬────┘
                              │     │      │
                   ┌──────────┘     │      └──────────┐
                   ▼                ▼                  ▼
           ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
           │  App :5000   │ │  API :8000   │ │  DB  :3306   │
           └──────────────┘ └──────────────┘ └──────────────┘

Each upstream service is isolated. Services never expose ports directly.
```

### Auth Request Flow

```
Request ──▶ X-API-KEY check ──▶ @role_required ──▶ Handler
                │                      │
           401 Unauthorized       403 Forbidden

User login ──▶ pbkdf2:sha256 verify ──▶ session / token ──▶ Authenticated

Sensitive fields (password, enc tokens) stripped at model layer.
Never exposed through API responses — regardless of endpoint.
```

**Capabilities:**
- Virtual host routing & SSL termination
- Cloudflare WAF integration
- Multi-service upstream isolation
- WebSocket proxying for realtime systems
- Security headers & rate limiting

---

## Selected Work

### Vemals — Multi-App Platform
![Platform](https://img.shields.io/badge/Platform-7c6aff?style=flat-square)
![In Progress](https://img.shields.io/badge/In_Progress-fbbf24?style=flat-square)

Flask-based platform integrating 10 distinct web applications under unified authentication, shared database models, and real-time chat. Applications span real estate, forex trading, IoT, e-commerce, automation, and more — served through a single WSGI process with a generic CRUD scaffolding system.

| Metric | Value |
|--------|-------|
| Applications unified | **10** |
| Authentication layers | **1** (shared across all apps) |
| API boilerplate reduction | **~80%** via `MODEL_LOOKUP` generic routing |
| Duplicate auth implementations | **0** |

```
app.py            →  single Flask instance
models.py         →  10+ SQLAlchemy domains
MODEL_LOOKUP      →  generic CRUD routing
/api/<model>      →  auto-wired endpoints
SocketIO          →  real-time chat events
@role_required    →  ForexRole RBAC guard
@api_key_required →  X-API-KEY header auth
passenger_wsgi.py →  production WSGI entry
```

![Python](https://img.shields.io/badge/Python-161619?style=flat-square&logo=python&logoColor=3776AB)
![Flask](https://img.shields.io/badge/Flask-161619?style=flat-square&logo=flask&logoColor=white)
![SocketIO](https://img.shields.io/badge/SocketIO-161619?style=flat-square&logo=socketdotio&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-161619?style=flat-square&logo=mysql&logoColor=4479A1)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-161619?style=flat-square&logoColor=white)
![Passenger WSGI](https://img.shields.io/badge/Passenger_WSGI-161619?style=flat-square&logoColor=white)

---

### Nginx Multi-Service Proxy Setup
![Infrastructure](https://img.shields.io/badge/Infrastructure-00e5a0?style=flat-square&labelColor=161619)
![Built](https://img.shields.io/badge/Built-00e5a0?style=flat-square&labelColor=161619)

Full Nginx reverse proxy configuration for a multi-service Linux VPS. Handles SSL termination, virtual host routing, upstream isolation, security headers, and rate limiting across multiple applications on a single server.

| Metric | Value |
|--------|-------|
| Upstream services isolated | **6** |
| Ports exposed directly on services | **0** |

![Nginx](https://img.shields.io/badge/Nginx-161619?style=flat-square&logo=nginx&logoColor=00e5a0)
![SSL/TLS](https://img.shields.io/badge/SSL%2FTLS-161619?style=flat-square&logoColor=white)
![Certbot](https://img.shields.io/badge/Certbot-161619?style=flat-square&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-161619?style=flat-square&logo=linux&logoColor=FCC624)
![UFW](https://img.shields.io/badge/UFW-161619?style=flat-square&logoColor=white)

---

### Browser Automation Suite
![Automation](https://img.shields.io/badge/Automation-fbbf24?style=flat-square&labelColor=161619)
![Built](https://img.shields.io/badge/Built-00e5a0?style=flat-square&labelColor=161619)

Selenium-based workflow automation for repetitive web tasks — form submission, data scraping, authentication flows, and scheduled execution. Designed to run headless on Linux servers with session persistence and error recovery.

| Metric | Value |
|--------|-------|
| Manual work automated | **~4 hrs/week** |
| Execution environment | **24/7 headless server** |

![Python](https://img.shields.io/badge/Python-161619?style=flat-square&logo=python&logoColor=3776AB)
![Selenium](https://img.shields.io/badge/Selenium-161619?style=flat-square&logo=selenium&logoColor=43B02A)
![ChromeDriver](https://img.shields.io/badge/ChromeDriver-161619?style=flat-square&logo=googlechrome&logoColor=white)
![Cron](https://img.shields.io/badge/Cron-161619?style=flat-square&logoColor=white)
![Bash](https://img.shields.io/badge/Bash-161619?style=flat-square&logo=gnubash&logoColor=white)

---

### Secure API Architecture
![Security / API](https://img.shields.io/badge/Security_%2F_API-ef4444?style=flat-square&labelColor=161619)
![Built](https://img.shields.io/badge/Built-00e5a0?style=flat-square&labelColor=161619)

REST API with layered authentication — API key guards, role-based access control, input validation, and sensitive field filtering on serialized model output. Designed with defense-in-depth rather than a single auth boundary.

![Flask](https://img.shields.io/badge/Flask-161619?style=flat-square&logo=flask&logoColor=white)
![RBAC](https://img.shields.io/badge/RBAC-161619?style=flat-square&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-161619?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Rate Limiting](https://img.shields.io/badge/Rate_Limiting-161619?style=flat-square&logoColor=white)

---

## Field Notes — What Broke & What I Learned

> Production systems are carefully organized chaos negotiating temporary peace treaties.

<details>
<summary><b>SocketIO connections dropping silently under concurrent users</b> &nbsp;·&nbsp; <code>WebSockets / Flask</code></summary>

<br />

**What broke**

Real-time chat messages were delivered inconsistently — some clients received them, others didn't. No errors in logs. The system appeared healthy until load increased.

**Why it broke**

SocketIO's default long-polling transport was competing with the WSGI process model. Without sticky sessions at the proxy layer, broadcast events weren't reaching all connected clients across processes.

**How I debugged it**

Isolated the issue by forcing WebSocket transport only, then traced dropped events through Nginx access logs. The pattern showed requests hitting different upstream workers without session affinity.

**Architectural lesson**

Stateful protocols require infrastructure-level session awareness. The proxy layer is not transparent — it has to be designed for the protocol sitting behind it.

</details>

<details>
<summary><b>SSL renewal silently broke upstream routing for 3 services</b> &nbsp;·&nbsp; <code>Nginx / SSL</code></summary>

<br />

**What broke**

After Certbot renewed a wildcard certificate, three virtual hosts stopped responding with 502 Bad Gateway. The certificate renewal succeeded. Nginx reported no errors. Services were still running.

**Why it broke**

Certbot's renewal hook reloaded Nginx with a config that had a subtle upstream block conflict introduced during an earlier manual edit. The config was technically valid — it just routed to the wrong sockets. Nginx accepted it without complaint.

**How I debugged it**

`nginx -T` dumped the full merged config. Diffing it against the last working state revealed a duplicated upstream block with a port conflict that only manifested post-reload.

**Architectural lesson**

Automation that modifies live infrastructure needs post-action validation. A successful renewal hook should verify service reachability — not just assume Nginx reloaded cleanly.

</details>

<details>
<summary><b>Generic serializer causing infinite recursion on relational models</b> &nbsp;·&nbsp; <code>SQLAlchemy / API</code></summary>

<br />

**What broke**

The generic `as_dict()` serializer worked for flat models. When called on models with back-populated relationships, the API returned a 500 with a recursion depth exceeded error.

**Why it broke**

SQLAlchemy's lazy-loaded relationships meant that serializing a `PropertyChat` object would trigger serialization of its participants, which each held a reference back to the chat — circular indefinitely.

**How I debugged it**

Traced the stack frame — the recursion pattern was clear once the model graph was mapped. Fixed by adding a depth-limit parameter and an explicit exclusion list for relationship fields in the serializer.

**Architectural lesson**

Generic utilities that touch data models need explicit boundaries. Convenience and correctness diverge at relational edges — the serializer needed to know what it was allowed to traverse.

</details>

---

## Contact

Open to freelance engagements, contract infrastructure work, and backend engineering roles.

| Channel | Link |
|---------|------|
| Email | [enthernet@enthernetservices.com](mailto:enthernet@enthernetservices.com) |
| LinkedIn | [renuel-roberts-st-enthernet-code](https://www.linkedin.com/in/renuel-roberts-st-enthernet-code) |
| GitHub | [enthernetcode](https://github.com/enthernetcode) |

---

<div align="center">

`~/enthernet` &nbsp;·&nbsp; Roberts Samuel Thankgod &nbsp;·&nbsp; Infrastructure-First Systems Engineer

*Built with operational intention. No animated gradients.*

</div>
