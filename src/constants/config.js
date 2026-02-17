// Configuration constants for Hamman Muraya's portfolio

export const PERSONAL_INFO = {
  name: "Hamman Muraya",
  title: "Senior Software Engineer & AI Specialist",
  email: "hammanmuraya009@gmail.com",
  phone: "+1 (253) 378-4293",
  location: "Auburn, WA",
  github: "https://github.com/MurayaSoftTouch",
  linkedin: "https://linkedin.com/in/haman-softwaredev",
  portfolio: "https://hamanporfolio.vercel.app/",
};

export const NAVIGATION = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Skills", path: "#skills" },
  { name: "Projects", path: "#projects" },
  { name: "Experience", path: "#experience" },
  { name: "Contact", path: "#contact" },
];

export const SOCIAL_LINKS = [
  { name: "GitHub", url: PERSONAL_INFO.github, icon: "github" },
  { name: "LinkedIn", url: PERSONAL_INFO.linkedin, icon: "linkedin" },
  { name: "Email", url: `mailto:${PERSONAL_INFO.email}`, icon: "mail" },
];