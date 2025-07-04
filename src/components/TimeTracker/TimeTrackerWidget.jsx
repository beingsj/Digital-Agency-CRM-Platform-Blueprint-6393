import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiSquare, FiClock, FiChevronUp, FiChevronDown } = FiIcons;

function TimeTrackerWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [currentTask, setCurrentTask] = useState(null);
  const [idleTime, setIdleTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // Mock idle detection
  useEffect(() => {
    let idleInterval;
    if (isRunning && !isPaused) {
      idleInterval = setInterval(() => {
        setIdleTime(prevIdle => prevIdle + 1);
      }, 1000);
    } else {
      setIdleTime(0);
    }
    return () => clearInterval(idleInterval);
  }, [isRunning, isPaused]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    setCurrentTask('Website Development');
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
    setCurrentTask(null);
    setIdleTime(0);
  };

  const isIdle = idleTime > 300; // 5 minutes idle

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-strong border border-gray-200 overflow-hidden"
    >
      {/* Idle Banner */}
      <AnimatePresence>
        {isIdle && isRunning && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="bg-warning-50 border-b border-warning-200 px-4 py-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="w-4 h-4 text-warning-600" />
                <span className="text-sm text-warning-700">
                  Idle for {Math.floor(idleTime / 60)}m {idleTime % 60}s
                </span>
              </div>
              <button
                onClick={handleResume}
                className="text-xs text-warning-600 hover:text-warning-700 font-medium"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Widget */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isRunning ? (isPaused ? 'bg-warning-500' : 'bg-success-500') : 'bg-gray-300'
            }`} />
            <span className="text-sm font-medium text-gray-700">
              {isRunning ? (isPaused ? 'Paused' : 'Running') : 'Stopped'}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={isExpanded ? FiChevronDown : FiChevronUp} className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="text-center mb-3">
          <div className="text-2xl font-mono font-bold text-gray-900">
            {formatTime(time)}
          </div>
          {currentTask && (
            <div className="text-sm text-gray-600 mt-1">
              {currentTask}
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiPlay} className="w-4 h-4" />
              <span className="text-sm">Start</span>
            </button>
          ) : (
            <>
              <button
                onClick={isPaused ? handleResume : handlePause}
                className="flex items-center space-x-2 px-3 py-2 bg-warning-600 text-white rounded-lg hover:bg-warning-700 transition-colors"
              >
                <SafeIcon icon={isPaused ? FiPlay : FiPause} className="w-4 h-4" />
                <span className="text-sm">{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
              <button
                onClick={handleStop}
                className="flex items-center space-x-2 px-3 py-2 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors"
              >
                <SafeIcon icon={FiSquare} className="w-4 h-4" />
                <span className="text-sm">Stop</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Expanded Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="border-t border-gray-200 p-4"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Task
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="">Select a task...</option>
                  <option value="website-dev">Website Development</option>
                  <option value="mobile-app">Mobile App Design</option>
                  <option value="seo-optimization">SEO Optimization</option>
                  <option value="brand-identity">Brand Identity</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Today:</span>
                  <span className="font-medium ml-2">6h 24m</span>
                </div>
                <div>
                  <span className="text-gray-600">This week:</span>
                  <span className="font-medium ml-2">32h 15m</span>
                </div>
              </div>

              <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                View detailed tracker
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default TimeTrackerWidget;