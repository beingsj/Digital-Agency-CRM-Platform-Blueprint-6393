import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiHome, FiUsers, FiPackage, FiCreditCard, FiFileText, FiDollarSign,
  FiFolderPlus, FiCheckSquare, FiClock, FiBell,
  FiZap, FiChevronLeft,
  FiChevronRight, FiPin, FiPinOff
} = FiIcons;

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: FiHome,
    path: '/dashboard',
    roles: ['ADMIN', 'CLIENT', 'TEAM_MEMBER']
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: FiUsers,
    path: '/crm',
    roles: ['ADMIN', 'CLIENT'],
    submenu: [
      { label: 'Leads', path: '/crm/leads' },
      { label: 'Contacts', path: '/crm/contacts' },
      { label: 'Companies', path: '/crm/companies' },
      { label: 'Opportunities', path: '/crm/opportunities' }
    ]
  },
  {
    id: 'services',
    label: 'Services & VA Hours',
    icon: FiPackage,
    path: '/services',
    roles: ['ADMIN']
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions & Plans',
    icon: FiCreditCard,
    path: '/subscriptions',
    roles: ['ADMIN', 'CLIENT']
  },
  {
    id: 'invoices',
    label: 'Invoices',
    icon: FiFileText,
    path: '/invoices',
    roles: ['ADMIN', 'CLIENT']
  },
  {
    id: 'expenses',
    label: 'Expenses',
    icon: FiDollarSign,
    path: '/expenses',
    roles: ['ADMIN', 'CLIENT']
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FiFolderPlus,
    path: '/projects',
    roles: ['ADMIN', 'CLIENT', 'TEAM_MEMBER']
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: FiCheckSquare,
    path: '/tasks',
    roles: ['ADMIN', 'CLIENT', 'TEAM_MEMBER']
  },
  {
    id: 'time-tracker',
    label: 'Time Tracker',
    icon: FiClock,
    path: '/time-tracker',
    roles: ['ADMIN', 'CLIENT', 'TEAM_MEMBER']
  },
  {
    id: 'alerts',
    label: 'Alerts & Notifications',
    icon: FiBell,
    path: '/alerts',
    roles: ['ADMIN', 'CLIENT']
  },
  // Additional menu items can be added here when new pages are implemented
];

function Sidebar() {
  const { state, toggleSidebar, setSidebarPinned } = useApp();
  const { user } = useAuth();
  const location = useLocation();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: state.sidebar.collapsed ? 64 : 256,
          x: 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 shadow-soft"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <motion.div
              initial={false}
              animate={{ opacity: state.sidebar.collapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiZap} className="w-5 h-5 text-white" />
              </div>
              {!state.sidebar.collapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Get Catalyzed</h1>
                  <p className="text-xs text-gray-500">CRM Platform</p>
                </div>
              )}
            </motion.div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setSidebarPinned(!state.sidebar.pinned)}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
                title={state.sidebar.pinned ? 'Unpin sidebar' : 'Pin sidebar'}
              >
                <SafeIcon 
                  icon={state.sidebar.pinned ? FiPin : FiPinOff} 
                  className="w-4 h-4 text-gray-400" 
                />
              </button>
              
              <button
                onClick={toggleSidebar}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <SafeIcon 
                  icon={state.sidebar.collapsed ? FiChevronRight : FiChevronLeft} 
                  className="w-4 h-4 text-gray-400" 
                />
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {filteredMenuItems.map((item) => (
                <div key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 group ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon 
                      icon={item.icon} 
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive(item.path) ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`} 
                    />
                    
                    <motion.span
                      initial={false}
                      animate={{ 
                        opacity: state.sidebar.collapsed ? 0 : 1,
                        marginLeft: state.sidebar.collapsed ? 0 : 12
                      }}
                      transition={{ duration: 0.2 }}
                      className="font-medium truncate"
                    >
                      {item.label}
                    </motion.span>
                    
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-6 bg-primary-600 rounded-r-full"
                        initial={false}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                  
                  {/* Submenu */}
                  {item.submenu && isActive(item.path) && !state.sidebar.collapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-8 mt-1 space-y-1"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-3 py-1 text-sm rounded transition-colors ${
                            location.pathname === subItem.path
                              ? 'text-primary-600 bg-primary-50'
                              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </nav>
          
          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              
              <motion.div
                initial={false}
                animate={{ opacity: state.sidebar.collapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.role}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Overlay for mobile */}
      {!state.sidebar.collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Sidebar;