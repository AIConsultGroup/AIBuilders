import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockAnalyticsData } from '../data/mockData';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Total Members</h3>
          <p className="text-3xl font-bold mt-2">{mockAnalyticsData.totalMembers.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Open to Hire</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">{mockAnalyticsData.openToHire}%</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Open to Work</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">{mockAnalyticsData.openToWork}%</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Active Last 7 Days</h3>
          <p className="text-3xl font-bold mt-2">{mockAnalyticsData.activeLast7Days}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* World Map */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <img 
            src="https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg"
            alt="Member Distribution Map"
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>

        {/* Time Zones */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Time Zones</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData.timeZones}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles & Departments */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Roles & Departments</h3>
          <div className="space-y-4">
            {mockAnalyticsData.roles.map((role) => (
              <div key={role.role}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{role.role}</span>
                  <span>{role.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${role.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Tools</h3>
          <div className="flex flex-wrap gap-3">
            {mockAnalyticsData.tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                style={{ fontSize: Math.random() * 20 + 14 + 'px' }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Top Skills</h3>
          <div className="space-y-3">
            {mockAnalyticsData.topSkills.map((skill) => (
              <div key={skill.skill}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.skill}</span>
                  <span>{skill.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(skill.count / mockAnalyticsData.topSkills[0].count) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Projects */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Open Projects</h3>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{mockAnalyticsData.openProjects.count}</span>
            <span className="text-gray-600">Services on offer</span>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockAnalyticsData.openProjects.trend.map((value, index) => ({
                  month: index + 1,
                  value
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#93C5FD" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;