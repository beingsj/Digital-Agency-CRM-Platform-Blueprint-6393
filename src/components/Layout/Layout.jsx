import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

// Components
import Sidebar from './Sidebar';
import Header from './Header';
import CatalystBot from '../AI/CatalystBot';
import TimeTrackerWidget from '../TimeTracker/TimeTrackerWidget';
import PerformanceBadge from '../Common/PerformanceBadge';
import FeedbackWidget from '../Common/FeedbackWidget';
import TourModal from '../Common/TourModal';

function Layout({ children }) {
  const { state } = useApp();
  const { user } = useAuth();
  const [showTour, setShowTour] = useState(false);

  // Show tour for new users
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('has-seen-tour');
    if (!hasSeenTour && user) {
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleTourComplete = () => {
    localStorage.setItem('has-seen-tour', 'true');
    setShowTour(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        state.sidebar.collapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Fixed Widgets */}
      <div className="fixed bottom-4 right-4 z-40 space-y-4">
        {/* Performance Badge */}
        <PerformanceBadge />
        
        {/* Time Tracker Widget */}
        <TimeTrackerWidget />
        
        {/* Feedback Widget */}
        <FeedbackWidget />
        
        {/* AI Chat Bot */}
        {state.ai.enabled && <CatalystBot />}
      </div>
      
      {/* Tour Modal */}
      <AnimatePresence>
        {showTour && (
          <TourModal
            isOpen={showTour}
            onClose={handleTourComplete}
            onComplete={handleTourComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Layout;