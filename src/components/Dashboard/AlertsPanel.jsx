import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiAlertCircle, FiInfo, FiArrowRight } = FiIcons;

function AlertsPanel({ alerts = {} }) {
  const alertTypes = [
    {
      type: 'critical',
      count: alerts.critical || 0,
      icon: FiAlertTriangle,
      color: 'danger',
      title: 'Critical Alerts',
      description: 'Require immediate attention'
    },
    {
      type: 'warning',
      count: alerts.warning || 0,
      icon: FiAlertCircle,
      color: 'warning',
      title: 'Warning Alerts',
      description: 'Need monitoring'
    },
    {
      type: 'info',
      count: alerts.info || 0,
      icon: FiInfo,
      color: 'info',
      title: 'Info Alerts',
      description: 'General notifications'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      danger: 'bg-danger-50 text-danger-600 border-danger-200',
      warning: 'bg-warning-50 text-warning-600 border-warning-200',
      info: 'bg-blue-50 text-blue-600 border-blue-200',
    };
    return colors[color] || colors.info;
  };

  const totalAlerts = alertTypes.reduce((sum, alert) => sum + alert.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-soft p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
        <span className="text-sm text-gray-500">{totalAlerts} active</span>
      </div>
      
      <div className="space-y-4">
        {alertTypes.map((alert, index) => (
          <motion.div
            key={alert.type}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${getColorClasses(alert.color)} hover:shadow-sm transition-all cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={alert.icon} className="w-5 h-5" />
                <div>
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm opacity-75">{alert.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{alert.count}</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 opacity-50" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {totalAlerts > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all alerts
          </button>
        </div>
      )}
      
      {totalAlerts === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <SafeIcon icon={FiInfo} className="w-6 h-6 text-success-600" />
          </div>
          <p className="text-gray-500">No active alerts</p>
          <p className="text-sm text-gray-400">Everything looks good!</p>
        </div>
      )}
    </motion.div>
  );
}

export default AlertsPanel;