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

export function HomePage() {
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
            <a className="resume-link" href="/David_Duong_Resume.pdf" target="_blank" rel="noreferrer">
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
            <a href="mailto:davidduonggg@gmail.com">davidduonggg@gmail.com</a>
            <a href="https://github.com/davidduonggg">github.com/davidduonggg</a>
            <a href="https://www.linkedin.com/in/dduong7/">linkedin.com/in/dduong7</a>
          </div>
        </div>
      </section>
    </main>
  );
}
