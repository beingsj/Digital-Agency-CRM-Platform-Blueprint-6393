import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiPlus, FiCalendar, FiTag, FiPaperclip, FiTrendingUp, FiTrendingDown } = FiIcons;

function Expenses() {
  const { state } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const currencySymbol = state.currency === 'INR' ? '₹' : '$';

  const expenses = [
    {
      id: 1,
      description: 'Google Ads Campaign',
      amount: state.currency === 'INR' ? 15000 : 180,
      category: 'Advertising',
      date: '2024-01-25',
      client: 'Acme Corp',
      receipt: true
    },
    {
      id: 2,
      description: 'Freelancer Payment - Content Writing',
      amount: state.currency === 'INR' ? 8000 : 95,
      category: 'Freelancer',
      date: '2024-01-24',
      client: 'TechStart Inc',
      receipt: false
    },
    {
      id: 3,
      description: 'Software Subscription - Design Tools',
      amount: state.currency === 'INR' ? 2500 : 30,
      category: 'Software',
      date: '2024-01-23',
      client: null,
      receipt: true
    },
    {
      id: 4,
      description: 'Facebook Ads Campaign',
      amount: state.currency === 'INR' ? 12000 : 145,
      category: 'Advertising',
      date: '2024-01-22',
      client: 'Digital Solutions',
      receipt: true
    }
  ];

  const categories = [
    { name: 'Advertising', total: 27000, count: 2, color: 'primary' },
    { name: 'Freelancer', total: 8000, count: 1, color: 'secondary' },
    { name: 'Software', total: 2500, count: 1, color: 'success' },
    { name: 'Travel', total: 0, count: 0, color: 'warning' }
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const lastMonthTotal = totalExpenses * 0.85; // Mock previous month data
  const change = ((totalExpenses - lastMonthTotal) / lastMonthTotal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-1">Track and manage business expenses</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="thisYear">This Year</option>
          </select>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-danger-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-danger-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                {currencySymbol}{totalExpenses.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <SafeIcon 
                  icon={change >= 0 ? FiTrendingUp : FiTrendingDown} 
                  className={`w-3 h-3 ${change >= 0 ? 'text-danger-600' : 'text-success-600'}`} 
                />
                <span className={`text-xs ${change >= 0 ? 'text-danger-600' : 'text-success-600'}`}>
                  {Math.abs(change).toFixed(1)}% vs last month
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCalendar} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
              <p className="text-xs text-gray-500 mt-1">Total transactions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTag} className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Top Category</p>
              <p className="text-lg font-bold text-gray-900">Advertising</p>
              <p className="text-xs text-gray-500 mt-1">
                {currencySymbol}{categories[0].total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-soft">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Expenses</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {expenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{expense.description}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {expense.category}
                            </span>
                            {expense.client && (
                              <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">
                                {expense.client}
                              </span>
                            )}
                            {expense.receipt && (
                              <SafeIcon icon={FiPaperclip} className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {currencySymbol}{expense.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-soft">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Category Breakdown</h2>
          </div>
          <div className="p-6 space-y-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-${category.color}-500`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.count} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {currencySymbol}{category.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {totalExpenses > 0 ? Math.round((category.total / totalExpenses) * 100) : 0}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Expenses;