import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiUsers, FiCheck, FiX, FiRefreshCw, FiAlertCircle } = FiIcons;

function Subscriptions() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('plans');
  
  const currencySymbol = state.currency === 'INR' ? '₹' : '$';
  
  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: state.currency === 'INR' ? 5000 : 60,
      billing: 'monthly',
      features: ['5 Projects', '10 VA Hours', 'Basic Support', 'Email Notifications'],
      subscribers: 12,
      status: 'active'
    },
    {
      id: 2,
      name: 'Professional Plan',
      price: state.currency === 'INR' ? 12000 : 150,
      billing: 'monthly',
      features: ['Unlimited Projects', '50 VA Hours', 'Priority Support', 'Advanced Analytics'],
      subscribers: 8,
      status: 'active'
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      price: state.currency === 'INR' ? 25000 : 300,
      billing: 'monthly',
      features: ['Everything', 'Unlimited VA Hours', '24/7 Support', 'Custom Integrations'],
      subscribers: 3,
      status: 'active'
    }
  ];

  const subscriptions = [
    {
      id: 1,
      client: 'Acme Corp',
      plan: 'Professional Plan',
      status: 'active',
      nextBilling: '2024-02-15',
      amount: state.currency === 'INR' ? 12000 : 150
    },
    {
      id: 2,
      client: 'TechStart Inc',
      plan: 'Basic Plan',
      status: 'active',
      nextBilling: '2024-02-20',
      amount: state.currency === 'INR' ? 5000 : 60
    },
    {
      id: 3,
      client: 'Digital Solutions',
      plan: 'Enterprise Plan',
      status: 'past_due',
      nextBilling: '2024-01-28',
      amount: state.currency === 'INR' ? 25000 : 300
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions & Plans</h1>
          <p className="text-gray-600 mt-1">Manage subscription plans and client subscriptions</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          Create Plan
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'plans', label: 'Subscription Plans', count: plans.length },
            { id: 'subscriptions', label: 'Active Subscriptions', count: subscriptions.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-soft border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {plan.status}
                  </span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      {currencySymbol}{plan.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">/{plan.billing}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-success-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Subscribers</p>
                    <p className="text-lg font-semibold text-gray-900">{plan.subscribers}</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Edit Plan
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'subscriptions' && (
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <SafeIcon icon={FiUsers} className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{subscription.client}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.plan}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscription.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscription.status === 'active' ? 'Active' : 'Past Due'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscription.nextBilling).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {currencySymbol}{subscription.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Recurring Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {currencySymbol}{subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">
                {subscriptions.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiAlertCircle} className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Past Due</p>
              <p className="text-2xl font-bold text-gray-900">
                {subscriptions.filter(s => s.status === 'past_due').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Subscriptions;