import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckSquare, FiPlus, FiUser, FiCalendar, FiFlag, FiClock } = FiIcons;

function Tasks() {
  const [tasks] = useState([
    {
      id: 1,
      title: 'Design homepage mockup',
      description: 'Create wireframes and mockups for the new homepage design',
      project: 'Website Redesign',
      assignee: 'Emma Davis',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2024-02-01',
      timeSpent: 4.5
    },
    {
      id: 2,
      title: 'Write blog post about SEO',
      description: 'Research and write comprehensive blog post about latest SEO trends',
      project: 'Content Marketing',
      assignee: 'John Smith',
      priority: 'medium',
      status: 'todo',
      dueDate: '2024-02-03',
      timeSpent: 0
    },
    {
      id: 3,
      title: 'Setup Google Analytics',
      description: 'Configure GA4 tracking for client website',
      project: 'SEO Campaign',
      assignee: 'Sarah Johnson',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-01-30',
      timeSpent: 2
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage and track task progress</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'all', label: 'All Tasks', count: tasks.length },
            { id: 'todo', label: 'To Do', count: tasks.filter(t => t.status === 'todo').length },
            { id: 'in_progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in_progress').length },
            { id: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCheckSquare} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCheckSquare} className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.reduce((sum, t) => sum + t.timeSpent, 0)}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-lg shadow-soft">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Task List</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    readOnly
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded">
                          {task.project}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <SafeIcon icon={FiUser} className="w-3 h-3" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <SafeIcon icon={FiClock} className="w-3 h-3" />
                          <span>{task.timeSpent}h</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <SafeIcon 
                        icon={FiFlag} 
                        className={`w-4 h-4 ${getPriorityColor(task.priority)}`} 
                      />
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Tasks;