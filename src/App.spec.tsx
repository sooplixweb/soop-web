import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import App from './App';

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

vi.mock('./hooks/useLandingData', () => ({
  useLandingData: () => ({
    products: [
      {
        id: 'delivery-1',
        slug: 'gestao-delivery-hamburguerias',
        name: 'Gestão de Delivery para Hamburguerias',
        tagline: 'Operação e pedidos',
        description: 'Fluxo para delivery.',
        category: 'Delivery',
        priceFrom: null,
        features: ['Cardápio digital', 'Pedidos online', 'Fluxo operacional', 'Painel de gestão'],
        highlight: true,
        order: 1,
      },
    ],
    services: [],
    caseStudies: [
      {
        id: 'case-1',
        title: 'Mais Burguer',
        segment: 'Delivery / Hamburgueria',
        imageUrl: '',
        description: 'Case de delivery.',
        order: 1,
      },
      {
        id: 'case-2',
        title: 'Advocacia Premium',
        segment: 'Advocacia',
        imageUrl: '',
        description: 'Case jurídico.',
        order: 2,
      },
    ],
    testimonials: [],
    loading: false,
    error: null,
  }),
}));

vi.mock('./components/Logo', () => ({
  Logo: () => <div>Logo</div>,
}));

vi.mock('./components/MotionSection', () => ({
  MotionSection: ({
    children,
    className,
    id,
  }: {
    children: ReactNode;
    className?: string;
    id?: string;
  }) => (
    <section className={className} id={id}>
      {children}
    </section>
  ),
}));

describe('App case studies', () => {
  it('renders only Ambug Burg and Amagus Lapidar with clickable project captions', () => {
    const { container } = render(<App />);

    const casesSection = container.querySelector('#cases');
    const titles = Array.from(container.querySelectorAll('#cases .case-card h3')).map((node) =>
      node.textContent?.trim(),
    );
    const caseCards = container.querySelectorAll('#cases .case-card');
    const caseLinks = casesSection?.querySelectorAll('.case-visual__caption-link') ?? [];
    const ambugLink = casesSection?.querySelector('[aria-label="Abrir projeto Ambug Burg"]');
    const amagusLink = casesSection?.querySelector('[aria-label="Abrir projeto Amagus Lapidar"]');

    expect(caseCards).toHaveLength(2);
    expect(casesSection).not.toBeNull();
    expect(caseLinks).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Ambug Burg', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Amagus Lapidar', level: 3 })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Advocacia Premium', level: 3 })).not.toBeInTheDocument();
    expect(titles).toEqual(['Ambug Burg', 'Amagus Lapidar']);
    expect(ambugLink).toHaveAttribute(
      'href',
      'https://ambugburg.sooplix.com.br',
    );
    expect(amagusLink).toHaveAttribute(
      'href',
      'https://analuizarigueira.com.br',
    );
    expect(
      container.querySelector('img[src="/assets/amagus-lapidar-desktop.png"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[src="/assets/amagus-lapidar-mobile.png"]'),
    ).toBeInTheDocument();
  });
});
