export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  priceFrom: string | null;
  features: string[];
  highlight: boolean;
  order: number;
};

export type AgencyService = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
};

export type CaseStudy = {
  id: string;
  title: string;
  segment: string;
  imageUrl: string;
  description: string;
  order: number;
};

export type Testimonial = {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  order: number;
};

export type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  product?: string;
};

export type LandingData = {
  products: Product[];
  services: AgencyService[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
};
