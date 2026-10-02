import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(200),
  phone: z.string().max(30).optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const estimatorFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email is required').max(200),
  phone: z.string().max(30).optional().or(z.literal('')),
  project_scope: z.enum(['brand_site', 'ecommerce', 'web_app', 'automation_portal']),
  language_requirement: z.enum(['single', 'multi']),
  addons: z.array(z.enum(['admin_dashboard', 'payment_gateway', 'email_automation', 'seo_package'])),
  message: z.string().max(2000).optional().or(z.literal('')),
});

export type EstimatorFormData = z.infer<typeof estimatorFormSchema>;

const httpUrlSchema = z
  .string()
  .url('Must be a valid URL')
  .refine((value) => /^https?:\/\//i.test(value), 'URL must use http or https');

export const portfolioSchema = z.object({
  title: z.string().min(2, 'Title is required').max(200),
  description: z.string().max(1000).optional().or(z.literal('')),
  image_url: httpUrlSchema.optional().or(z.literal('')),
  live_url: httpUrlSchema.optional().or(z.literal('')),
  category: z.enum(['website', 'ecommerce', 'webapp', 'enterprise']),
  metrics: z.string().max(200).optional().or(z.literal('')),
  tech_tags: z.array(z.string()).default([]),
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
