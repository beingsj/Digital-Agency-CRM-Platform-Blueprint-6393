import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiChevronLeft, FiChevronRight, FiCheck } = FiIcons;

function TourModal({ isOpen, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      title: 'Welcome to Get Catalyzed CRM!',
      description: 'Your all-in-one platform for managing clients, projects, billing, and VA teams. Let\'s take a quick tour to get you started.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      highlight: null
    },
    {
      title: 'Dashboard Overview',
      description: 'Your dashboard provides real-time insights into revenue, project health, VA utilization, and alerts. All your key metrics at a glance.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      highlight: 'dashboard'
    },
    {
      title: 'Project Management',
      description: 'Create and manage projects with tasks, timelines, and team assignments. Track progress and ensure deadlines are met.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      highlight: 'projects'
    },
    {
      title: 'Time Tracking',
      description: 'Built-in time tracker with screenshot capture and idle detection. Monitor VA productivity and generate accurate timesheets.',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop',
      highlight: 'time-tracker'
    },
    {
      title: 'Invoicing & Billing',
      description: 'Create professional, tax-compliant invoices with detailed breakdowns. Support for multiple currencies and automated billing.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      highlight: 'invoices'
    },
    {
      title: 'AI Assistant',
      description: 'CatalystBot is your AI-powered assistant, ready to help with questions, provide insights, and guide you through features.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      highlight: 'ai-chat'
    },
    {
      title: 'You\'re All Set!',
      description: 'You\'re ready to start managing your digital marketing agency with Get Catalyzed CRM. Explore the features and boost your productivity!',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
      highlight: null
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-strong max-w-lg w-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GC</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Product Tour</h3>
                <p className="text-sm text-gray-500">
                  Step {currentStep + 1} of {tourSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <img
                src={currentTourStep.image}
                alt={currentTourStep.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {currentTourStep.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {currentTourStep.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SafeIcon icon={FiChevronLeft} className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {tourSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <span>
                  {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
                </span>
                <SafeIcon 
                  icon={currentStep === tourSteps.length - 1 ? FiCheck : FiChevronRight} 
                  className="w-4 h-4" 
                />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TourModal;