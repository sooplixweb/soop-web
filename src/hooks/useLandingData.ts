import { useEffect, useState } from 'react';

import { apiClient } from '../api';
import type { LandingData } from '../types';

type LandingDataState = LandingData & {
  loading: boolean;
  error: string | null;
};

const initialState: LandingDataState = {
  products: [],
  services: [],
  caseStudies: [],
  testimonials: [],
  loading: true,
  error: null,
};

export function useLandingData() {
  const [state, setState] = useState<LandingDataState>(initialState);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [products, services, caseStudies, testimonials] = await Promise.all([
          apiClient.getProducts(),
          apiClient.getServices(),
          apiClient.getCaseStudies(),
          apiClient.getTestimonials(),
        ]);

        if (active) {
          setState({ products, services, caseStudies, testimonials, loading: false, error: null });
        }
      } catch {
        if (active) {
          setState((current) => ({
            ...current,
            loading: false,
            error: 'Não foi possível carregar o conteúdo agora.',
          }));
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return state;
}
