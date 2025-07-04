import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Context
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Layout from './components/Layout/Layout';
import AuthLayout from './components/Auth/AuthLayout';
import LoadingScreen from './components/Common/LoadingScreen';
import ErrorBoundary from './components/Common/ErrorBoundary';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import CRM from './pages/CRM/CRM';
import Services from './pages/Services/Services';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import Invoices from './pages/Invoices/Invoices';
import Expenses from './pages/Expenses/Expenses';
import Projects from './pages/Projects/Projects';
import Tasks from './pages/Tasks/Tasks';
import TimeTracker from './pages/TimeTracker/TimeTracker';
import Alerts from './pages/Alerts/Alerts';
import DataGovernance from './pages/DataGovernance/DataGovernance';
import Reporting from './pages/Reporting/Reporting';
import Clients from './pages/Clients/Clients';
import Settings from './pages/Settings/Settings';
import Help from './pages/Help/Help';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Hooks
import { useAuth } from './hooks/useAuth';

// Styles
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <AppProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/auth/*" element={<AuthRoutes />} />
                  
                  {/* Protected Routes */}
                  <Route path="/*" element={<ProtectedRoutes />} />
                </Routes>
              </AnimatePresence>
              
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '14px',
                  },
                  success: {
                    style: {
                      background: '#22c55e',
                    },
                  },
                  error: {
                    style: {
                      background: '#ef4444',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

// Auth Routes Component
function AuthRoutes() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </AuthLayout>
  );
}

// Protected Routes Component
function ProtectedRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crm/*" element={<CRM />} />
        <Route path="/services" element={<Services />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/time-tracker" element={<TimeTracker />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/data-governance" element={<DataGovernance />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Layout>
  );
}

export default App;