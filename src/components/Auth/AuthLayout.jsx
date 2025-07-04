import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap } = FiIcons;

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiZap} className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Get Catalyzed CRM</h1>
                <p className="text-primary-100">Digital Marketing Platform</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              Accelerate Your Digital Marketing Success
            </h2>
            
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Complete CRM solution with project management, time tracking, 
              invoicing, and VA team coordination. Everything you need to scale your agency.
            </p>
            
            <div className="space-y-4">
              {[
                'Campaign-centric CRM & billing',
                'Time tracking with screenshot capture',
                'Tax-compliant invoicing (INR/USD)',
                'VA team management & productivity insights',
                'Real-time alerts & notifications',
                'AI-powered assistance'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-primary-100">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-32 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiZap} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Get Catalyzed CRM</h1>
                <p className="text-sm text-gray-600">Digital Marketing Platform</p>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;