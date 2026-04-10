// ============================================================
// SHARED DATA TYPES
// All content structures used across the site.
// ============================================================

/** Board of Directors / Key Managerial Personnel */
export interface TeamMember {
  name: string;
  slug: string;
  role: string;
  bio: string;
  fullBio: string;
  imageSrc?: string;
  initials: string;
  type: "board" | "kmp";
}

/** Service offering displayed on Home page */
export interface Service {
  title: string;
  description: string;
  iconName: string; // lucide-react icon name
}

/** Client for the logo grid */
export interface Client {
  name: string;
  logoSrc: string;
}

/** Testimonial quote */
export interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  company?: string;
  initials: string;
}

/** IR Policy document */
export interface Policy {
  name: string;
  slug: string;
  documentUrl: string;
}

/** IR Financial result (quarterly/annual) */
export interface FinancialResult {
  id: string;
  title: string;
  date: string;
  period: string; // e.g. "Q3 FY2025", "Annual FY2025"
  category: "quarterly" | "annual";
  documentUrl: string;
}

/** IR Announcement */
export interface Announcement {
  id: string;
  title: string;
  date: string;
  tag?: string;
  documentUrl: string;
}

/** Committee member for governance tables */
export interface GovernanceCommittee {
  name: string;
  members: {
    name: string;
    designation: string;
    role: string;
  }[];
}

/** Address for Contact page */
export interface OfficeAddress {
  label: string;
  lines: string[];
  phone?: string;
  email?: string;
}

/** Blog post */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  excerpt: string;
}

/** Event or press release */
export interface EventItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage?: string;
  excerpt: string;
}

/** Key metric for stat displays */
export interface KeyMetric {
  value: string;
  label: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    percentage: string;
  };
}