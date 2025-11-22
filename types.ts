export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  link?: string;
  status?: string;
}

export interface Experience {
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
}

export interface Project {
  title: string;
  category: string;
  description: string[];
  technologies: string[];
  stats?: string; // e.g., "98.72% Accuracy"
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface BlogPost {
  title: string;
  subtitle: string;
  date: string;
  content: string[];
  tags: string[];
}