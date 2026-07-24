"use client";

import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { SignalField } from "@/components/signal-field";

const projects = [
  {
    title: "Interface Systems",
    description:
      "Product surfaces that turn messy workflows into sharp, legible tools with a clear path from intent to action.",
    tags: ["Product", "Systems", "UX"],
  },
  {
    title: "Applied AI",
    description:
      "Experiments and utilities that make model behavior inspectable, useful, and grounded in real user tasks.",
    tags: ["AI", "Tools", "Research"],
  },
  {
    title: "Web Craft",
    description:
      "Fast, expressive sites built with careful motion, strong typography, and deployment discipline.",
    tags: ["Next.js", "Motion", "Vercel"],
  },
];

const writing = [
  {
    date: "Now",
    title: "Designing interfaces that feel calm under pressure",
    type: "Essay",
  },
  {
    date: "Soon",
    title: "Notes on useful AI products and where they still fall short",
    type: "Notes",
  },
  {
    date: "Draft",
    title: "A personal operating manual for building in public",
    type: "Journal",
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
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="David Duong home">
            <span className="brand-mark">D</span>
            <span>David Duong</span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#writing">Writing</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section className="hero" id="top">
        <SignalField />
        <div className="hero-content">
          <p className="kicker reveal">Personal website in progress</p>
          <h1 className="reveal">David Duong</h1>
          <p className="hero-copy reveal">
            I build crisp product experiences, AI-fluent tools, and web systems with enough motion to feel alive.
          </p>
          <div className="hero-actions reveal">
            <a className="action primary" href="#work">
              See selected work
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

      <section className="section" id="work">
        <div className="section-header reveal">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Systems with a pulse</h2>
          </div>
          <p className="section-intro">
            The site starts with placeholder project categories so the design can move while the final project list is assembled.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card reveal" key={project.title}>
              <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-band" id="about">
        <div className="about-layout">
          <p className="about-copy reveal">
            A technical, atmospheric personal site built around typography, spatial graphics, and direct project storytelling.
          </p>
          <div className="stats reveal" aria-label="Site priorities">
            <div className="stat">
              <strong>01</strong>
              <span>Fast enough to keep the motion from becoming the product.</span>
            </div>
            <div className="stat">
              <strong>02</strong>
              <span>Clear enough for recruiters, detailed enough for engineers.</span>
            </div>
            <div className="stat">
              <strong>03</strong>
              <span>Ready for Vercel previews and production deploys from main.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="writing">
        <div className="section-header reveal">
          <div>
            <p className="eyebrow">Writing</p>
            <h2>Notes and signals</h2>
          </div>
          <p className="section-intro">
            Writing is included as a first-class section so future essays can drop into the site without another redesign.
          </p>
        </div>
        <div className="writing-list">
          {writing.map((item) => (
            <article className="writing-item reveal" key={item.title}>
              <time>{item.date}</time>
              <h3>{item.title}</h3>
              <span>{item.type}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-panel reveal">
          <h2>Build the next pass.</h2>
          <div className="contact-links">
            <a href="mailto:hello@example.com">hello@example.com</a>
            <a href="https://github.com/davidduonggg">github.com/davidduonggg</a>
            <a href="https://www.linkedin.com/">LinkedIn</a>
          </div>
        </div>
      </section>
    </main>
  );
}
