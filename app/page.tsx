"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type TabId = "home" | "work" | "profile" | "timeline" | "contact";

const tabs: Array<{ id: TabId; label: string; short: string }> = [
  { id: "home", label: "Home", short: "01" },
  { id: "work", label: "Selected Work", short: "02" },
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
    copy: "Building a fleet operations PWA, exploring applied AI and developing a local RAG system as a final thesis project.",
  },
  {
    period: "2023 — 2024",
    title: "Marketing Department Lead",
    area: "LEADERSHIP · PRODUCT",
    copy: "Managed marketing operations, developed sales strategies, launched a new brand and contributed to an internal campaign-management platform.",
  },
  {
    period: "2022 — 2023",
    title: "Performance Marketing & Web Operations",
    area: "MARKETING · WEB",
    copy: "Managed Meta and Google campaigns alongside WordPress, e-commerce, payment integrations and ongoing website work.",
  },
  {
    period: "2018 — 2022",
    title: "Freelance Web & Technical Work",
    area: "FREELANCE · SUPPORT",
    copy: "Created and maintained WordPress websites while building broad client-facing, operational and technical experience.",
  },
];

const skills = [
  ["Frontend", "HTML · CSS · JavaScript · React · Next.js"],
  ["CMS & Commerce", "WordPress · Oxygen · WooCommerce"],
  ["Backend & Data", "Python · SQL · PostgreSQL · Supabase · APIs"],
  ["Systems", "Linux · Docker · Git · Networking fundamentals"],
  ["Applied AI", "Ollama · Qdrant · RAG · Embeddings · Streamlit"],
  ["Product & Growth", "UI/UX · Analytics · Meta Ads · Google Ads · Strategy"],
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
      <div className="wallpaper-noise" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <div className="wallpaper-orb orb-left" aria-hidden="true" />
      <div className="wallpaper-orb orb-right" aria-hidden="true" />
      <div className="desktop-grid" aria-hidden="true" />

      <section className="workspace-window" aria-label="Ibrahim Causevic portfolio application">
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
                  <h1>IBRAHIM<br /><em>CAUSEVIC</em></h1>
                  <p>A Web &amp; IT generalist building practical products across frontend development, digital systems and applied AI. I learn fast, take ownership and enjoy turning unclear problems into working solutions.</p>
                  <div className="home-actions">
                    <button type="button" onClick={() => openTab("work")}>View selected work <span>↗</span></button>
                    <button type="button" onClick={() => openTab("contact")}>Contact</button>
                  </div>
                </div>

                <div className="home-portrait-stage" aria-label="Portrait of Ibrahim Causevic">
                  <div className="home-portrait-orbit" aria-hidden="true"><i /></div>
                  <figure className="home-portrait">
                    <Image src="/profile-current.jpeg" alt="Ibrahim Causevic" width={1794} height={2560} priority />
                  </figure>
                </div>
              </>
            )}

            {activeTab === "work" && (
              <div className="work-layout">
                <aside className="project-sidebar">
                  <h2>Selected<br /><em>work.</em></h2>
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
                  <h2>I understand the whole product,<br /><em>not only one layer.</em></h2>
                  <p>My background combines web development, technical operations, digital products and performance marketing. That means I can move between interface work, data, systems and the practical business problem behind a product.</p>
                  <p>I have built WordPress websites, a role-based fleet PWA with Supabase, and a local RAG system using Python, Ollama and Qdrant. I am comfortable learning unfamiliar tools when a project needs them.</p>
                  <p>I am finishing my degree in Web &amp; Information Technologies and looking for an early-career IT role where broad technical understanding, curiosity and ownership are useful.</p>
                  <div className="about-meta">
                    <div><span>Education</span><b>Web &amp; Information Technologies — coursework complete, final thesis in progress</b></div>
                    <div><span>Languages</span><b>Slovenian · English · BS/HR/SR · German</b></div>
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
                  <p>A mix of product building, web operations, marketing and client-facing technical work.</p>
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
                  <footer>{experiences[activeExperience].area}</footer>
                </div>

                <div className="education-window">
                  <header><span>Education</span></header>
                  <article><time>2023 — 2026</time><div><b>Web &amp; Information Technologies</b><small>Coursework completed · Final thesis in progress</small></div></article>
                  <article><time>2019 — 2023</time><div><b>Computer Technician / Programmer</b><small>Technical foundation in computing and programming</small></div></article>
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
                  <h2>Let&apos;s<br /><em>talk.</em></h2>
                  <p>I&apos;m open to junior and early-career opportunities across web development, IT support, technical operations, digital systems and applied AI.</p>
                  <div className="contact-details">
                    <div><span>Email</span><a href="mailto:ibrahimcausevic.pro@gmail.com">ibrahimcausevic.pro@gmail.com</a></div>
                    <div><span>Location</span><b>Ljubljana, Slovenia</b></div>
                    <div><span>Work</span><b>On-site · Hybrid · Remote</b></div>
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
