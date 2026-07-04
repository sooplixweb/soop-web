import axios, { type AxiosInstance } from 'axios';

import type { AgencyService, CaseStudy, LeadPayload, Product, Testimonial } from './types';

const DEFAULT_API_URL = 'http://localhost:3000/api';

export function normalizeApiUrl(url?: string) {
  const value = (url || DEFAULT_API_URL).replace(/\/+$/, '');
  return value.endsWith('/api') ? value : `${value}/api`;
}

export function createApiClient(baseUrl = import.meta.env.VITE_API_URL as string | undefined) {
  const http: AxiosInstance = axios.create({
    baseURL: normalizeApiUrl(baseUrl),
    timeout: 10000,
  });

  return {
    async getProducts() {
      const response = await http.get<Product[]>('/products');
      return response.data;
    },
    async getServices() {
      const response = await http.get<AgencyService[]>('/services');
      return response.data;
    },
    async getCaseStudies() {
      const response = await http.get<CaseStudy[]>('/case-studies');
      return response.data;
    },
    async getTestimonials() {
      const response = await http.get<Testimonial[]>('/testimonials');
      return response.data;
    },
    async createLead(payload: LeadPayload) {
      const response = await http.post('/leads', payload);
      return response.data as { id: string };
    },
  };
}

export const apiClient = createApiClient();
