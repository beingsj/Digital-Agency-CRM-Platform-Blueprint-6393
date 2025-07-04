import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiSquare, FiClock, FiCamera, FiEye } = FiIcons;

function TimeTracker() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTask, setSelectedTask] = useState('');

  const timeEntries = [
    {
      id: 1,
      task: 'Website Design',
      project: 'Acme Corp Redesign',
      duration: '2h 30m',
      date: '2024-01-25',
      screenshots: 12
    },
    {
      id: 2,
      task: 'Content Writing',
      project: 'Blog Posts',
      duration: '1h 45m',
      date: '2024-01-25',
      screenshots: 8
    },
    {
      id: 3,
      task: 'SEO Analysis',
      project: 'TechStart Campaign',
      duration: '3h 15m',
      date: '2024-01-24',
      screenshots: 15
    }
  ];

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time Tracker</h1>
          <p className="text-gray-600 mt-1">Track time with automatic screenshot capture</p>
        </div>
      </div>

      {/* Active Timer */}
      <div className="bg-white rounded-lg shadow-soft p-8">
        <div className="text-center">
          <div className="mb-6">
            <div className="text-6xl font-mono font-bold text-gray-900 mb-4">
              {formatTime(currentTime)}
            </div>
            <div className={`w-4 h-4 rounded-full mx-auto ${isRunning ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a task...</option>
              <option value="website-design">Website Design - Acme Corp</option>
              <option value="content-writing">Content Writing - Blog Posts</option>
              <option value="seo-analysis">SEO Analysis - TechStart</option>
            </select>
          </div>

          <div className="flex justify-center space-x-4">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                disabled={!selectedTask}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>Start Timer</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsRunning(false)}
                  className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiPause} className="w-5 h-5" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={() => {
                    setIsRunning(false);
                    setCurrentTime(0);
                    setSelectedTask('');
                  }}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiSquare} className="w-5 h-5" />
                  <span>Stop</span>
                </button>
              </>
            )}
          </div>

          {isRunning && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-blue-700">
                <SafeIcon icon={FiCamera} className="w-4 h-4" />
                <span className="text-sm">Screenshots are being captured every 5 minutes</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Time Entries */}
      <div className="bg-white rounded-lg shadow-soft">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Time Entries</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screenshots</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeEntries.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{entry.task}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCamera} className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{entry.screenshots}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900 flex items-center space-x-1">
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Today's Total</p>
              <p className="text-2xl font-bold text-gray-900">7h 30m</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">32h 15m</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCamera} className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Screenshots</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TimeTracker;