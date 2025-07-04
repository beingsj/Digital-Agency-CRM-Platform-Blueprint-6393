import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown, FiUsers, FiDollarSign, FiClock, FiAlertTriangle, FiTarget } = FiIcons;

function Dashboard() {
  const { user } = useAuth();
  const { state } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [kpiData, setKpiData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockData = {
      revenue: {
        current: 156750,
        previous: 142300,
        trend: 10.2,
        currency: state.currency
      },
      clients: {
        active: 24,
        new: 3,
        churnRisk: 2
      },
      projects: {
        active: 18,
        completed: 12,
        overdue: 2
      },
      vaHours: {
        utilized: 892,
        available: 1200,
        efficiency: 74.3
      },
      alerts: {
        critical: 2,
        warning: 5,
        info: 8
      }
    };

    setKpiData(mockData);
    setIsLoading(false);
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: kpiData.revenue?.current || 0,
      previousValue: kpiData.revenue?.previous || 0,
      trend: kpiData.revenue?.trend || 0,
      format: 'currency',
      icon: FiDollarSign,
      color: 'success'
    },
    {
      title: 'Active Clients',
      value: kpiData.clients?.active || 0,
      subtitle: `${kpiData.clients?.new || 0} new this month`,
      icon: FiUsers,
      color: 'primary'
    },
    {
      title: 'Active Projects',
      value: kpiData.projects?.active || 0,
      subtitle: `${kpiData.projects?.overdue || 0} overdue`,
      icon: FiTarget,
      color: 'warning'
    },
    {
      title: 'VA Utilization',
      value: kpiData.vaHours?.efficiency || 0,
      format: 'percentage',
      subtitle: `${kpiData.vaHours?.utilized || 0}/${kpiData.vaHours?.available || 0} hours`,
      icon: FiClock,
      color: 'info'
    }
  ];

  const formatValue = (val, format) => {
    if (format === 'currency') {
      const symbol = state.currency === 'INR' ? '₹' : '$';
      return `${symbol}${val.toLocaleString()}`;
    } else if (format === 'percentage') {
      return `${val}%`;
    }
    return val.toLocaleString();
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success-600';
    if (trend < 0) return 'text-danger-600';
    return 'text-gray-500';
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-50 text-primary-600',
      success: 'bg-success-50 text-success-600',
      warning: 'bg-warning-50 text-warning-600',
      danger: 'bg-danger-50 text-danger-600',
      info: 'bg-blue-50 text-blue-600',
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(kpi.color)}`}>
                <SafeIcon icon={kpi.icon} className="w-6 h-6" />
              </div>
              {kpi.trend !== undefined && (
                <div className={`flex items-center space-x-1 ${getTrendColor(kpi.trend)}`}>
                  <SafeIcon icon={kpi.trend >= 0 ? FiTrendingUp : FiTrendingDown} className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {Math.abs(kpi.trend)}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? '...' : formatValue(kpi.value, kpi.format)}
              </p>
            </div>
            
            {kpi.subtitle && (
              <p className="text-sm text-gray-500">{kpi.subtitle}</p>
            )}
            
            {kpi.trend !== undefined && kpi.previousValue && (
              <p className="text-xs text-gray-500 mt-1">
                vs {formatValue(kpi.previousValue, kpi.format)} last period
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-soft p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <SafeIcon icon={FiTrendingUp} className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart will be displayed here</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Alerts Panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-soft p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
              <span className="text-sm text-gray-500">
                {(kpiData.alerts?.critical || 0) + (kpiData.alerts?.warning || 0) + (kpiData.alerts?.info || 0)} active
              </span>
            </div>
            
            <div className="space-y-4">
              {[
                { type: 'critical', count: kpiData.alerts?.critical || 0, color: 'danger', title: 'Critical Alerts' },
                { type: 'warning', count: kpiData.alerts?.warning || 0, color: 'warning', title: 'Warning Alerts' },
                { type: 'info', count: kpiData.alerts?.info || 0, color: 'info', title: 'Info Alerts' }
              ].map((alert, index) => (
                <motion.div
                  key={alert.type}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    alert.color === 'danger' ? 'bg-danger-50 text-danger-600 border-danger-200' :
                    alert.color === 'warning' ? 'bg-warning-50 text-warning-600 border-warning-200' :
                    'bg-blue-50 text-blue-600 border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiAlertTriangle} className="w-5 h-5" />
                      <div>
                        <h3 className="font-medium">{alert.title}</h3>
                        <p className="text-sm opacity-75">Requires attention</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">{alert.count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-soft p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'New project created', time: '2 min ago', type: 'project' },
                { action: 'Invoice sent to client', time: '15 min ago', type: 'invoice' },
                { action: 'Task completed', time: '1 hour ago', type: 'task' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;