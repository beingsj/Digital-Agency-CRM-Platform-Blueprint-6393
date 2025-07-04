import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUser, FiFolder, FiFileText, FiDollarSign, FiClock, 
  FiCheck, FiAlertTriangle, FiPlus, FiEdit
} = FiIcons;

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mockActivities = [
      {
        id: 1,
        type: 'task_completed',
        user: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face',
        action: 'completed task',
        target: 'Website Homepage Design',
        time: '2 minutes ago',
        icon: FiCheck,
        color: 'success'
      },
      {
        id: 2,
        type: 'project_created',
        user: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        action: 'created project',
        target: 'Mobile App Redesign',
        time: '15 minutes ago',
        icon: FiPlus,
        color: 'primary'
      },
      {
        id: 3,
        type: 'invoice_sent',
        user: 'System',
        avatar: null,
        action: 'sent invoice',
        target: 'INV-2024-001 to Acme Corp',
        time: '1 hour ago',
        icon: FiFileText,
        color: 'info'
      },
      {
        id: 4,
        type: 'client_added',
        user: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        action: 'added new client',
        target: 'TechStart Solutions',
        time: '2 hours ago',
        icon: FiUser,
        color: 'secondary'
      },
      {
        id: 5,
        type: 'payment_received',
        user: 'System',
        avatar: null,
        action: 'received payment',
        target: '₹25,000 from Digital Corp',
        time: '3 hours ago',
        icon: FiDollarSign,
        color: 'success'
      },
      {
        id: 6,
        type: 'task_overdue',
        user: 'System',
        avatar: null,
        action: 'task overdue',
        target: 'SEO Optimization Review',
        time: '4 hours ago',
        icon: FiAlertTriangle,
        color: 'danger'
      },
      {
        id: 7,
        type: 'project_updated',
        user: 'Lisa Brown',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        action: 'updated project',
        target: 'Brand Identity Package',
        time: '5 hours ago',
        icon: FiEdit,
        color: 'warning'
      },
      {
        id: 8,
        type: 'time_logged',
        user: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        action: 'logged 8 hours',
        target: 'Website Development',
        time: '6 hours ago',
        icon: FiClock,
        color: 'info'
      }
    ];
    
    setActivities(mockActivities);
    setIsLoading(false);
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-50 text-primary-600',
      secondary: 'bg-secondary-50 text-secondary-600',
      success: 'bg-success-50 text-success-600',
      warning: 'bg-warning-50 text-warning-600',
      danger: 'bg-danger-50 text-danger-600',
      info: 'bg-blue-50 text-blue-600',
    };
    return colors[color] || colors.info;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-32 h-6 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-32 h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
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
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <span className="text-sm text-gray-500">Last 24 hours</span>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              {activity.avatar ? (
                <img
                  src={activity.avatar}
                  alt={activity.user}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">SYS</span>
                </div>
              )}
              
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
                <SafeIcon icon={activity.icon} className="w-2.5 h-2.5" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span className="text-gray-600">{activity.action}</span>
                {' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all activity
        </button>
      </div>
    </motion.div>
  );
}

export default RecentActivity;