import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHelpCircle, FiBook, FiMessageCircle, FiMail, FiPhone, FiSearch } = FiIcons;

function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const helpArticles = [
    {
      id: 1,
      title: 'Getting Started with Get Catalyzed CRM',
      description: 'Learn the basics of setting up your account and creating your first project',
      category: 'getting-started',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Managing Projects and Tasks',
      description: 'How to create, assign, and track projects and tasks effectively',
      category: 'projects',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Time Tracking and Screenshot Capture',
      description: 'Understanding the time tracking features and screenshot functionality',
      category: 'time-tracking',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Creating and Managing Invoices',
      description: 'Step-by-step guide to creating professional invoices',
      category: 'billing',
      readTime: '10 min read'
    },
    {
      id: 5,
      title: 'Setting Up Team Members and VAs',
      description: 'How to invite and manage virtual assistants and team members',
      category: 'team',
      readTime: '7 min read'
    },
    {
      id: 6,
      title: 'Configuring Alerts and Notifications',
      description: 'Set up automated alerts for important events and deadlines',
      category: 'alerts',
      readTime: '4 min read'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'projects', label: 'Projects & Tasks' },
    { id: 'time-tracking', label: 'Time Tracking' },
    { id: 'billing', label: 'Billing & Invoices' },
    { id: 'team', label: 'Team Management' },
    { id: 'alerts', label: 'Alerts & Notifications' }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600 text-lg">Find answers to your questions and get the help you need</p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-soft p-6 text-center hover:shadow-medium transition-shadow cursor-pointer"
        >
          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiBook} className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
          <p className="text-gray-600 text-sm">Comprehensive guides and tutorials</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-soft p-6 text-center hover:shadow-medium transition-shadow cursor-pointer"
        >
          <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiMessageCircle} className="w-6 h-6 text-success-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm">Chat with our support team</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-soft p-6 text-center hover:shadow-medium transition-shadow cursor-pointer"
        >
          <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiMail} className="w-6 h-6 text-warning-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 text-sm">Send us a detailed message</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Articles List */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-3">{article.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{article.readTime}</span>
                      <span className="capitalize">{article.category.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <SafeIcon icon={FiHelpCircle} className="w-5 h-5 text-gray-400 ml-4" />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <SafeIcon icon={FiHelpCircle} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Still need help?</h2>
          <p className="text-gray-600 mb-6">Our support team is here to help you succeed</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
              <SafeIcon icon={FiMail} className="w-5 h-5" />
              <span>Email Support</span>
            </button>
            
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <SafeIcon icon={FiPhone} className="w-5 h-5" />
              <span>Schedule a Call</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Help;