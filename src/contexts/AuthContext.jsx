import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  permissions: [],
  role: null,
  client: null,
  twoFactorEnabled: false,
  sessionExpiry: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        permissions: action.payload.permissions || [],
        role: action.payload.user.role,
        client: action.payload.client,
        twoFactorEnabled: action.payload.user.twoFactorEnabled || false,
        sessionExpiry: action.payload.sessionExpiry,
        isLoading: false,
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    
    case 'SET_PERMISSIONS':
      return {
        ...state,
        permissions: action.payload,
      };
    
    case 'ENABLE_TWO_FACTOR':
      return {
        ...state,
        twoFactorEnabled: true,
        user: { ...state.user, twoFactorEnabled: true },
      };
    
    case 'DISABLE_TWO_FACTOR':
      return {
        ...state,
        twoFactorEnabled: false,
        user: { ...state.user, twoFactorEnabled: false },
      };
    
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Session expiry check
  useEffect(() => {
    if (state.sessionExpiry) {
      const timeUntilExpiry = new Date(state.sessionExpiry).getTime() - Date.now();
      
      if (timeUntilExpiry > 0) {
        const timer = setTimeout(() => {
          toast.error('Session expired. Please log in again.');
          logout();
        }, timeUntilExpiry);
        
        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [state.sessionExpiry]);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const userData = localStorage.getItem('user-data');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        const sessionExpiry = localStorage.getItem('session-expiry');
        
        // Check if session is still valid
        if (sessionExpiry && new Date(sessionExpiry) > new Date()) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user,
              permissions: user.permissions || [],
              client: user.client,
              sessionExpiry,
            },
          });
        } else {
          // Session expired, clear storage
          localStorage.removeItem('auth-token');
          localStorage.removeItem('user-data');
          localStorage.removeItem('session-expiry');
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on credentials
      const mockUser = {
        id: '1',
        email: credentials.email,
        name: credentials.email === 'admin@catalyzed.com' ? 'Admin User' : 'John Doe',
        role: credentials.email === 'admin@catalyzed.com' ? 'ADMIN' : 'CLIENT',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        permissions: credentials.email === 'admin@catalyzed.com' ? [
          'create_users', 'manage_billing', 'view_reports', 'manage_settings'
        ] : ['view_projects', 'manage_tasks', 'view_reports'],
        client: credentials.email === 'admin@catalyzed.com' ? null : {
          id: '1',
          name: 'Acme Corp',
          logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
        },
        twoFactorEnabled: false,
        preferences: {
          theme: 'light',
          currency: 'INR',
          timezone: 'Asia/Kolkata',
        },
      };

      const token = 'mock-jwt-token-' + Date.now();
      const sessionExpiry = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours

      // Store auth data
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user-data', JSON.stringify(mockUser));
      localStorage.setItem('session-expiry', sessionExpiry.toISOString());

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: mockUser,
          permissions: mockUser.permissions,
          client: mockUser.client,
          sessionExpiry: sessionExpiry.toISOString(),
        },
      });

      toast.success(`Welcome back, ${mockUser.name}!`);
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: 'CLIENT',
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
        permissions: ['view_projects', 'manage_tasks', 'view_reports'],
        client: {
          id: Date.now().toString(),
          name: userData.companyName || 'New Company',
          logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
        },
        twoFactorEnabled: false,
        preferences: {
          theme: 'light',
          currency: 'INR',
          timezone: 'Asia/Kolkata',
        },
      };

      const token = 'mock-jwt-token-' + Date.now();
      const sessionExpiry = new Date(Date.now() + 8 * 60 * 60 * 1000);

      localStorage.setItem('auth-token', token);
      localStorage.setItem('user-data', JSON.stringify(newUser));
      localStorage.setItem('session-expiry', sessionExpiry.toISOString());

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: newUser,
          permissions: newUser.permissions,
          client: newUser.client,
          sessionExpiry: sessionExpiry.toISOString(),
        },
      });

      toast.success('Registration successful! Welcome to Get Catalyzed CRM!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
    localStorage.removeItem('session-expiry');
    
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    
    // Update localStorage
    const currentUser = JSON.parse(localStorage.getItem('user-data'));
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('user-data', JSON.stringify(updatedUser));
  };

  const enableTwoFactor = async (code) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'ENABLE_TWO_FACTOR' });
      updateUser({ twoFactorEnabled: true });
      
      toast.success('Two-factor authentication enabled successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to enable two-factor authentication');
      return { success: false, error: error.message };
    }
  };

  const disableTwoFactor = async (password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'DISABLE_TWO_FACTOR' });
      updateUser({ twoFactorEnabled: false });
      
      toast.success('Two-factor authentication disabled');
      return { success: true };
    } catch (error) {
      toast.error('Failed to disable two-factor authentication');
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password reset email sent! Check your inbox.');
      return { success: true };
    } catch (error) {
      toast.error('Failed to send password reset email');
      return { success: false, error: error.message };
    }
  };

  const hasPermission = (permission) => {
    return state.permissions.includes(permission);
  };

  const hasRole = (role) => {
    return state.role === role;
  };

  const isAdmin = () => {
    return state.role === 'ADMIN';
  };

  const isClient = () => {
    return state.role === 'CLIENT';
  };

  const isTeamMember = () => {
    return state.role === 'TEAM_MEMBER';
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    enableTwoFactor,
    disableTwoFactor,
    resetPassword,
    hasPermission,
    hasRole,
    isAdmin,
    isClient,
    isTeamMember,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;