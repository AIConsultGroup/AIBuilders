import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: DataPoint[];
  title: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  horizontal?: boolean;
}

const defaultColors = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  horizontal = false
}) => {
  // Assign colors if not provided
  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: item.color || defaultColors[index % defaultColors.length]
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {horizontal ? (
            <RechartsBarChart
              layout="vertical"
              data={dataWithColors}
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" label={{ value: yAxisLabel, position: 'insideBottom', offset: -5 }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                label={{ value: xAxisLabel, angle: -90, position: 'insideLeft' }} 
                width={120} 
              />
              <Tooltip />
              <Legend />
              {dataWithColors.map((entry, index) => (
                <Bar 
                  key={index}
                  dataKey="value" 
                  name={entry.name} 
                  fill={entry.color} 
                />
              ))}
            </RechartsBarChart>
          ) : (
            <RechartsBarChart
              data={dataWithColors}
              margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }} 
              />
              <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {dataWithColors.map((entry, index) => (
                <Bar 
                  key={index}
                  dataKey="value" 
                  name={entry.name} 
                  fill={entry.color} 
                />
              ))}
            </RechartsBarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;