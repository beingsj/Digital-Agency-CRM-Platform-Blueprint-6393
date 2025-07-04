import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiUser, FiBell, FiShield, FiGlobe, FiCreditCard } = FiIcons;

function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'privacy', label: 'Privacy', icon: FiShield },
    { id: 'integrations', label: 'Integrations', icon: FiGlobe },
    { id: 'billing', label: 'Billing', icon: FiCreditCard }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-lg shadow-soft p-6 mr-6">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-lg shadow-soft p-6">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'integrations' && <IntegrationSettings />}
          {activeTab === 'billing' && <BillingSettings />}
        </div>
      </div>
    </motion.div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
        <p className="text-sm text-gray-600">Configure your general preferences</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            defaultValue="Get Catalyzed CRM"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>UTC-05:00 Eastern Time</option>
            <option>UTC-08:00 Pacific Time</option>
            <option>UTC+00:00 GMT</option>
            <option>UTC+05:30 India Standard Time</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>USD - US Dollar</option>
            <option>INR - Indian Rupee</option>
            <option>EUR - Euro</option>
            <option>GBP - British Pound</option>
          </select>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
        <p className="text-sm text-gray-600">Update your personal information</p>
      </div>
      
      <div className="flex items-center space-x-6">
        <div>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
            Change Avatar
          </button>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            defaultValue="John"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+1 (555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
        <p className="text-sm text-gray-600">Choose how you want to be notified</p>
      </div>
      
      <div className="space-y-4">
        {[
          { label: 'Email Notifications', description: 'Receive notifications via email' },
          { label: 'Push Notifications', description: 'Receive push notifications in browser' },
          { label: 'SMS Notifications', description: 'Receive notifications via SMS' },
          { label: 'Weekly Reports', description: 'Receive weekly performance reports' }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">{item.label}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Privacy Settings</h2>
        <p className="text-sm text-gray-600">Control your privacy preferences</p>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Data Export</h3>
          <p className="text-sm text-gray-600 mb-3">Download all your data in a portable format</p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
            Request Data Export
          </button>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Account Deletion</h3>
          <p className="text-sm text-gray-600 mb-3">Permanently delete your account and all associated data</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Integration Settings</h2>
        <p className="text-sm text-gray-600">Connect with third-party services</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Google Analytics', status: 'connected', description: 'Track website performance' },
          { name: 'Slack', status: 'not_connected', description: 'Team communication' },
          { name: 'Stripe', status: 'connected', description: 'Payment processing' },
          { name: 'Zapier', status: 'not_connected', description: 'Workflow automation' }
        ].map((integration, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{integration.name}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                integration.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
            <button className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              integration.status === 'connected'
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}>
              {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Billing Settings</h2>
        <p className="text-sm text-gray-600">Manage your billing information and subscriptions</p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">Current Plan: Professional</h3>
        <p className="text-sm text-blue-700">$99/month • Next billing date: February 15, 2024</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2025</p>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Update
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Billing History</h3>
          <div className="space-y-2">
            {[
              { date: 'Jan 15, 2024', amount: '$99.00', status: 'Paid' },
              { date: 'Dec 15, 2023', amount: '$99.00', status: 'Paid' },
              { date: 'Nov 15, 2023', amount: '$99.00', status: 'Paid' }
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-gray-900">{invoice.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">{invoice.amount}</span>
                  <span className="text-sm text-green-600">{invoice.status}</span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;