/* eslint-disable @next/next/no-img-element -- small static logos and covers sized by CSS; next/image would add wrappers the design does not have */
import type { CSSProperties, ReactNode } from "react";
import ContactForm from "@/components/ContactForm";
import Enhancements from "@/components/Enhancements";
import {
  ArrowIcon,
  CheckIcon,
  CloseIcon,
  ContourMark,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MoonIcon,
  ResumeIcon,
  SunIcon,
} from "@/components/Icons";
import { aboutContent, experiences, projects, siteConfig, stack, stackBelts, type Project, type StackItem } from "@/data/portfolio";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Sets figures like "100+" or "97%" in tabular numerals, the way the design marks them. */
function withFigures(text: string): ReactNode[] {
  return text.split(/(\d+[+%])/).map((part, i) =>
    /^\d+[+%]$/.test(part) ? (
      <data key={i} value={part.slice(0, -1)}>
        {part}
      </data>
    ) : (
      part
    ),
  );
}

function Nav() {
  return (
    <header className="nav glass" id="nav">
      <a className="home" href="#top" data-jump="top">
        BW
      </a>
      <div className="items">
        <span className="lens" aria-hidden="true" />
        <a href="#experience" data-jump="experience">Experience</a>
        <a href="#projects" data-jump="projects">Projects</a>
        <a href="#stack" data-jump="stack">Stack</a>
        <a href="#contact" data-jump="contact">Contact</a>
      </div>
      <button className="theme" type="button" data-theme-toggle aria-label="Switch theme">
        <MoonIcon className="moon" />
        <SunIcon className="sun" />
      </button>
    </header>
  );
}

function Hero() {
  const [first, ...rest] = siteConfig.name.split(" ");
  return (
    <section className="hero" aria-labelledby="name">
      <div className="scene" aria-hidden="true">
        <div className="photo night" />
        <div className="photo day" />
        <div className="tint" />
      </div>
      <div className="container">
        <div className="copy-hero">
          <h1 id="name">
            {first} <span className="ti">{rest.join(" ")}</span>
          </h1>
          <p className="role">{siteConfig.role}</p>
          <p className="about">{aboutContent.intro}</p>
          <div className="status">
            <span className="clock">
              <span>{siteConfig.location}</span>
              <span>·</span>
              <time id="clock" dateTime="">
                --:--
              </time>
            </span>
          </div>
          <div className="links">
            <a className="chip solid" href={siteConfig.resume} {...external}>
              <ResumeIcon />
              Resume
            </a>
            <a className="chip glass" href={siteConfig.github} {...external}>
              <GitHubIcon />
              GitHub
            </a>
            <a className="chip glass" href={siteConfig.linkedin} {...external}>
              <LinkedInIcon />
              LinkedIn
            </a>
            <button className="chip glass chip-email" type="button" data-copy={siteConfig.email} aria-label="Copy email address">
              <MailIcon />
              <span className="stack-label">
                <span className="idle">{siteConfig.email}</span>
                <span className="done">
                  <CheckIcon />
                  Copied
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="container" aria-labelledby="experience-title">
      <div className="head">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title">Where I&apos;ve worked.</h2>
      </div>
      <div className="grid2">
        {experiences.map((x) => (
          <button key={x.id} className="xcard glass panel" type="button" data-detail={`d-${x.id}`}>
            <div className="top">
              <span className="logo">
                <img src={x.logo} alt={x.logoAlt} />
              </span>
              <span className="when">{x.period}</span>
            </div>
            <div>
              <h3>{x.role}</h3>
              <p className="org">{x.company}</p>
            </div>
            <div className="foot">
              <span className="more">
                Details <ArrowIcon />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectCover({ project }: { project: Project }) {
  const { cover } = project;
  if (cover.kind === "shot") {
    return (
      <div className="poster shot">
        <img src={cover.src} alt={cover.alt} loading="lazy" />
      </div>
    );
  }
  if (cover.ground === "stickdrift") {
    return (
      <div className="poster mark sd">
        <img src={cover.src} alt={cover.alt} />
      </div>
    );
  }
  return (
    <div className="poster mark ct">
      <ContourMark />
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="container" aria-labelledby="projects-title">
      <div className="head">
        <p className="eyebrow">Projects</p>
        <h2 id="projects-title">Things I&apos;ve built.</h2>
      </div>
      <div className="grid3">
        {projects.map((p) => (
          <article key={p.title} className="card glass panel">
            <div className="cover">
              <ProjectCover project={p} />
              <nav className="actions glass" aria-label={`${p.title} links`}>
                {p.demo && (
                  <a className="demo" href={p.demo} {...external}>
                    Demo ↗
                  </a>
                )}
                {p.live && (
                  <a className="live" href={p.live} {...external}>
                    Live ↗
                  </a>
                )}
                <a href={p.github} {...external}>
                  GitHub ↗
                </a>
              </nav>
            </div>
            <div className="body">
              <h3>
                <a href={p.github} {...external}>
                  {p.title}
                </a>
                <span className="date">{p.period}</span>
              </h3>
              <p>{p.description}</p>
              <ul className="tags">
                {p.tech.map((t) => (
                  <li key={t.slug} className="tag" data-tag={t.slug}>
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StackIcon({ item }: { item: StackItem }) {
  if (item.icon) {
    return (
      <svg className="ic" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d={item.icon} />
      </svg>
    );
  }
  return (
    <span className="ic mono" aria-hidden="true">
      {item.mono}
    </span>
  );
}

function StackSection() {
  return (
    <section id="stack" className="container" aria-labelledby="stack-title">
      <div className="head">
        <p className="eyebrow">Stack</p>
        <h2 id="stack-title">What I work with.</h2>
      </div>
      <ul className="sr-only">
        {stack.map((c) => (
          <li key={c.category}>
            {c.category}: {c.items.map((i) => i.label).join(", ")}
          </li>
        ))}
      </ul>
      <div className="belts" aria-hidden="true">
        {stackBelts.map((row, r) => {
          const pills = row.map((item) => (
            <li key={item.label} className="pill glass" data-tag={item.slug} style={{ "--brand": item.brand ?? "var(--text)" } as CSSProperties}>
              <StackIcon item={item} />
              <span>{item.label}</span>
            </li>
          ));
          // two identical tracks make the loop seamless; screen readers get the list above instead
          return (
            <div key={r} className={r ? "belt rev" : "belt"}>
              <ul className="track">{pills}</ul>
              <ul className="track" aria-hidden="true">
                {pills}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="belt-cats" aria-hidden="true">
        {stack.map((c) => c.category).join(" · ")}
      </p>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="container contact" aria-labelledby="contact-title">
      <div className="say">
        <div className="say-side">
          <h2 id="contact-title" className="say-big">
            Say <span>hello.</span>
          </h2>
          <p className="say-meta">
            <span>{siteConfig.location}</span>
            <span>·</span>
            <time id="contact-clock" dateTime="">
              --:--
            </time>
          </p>
        </div>
        <div className="contact-panel glass panel">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ExperienceDialogs() {
  return (
    <>
      {experiences.map((x) => (
        <dialog key={x.id} className="detail" id={`d-${x.id}`}>
          <div className="detail-panel glass panel">
            <div className="detail-top">
              <span className="logo">
                <img src={x.logo} alt="" />
              </span>
              <div>
                <h3>{x.role}</h3>
                <p className="meta">
                  {x.company} · {x.period}
                </p>
              </div>
              <button className="x" type="button" data-close aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <ul className="bullets">
              {x.highlights.map((h) => (
                <li key={h}>{withFigures(h)}</li>
              ))}
            </ul>
            {x.tech.length > 0 && (
              <ul className="tags">
                {x.tech.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </dialog>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />
      </main>
      <ExperienceDialogs />
      <div className="toast glass" id="toast" role="status" aria-live="polite">
        <CheckIcon />
        <span id="toast-text" />
      </div>
      <Enhancements />
    </>
  );
}
