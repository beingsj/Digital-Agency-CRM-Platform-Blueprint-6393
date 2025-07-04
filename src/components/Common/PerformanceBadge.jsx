import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiWifi, FiWifiOff } = FiIcons;

function PerformanceBadge() {
  const { state } = useApp();
  const [performance, setPerformance] = useState({
    loadTime: 0,
    isOnline: navigator.onLine,
    connectionType: 'unknown'
  });

  useEffect(() => {
    // Monitor performance
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          setPerformance(prev => ({
            ...prev,
            loadTime: Math.round(entry.loadEventEnd - entry.loadEventStart)
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['navigation'] });

    // Monitor connection
    const handleOnline = () => setPerformance(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setPerformance(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Get connection info if available
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setPerformance(prev => ({
        ...prev,
        connectionType: connection.effectiveType
      }));
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getPerformanceColor = () => {
    if (!performance.isOnline) return 'bg-danger-500';
    if (performance.loadTime > state.performance.budget) return 'bg-warning-500';
    return 'bg-success-500';
  };

  const getPerformanceText = () => {
    if (!performance.isOnline) return 'Offline';
    if (performance.loadTime > state.performance.budget) return 'Slow';
    return 'Good';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-full shadow-medium border border-gray-200 p-3 cursor-pointer hover:shadow-strong transition-shadow"
      title={`Performance: ${getPerformanceText()} | Load time: ${performance.loadTime}ms | Connection: ${performance.connectionType}`}
    >
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getPerformanceColor()}`} />
        <SafeIcon 
          icon={performance.isOnline ? FiWifi : FiWifiOff} 
          className="w-4 h-4 text-gray-600" 
        />
        <span className="text-xs font-medium text-gray-700">
          {performance.loadTime}ms
        </span>
      </div>
    </motion.div>
  );
}

export default PerformanceBadge;