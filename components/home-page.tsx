"use client";

import { useEffect } from "react";
import { animate, stagger } from "animejs";
import Lenis from "lenis";
import { SignalField } from "@/components/signal-field";

const experience = [
  {
    company: "Ticketmaster",
    role: "Software Engineer Intern",
    dates: "October 2026 - Present",
    details: ["Interning on the Cassandra infrastructure team."],
  },
  {
    company: "First American",
    role: "Data Engineer Intern",
    dates: "June 2026 - August 2026",
    details: [
      "Developed a validation dashboard with React, FastAPI, and PostgreSQL to compare tables across Databricks, BigQuery, and SQL Server.",
      "Built cross-platform validation services with Arrow, Parquet, Spark, and DuckDB that processed 100M+ row datasets in five minutes.",
      "Architected a persisted PostgreSQL job queue to orchestrate concurrent validation jobs reliably.",
    ],
  },
  {
    company: "Temco Logistics",
    role: "Data Engineer Intern",
    dates: "March 2026 - June 2026",
    details: [
      "Engineered a Python and Spark pipeline in Databricks to migrate 50,000+ legacy records to cloud storage.",
      "Refactored a pandas ingestion service to Spark, cutting the codebase by more than 50% with Azure Key Vault and Blob Storage integration.",
      "Reduced Spark transformation runtimes from over two hours to 30 minutes through multithreading and partitioning.",
    ],
  },
];

const skills = [
  {
    group: "Languages",
    items: ["Python", "Go", "SQL", "TypeScript", "Java", "Bash"],
  },
  {
    group: "Data systems",
    items: ["Spark", "Arrow", "PostgreSQL", "Delta Lake", "Parquet", "DuckDB", "SQL Server", "PyTorch"],
  },
  {
    group: "Frameworks",
    items: ["FastAPI", "Node.js", "Express.js", "React"],
  },
  {
    group: "Platforms",
    items: [
      "Databricks",
      "Lakebase",
      "Lakeflow",
      "Foundation Models",
      "GCP Cloud Storage",
      "BigQuery",
      "GCP Agent Platform",
      "Azure Blob Storage",
      "Azure SQL Server",
      "Azure Key Vault",
    ],
  },
  {
    group: "Developer tools",
    items: ["Git", "GitHub Actions", "Docker", "Linux", "Cursor", "Codex"],
  },
];

type ContactIconName = "email" | "github" | "linkedin";

const contactLinks: Array<{
  label: string;
  href: string;
  icon: ContactIconName;
}> = [
  {
    label: "Email",
    href: "mailto:davidduonggg@gmail.com",
    icon: "email",
  },
  {
    label: "GitHub",
    href: "https://github.com/davidduonggg",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dduong7/",
    icon: "linkedin",
  },
];

function ContactIcon({ name }: { name: ContactIconName }) {
  if (name === "email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.75 6.75h14.5v10.5H4.75z" />
        <path d="m5.25 7.25 6.75 5 6.75-5" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg className="contact-icon-fill" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 2.75a9.25 9.25 0 0 0-2.93 18.03c.46.08.63-.2.63-.44v-1.62c-2.56.56-3.1-1.09-3.1-1.09-.42-1.07-1.02-1.35-1.02-1.35-.84-.57.06-.56.06-.56.93.07 1.42.96 1.42.96.82 1.41 2.15 1 2.68.77.08-.6.32-1 .58-1.23-2.04-.23-4.19-1.02-4.19-4.54 0-1 .36-1.82.95-2.46-.1-.23-.41-1.17.09-2.43 0 0 .78-.25 2.55.94A8.7 8.7 0 0 1 12 7.44c.79 0 1.58.11 2.32.31 1.77-1.19 2.55-.94 2.55-.94.5 1.26.19 2.2.09 2.43.59.64.95 1.46.95 2.46 0 3.53-2.15 4.31-4.2 4.54.33.29.63.85.63 1.72v2.38c0 .24.17.53.64.44A9.25 9.25 0 0 0 12 2.75Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.75 9.75v8.5" />
      <path d="M6.75 6.75v.02" />
      <path d="M11 18.25v-8.5" />
      <path d="M11 13.5c0-2.48 1.42-3.95 3.45-3.95 1.92 0 2.8 1.25 2.8 3.52v5.18" />
    </svg>
  );
}

export function HomePage({ resumeHref = "/resume" }: { resumeHref?: string }) {
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      autoToggle: true,
      lerp: 0.07,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.82,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.remove("reveal");
      });
      return;
    }

    animate(".reveal", {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 760,
      delay: stagger(65, { start: 80 }),
      ease: "outCubic",
    });
  }, []);

  return (
    <main className="site-shell">
      <SignalField />

      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="David Duong home">
            David Duong
          </a>
          <div className="nav-links">
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a className="resume-link" href={resumeHref} target="_blank" rel="noreferrer">
              Resume
            </a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="hero-status reveal">
            <span aria-hidden="true" /> Software Engineer Intern at Ticketmaster
          </p>
          <h1 className="reveal">David Duong</h1>
          <p className="hero-copy reveal">
            I build backend systems, infrastructure, and data platforms.
          </p>
          <p className="hero-education reveal">
            B.S. Computer Science, UC Irvine <span aria-hidden="true">/</span> December 2027
          </p>
          <div className="hero-actions reveal">
            <a href="#experience">
              View experience <span aria-hidden="true">-&gt;</span>
            </a>
            <a href={resumeHref} target="_blank" rel="noreferrer">
              Open resume <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>
      </section>

      <div className="content-backdrop">
        <section className="section experience-section" id="experience">
          <div className="section-header reveal">
            <p className="section-index">01</p>
            <h2>Experience</h2>
            <p className="section-intro">
              Data infrastructure and backend work across high-volume validation, distributed systems, and cloud platforms.
            </p>
          </div>

          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item reveal" key={item.company}>
                <p className="experience-date">{item.dates}</p>
                <div className="timeline-marker" aria-hidden="true">
                  <span />
                </div>
                <div className="timeline-content">
                  <div className="experience-heading">
                    <h3>{item.company}</h3>
                    <p className="experience-role">{item.role}</p>
                  </div>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-header reveal">
            <p className="section-index">02</p>
            <h2>Skills</h2>
            <p className="section-intro">
              The languages, data systems, and cloud tooling I use to ship reliable infrastructure.
            </p>
          </div>

          <div className="skills-list">
            {skills.map((skillGroup) => (
              <section className="skill-group reveal" key={skillGroup.group} aria-labelledby={`skill-${skillGroup.group.toLowerCase().replaceAll(" ", "-")}`}>
                <h3 id={`skill-${skillGroup.group.toLowerCase().replaceAll(" ", "-")}`}>{skillGroup.group}</h3>
                <p>{skillGroup.items.join(", ")}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-panel reveal">
            <div>
              <p className="section-index">03</p>
              <h2>Let&apos;s work together.</h2>
            </div>
            <div className="contact-links">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label} title={link.label}>
                  <ContactIcon name={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
