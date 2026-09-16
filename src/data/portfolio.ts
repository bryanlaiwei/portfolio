export const siteConfig = {
  title: "CS @ Uwaterloo & Software Developer",
  email: "l76wei@uwaterloo.ca",
  github: "https://github.com/bryanlaiwei",
  linkedin: "https://www.linkedin.com/in/bryan-wei-23bb552a9/",
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
  logoFraming: {
    scale: number;
    position: string;
  };
};

export const experiences: Experience[] = [
  {
    company: "Workplace Safety and Insurance Board",
    role: "Full Stack Developer",
    period: "Sep 2026 - Present",
    highlights: [
      "Working in the Innovation Lab, with more details to come as I settle into the role.",
    ],
    tech: [],
    logo: "/logos/wsib.jpg",
    logoAlt: "Workplace Safety and Insurance Board logo",
    logoFraming: { scale: 1, position: "50% 50%" },
  },
  {
    company: "Traces",
    role: "Software Developer",
    period: "May 2026 - Aug 2026",
    highlights: [
      "Contributed to Traces, a developer platform used by 100+ organizations for capturing, sharing, and continuing coding sessions across different coding agents and teams",
      "Built and maintained data-ingestion adapters for 14+ coding agents, including local session discovery, content parsing, and schema normalization across JSONL files, SQLite DBs, and cloud-backed session stores",
      "Built a subagent discovery pipeline with 97% accuracy for 8+ agents to infer subagent relationships from native session stores and preserve lineage across local indexing, API surfaces, remote sync, and Convex storage",
      "Developed a token usage tracking feature for 8+ agents, mapping agent-specific per API call and session level usage into shared TypeScript schemas, with CLI sync and persistence in Convex and Tinybird, achieving 99% accuracy",
      "Designed a provider-neutral engine to capture cloud-agent sessions across polling, webhook, and streaming interfaces, with concurrent job processing and idempotent, retry-safe persistence",
    ],
    tech: ["TypeScript", "React", "Bun", "SQLite", "Convex", "Tinybird", "Distributed Systems", "CI/CD"],
    logo: "/logos/traces.jpg",
    logoAlt: "Traces logo",
    logoFraming: { scale: 1, position: "50% 50%" },
  },
  {
    company: "Ministry of the Attorney General",
    role: "System Support Officer",
    period: "Sep 2025 - Dec 2025",
    highlights: [
      "Supported IT systems for 450+ staff and developed PowerShell automation for post-patch server and virtual machine restart workflows.",
    ],
    tech: ["PowerShell", "Windows Server", "Virtual Machines", "IT Support"],
    logo: "/logos/ontario-wordmark.jpg",
    logoAlt: "Ministry of the Attorney General logo",
    logoFraming: { scale: 1.4, position: "50% 50%" },
  },
];

export type Project = {
  title: string;
  description: string;
  period: string;
  tech: string[];
  github: string;
  demo: string | null;
};

export const projects: Project[] = [
  {
    title: "Codexpert",
    description: "An Gemini API powered coding agent",
    period: "Feb 2026",
    tech: ["Python", "Gemini API", "ReAct", "Function Calling"],
    github: "https://github.com/imnotwl/Codexpert",
    demo: "https://youtu.be/jw9gZJm2pUA",
  },
  {
    title: "ThreadSpace",
    description:
      "A mobile discussion forum with a React Native and TypeScript client backed by Java, Spring Boot, and MySQL. Its layered MVC backend exposes 15+ REST APIs for authentication and core community features.",
    period: "Dec 2025",
    tech: ["React Native", "TypeScript", "Java", "Spring Boot", "MySQL"],
    github: "https://github.com/imnotwl/ThreadSpace-Full-Code/tree/main",
    demo: "https://www.youtube.com/watch?v=PqXFl3_fb9E",
  },
  {
    title: "ProRead",
    description:
      "A MERN e-book platform with 20+ REST APIs for books, reviews, reading lists, and authentication. AWS S3 pre-signed URLs enable direct client uploads and reduce server load.",
    period: "Nov 2025",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "AWS S3"],
    github: "https://github.com/imnotwl/ebook-store-full-code",
    demo: "https://youtu.be/DiTQP_93D-Q",
  },
];
