import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSearch, FiBell, FiSettings, FiLogOut, FiUser, FiMoon, FiSun,
  FiGlobe, FiDollarSign, FiChevronDown, FiCheck, FiX
} = FiIcons;

function Header() {
  const { state, setTheme, setCurrency } = useApp();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Budget Alert',
      message: 'Campaign "Summer Sale" has exceeded 90% of budget',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'task',
      title: 'Task Completed',
      message: 'John completed "Website Design" task',
      time: '15 min ago',
      unread: true
    },
    {
      id: 3,
      type: 'invoice',
      title: 'Payment Received',
      message: 'Invoice #INV-2024-001 has been paid',
      time: '1 hour ago',
      unread: false
    }
  ];

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' }
  ];

  const handleCurrencyChange = (currency) => {
    setCurrency(currency.code);
    setShowCurrencyMenu(false);
  };

  const handleThemeToggle = () => {
    setTheme(state.theme === 'light' ? 'dark' : 'light');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
      {/* Left side - Search */}
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative max-w-md w-full">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
          />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-4">
        {/* Currency Selector */}
        <div className="relative">
          <button
            onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {currencies.find(c => c.code === state.currency)?.symbol} {state.currency}
            </span>
            <SafeIcon icon={FiChevronDown} className="w-3 h-3 text-gray-400" />
          </button>

          <AnimatePresence>
            {showCurrencyMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-strong border border-gray-200 py-1 z-50"
              >
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium">{currency.symbol} {currency.code}</span>
                      <span className="text-sm text-gray-500 ml-2">{currency.name}</span>
                    </div>
                    {state.currency === currency.code && (
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-primary-600" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
          title={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <SafeIcon 
            icon={state.theme === 'light' ? FiMoon : FiSun} 
            className="w-5 h-5 text-gray-600" 
          />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative"
          >
            <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-strong border border-gray-200 z-50"
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-strong border border-gray-200 py-1 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                  <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Profile</span>
                </button>
                
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                  <SafeIcon icon={FiSettings} className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Settings</span>
                </button>
                
                <hr className="my-1" />
                
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-danger-600"
                >
                  <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                  <span className="text-sm">Sign out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Header;