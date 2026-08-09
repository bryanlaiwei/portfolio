export const siteConfig = {
  name: "Bryan Wei",
  title: "CS @ Uwaterloo & Software Developer",
  email: "l76wei@uwaterloo.ca",
  github: "https://github.com/bryanlaiwei",
  linkedin: "https://www.linkedin.com/in/bryan-wei-23bb552a9/",
  location: "Kitchener, Ontario",
  handle: "bryan.wei",
  stack: ["TypeScript", "Python", "React", "Next.js", "Node.js", "AWS"],
};

export const aboutContent = {
  intro:
    "I'm an Honours Computer Science Co-op student at the University of Waterloo and a software developer focused on developer tooling, full-stack systems, and AI-powered applications.",
  technologies: [
    {
      category: "Languages",
      items: ["Python", "C++", "TypeScript", "JavaScript", "Java", "C", "SQL", "Bash", "PowerShell"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["React", "React Native", "Next.js", "Node.js", "Express", "Spring Boot"],
    },
    {
      category: "Databases",
      items: ["SQLite", "MySQL", "MongoDB", "Convex", "Tinybird"],
    },
    {
      category: "Tools & Platforms",
      items: ["Bun", "Git", "GitHub", "Linux", "Amazon Web Services", "Postman", "Axios"],
    },
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  tech: string[];
  logo: string | null;
  logoAlt: string;
};

export const experiences: Experience[] = [
  {
    company: "Traces",
    role: "Software Developer",
    period: "May 2026 - Aug 2026",
    highlights: [
      "Contributed to Traces, a developer platform for capturing, sharing, and continuing coding sessions across different coding agents and teams",
      "Built and maintained data-ingestion adapters for 14+ coding agents, including local session discovery, content parsing, and schema normalization across JSONL files, SQLite DBs, and cloud-backed session stores",
      "Built a session-lineage pipeline for 8+ agents to infer parent-subagent relationships from native session stores and preserve lineage across local indexing, API surfaces, remote sync, and Convex storage",
      "Developed token usage tracking for 8+ agents, extracting agent-specific usage into shared TypeScript schemas, with CLI persistence, remote sync, and storage in Convex and Tinybird",
      "Designed a cross-platform path-resolution module for macOS, Windows, and Linux, standardizing agent storage discovery across OS-specific filesystem conventions",
    ],
    tech: ["TypeScript", "SQLite", "Convex", "Tinybird", "Bun"],
    logo: "/logos/traces.png",
    logoAlt: "Traces logo",
  },
  {
    company: "Ministry of the Attorney General",
    role: "System Support Officer",
    period: "Sep 2025 - Dec 2025",
    highlights: [
      "Supported IT systems for 450+ staff and developed PowerShell automation for post-patch server and virtual machine restart workflows.",
    ],
    tech: ["PowerShell", "Windows Server", "Virtual Machines", "IT Support"],
    logo: "/logos/ontario.svg",
    logoAlt: "Ministry of the Attorney General logo",
  },
];

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectCaseStudy = {
  challenge: string;
  approach: string;
  outcome: string;
};

export type Project = {
  title: string;
  description: string;
  role: string;
  period: string;
  tech: string[];
  image: string | null;
  metrics: ProjectMetric[];
  caseStudy: ProjectCaseStudy;
  github: string;
  demo: string | null;
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: "Codexpert",
    description: "An Gemini API powered coding agent",
    role: "Independent developer",
    period: "Feb 2026",
    tech: ["Python", "Gemini API", "ReAct", "Function Calling"],
    image: null,
    metrics: [{ label: "control loop", value: "ReAct" }],
    caseStudy: {
      challenge: "Coding assistants need to reason across files and tool results, not just produce one response.",
      approach: "Implemented an iterative ReAct loop with structured tool schemas and Gemini function calling.",
      outcome: "Created an agent that can continue working until a requested coding task is complete.",
    },
    github: "https://github.com/imnotwl/Codexpert",
    demo: "https://youtu.be/jw9gZJm2pUA",
    featured: true,
  },
  {
    title: "ThreadSpace",
    description:
      "A mobile discussion forum with a React Native and TypeScript client backed by Java, Spring Boot, and MySQL. Its layered MVC backend exposes 15+ REST APIs for authentication and core community features.",
    role: "Independent full-stack developer",
    period: "Dec 2025",
    tech: ["React Native", "TypeScript", "Java", "Spring Boot", "MySQL"],
    image: null,
    metrics: [{ label: "REST endpoints", value: "15+" }],
    caseStudy: {
      challenge: "A mobile discussion product needed consistent data and authentication across client and server.",
      approach: "Built a layered MVC backend and React Native client with JPA entities, repositories, and DTOs.",
      outcome: "Delivered a maintainable end-to-end forum supporting core community workflows.",
    },
    github: "https://github.com/imnotwl/ThreadSpace-Full-Code/tree/main",
    demo: "https://www.youtube.com/watch?v=PqXFl3_fb9E",
    featured: true,
  },
  {
    title: "ProRead",
    description:
      "A MERN e-book platform with 20+ REST APIs for books, reviews, reading lists, and authentication. AWS S3 pre-signed URLs enable direct client uploads and reduce server load.",
    role: "Independent full-stack developer",
    period: "Nov 2025",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "AWS S3"],
    image: null,
    metrics: [{ label: "REST endpoints", value: "20+" }],
    caseStudy: {
      challenge: "Large e-book files needed to upload reliably without passing through the application server.",
      approach: "Built a MERN application and generated pre-signed AWS S3 URLs for direct client uploads.",
      outcome: "Reduced backend upload load while supporting complete book and user management workflows.",
    },
    github: "https://github.com/imnotwl/ebook-store-full-code",
    demo: "https://youtu.be/DiTQP_93D-Q",
    featured: false,
  },
];

export const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/resume.pdf", label: "resume", external: true },
];
