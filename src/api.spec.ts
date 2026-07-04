import { afterEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import { createApiClient } from './api';

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
    })),
  },
}));

describe('createApiClient', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('uses VITE_API_URL and global /api prefix for public content', async () => {
    const http = {
      get: vi.fn(async () => ({ data: [{ slug: 'sites-institucionais' }] })),
      post: vi.fn(),
    };
    vi.mocked(axios.create).mockReturnValue(http as never);

    const client = createApiClient('https://api.staxsolutions.com.br/api');
    const products = await client.getProducts();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.staxsolutions.com.br/api',
      timeout: 10000,
    });
    expect(http.get).toHaveBeenCalledWith('/products');
    expect(products).toEqual([{ slug: 'sites-institucionais' }]);
  });

  it('posts leads to /leads', async () => {
    const http = {
      get: vi.fn(),
      post: vi.fn(async () => ({ data: { id: 'lead-1' } })),
    };
    vi.mocked(axios.create).mockReturnValue(http as never);

    const client = createApiClient('http://localhost:3000/api');
    const lead = await client.createLead({
      name: 'Giancarlo',
      email: 'giancarlo@example.com',
      phone: '',
      message: 'Preciso de branding.',
      product: 'Identidade & Branding',
    });

    expect(http.post).toHaveBeenCalledWith('/leads', {
      name: 'Giancarlo',
      email: 'giancarlo@example.com',
      phone: '',
      message: 'Preciso de branding.',
      product: 'Identidade & Branding',
    });
    expect(lead).toEqual({ id: 'lead-1' });
  });
});
