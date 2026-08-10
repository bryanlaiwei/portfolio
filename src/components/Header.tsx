"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationTarget = useRef<string | null>(null);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    const alreadyAtTarget = Math.abs(target.getBoundingClientRect().top - scrollPadding) <= 4;

    navigationTarget.current = alreadyAtTarget || (id === "contact" && atPageBottom) ? null : id;
    setActiveSection(id);
    setMenuOpen(false);
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    target.scrollIntoView({ block: "start" });
  };

  useEffect(() => {
    let frame = 0;

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

        if (navigationTarget.current) {
          const target = document.getElementById(navigationTarget.current);
          const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
          const reachedTarget = target && Math.abs(target.getBoundingClientRect().top - scrollPadding) <= 4;
          const reachedContact = navigationTarget.current === "contact" && atPageBottom;

          if (!reachedTarget && !reachedContact) return;
          navigationTarget.current = null;
        }

        if (atPageBottom) {
          setActiveSection("contact");
          return;
        }

        const marker = window.scrollY + window.innerHeight * 0.36;
        let currentSection = sections[0].id;

        sections.forEach(({ id }) => {
          const element = document.getElementById(id);
          if (element && element.offsetTop <= marker) currentSection = id;
        });

        setActiveSection(currentSection);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <nav className="desktop-nav" aria-label="Primary navigation">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={activeSection === section.id ? "active" : ""}
              aria-current={activeSection === section.id ? "location" : undefined}
              onClick={(event) => handleNavigation(event, section.id)}
            >
              <span className="nav-prompt" aria-hidden="true">./</span>{section.label}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume <span aria-hidden="true">↗</span></a>
        </nav>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "close" : "menu"}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} onClick={(event) => handleNavigation(event, section.id)}>
              <span>./</span>{section.label}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume ↗</a>
        </nav>
      )}
    </header>
  );
}
