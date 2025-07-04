import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

// Components
import KpiCard from '../../components/Dashboard/KpiCard';
import RevenueChart from '../../components/Dashboard/RevenueChart';
import ProjectHealth from '../../components/Dashboard/ProjectHealth';
import VAUtilization from '../../components/Dashboard/VAUtilization';
import AlertsPanel from '../../components/Dashboard/AlertsPanel';
import Leaderboard from '../../components/Dashboard/Leaderboard';
import RecentActivity from '../../components/Dashboard/RecentActivity';
import QuickActions from '../../components/Dashboard/QuickActions';

import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiUsers, FiDollarSign, FiClock, FiAlertTriangle, FiTarget } = FiIcons;

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
          >
            <KpiCard {...kpi} isLoading={isLoading} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <RevenueChart period={selectedPeriod} />
          </motion.div>

          {/* Project Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ProjectHealth />
          </motion.div>

          {/* VA Utilization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <VAUtilization />
          </motion.div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuickActions />
          </motion.div>

          {/* Alerts Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AlertsPanel alerts={kpiData.alerts} />
          </motion.div>

          {/* Leaderboard */}
          {state.gamification.showLeaderboard && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Leaderboard />
            </motion.div>
          )}

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <RecentActivity />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;