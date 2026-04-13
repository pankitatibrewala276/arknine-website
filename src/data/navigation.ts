export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Investor Relations",
    href: "/investor-relations",
    children: [
      { label: "Results", href: "/investor-relations/results" },
      { label: "Governance", href: "/investor-relations/governance" },
      { label: "Policies", href: "/investor-relations/policies" },
      { label: "Announcements", href: "/investor-relations/announcements" },
    ],
  },
  { label: "Impact", href: "/impact" },
  { label: "Blog & PR", href: "/gallery/blogs" },
];

export const irSubNavigation: NavItem[] = [
  { label: "Results", href: "/investor-relations/results" },
  { label: "Governance", href: "/investor-relations/governance" },
  { label: "Policies", href: "/investor-relations/policies" },
  { label: "Announcements", href: "/investor-relations/announcements" },
];

export const footerNavigation = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Impact", href: "/impact" },
    { label: "Contact", href: "/contact" },
    { label: "Blog & PR", href: "/gallery/blogs" },
  ],
  brands: [
    { label: "Dukaan Dost", href: "https://dukaandost.com" },
    { label: "Monotone", href: "https://www.monotone.in" },
  ],
  investorRelations: [
    { label: "Results", href: "/investor-relations/results" },
    { label: "Governance", href: "/investor-relations/governance" },
    { label: "Policies", href: "/investor-relations/policies" },
    { label: "Announcements", href: "/investor-relations/announcements" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
