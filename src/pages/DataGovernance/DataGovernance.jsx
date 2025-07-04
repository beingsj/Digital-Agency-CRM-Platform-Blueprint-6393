import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiTrash, FiDownload, FiEye, FiClock, FiCheck, FiX } = FiIcons;

function DataGovernance() {
  const [deletionRequests] = useState([
    {
      id: 1,
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      requestDate: '2024-01-20',
      status: 'pending',
      dataTypes: ['Personal Info', 'Project Data', 'Communication History']
    },
    {
      id: 2,
      clientName: 'Sarah Smith',
      clientEmail: 'sarah@company.com',
      requestDate: '2024-01-18',
      status: 'approved',
      dataTypes: ['Personal Info', 'Billing Data'],
      approvedDate: '2024-01-22'
    },
    {
      id: 3,
      clientName: 'Mike Johnson',
      clientEmail: 'mike@startup.com',
      requestDate: '2024-01-15',
      status: 'completed',
      dataTypes: ['All Data'],
      completedDate: '2024-01-25'
    }
  ]);

  const retentionPolicies = [
    {
      dataType: 'Screenshots',
      retention: '90 days',
      autoDelete: true,
      description: 'Time tracking screenshots'
    },
    {
      dataType: 'Activity Logs',
      retention: '1 year',
      autoDelete: true,
      description: 'User activity and audit logs'
    },
    {
      dataType: 'Project Data',
      retention: '5 years',
      autoDelete: false,
      description: 'Project files and communications'
    },
    {
      dataType: 'Financial Records',
      retention: '7 years',
      autoDelete: false,
      description: 'Invoices, payments, and tax records'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return FiClock;
      case 'approved': return FiCheck;
      case 'completed': return FiCheck;
      case 'rejected': return FiX;
      default: return FiClock;
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
          <h1 className="text-2xl font-bold text-gray-900">Data Governance</h1>
          <p className="text-gray-600 mt-1">GDPR/CCPA compliance and data management</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShield} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{deletionRequests.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {deletionRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCheck} className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {deletionRequests.filter(r => r.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-info-50 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrash} className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Auto-Deleted</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Deletion Requests */}
        <div className="bg-white rounded-lg shadow-soft">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Data Deletion Requests</h2>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {deletionRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={getStatusIcon(request.status)} className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{request.clientName}</h3>
                      <p className="text-sm text-gray-500">{request.clientEmail}</p>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {request.dataTypes.map((type) => (
                            <span key={type} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Requested: {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    
                    {request.status === 'pending' && (
                      <div className="flex space-x-1">
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Retention Policies */}
        <div className="bg-white rounded-lg shadow-soft">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Retention Policies</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Configure
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {retentionPolicies.map((policy, index) => (
              <motion.div
                key={policy.dataType}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{policy.dataType}</h3>
                    <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span className="text-gray-500">Retention: <strong>{policy.retention}</strong></span>
                      {policy.autoDelete && (
                        <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
                          Auto-delete enabled
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="bg-white rounded-lg shadow-soft">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Compliance Status</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">GDPR Compliant</h3>
              <p className="text-sm text-gray-600 mt-1">All requirements met</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">CCPA Compliant</h3>
              <p className="text-sm text-gray-600 mt-1">Privacy rights protected</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <SafeIcon icon={FiShield} className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Data Security</h3>
              <p className="text-sm text-gray-600 mt-1">Encryption & access controls</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DataGovernance;