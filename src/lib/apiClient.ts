import type { Product } from '@/types';

const isBrowser = typeof window !== 'undefined';
// In the browser, use Next.js API routes as a proxy to avoid CORS and localhost issues
const API_BASE_URL = isBrowser
  ? '/api'
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface LoginResponse {
  message: string;
  user: User;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Handle network errors gracefully; avoid noisy logs for expected 401s
      if (error instanceof TypeError && String(error.message).includes('Failed to fetch')) {
        console.warn(`Network error for ${endpoint}: Backend may not be available`);
      }
      throw error;
    }
  }

  // Authentication methods
  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  async getMe(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  async register(name: string, email: string, password: string): Promise<{ message: string; user: User }> {
    return this.request<{ message: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Product methods
  async getProducts(params: {
    category?: string;
    search?: string;
    featured?: boolean;
  } = {}): Promise<Product[]> {
    const searchParams = new URLSearchParams();
    
    if (params.category) searchParams.append('category', params.category);
    if (params.search) searchParams.append('search', params.search);
    if (params.featured) searchParams.append('featured', 'true');

    const query = searchParams.toString();
    return this.request<Product[]>(`/products${query ? `?${query}` : ''}`);
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  async createProduct(productData: Partial<Product>): Promise<{ message: string; product: Product }> {
    return this.request<{ message: string; product: Product }>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<{ message: string; product: Product }> {
    return this.request<{ message: string; product: Product }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
export default ApiClient;
