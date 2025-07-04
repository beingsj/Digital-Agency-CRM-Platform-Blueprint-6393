import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiClock, FiTrendingUp, FiActivity } = FiIcons;

function VAUtilization() {
  const [utilizationData, setUtilizationData] = useState([]);
  const [summary, setSummary] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUtilizationData();
  }, []);

  const fetchUtilizationData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const mockData = [
      { name: 'Sarah Johnson', hours: 38, capacity: 40, efficiency: 95, tasks: 12 },
      { name: 'Mike Chen', hours: 35, capacity: 40, efficiency: 87.5, tasks: 10 },
      { name: 'Emma Davis', hours: 42, capacity: 40, efficiency: 105, tasks: 15 },
      { name: 'James Wilson', hours: 30, capacity: 40, efficiency: 75, tasks: 8 },
      { name: 'Lisa Brown', hours: 36, capacity: 40, efficiency: 90, tasks: 11 }
    ];
    
    const totalHours = mockData.reduce((sum, va) => sum + va.hours, 0);
    const totalCapacity = mockData.reduce((sum, va) => sum + va.capacity, 0);
    const avgEfficiency = mockData.reduce((sum, va) => sum + va.efficiency, 0) / mockData.length;
    
    setUtilizationData(mockData);
    setSummary({
      totalHours,
      totalCapacity,
      avgEfficiency,
      activeVAs: mockData.length
    });
    setIsLoading(false);
  };

  const getChartOptions = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          const dataIndex = params[0].dataIndex;
          const va = utilizationData[dataIndex];
          return `
            <div style="font-weight: bold; margin-bottom: 8px;">${va.name}</div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="display: inline-block; width: 10px; height: 10px; background-color: #0ea5e9; border-radius: 50%; margin-right: 8px;"></span>
              <span style="flex: 1;">Hours Worked:</span>
              <span style="font-weight: bold;">${va.hours}h</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="display: inline-block; width: 10px; height: 10px; background-color: #e5e7eb; border-radius: 50%; margin-right: 8px;"></span>
              <span style="flex: 1;">Capacity:</span>
              <span style="font-weight: bold;">${va.capacity}h</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="flex: 1;">Efficiency:</span>
              <span style="font-weight: bold;">${va.efficiency}%</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="flex: 1;">Tasks Completed:</span>
              <span style="font-weight: bold;">${va.tasks}</span>
            </div>
          `;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: utilizationData.map(va => va.name.split(' ')[0]),
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        max: 45,
        axisLabel: {
          formatter: '{value}h'
        }
      },
      series: [
        {
          name: 'Hours Worked',
          type: 'bar',
          data: utilizationData.map(va => va.hours),
          itemStyle: {
            color: '#0ea5e9'
          },
          barMaxWidth: 30
        },
        {
          name: 'Capacity',
          type: 'bar',
          data: utilizationData.map(va => va.capacity),
          itemStyle: {
            color: '#e5e7eb'
          },
          barMaxWidth: 30,
          z: 0
        }
      ]
    };
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="w-32 h-6 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <div className="w-12 h-4 bg-gray-200 rounded mx-auto mb-1"></div>
                <div className="w-16 h-3 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="w-full h-48 bg-gray-200 rounded"></div>
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
        <h2 className="text-lg font-semibold text-gray-900">VA Utilization</h2>
        <span className="text-sm text-gray-500">{summary.activeVAs} active VAs</span>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <SafeIcon icon={FiClock} className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-lg font-semibold text-gray-900">{summary.totalHours}h</div>
          <div className="text-xs text-gray-500">Total Hours</div>
        </div>
        
        <div className="text-center">
          <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <SafeIcon icon={FiUsers} className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-lg font-semibold text-gray-900">{summary.totalCapacity}h</div>
          <div className="text-xs text-gray-500">Capacity</div>
        </div>
        
        <div className="text-center">
          <div className="w-8 h-8 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-success-600" />
          </div>
          <div className="text-lg font-semibold text-gray-900">{summary.avgEfficiency.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">Avg Efficiency</div>
        </div>
        
        <div className="text-center">
          <div className="w-8 h-8 bg-warning-50 rounded-full flex items-center justify-center mx-auto mb-2">
            <SafeIcon icon={FiActivity} className="w-4 h-4 text-warning-600" />
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {((summary.totalHours / summary.totalCapacity) * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-500">Utilization</div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-48">
        <ReactECharts
          option={getChartOptions()}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </motion.div>
  );
}

export default VAUtilization;