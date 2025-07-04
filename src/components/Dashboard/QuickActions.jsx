import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiPlus, FiUsers, FiFileText, FiClock, FiFolder, FiDollarSign,
  FiUserPlus, FiEdit, FiSend, FiPlay
} = FiIcons;

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'new-client',
      label: 'Add Client',
      icon: FiUserPlus,
      color: 'primary',
      onClick: () => navigate('/clients')
    },
    {
      id: 'new-project',
      label: 'New Project',
      icon: FiFolder,
      color: 'secondary',
      onClick: () => navigate('/projects')
    },
    {
      id: 'create-invoice',
      label: 'Create Invoice',
      icon: FiFileText,
      color: 'success',
      onClick: () => navigate('/invoices')
    },
    {
      id: 'start-timer',
      label: 'Start Timer',
      icon: FiPlay,
      color: 'warning',
      onClick: () => navigate('/time-tracker')
    },
    {
      id: 'add-task',
      label: 'Add Task',
      icon: FiPlus,
      color: 'info',
      onClick: () => navigate('/tasks')
    },
    {
      id: 'log-expense',
      label: 'Log Expense',
      icon: FiDollarSign,
      color: 'danger',
      onClick: () => navigate('/expenses')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-50 text-primary-600 hover:bg-primary-100',
      secondary: 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100',
      success: 'bg-success-50 text-success-600 hover:bg-success-100',
      warning: 'bg-warning-50 text-warning-600 hover:bg-warning-100',
      danger: 'bg-danger-50 text-danger-600 hover:bg-danger-100',
      info: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    };
    return colors[color] || colors.primary;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-soft p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <SafeIcon icon={FiPlus} className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className={`p-4 rounded-lg transition-all duration-200 ${getColorClasses(action.color)}`}
          >
            <SafeIcon icon={action.icon} className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">{action.label}</p>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
          Customize actions
        </button>
      </div>
    </motion.div>
  );
}

export default QuickActions;