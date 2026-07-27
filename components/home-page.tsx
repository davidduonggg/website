"use client";

import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { SignalField } from "@/components/signal-field";

const experience = [
  {
    title: "First American",
    role: "Data Engineer Intern",
    meta: "June 2026 - Present",
    description:
      "Building data validation and replication systems across React, FastAPI, PostgreSQL, DuckDB, BigQuery, Pub/Sub, Dataflow, and Cloud Run.",
  },
  {
    title: "Temco Logistics",
    role: "Data Engineer (BI) Intern",
    meta: "March 2026 - June 2026",
    description:
      "Migrated legacy records with Python and Spark in Databricks, refactored ingestion services, optimized runtimes, and added CI test coverage.",
  },
];

const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "Go", "SQL", "TypeScript", "JavaScript", "Bash"],
  },
  {
    group: "Data",
    items: ["Apache Spark", "Apache Arrow", "Delta Lake", "Parquet", "PostgreSQL", "DuckDB", "SQL Server"],
  },
  {
    group: "Frameworks",
    items: ["FastAPI", "Node.js", "Express.js", "React"],
  },
  {
    group: "Cloud",
    items: ["Databricks", "GCP Pub/Sub", "Cloud Run", "Dataflow", "BigQuery", "Azure Blob Storage", "Azure SQL Server", "Azure Key Vault"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub Actions", "Docker", "Linux", "Cursor", "Codex"],
  },
  {
    group: "ML",
    items: ["PyTorch"],
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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.remove("reveal");
      });
      return;
    }

    animate(".reveal", {
      opacity: [0, 1],
      translateY: [22, 0],
      duration: 900,
      delay: stagger(90, { start: 120 }),
      ease: "outCubic",
    });
  }, []);

  return (
    <main className="site-shell">
      <SignalField />
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="David Duong home">
            <span>David Duong</span>
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
          <h1 className="reveal">David Duong</h1>
          <p className="hero-copy reveal">
            I build backend systems, data platforms, and data infrastructure.
          </p>
          <div className="hero-actions reveal">
            <a className="action primary" href="#experience">
              See experience
            </a>
            <a className="action" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
        <div className="below-fold-hint" aria-hidden="true">
          <span />
          Scroll
        </div>
      </section>

      <section className="section" id="experience">
        <div className="section-header reveal">
          <div>
            <p className="eyebrow">Experience</p>
            <h2>Experience</h2>
          </div>
        </div>

        <div className="timeline">
          {experience.map((item, index) => (
            <article className="timeline-item reveal" key={item.title}>
              <div className="timeline-marker" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="timeline-content">
                <p className="experience-date">{item.meta}</p>
                <h3>{item.title}</h3>
                <p className="experience-role">{item.role}</p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-header reveal">
          <div>
            <p className="eyebrow">Skills</p>
            <h2>Tools I build with</h2>
          </div>
          <p className="section-intro">
            Languages, frameworks, data systems, cloud platforms, and developer tools from my current technical stack.
          </p>
        </div>

        <div className="skills-list">
          {skills.map((skillGroup) => (
            <section className="skill-group reveal" key={skillGroup.group} aria-labelledby={`skill-${skillGroup.group.toLowerCase()}`}>
              <h3 id={`skill-${skillGroup.group.toLowerCase()}`}>{skillGroup.group}</h3>
              <div>
                {skillGroup.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-panel reveal">
          <h2>Let&apos;s work together!</h2>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label} title={link.label}>
                <ContactIcon name={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
