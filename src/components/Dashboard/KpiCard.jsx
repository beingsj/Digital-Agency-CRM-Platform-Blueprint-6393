import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

function KpiCard({ 
  title, 
  value, 
  previousValue, 
  trend, 
  subtitle, 
  format = 'number', 
  icon: Icon, 
  color = 'primary',
  isLoading = false 
}) {
  const { state } = useApp();

  const formatValue = (val) => {
    if (format === 'currency') {
      const symbol = state.currency === 'INR' ? '₹' : '$';
      return `${symbol}${val.toLocaleString()}`;
    } else if (format === 'percentage') {
      return `${val}%`;
    }
    return val.toLocaleString();
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-success-600';
    if (trend < 0) return 'text-danger-600';
    return 'text-gray-500';
  };

  const getColorClasses = () => {
    const colors = {
      primary: 'bg-primary-50 text-primary-600',
      success: 'bg-success-50 text-success-600',
      warning: 'bg-warning-50 text-warning-600',
      danger: 'bg-danger-50 text-danger-600',
      info: 'bg-blue-50 text-blue-600',
    };
    return colors[color] || colors.primary;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-24 h-8 bg-gray-200 rounded mb-2"></div>
        <div className="w-32 h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
          <SafeIcon icon={Icon} className="w-6 h-6" />
        </div>
        
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <SafeIcon 
              icon={trend >= 0 ? FiTrendingUp : FiTrendingDown} 
              className="w-4 h-4" 
            />
            <span className="text-sm font-medium">
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">
          {formatValue(value)}
        </p>
      </div>
      
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
      
      {trend !== undefined && previousValue && (
        <p className="text-xs text-gray-500 mt-1">
          vs {formatValue(previousValue)} last period
        </p>
      )}
    </motion.div>
  );
}

export default KpiCard;