import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPackage, FiPlus, FiEdit, FiTrash, FiClock, FiDollarSign } = FiIcons;

function Services() {
  const { state } = useApp();
  const [services] = useState([
    {
      id: 1,
      name: 'SEO Optimization',
      description: 'Complete SEO audit and optimization package',
      price: state.currency === 'INR' ? 25000 : 300,
      type: 'service',
      category: 'Digital Marketing'
    },
    {
      id: 2,
      name: 'Content Creation',
      description: 'Blog posts, social media content, and copywriting',
      price: state.currency === 'INR' ? 15000 : 180,
      type: 'service',
      category: 'Content'
    },
    {
      id: 3,
      name: 'VA Hours - Basic',
      description: 'General administrative tasks and support',
      price: state.currency === 'INR' ? 800 : 10,
      type: 'va_hours',
      category: 'Virtual Assistant',
      unit: 'per hour'
    },
    {
      id: 4,
      name: 'VA Hours - Premium',
      description: 'Specialized tasks requiring expertise',
      price: state.currency === 'INR' ? 1200 : 15,
      type: 'va_hours',
      category: 'Virtual Assistant',
      unit: 'per hour'
    }
  ]);

  const currencySymbol = state.currency === 'INR' ? '₹' : '$';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services & VA Hours</h1>
          <p className="text-gray-600 mt-1">Manage your service catalog and VA hour packages</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Services */}
        <div className="bg-white rounded-lg shadow-soft">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiPackage} className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Services</h2>
                <p className="text-sm text-gray-500">Fixed-price service packages</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {services.filter(s => s.type === 'service').map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-lg font-bold text-primary-600">
                        {currencySymbol}{service.price.toLocaleString()}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <SafeIcon icon={FiTrash} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VA Hours */}
        <div className="bg-white rounded-lg shadow-soft">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">VA Hours</h2>
                <p className="text-sm text-gray-500">Hourly virtual assistant services</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {services.filter(s => s.type === 'va_hours').map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-lg font-bold text-warning-600">
                        {currencySymbol}{service.price} {service.unit}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <SafeIcon icon={FiTrash} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiPackage} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.type === 'service').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">VA Hour Packages</p>
              <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.type === 'va_hours').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Service Price</p>
              <p className="text-2xl font-bold text-gray-900">
                {currencySymbol}{Math.round(services.filter(s => s.type === 'service').reduce((sum, s) => sum + s.price, 0) / services.filter(s => s.type === 'service').length).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Services;