import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBell, FiPlus, FiSettings, FiMail, FiSmartphone, FiSlack, FiMessageSquare } = FiIcons;

function Alerts() {
  const [alerts] = useState([
    {
      id: 1,
      name: 'Budget Threshold Alert',
      description: 'Alert when campaign budget exceeds 90%',
      condition: 'Campaign budget > 90%',
      channels: ['email', 'slack'],
      status: 'active',
      triggered: 3,
      lastTriggered: '2024-01-25 14:30'
    },
    {
      id: 2,
      name: 'Project Deadline Warning',
      description: 'Notify 3 days before project deadline',
      condition: 'Project due date - 3 days',
      channels: ['email', 'sms'],
      status: 'active',
      triggered: 1,
      lastTriggered: '2024-01-23 09:00'
    },
    {
      id: 3,
      name: 'Payment Overdue',
      description: 'Alert when invoice is 7 days overdue',
      condition: 'Invoice overdue > 7 days',
      channels: ['email', 'teams'],
      status: 'paused',
      triggered: 0,
      lastTriggered: null
    }
  ]);

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email': return FiMail;
      case 'sms': return FiSmartphone;
      case 'slack': return FiSlack;
      case 'teams': return FiMessageSquare;
      default: return FiBell;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600 mt-1">Configure automated alerts and notification channels</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiSettings} className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Create Alert</span>
          </button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiBell} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiBell} className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiBell} className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Triggered Today</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-danger-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiBell} className="w-6 h-6 text-danger-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white rounded-lg shadow-soft">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Configured Alerts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      alert.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <SafeIcon 
                        icon={FiBell} 
                        className={`w-5 h-5 ${alert.status === 'active' ? 'text-green-600' : 'text-gray-600'}`} 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{alert.name}</h3>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                  </div>
                  
                  <div className="ml-13 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Condition:</span>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{alert.condition}</code>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Channels:</span>
                      <div className="flex space-x-1">
                        {alert.channels.map((channel) => (
                          <div key={channel} className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            <SafeIcon icon={getChannelIcon(channel)} className="w-3 h-3" />
                            <span>{channel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Triggered: {alert.triggered} times</span>
                      {alert.lastTriggered && (
                        <span>Last: {alert.lastTriggered}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    alert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {alert.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <SafeIcon icon={FiSettings} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notification Channels */}
      <div className="bg-white rounded-lg shadow-soft">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Notification Channels</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Email', icon: FiMail, status: 'connected', description: 'admin@company.com' },
            { name: 'SMS', icon: FiSmartphone, status: 'connected', description: '+91 98765 43210' },
            { name: 'Slack', icon: FiSlack, status: 'connected', description: '#alerts channel' },
            { name: 'Teams', icon: FiMessageSquare, status: 'not_connected', description: 'Not configured' }
          ].map((channel) => (
            <div key={channel.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  channel.status === 'connected' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <SafeIcon 
                    icon={channel.icon} 
                    className={`w-5 h-5 ${channel.status === 'connected' ? 'text-green-600' : 'text-gray-600'}`} 
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{channel.name}</h3>
                  <p className="text-xs text-gray-500">{channel.description}</p>
                </div>
              </div>
              <button className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                channel.status === 'connected' 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                {channel.status === 'connected' ? 'Connected' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Alerts;