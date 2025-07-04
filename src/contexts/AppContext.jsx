import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AppContext = createContext();

const initialState = {
  theme: 'light',
  currency: 'INR',
  language: 'en',
  timezone: 'Asia/Kolkata',
  notifications: {
    email: true,
    push: true,
    sms: false,
    slack: false,
    teams: false,
  },
  performance: {
    budget: 1000, // milliseconds
    current: 0,
    alerts: true,
  },
  ai: {
    enabled: false,
    apiKey: '',
    model: 'gpt-4',
  },
  gamification: {
    enabled: true,
    showLeaderboard: true,
    showBadges: true,
  },
  whiteLabel: {
    enabled: false,
    logo: '',
    primaryColor: '#0ea5e9',
    secondaryColor: '#d946ef',
    companyName: 'Get Catalyzed CRM',
    domain: '',
  },
  accessibility: {
    highContrast: false,
    dyslexiaFont: false,
    screenReader: false,
    keyboardNavigation: true,
  },
  sidebar: {
    collapsed: false,
    pinned: true,
  },
  user: null,
  isLoading: false,
  error: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    
    case 'UPDATE_NOTIFICATIONS':
      return { 
        ...state, 
        notifications: { ...state.notifications, ...action.payload } 
      };
    
    case 'UPDATE_PERFORMANCE':
      return { 
        ...state, 
        performance: { ...state.performance, ...action.payload } 
      };
    
    case 'UPDATE_AI_CONFIG':
      return { 
        ...state, 
        ai: { ...state.ai, ...action.payload } 
      };
    
    case 'UPDATE_GAMIFICATION':
      return { 
        ...state, 
        gamification: { ...state.gamification, ...action.payload } 
      };
    
    case 'UPDATE_WHITE_LABEL':
      return { 
        ...state, 
        whiteLabel: { ...state.whiteLabel, ...action.payload } 
      };
    
    case 'UPDATE_ACCESSIBILITY':
      return { 
        ...state, 
        accessibility: { ...state.accessibility, ...action.payload } 
      };
    
    case 'TOGGLE_SIDEBAR':
      return { 
        ...state, 
        sidebar: { ...state.sidebar, collapsed: !state.sidebar.collapsed } 
      };
    
    case 'SET_SIDEBAR_PINNED':
      return { 
        ...state, 
        sidebar: { ...state.sidebar, pinned: action.payload } 
      };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('catalyzed-crm-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        Object.keys(settings).forEach(key => {
          if (settings[key] && typeof settings[key] === 'object') {
            dispatch({ type: `UPDATE_${key.toUpperCase()}`, payload: settings[key] });
          } else {
            dispatch({ type: `SET_${key.toUpperCase()}`, payload: settings[key] });
          }
        });
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage when state changes
  useEffect(() => {
    const settingsToSave = {
      theme: state.theme,
      currency: state.currency,
      language: state.language,
      timezone: state.timezone,
      notifications: state.notifications,
      performance: state.performance,
      ai: state.ai,
      gamification: state.gamification,
      whiteLabel: state.whiteLabel,
      accessibility: state.accessibility,
      sidebar: state.sidebar,
    };

    localStorage.setItem('catalyzed-crm-settings', JSON.stringify(settingsToSave));
  }, [state]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    document.documentElement.className = state.theme;
  }, [state.theme]);

  // Apply accessibility settings
  useEffect(() => {
    if (state.accessibility.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    if (state.accessibility.dyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
  }, [state.accessibility]);

  // Performance monitoring
  useEffect(() => {
    if (state.performance.alerts) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > state.performance.budget) {
            toast.error(`Performance alert: ${entry.name} took ${Math.round(entry.duration)}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation', 'resource'] });
      
      return () => observer.disconnect();
    }
  }, [state.performance]);

  const value = {
    state,
    dispatch,
    // Helper functions
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    setCurrency: (currency) => dispatch({ type: 'SET_CURRENCY', payload: currency }),
    setLanguage: (language) => dispatch({ type: 'SET_LANGUAGE', payload: language }),
    updateNotifications: (notifications) => dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: notifications }),
    updatePerformance: (performance) => dispatch({ type: 'UPDATE_PERFORMANCE', payload: performance }),
    updateAIConfig: (ai) => dispatch({ type: 'UPDATE_AI_CONFIG', payload: ai }),
    updateGamification: (gamification) => dispatch({ type: 'UPDATE_GAMIFICATION', payload: gamification }),
    updateWhiteLabel: (whiteLabel) => dispatch({ type: 'UPDATE_WHITE_LABEL', payload: whiteLabel }),
    updateAccessibility: (accessibility) => dispatch({ type: 'UPDATE_ACCESSIBILITY', payload: accessibility }),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    setSidebarPinned: (pinned) => dispatch({ type: 'SET_SIDEBAR_PINNED', payload: pinned }),
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;