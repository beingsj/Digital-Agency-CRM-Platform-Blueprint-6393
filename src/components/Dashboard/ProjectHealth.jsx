import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFolder, FiClock, FiAlertTriangle, FiCheck, FiPlay, FiPause } = FiIcons;

function ProjectHealth() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mockProjects = [
      {
        id: 1,
        name: 'Website Redesign',
        client: 'Acme Corp',
        progress: 75,
        status: 'active',
        dueDate: '2024-02-15',
        tasksCompleted: 12,
        totalTasks: 16,
        health: 'good'
      },
      {
        id: 2,
        name: 'Mobile App Development',
        client: 'Tech Solutions',
        progress: 45,
        status: 'active',
        dueDate: '2024-03-01',
        tasksCompleted: 9,
        totalTasks: 20,
        health: 'warning'
      },
      {
        id: 3,
        name: 'SEO Optimization',
        client: 'Digital Marketing Inc',
        progress: 90,
        status: 'review',
        dueDate: '2024-01-30',
        tasksCompleted: 18,
        totalTasks: 20,
        health: 'excellent'
      },
      {
        id: 4,
        name: 'Brand Identity',
        client: 'StartupXYZ',
        progress: 25,
        status: 'active',
        dueDate: '2024-01-25',
        tasksCompleted: 3,
        totalTasks: 12,
        health: 'critical'
      }
    ];
    
    setProjects(mockProjects);
    setIsLoading(false);
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'excellent': return 'text-success-600 bg-success-50';
      case 'good': return 'text-success-600 bg-success-50';
      case 'warning': return 'text-warning-600 bg-warning-50';
      case 'critical': return 'text-danger-600 bg-danger-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getHealthIcon = (health) => {
    switch (health) {
      case 'excellent': return FiCheck;
      case 'good': return FiCheck;
      case 'warning': return FiClock;
      case 'critical': return FiAlertTriangle;
      default: return FiFolder;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return FiPlay;
      case 'paused': return FiPause;
      case 'review': return FiCheck;
      default: return FiFolder;
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="w-32 h-6 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-soft p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Project Health</h2>
        <span className="text-sm text-gray-500">{projects.length} active projects</span>
      </div>
      
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getHealthColor(project.health)}`}>
              <SafeIcon icon={getHealthIcon(project.health)} className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {project.name}
                </h3>
                <SafeIcon 
                  icon={getStatusIcon(project.status)} 
                  className="w-3 h-3 text-gray-400" 
                />
              </div>
              
              <p className="text-xs text-gray-500 mb-2">{project.client}</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {project.tasksCompleted}/{project.totalTasks} tasks
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-xs font-medium ${
                isOverdue(project.dueDate) ? 'text-danger-600' : 'text-gray-600'
              }`}>
                {new Date(project.dueDate).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500">
                {isOverdue(project.dueDate) ? 'Overdue' : 'Due date'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all projects
        </button>
      </div>
    </motion.div>
  );
}

export default ProjectHealth;