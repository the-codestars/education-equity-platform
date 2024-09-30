// src/pages/AnalyticsDashboard.js
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../api/analytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { toast } from 'react-toastify';

const AnalyticsDashboard = () => {
  const [userEngagement, setUserEngagement] = useState([]);
  const [contentInteraction, setContentInteraction] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const data = await getDashboardData();
        setUserEngagement(data.userEngagement);
        setContentInteraction(data.contentInteraction);
        setPerformanceMetrics(data.performanceMetrics);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        toast.error('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading analytics...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-3xl font-bold mb-6">Analytics Dashboard</h2>

      {/* User Engagement Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">User Engagement</h3>
        <LineChart
          width={600}
          height={300}
          data={userEngagement}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
          <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" />
        </LineChart>
      </section>

      {/* Content Interaction Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Content Interaction</h3>
        <BarChart
          width={600}
          height={300}
          data={contentInteraction}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="content" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="views" fill="#8884d8" />
          <Bar dataKey="likes" fill="#82ca9d" />
          <Bar dataKey="comments" fill="#ffc658" />
        </BarChart>
      </section>

      {/* Performance Metrics Section */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Performance Metrics</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={performanceMetrics}
            dataKey="value"
            nameKey="metric"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {performanceMetrics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
