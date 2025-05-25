export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  headline: string;
  location: string;
  skills: string[];
  availability: 'Open to Hire' | 'Open to Work' | 'Not Available' | 'Collaboration' | null;
  role: string;
  lastActive: string;
  bio?: string;
  services?: Service[];
  portfolio?: PortfolioItem[];
  testimonials?: Testimonial[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit?: 'fixed' | 'hourly' | 'monthly';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface AnalyticsData {
  totalMembers: number;
  openToHire: number;
  openToWork: number;
  activeLast7Days: number;
  timeZones: {
    zone: string;
    count: number;
  }[];
  roles: {
    role: string;
    percentage: number;
  }[];
  tools: string[];
  topSkills: {
    skill: string;
    count: number;
  }[];
  openProjects: {
    count: number;
    trend: number[];
  };
  averagePrice: number;
}