import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiPlus, FiEye, FiDownload, FiSend, FiDollarSign, FiClock, FiCheck } = FiIcons;

function Invoices() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  
  const currencySymbol = state.currency === 'INR' ? '₹' : '$';
  
  const invoices = [
    {
      id: 'INV-2024-001',
      client: 'Acme Corp',
      amount: state.currency === 'INR' ? 45000 : 540,
      status: 'paid',
      dueDate: '2024-01-15',
      createdDate: '2024-01-01'
    },
    {
      id: 'INV-2024-002',
      client: 'TechStart Inc',
      amount: state.currency === 'INR' ? 32000 : 385,
      status: 'sent',
      dueDate: '2024-02-15',
      createdDate: '2024-01-15'
    },
    {
      id: 'INV-2024-003',
      client: 'Digital Solutions',
      amount: state.currency === 'INR' ? 67000 : 800,
      status: 'overdue',
      dueDate: '2024-01-30',
      createdDate: '2024-01-16'
    },
    {
      id: 'INV-2024-004',
      client: 'StartupXYZ',
      amount: state.currency === 'INR' ? 28000 : 335,
      status: 'draft',
      dueDate: '2024-02-28',
      createdDate: '2024-01-20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return FiCheck;
      case 'sent': return FiSend;
      case 'overdue': return FiClock;
      case 'draft': return FiFileText;
      default: return FiFileText;
    }
  };

  const filteredInvoices = activeTab === 'all' 
    ? invoices 
    : invoices.filter(invoice => invoice.status === activeTab);

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    outstanding: invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'draft').reduce((sum, inv) => sum + inv.amount, 0),
    overdue: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">Create and manage tax-compliant invoices</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiFileText} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {currencySymbol}{stats.total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCheck} className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-gray-900">
                {currencySymbol}{stats.paid.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">
                {currencySymbol}{stats.outstanding.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-danger-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-danger-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">
                {currencySymbol}{stats.overdue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'all', label: 'All Invoices', count: invoices.length },
            { id: 'draft', label: 'Drafts', count: invoices.filter(i => i.status === 'draft').length },
            { id: 'sent', label: 'Sent', count: invoices.filter(i => i.status === 'sent').length },
            { id: 'paid', label: 'Paid', count: invoices.filter(i => i.status === 'paid').length },
            { id: 'overdue', label: 'Overdue', count: invoices.filter(i => i.status === 'overdue').length }
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

      {/* Invoice List */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={getStatusIcon(invoice.status)} className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                        <div className="text-sm text-gray-500">
                          Created {new Date(invoice.createdDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {currencySymbol}{invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600" title="View">
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" title="Download">
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      </button>
                      {invoice.status === 'draft' && (
                        <button className="text-primary-600 hover:text-primary-900" title="Send">
                          <SafeIcon icon={FiSend} className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default Invoices;