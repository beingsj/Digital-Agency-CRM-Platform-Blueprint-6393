import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiArrowLeft, FiSend } = FiIcons;

function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || 'Failed to send reset email');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <SafeIcon icon={FiSend} className="w-8 h-8 text-green-600" />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Next steps:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check your email inbox (and spam folder)</li>
            <li>• Click the reset link in the email</li>
            <li>• Create a new password</li>
            <li>• Sign in with your new password</li>
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Try a different email
          </button>
          
          <div>
            <Link
              to="/auth/login"
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Reset your password</h2>
        <p className="text-gray-600 mt-2">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <div className="relative">
            <SafeIcon 
              icon={FiMail} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
            />
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                error ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <SafeIcon icon={FiSend} className="w-5 h-5" />
          )}
          <span>{isLoading ? 'Sending...' : 'Send reset link'}</span>
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default ForgotPassword;