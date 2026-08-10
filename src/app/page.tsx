import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import ContactTerminal from "@/components/ContactTerminal";
import { aboutContent, experiences, projects, siteConfig, type Project } from "@/data/portfolio";

function technologyFileName(category: string) {
  return `${category.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}.txt`;
}

export default function Home() {
  return (
    <div className="portfolio-page">
      <section id="home" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy reveal">
            <p className="page-kicker">{siteConfig.title}</p>
            <h1 id="hero-title"><span>Bryan</span><span>Wei</span></h1>
            <div className="hero-actions">
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedinIn aria-hidden="true" />linkedin ↗</a>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />github ↗</a>
              <span className="hero-email">{siteConfig.email}</span>
            </div>
          </div>
          <div className="reveal reveal-delay">
            <TechnologiesTerminal />
          </div>
        </div>
      </section>

      <section id="about" className="portfolio-section" aria-labelledby="about-title">
        <div className="section-shell about-section-layout">
          <header className="section-heading about-copy">
            <h2 id="about-title"><span>./</span>about</h2>
            <p className="about-intro">{aboutContent.intro}</p>
          </header>
          <div className="portrait-slot" role="img" aria-label="Reserved space for Bryan Wei's portrait">
            <span className="portrait-corner portrait-corner-one" aria-hidden="true" />
            <span className="portrait-corner portrait-corner-two" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="experience" className="portfolio-section" aria-labelledby="experience-title">
        <div className="section-shell">
          <header className="section-heading compact-heading">
            <h2 id="experience-title"><span>./</span>experience</h2>
          </header>

          <div className="experience-timeline">
            {experiences.map((experience) => (
              <article className="experience-entry" key={experience.company}>
                <div className="experience-logo terminal-window">
                    {experience.logo ? (
                      <Image src={experience.logo} alt={experience.logoAlt} width={48} height={48} />
                    ) : (
                      <span aria-hidden="true">{experience.company.slice(0, 2).toUpperCase()}</span>
                    )}
                </div>
                <div className="experience-card terminal-window">
                  <div className="experience-card-grid">
                    <div className="experience-card-meta">
                      <p>{experience.period}</p>
                      <h3>{experience.company}</h3>
                    </div>
                    <div className="experience-content">
                      <h4>{experience.role}</h4>
                      <ul>
                        {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                      </ul>
                      <div className="chip-list">
                        {experience.tech.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="portfolio-section" aria-labelledby="projects-title">
        <div className="section-shell">
          <header className="section-heading compact-heading">
            <h2 id="projects-title"><span>./</span>projects</h2>
          </header>
          <div className="project-timeline">
            {projects.map((project) => (
              <div className="project-entry" key={project.title}>
                <span className="project-node" aria-hidden="true" />
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-title">
        <div className="section-shell contact-shell">
          <header className="section-heading compact-heading">
            <h2 id="contact-title"><span>./</span>contact</h2>
          </header>
          <ContactTerminal />
        </div>
      </section>
    </div>
  );
}

function TechnologiesTerminal() {
  return (
    <div className="terminal-window technologies-terminal" aria-labelledby="technologies-title">
      <div className="terminal-bar">
        <div className="terminal-dots" aria-hidden="true"><span /><span /><span /></div>
        <h2 id="technologies-title">technologies — zsh</h2>
      </div>
      <div className="technology-grid">
        {aboutContent.technologies.map((group) => (
          <article key={group.category}>
            <h3><span>$</span> cat {technologyFileName(group.category)}</h3>
            <p>{group.items.join("  ·  ")}</p>
          </article>
        ))}
      </div>
      <div className="terminal-bottom"><span>$</span><i aria-hidden="true" /></div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card terminal-window">
      <div className="project-card-bar terminal-bar">
        <span>project</span>
        <span>{project.period}</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-top">
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <div className="project-links">
            <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />github ↗</a>
            {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer"><FaYoutube aria-hidden="true" />demo ↗</a>}
          </div>
        </div>
        <div className="chip-list">
          {project.tech.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}
        </div>
      </div>
    </article>
  );
}
