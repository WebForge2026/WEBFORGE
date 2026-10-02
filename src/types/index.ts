export type Language = 'DE' | 'EN' | 'BG';

export type LeadStatus = 'new' | 'contacted' | 'meeting_scheduled' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string;
  features_selected: string[] | null;
  estimated_budget: string | null;
  message: string | null;
  language: string;
  status: LeadStatus;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  live_url: string | null;
  category: 'website' | 'ecommerce' | 'webapp' | 'enterprise';
  metrics: string | null;
  tech_tags: string[] | null;
  created_at: string;
}

export interface PortfolioInput {
  title: string;
  description: string;
  image_url: string;
  live_url: string;
  category: 'website' | 'ecommerce' | 'webapp' | 'enterprise';
  metrics: string;
  tech_tags: string[];
}

export type ProjectScope = 'brand_site' | 'ecommerce' | 'web_app' | 'automation_portal';
export type LanguageRequirement = 'single' | 'multi';
export type AddOn = 'admin_dashboard' | 'payment_gateway' | 'email_automation' | 'seo_package';
