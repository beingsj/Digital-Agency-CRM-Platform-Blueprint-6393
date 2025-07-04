import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap } = FiIcons;

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center"
            >
              <SafeIcon icon={FiZap} className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-gradient mb-2"
          >
            Get Catalyzed CRM
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 text-lg"
          >
            Powering your digital success
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center space-x-1"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-3 h-3 bg-primary-500 rounded-full"
            />
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-sm text-gray-500"
        >
          Loading your workspace...
        </motion.div>
      </div>
    </div>
  );
}

export default LoadingScreen;