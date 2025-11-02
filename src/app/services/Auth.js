import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'https://codepods-backend.onrender.com';

// Log the API base URL on initialization (for debugging)
if (typeof window !== 'undefined') {
  console.log('🔗 Backend URL:', API_BASE_URL);
}

// Configure axios to include token in all requests
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class AuthService {
  async signup(userData) {
    try {
      // Format data to match backend expectations
      const signupData = {
        email: userData.email,
        password: userData.password,
        name: userData.name
      };

      console.log('Sending signup request to:', `${API_BASE_URL}/api/users/signup`);
      console.log('Signup data:', signupData);

      const response = await api.post('/api/users/signup', signupData);
      
      // Store token and user data if provided
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('✅ Token saved to localStorage');
      }
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('✅ User data saved:', response.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Signup API error:', error.response?.data || error.message);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Signup failed';
        throw { message: errorMessage };
      } else if (error.request) {
        // Request made but no response
        throw { message: 'Cannot connect to server. Please check your internet connection.' };
      } else {
        // Something else happened
        throw { message: 'Signup failed. Please try again.' };
      }
    }
  }

  async login(credentials) {
    try {
      // Format data to match backend expectations
      const loginData = {
        email: credentials.email,
        password: credentials.password
      };

      console.log('Sending login request to:', `${API_BASE_URL}/api/users/login`);
      console.log('Login data:', { email: loginData.email });

      const response = await api.post('/api/users/login', loginData);
      
      // Store token and user data if provided
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('✅ Token saved to localStorage');
      }
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('✅ User data saved:', response.data.user);
      }
      
      // Dispatch event to notify components about user data update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('userDataUpdated'));
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Login API error:', error.response?.data || error.message);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Login failed';
        throw { message: errorMessage };
      } else if (error.request) {
        // Request made but no response
        throw { message: 'Cannot connect to server. Please check your internet connection.' };
      } else {
        // Something else happened
        throw { message: 'Login failed. Please try again.' };
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('githubAuthenticated');
    localStorage.removeItem('githubAuthRedirect');
    console.log('🚪 User logged out');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // Get authenticated user's data
  getCurrentUser() {
    return this.getUser();
  }

  // GitHub OAuth Authentication
  loginWithGitHub() {
    // Store current page to redirect back after auth
    localStorage.setItem('githubAuthRedirect', window.location.pathname);

    // Start OAuth on backend
    window.location.href = `${API_BASE_URL}/api/auth/github`;
  }

  // Handle GitHub success redirect (token in query string)
  handleGitHubSuccessRedirect(token) {
    if (!token) return;
    localStorage.setItem('token', token);
    localStorage.setItem('githubAuthenticated', 'true');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('userDataUpdated'));
    }
  }

  // Check if user is authenticated with GitHub
  isGitHubAuthenticated() {
    return localStorage.getItem('githubAuthenticated') === 'true';
  }

  // Get GitHub auth redirect URL
  getGitHubAuthRedirect() {
    return localStorage.getItem('githubAuthRedirect') || '/dashboard';
  }

  // Clear GitHub auth redirect
  clearGitHubAuthRedirect() {
    localStorage.removeItem('githubAuthRedirect');
  }
}

export default new AuthService();

