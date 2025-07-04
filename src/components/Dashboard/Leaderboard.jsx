import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrophy, FiStar, FiClock, FiTarget, FiTrendingUp } = FiIcons;

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('hours');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, [selectedMetric]);

  const fetchLeaderboardData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockData = {
      hours: [
        { id: 1, name: 'Emma Davis', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face', value: 42, badge: 'gold' },
        { id: 2, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', value: 38, badge: 'silver' },
        { id: 3, name: 'Lisa Brown', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', value: 36, badge: 'bronze' },
        { id: 4, name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', value: 35, badge: null },
        { id: 5, name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', value: 30, badge: null }
      ],
      tasks: [
        { id: 1, name: 'Emma Davis', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face', value: 15, badge: 'gold' },
        { id: 2, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', value: 12, badge: 'silver' },
        { id: 3, name: 'Lisa Brown', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', value: 11, badge: 'bronze' },
        { id: 4, name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', value: 10, badge: null },
        { id: 5, name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', value: 8, badge: null }
      ],
      efficiency: [
        { id: 1, name: 'Emma Davis', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face', value: 105, badge: 'gold' },
        { id: 2, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', value: 95, badge: 'silver' },
        { id: 3, name: 'Lisa Brown', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', value: 90, badge: 'bronze' },
        { id: 4, name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', value: 87.5, badge: null },
        { id: 5, name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', value: 75, badge: null }
      ]
    };
    
    setLeaderboardData(mockData[selectedMetric]);
    setIsLoading(false);
  };

  const metrics = [
    { key: 'hours', label: 'Hours Logged', icon: FiClock, suffix: 'h' },
    { key: 'tasks', label: 'Tasks Completed', icon: FiTarget, suffix: '' },
    { key: 'efficiency', label: 'Efficiency', icon: FiTrendingUp, suffix: '%' }
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'text-yellow-600 bg-yellow-50';
      case 'silver': return 'text-gray-600 bg-gray-50';
      case 'bronze': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-400 bg-gray-50';
    }
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return FiTrophy;
      case 1: return FiStar;
      case 2: return FiStar;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-24 h-6 bg-gray-200 rounded"></div>
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-24 h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="w-8 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-soft p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Leaderboard</h2>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {metrics.map((metric) => (
            <option key={metric.key} value={metric.key}>
              {metric.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-3">
        {leaderboardData.map((person, index) => {
          const RankIcon = getRankIcon(index);
          return (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                index < 3 ? 'bg-gradient-to-r from-gray-50 to-transparent' : 'hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="flex items-center justify-center w-6 h-6">
                {RankIcon ? (
                  <SafeIcon 
                    icon={RankIcon} 
                    className={`w-4 h-4 ${getBadgeColor(person.badge)}`} 
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-500">
                    {index + 1}
                  </span>
                )}
              </div>
              
              <img
                src={person.avatar}
                alt={person.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {person.name}
                </p>
                {person.badge && (
                  <p className="text-xs text-gray-500 capitalize">
                    {person.badge} performer
                  </p>
                )}
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {person.value}{metrics.find(m => m.key === selectedMetric)?.suffix}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
          View full leaderboard
        </button>
      </div>
    </motion.div>
  );
}

export default Leaderboard;