import {
  python,
  django,
  tensorflow,
  sklearn,
  pandas,
  numpy,
  sql,
  matplotlib,
  seaborn,
  jupyter,
  vscode,
  git,
  datascientist,
  machinelearning,
  verifund,
  backend,
} from "../assets";

// Use existing icons as placeholders for missing tech
const cogniwide = backend; // Placeholder for company
const oasis = datascientist; // Placeholder for company
const ecommerce = verifund; // Placeholder for project

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

// Contact Information
export const contactInfo = {
  name: "Shivam Arora",
  location: "Meerut Road, Ghaziabad, UP 201206",
  phone: "+91-7302399912",
  email: "shivamarora382004@gmail.com",
  linkedin: "https://www.linkedin.com/in/shivamarora384/",
  github: "https://github.com/Shivu384",
  leetcode: "https://leetcode.com/u/Shivu384/",
};

const services = [
  {
    title: "AI Engineer",
    icon: machinelearning,
  },
  {
    title: "Machine Learning Engineer",
    icon: machinelearning,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Voice AI Specialist",
    icon: machinelearning,
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Django",
    icon: django,
  },
  {
    name: "SQL",
    icon: sql,
  },
  {
    name: "TensorFlow",
    icon: tensorflow,
  },
  {
    name: "Scikit-learn",
    icon: sklearn,
  },
  {
    name: "Pandas",
    icon: pandas,
  },
  {
    name: "NumPy",
    icon: numpy,
  },
  {
    name: "Seaborn",
    icon: seaborn,
  },
  {
    name: "Matplotlib",
    icon: matplotlib,
  },
  {
    name: "Jupyter",
    icon: jupyter,
  },
  {
    name: "VS Code",
    icon: vscode,
  },
  {
    name: "Git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Backend Developer",
    company_name: "Cogniwide UK",
    icon: cogniwide,
    iconBg: "#1a1a2e",
    date: "July 2025 - Present",
    location: "Remote",
    points: [
      "Developed voice agents using contemporary tools like ElevenLabs, Deepgram, and LLMs to improve conversational AI.",
      "Implemented back-end CRUD operations and workflow automation using a workflow builder.",
      "Managed and created RESTful APIs and utilized Docker for containerized application deployment.",
    ],
  },
  {
    title: "Data Analyst",
    company_name: "Oasis Infobyte",
    icon: oasis,
    iconBg: "#F0F0F0",
    date: "August 2024",
    location: "Remote",
    points: [
      "Conducted Exploratory Data Analysis (EDA) and data preprocessing on large-scale retail sales datasets.",
      "Developed and optimized machine learning models (using Scikit-learn, Python) for house price prediction.",
      "Validated analytical results by benchmarking projects on Kaggle datasets.",
    ],
  },
];

const projects = [
  {
    name: "Ecommerce Shopping Cart",
    description:
      "A full-featured web application with dynamic shopping cart, product catalog, and search functionality. Features secure user authentication with email verification, Paytm payment gateway integration, order tracking, and automated invoicing.",
    tags: [
      {
        name: "django",
        color: "blue-text-gradient",
      },
      {
        name: "bootstrap",
        color: "green-text-gradient",
      },
      {
        name: "sqlite",
        color: "pink-text-gradient",
      },
      {
        name: "paytm",
        color: "orange-text-gradient",
      },
    ],
    image: ecommerce,
    source_code_link: "https://github.com/Shivu384",
  },
  {
    name: "Verifund (P2P Lending Platform)",
    description:
      "A peer-to-peer lending platform with secure loan processing, ML-powered credit risk model, OCR automation for document handling, and PAN card KYC validation via IDfy API for compliance and fraud detection.",
    tags: [
      {
        name: "django",
        color: "blue-text-gradient",
      },
      {
        name: "machinelearning",
        color: "green-text-gradient",
      },
      {
        name: "ocr",
        color: "pink-text-gradient",
      },
      {
        name: "idfy",
        color: "orange-text-gradient",
      },
    ],
    image: verifund,
    source_code_link: "https://github.com/Shivu384/VERIFUND_SPRINTHACKS",
  },
];

const education = {
  degree: "B.Tech Computer Science and Engineering",
  institution: "KIET Group of Institutions, Ghaziabad",
  duration: "2023 - Present",
  cgpa: "8.5",
};

const certifications = [
  {
    name: "Programming with Python CS50",
    issuer: "Harvard University",
    icon: python,
  },
  {
    name: "Getting Started with Machine Learning Algorithms",
    issuer: "Simplilearn",
    icon: machinelearning,
  },
  {
    name: "Generative AI for Everyone",
    issuer: "Coursera - DeepLearning.ai",
    icon: tensorflow,
  },
];

const extracurriculars = [
  {
    title: "Core Member",
    organization: "Innogeeks (Technical Club)",
    duration: "October 2023 - Present",
    points: [
      "Spearheaded high-impact technical events and workshops.",
      "Mentored students in Machine Learning, fostering innovation and project leadership.",
    ],
  },
];

export {
  services,
  technologies,
  experiences,
  projects,
  education,
  certifications,
  extracurriculars,
};
