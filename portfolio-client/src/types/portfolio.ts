export interface Skill {
    _id: string;
    name: string;
    icon?: string;
    category:
    | "Frontend"
    | "Backend"
    | "DevOps"
    | "Language"
    | "Database"
    | "Other";
    isTool: boolean;
}

export interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    githubUrl: string;
    liveUrl?: string;
    category?: string;
}

// types.ts or at the top of your component
export interface IExperience {
  _id?: string;
  company: string;
  role: string;
  location?: string;
  startDate: string; // "July 2025"
  endDate?: string;
  isCurrent: boolean;
  description: string[];
}

export interface Education {
    _id: string;
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export interface Config {
    email?: string;
    phone?: string;
    location?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    whatsapp?: string;
}