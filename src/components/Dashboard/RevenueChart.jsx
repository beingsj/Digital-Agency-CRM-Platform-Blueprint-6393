import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { useApp } from '../../contexts/AppContext';

function RevenueChart({ period }) {
  const { state } = useApp();
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, [period]);

  const fetchChartData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data based on period
    const generateData = () => {
      const days = period === '7d' ? 7 : period === '30d' ? 30 : period === '90d' ? 90 : 365;
      const data = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const revenue = Math.floor(Math.random() * 5000) + 2000;
        const expenses = Math.floor(Math.random() * 2000) + 500;
        
        data.push({
          date: date.toISOString().split('T')[0],
          revenue,
          expenses,
          profit: revenue - expenses
        });
      }
      
      return data;
    };
    
    setChartData(generateData());
    setIsLoading(false);
  };

  const getChartOptions = () => {
    const currencySymbol = state.currency === 'INR' ? '₹' : '$';
    
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: function (params) {
          let tooltip = `<div style="font-weight: bold; margin-bottom: 8px;">${params[0].axisValue}</div>`;
          params.forEach(param => {
            tooltip += `
              <div style="display: flex; align-items: center; margin-bottom: 4px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color}; border-radius: 50%; margin-right: 8px;"></span>
                <span style="flex: 1;">${param.seriesName}:</span>
                <span style="font-weight: bold;">${currencySymbol}${param.value.toLocaleString()}</span>
              </div>
            `;
          });
          return tooltip;
        }
      },
      legend: {
        data: ['Revenue', 'Expenses', 'Profit'],
        top: 10,
        right: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: chartData.map(item => item.date),
        axisLabel: {
          formatter: function (value) {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            return `${currencySymbol}${(value / 1000).toFixed(0)}K`;
          }
        }
      },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: chartData.map(item => item.revenue),
          itemStyle: {
            color: '#0ea5e9'
          }
        },
        {
          name: 'Expenses',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: chartData.map(item => item.expenses),
          itemStyle: {
            color: '#ef4444'
          }
        },
        {
          name: 'Profit',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3
          },
          emphasis: {
            focus: 'series'
          },
          data: chartData.map(item => item.profit),
          itemStyle: {
            color: '#22c55e'
          }
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
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-64 bg-gray-200 rounded"></div>
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
        <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
        <div className="text-sm text-gray-500">
          {period === '7d' ? 'Last 7 days' : 
           period === '30d' ? 'Last 30 days' : 
           period === '90d' ? 'Last 90 days' : 'Last year'}
        </div>
      </div>
      
      <div className="h-64">
        <ReactECharts
          option={getChartOptions()}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </motion.div>
  );
}

export default RevenueChart;