export type NavSection = 'hero' | 'work' | 'services' | 'about' | 'journal' | 'contact';

export interface NavItem {
  id: NavSection;
  label: string;
  iconName: 'backpack' | 'building' | 'target' | 'smile' | 'newspaper' | 'mail';
}

export interface ClientLogo {
  id: string;
  name: string;
  category: string;
  tagline?: string;
  svgIcon?: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  tags: string[];
  deliverables: string[];
  description: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  accentColor: string;
  heroImage: string;
  gallery: string[];
  featuredUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  badge?: string;
  pricingTag: string;
  features: string[];
}

export interface Article {
  id: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  location: string;
  bio: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  notes: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
}
