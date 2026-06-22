import {
  python,
  django,
  tensorflow,
  sklearn,
  pandas,
  numpy,
  sql,
  git,
  vscode,
  machinelearning,
  verifund,
  backend,
} from "../assets";

// ─── Contact Info ─────────────────────────────────────────────
export const contactInfo = {
  name: "Shivam Arora",
  location: "Ghaziabad, Uttar Pradesh",
  phone: "+91-7302399912",
  email: "shivamarora382004@gmail.com",
  linkedin: "https://www.linkedin.com/in/shivamarora384/",
  github: "https://github.com/Shivu384",
  leetcode: "https://leetcode.com/u/Shivu384/",
};

// ─── Nav Links ────────────────────────────────────────────────
export const navLinks = [
  { id: "about",   title: "About"   },
  { id: "work",    title: "Work"    },
  { id: "projects",title: "Projects"},
  { id: "github",  title: "GitHub"  },
  { id: "contact", title: "Contact" },
];

// ─── Services (About cards) ───────────────────────────────────
const services = [
  { title: "Agentic AI Engineer",        icon: machinelearning },
  { title: "GenAI / LLM Developer",      icon: machinelearning },
  { title: "Backend Engineer",           icon: backend         },
  { title: "Voice AI Specialist",        icon: machinelearning },
];

// ─── Technologies (Skills) ────────────────────────────────────
// Icons reuse existing assets; missing ones fall back to initials
const technologies = [
  { name: "Python",       icon: python        },
  { name: "FastAPI",      icon: backend       }, // placeholder → letter fallback
  { name: "Django",       icon: django        },
  { name: "SQL",          icon: sql           },
  { name: "JavaScript",   icon: vscode        }, // placeholder
  { name: "TensorFlow",   icon: tensorflow    },
  { name: "Scikit-learn", icon: sklearn       },
  { name: "Pandas",       icon: pandas        },
  { name: "NumPy",        icon: numpy         },
  { name: "Git",          icon: git           },
  { name: "LLMs / RAG",   icon: machinelearning },
  { name: "VS Code",      icon: vscode        },
];

// ─── Experience ───────────────────────────────────────────────
const experiences = [
  {
    title: "Backend Developer Intern",
    company_name: "Speedse Logistics Pvt. Ltd",
    icon: backend,
    iconBg: "#0d1a30",
    date: "Feb 2026 – Present",
    location: "Remote",
    points: [
      "Built and maintained 50+ Django REST APIs for load management, bidding, tracking, and payments.",
      "Optimized backend services using Redis and Docker, reducing API latency by ~25% and improving scalability.",
      "Contributed to payment, tracking, and admin workflows, improving system reliability and operational efficiency.",
    ],
  },
  {
    title: "AI Engineer",
    company_name: "Cogniwide UK",
    icon: machinelearning,
    iconBg: "#1a1040",
    date: "Jul 2025 – Jan 2026",
    location: "Remote",
    points: [
      "Built AI voice agents using LLMs, Deepgram, and ElevenLabs, improving automation efficiency by ~30%.",
      "Developed scalable Django/FastAPI APIs with Redis and Docker, reducing latency by ~25%.",
      "Integrated real-time speech pipelines, enabling seamless voice-driven enterprise workflows.",
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────
const projects = [
  {
    name: "LLM Guardrails Gateway",
    description:
      "Production-grade AI safety gateway with 5-layer guardrails: PII redaction, prompt-injection detection, toxicity filtering, topic moderation, and JSON schema validation. YAML-based policy engine reduces update effort by ~80% without code changes.",
    tags: [
      { name: "FastAPI",      color: "green-text-gradient"  },
      { name: "Presidio",     color: "blue-text-gradient"   },
      { name: "GuardrailsAI", color: "pink-text-gradient"   },
      { name: "Docker",       color: "orange-text-gradient" },
    ],
    image: backend,
    source_code_link: "https://github.com/Shivu384",
    date: "December 2025",
  },
  {
    name: "LLM Eval CI/CD Pipeline",
    description:
      "Automated evaluation pipeline assessing hallucination rate, faithfulness, relevancy, latency, and cost across 100+ versioned benchmark cases. GitHub Actions gates block merges when hallucination > 5% or p95 latency violates SLA.",
    tags: [
      { name: "RAG",            color: "blue-text-gradient"   },
      { name: "GitHub Actions", color: "green-text-gradient"  },
      { name: "Streamlit",      color: "pink-text-gradient"   },
      { name: "DVC",            color: "orange-text-gradient" },
    ],
    image: verifund,
    source_code_link: "https://github.com/Shivu384",
    date: "March 2026",
  },
  {
    name: "Verifund (P2P Lending Platform)",
    description:
      "A peer-to-peer lending platform with secure loan processing, ML-powered credit risk model, OCR automation for document handling, and PAN card KYC validation via IDfy API for compliance and fraud detection.",
    tags: [
      { name: "django",        color: "blue-text-gradient"   },
      { name: "machinelearning", color: "green-text-gradient" },
      { name: "ocr",           color: "pink-text-gradient"   },
      { name: "idfy",          color: "orange-text-gradient" },
    ],
    image: verifund,
    source_code_link: "https://github.com/Shivu384/VERIFUND_SPRINTHACKS",
  },
  {
    name: "Ecommerce Shopping Cart",
    description:
      "A full-featured web application with dynamic shopping cart, product catalog, and search functionality. Features secure user authentication with email verification, Paytm payment gateway integration, order tracking, and automated invoicing.",
    tags: [
      { name: "django",    color: "blue-text-gradient"   },
      { name: "bootstrap", color: "green-text-gradient"  },
      { name: "sqlite",    color: "pink-text-gradient"   },
      { name: "paytm",     color: "orange-text-gradient" },
    ],
    image: backend,
    source_code_link: "https://github.com/Shivu384",
  },
];

// ─── Education ────────────────────────────────────────────────
const education = {
  degree: "B.Tech – Computer Science and Engineering",
  institution: "KIET Group of Institutions, Ghaziabad",
  duration: "2023 – Present",
  cgpa: "8.2",
  location: "Ghaziabad, Uttar Pradesh",
};

// ─── Certifications ───────────────────────────────────────────
const certifications = [
  {
    name: "CS50: Intro to Programming with Python",
    issuer: "Harvard University",
    icon: python,
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    icon: backend,
  },
];

// ─── Extracurriculars ─────────────────────────────────────────
const extracurriculars = [
  {
    title: "Core Member",
    organization: "Innogeeks (Technical Club) – KIET",
    duration: "October 2023 – Present",
    points: [
      "Mentoring juniors and co-organizing hackathons including NASA Space Apps and open-source events.",
      "Leading technical workshops on AI/ML and backend development.",
    ],
  },
  {
    title: "Active Member",
    organization: "KIET MUN Society",
    duration: "2023 – Present",
    points: [
      "Participating in MUN conferences, developing communication and problem-solving skills.",
    ],
  },
];

// ─── GitHub Stats (static reference — real data via GitHub API img embeds) ──
export const githubStats = {
  username: "Shivu384",
  totalCommits: "500+",
  publicRepos: "15+",
  leetcodeSolved: "300+",
  codechefSolved: "100+",
  longestStreak: "21 days",
  currentStreak: "Active",
};

export {
  services,
  technologies,
  experiences,
  projects,
  education,
  certifications,
  extracurriculars,
};
