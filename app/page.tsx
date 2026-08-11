"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type TabId = "home" | "work" | "profile" | "timeline" | "contact";

const tabs: Array<{ id: TabId; label: string; short: string }> = [
  { id: "home", label: "Home", short: "01" },
  { id: "work", label: "Recent Work", short: "02" },
  { id: "profile", label: "About", short: "03" },
  { id: "timeline", label: "Experience", short: "04" },
  { id: "contact", label: "Contact", short: "05" },
];

const projects = [
  {
    id: "fleet",
    number: "01",
    title: "Fleet Operations PWA",
    type: "Internal product",
    status: "Live system",
    copy: "A role-based progressive web app coordinating drivers, weekly availability, vehicles, assignments, photo reports and company updates from one operational workspace.",
    stack: ["Next.js", "React", "Supabase", "PWA"],
  },
  {
    id: "transfer",
    number: "02",
    title: "Meet & Greet",
    type: "Client website",
    status: "Live website",
    copy: "A complete premium transport website built end-to-end in WordPress and Oxygen — from visual direction and responsive layouts to services and booking journeys.",
    stack: ["WordPress", "Oxygen", "UX / UI"],
  },
  {
    id: "rag",
    number: "03",
    title: "Local RAG Agent",
    type: "Final thesis",
    status: "In development",
    copy: "A privacy-focused AI system that extracts web and PDF content, stores local embeddings and produces source-grounded answers through an Ollama-powered interface.",
    stack: ["Python", "Ollama", "Qdrant", "Docker"],
  },
] as const;

const experiences = [
  {
    period: "2025 — NOW",
    title: "Independent Product Development",
    area: "WEB · IT · AI",
    copy: "Turning practical operational needs into working digital products while completing my degree.",
    highlights: [
      "Designed and built a role-based fleet operations PWA with Next.js and Supabase.",
      "Created a complete WordPress and Oxygen website for a premium transport service.",
      "Developing a local RAG system with Python, Ollama, Qdrant and Docker as my final thesis.",
    ],
  },
  {
    period: "2023 — 2024",
    title: "Marketing Department Lead",
    area: "LEADERSHIP · PRODUCT",
    copy: "Combined team leadership, commercial strategy, product thinking and hands-on digital work.",
    highlights: [
      "Managed advertising workflows and developed strategies focused on sales growth.",
      "Led the positioning and launch preparation for a new brand, from visual direction to market materials.",
      "Collaborated on an internal platform for creating, managing and analysing advertising campaigns.",
    ],
  },
  {
    period: "2022 — 2023",
    title: "Performance Marketing & Web Operations",
    area: "MARKETING · WEB",
    copy: "Worked across paid acquisition, websites, e-commerce and day-to-day technical operations.",
    highlights: [
      "Planned, launched and optimised Meta and Google advertising campaigns.",
      "Managed WordPress websites, content, plugins and e-commerce experiences.",
      "Integrated payment tools, improved usability and resolved ongoing website issues.",
    ],
  },
  {
    period: "2018 — 2022",
    title: "Freelance Web & Technical Work",
    area: "FREELANCE · SUPPORT",
    copy: "Built a broad base through freelance projects and varied client-facing work.",
    highlights: [
      "Created, edited and maintained WordPress websites for different needs.",
      "Supported affiliate marketing and digital advertising activities.",
      "Developed strong communication, customer service and practical problem-solving skills.",
    ],
  },
];

const skills = [
  ["Programming", "JavaScript · TypeScript · Python · C++ · Kotlin"],
  ["Web development", "HTML · CSS · React · Next.js · Responsive UI"],
  ["CMS & e-commerce", "WordPress · Oxygen · Elementor · WooCommerce"],
  ["Backend & data", "SQL · PostgreSQL · MariaDB · Supabase · REST APIs"],
  ["Systems & tools", "Windows · Linux · Docker · Git/GitHub · Networking fundamentals"],
  ["Design", "UI/UX · Web design · Graphic design · Content structure"],
  ["Growth", "Meta Ads · Google Ads · Analytics · Campaign strategy · E-commerce"],
  ["Professional", "Client communication · Teamwork · Critical thinking · Fast learning"],
];

export default function Home() {
  const desktopRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [activeProject, setActiveProject] = useState(0);
  const [activeExperience, setActiveExperience] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (/^[1-5]$/.test(event.key) && !(event.target instanceof HTMLInputElement)) {
        setActiveTab(tabs[Number(event.key) - 1].id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function moveDesktop(event: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px)").matches) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    const root = desktopRef.current;
    root?.style.setProperty("--tilt-x", `${x * 2.2}deg`);
    root?.style.setProperty("--tilt-y", `${y * -1.8}deg`);
    root?.style.setProperty("--float-x", `${x * 18}px`);
    root?.style.setProperty("--float-y", `${y * 14}px`);
    root?.style.setProperty("--glow-x", `${event.clientX}px`);
    root?.style.setProperty("--glow-y", `${event.clientY}px`);
  }

  function resetDesktop() {
    const root = desktopRef.current;
    root?.style.setProperty("--tilt-x", "0deg");
    root?.style.setProperty("--tilt-y", "0deg");
  }

  function openTab(tab: TabId) {
    setActiveTab(tab);
  }

  return (
    <main className="portfolio-desktop" ref={desktopRef} onPointerMove={moveDesktop} onPointerLeave={resetDesktop}>
      <div className="cursor-glow" aria-hidden="true" />
      <div className="wallpaper-orb orb-left" aria-hidden="true" />
      <div className="wallpaper-orb orb-right" aria-hidden="true" />
      <div className="desktop-grid" aria-hidden="true" />

      <section className="workspace-window" aria-label="Ibrahim Čaušević portfolio application">
        <header className="window-chrome">
          <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>

          <nav className="window-tabs" role="tablist" aria-label="Portfolio navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                className={activeTab === tab.id ? "is-active" : ""}
                onClick={() => openTab(tab.id)}
              >
                <span>{tab.label}</span>{activeTab === tab.id && <i />}
              </button>
            ))}
          </nav>

          <div className="chrome-spacer" aria-hidden="true" />
        </header>

        <div className="workspace-content">
          <section key={activeTab} id={`panel-${activeTab}`} role="tabpanel" className={`app-panel ${activeTab}-panel`}>
            {activeTab === "home" && (
              <>
                <div className="home-copy">
                  <h1>IBRAHIM<br /><em>ČAUŠEVIĆ</em></h1>
                  <p className="home-lead"><strong>Web &amp; IT professional completing my final thesis to qualify as a graduate engineer in Web and Information Technologies.</strong> I work across web development, digital systems, applied AI and technical operations — learning quickly and turning unclear problems into practical solutions.</p>
                  <div className="home-actions">
                    <button type="button" onClick={() => openTab("work")}>View selected work <span>↗</span></button>
                    <button type="button" onClick={() => openTab("contact")}>Contact</button>
                  </div>
                </div>

                <div className="home-portrait-stage" aria-label="Portrait of Ibrahim Čaušević">
                  <div className="home-portrait-orbit" aria-hidden="true"><i /></div>
                  <figure className="home-portrait">
                    <Image src="/profile-current.jpeg" alt="Ibrahim Čaušević" width={1794} height={2560} priority />
                  </figure>
                </div>
              </>
            )}

            {activeTab === "work" && (
              <div className="work-layout">
                <aside className="project-sidebar">
                  <h2>Recent<br /><em>work.</em></h2>
                  <p className="project-sidebar-copy">Three of my latest projects — a snapshot of what I have been building, not the full range of my work.</p>
                  <div className="project-selector" role="tablist" aria-label="Select a project">
                    {projects.map((project, index) => (
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeProject === index}
                        className={activeProject === index ? "is-active" : ""}
                        key={project.id}
                        onClick={() => setActiveProject(index)}
                      >
                        <small>{project.number}</small><span><b>{project.title}</b></span>
                      </button>
                    ))}
                  </div>
                </aside>

                <article key={projects[activeProject].id} className={`project-workspace project-${projects[activeProject].id}`}>
                  <div className="project-visual">
                    {projects[activeProject].id === "fleet" && (
                      <div className="phone-cluster">
                        <figure className="app-phone phone-left"><Image src="/pwa-announcements.jpeg" alt="Announcements screen in the fleet PWA" width={709} height={1536} /></figure>
                        <figure className="app-phone phone-center"><Image src="/pwa-home.jpeg" alt="Driver home screen in the fleet PWA" width={709} height={1536} /></figure>
                        <figure className="app-phone phone-right"><Image src="/pwa-schedule.jpeg" alt="Schedule screen in the fleet PWA" width={709} height={1536} /></figure>
                      </div>
                    )}

                    {projects[activeProject].id === "transfer" && (
                      <a className="website-browser" href="https://meetandgreetprevozi.si" target="_blank" rel="noreferrer">
                        <header><span><i /><i /><i /></span><b>meetandgreetprevozi.si</b><em>↗</em></header>
                        <div><Image src="/project-meetgreet.png" alt="Meet and Greet premium transport website" width={1859} height={961} /></div>
                      </a>
                    )}

                    {projects[activeProject].id === "rag" && (
                      <div className="rag-lab">
                        <div className="rag-ring ring-a"><i /></div><div className="rag-ring ring-b"><i /></div>
                        <div className="rag-sphere"><small>LOCAL</small><strong>RAG</strong><span>AGENT</span></div>
                        <span className="rag-node node-web">WEB</span><span className="rag-node node-pdf">PDF</span>
                        <span className="rag-node node-qdrant">QDRANT</span><span className="rag-node node-ollama">OLLAMA</span>
                        <div className="terminal-line"><b>$</b> docker compose up <i>_</i></div>
                      </div>
                    )}
                  </div>

                  <div className="project-description">
                    <h3>{projects[activeProject].title}</h3>
                    <p>{projects[activeProject].copy}</p>
                    <footer>{projects[activeProject].stack.map((item) => <span key={item}>{item}</span>)}</footer>
                  </div>
                </article>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="profile-layout">
                <div className="profile-story">
                  <h2>Broad technical range.<br /><em>Practical mindset.</em></h2>
                  <p>I&apos;m Ibrahim, a computer technician and final-stage Web &amp; Information Technologies student based in Ljubljana. My coursework is complete and I am currently finishing my final thesis.</p>
                  <p>My background is deliberately broad: web development, WordPress and e-commerce, technical operations, digital marketing, brand work and client communication. More recently, I have been building with React, Next.js, Supabase, Python and local AI tools.</p>
                  <p>I enjoy understanding the full problem rather than only one layer of it — from interface and data to deployment, users and the business goal. I am looking for an IT role where curiosity, ownership and the ability to connect different disciplines are useful.</p>
                  <div className="about-meta">
                    <div><span>Education</span><b>Web &amp; Information Technologies — coursework completed, final thesis in progress</b></div>
                    <div><span>Languages</span><b>Bosnian / Croatian / Serbian · Slovenian · English · Basic German</b></div>
                  </div>
                </div>

                <div className="skill-system">
                  {skills.map(([title, detail]) => (
                    <article key={title}><span>{title}</span><b>{detail}</b></article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="timeline-layout">
                <aside className="timeline-menu">
                  <h2>Experience.</h2>
                  <p>Experience across product building, web operations, marketing leadership, e-commerce and client-facing technical work.</p>
                  <div className="timeline-selector">
                    {experiences.map((item, index) => (
                      <button type="button" className={activeExperience === index ? "is-active" : ""} key={item.period} onClick={() => setActiveExperience(index)}>
                        <span>0{index + 1}</span><b>{item.period}</b><i />
                      </button>
                    ))}
                  </div>
                </aside>

                <div key={activeExperience} className="experience-window">
                  <small>{experiences[activeExperience].period}</small>
                  <h3>{experiences[activeExperience].title}</h3>
                  <p>{experiences[activeExperience].copy}</p>
                  <ul>{experiences[activeExperience].highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                  <footer>{experiences[activeExperience].area}</footer>
                </div>

                <div className="education-window">
                  <header><span>Education</span></header>
                  <article><time>2023 — 2026</time><div><b>Web &amp; Information Technologies</b><small>Coursework completed · Final thesis in progress</small></div></article>
                  <article><time>2019 — 2023</time><div><b>Computer Technician</b><small>Technical foundation in computing, networking and programming</small></div></article>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="contact-layout">
                <div className="contact-orbit">
                  <div className="contact-ring contact-ring-one"><i /></div>
                  <div className="availability-core"><span>OPEN TO</span><b>WORK</b></div>
                </div>

                <div className="contact-card">
                  <h2>Let&apos;s <em>talk.</em></h2>
                  <p>Have a role, project or idea where my technical range could be useful? Email or call me — I&apos;m always interested in a good conversation.</p>
                  <div className="contact-details">
                    <div><span>Email</span><a href="mailto:ibrahimcausevic.pro@gmail.com">ibrahimcausevic.pro@gmail.com</a></div>
                    <div><span>Phone</span><a href="tel:+38670296468">+386 70 296 468</a></div>
                    <div><span>Location</span><b>Ljubljana, Slovenia</b></div>
                    <div><span>Availability</span><b>On-site · Hybrid · Remote</b></div>
                  </div>
                  <a className="contact-cta" href="mailto:ibrahimcausevic.pro@gmail.com?subject=IT%20opportunity">Send an email <span>↗</span></a>
                </div>
              </div>
            )}
          </section>
        </div>

      </section>

    </main>
  );
}
