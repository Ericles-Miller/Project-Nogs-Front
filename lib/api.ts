const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  userType?: 'volunteer' | 'ngo';
  skills?: string[];
  experience?: string;
  preferredCauses?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    userType: string;
  };
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.message || `Erro ${response.status}: ${response.statusText}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Auth endpoints (necessários para rotas autenticadas)
  async register(userData: CreateUserRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Endpoints para exibição (alguns podem precisar de autenticação)
  async getUsers(token?: string): Promise<ApiResponse> {
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return this.request('/users', {
      method: 'GET',
      headers,
    });
  }

  async getProjects(token?: string): Promise<ApiResponse> {
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return this.request('/projects', {
      method: 'GET',
      headers,
    });
  }

  async getCampaigns(token?: string): Promise<ApiResponse> {
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return this.request('/campaigns', {
      method: 'GET',
      headers,
    });
  }

  // User endpoints (autenticados)
  async getProfile(token: string): Promise<ApiResponse> {
    return this.request('/users/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiService = new ApiService();
