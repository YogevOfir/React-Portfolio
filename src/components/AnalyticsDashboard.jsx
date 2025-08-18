import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// ➡️ Updated import: Use getAnalyticsData instead of getVisitCount
import { getAnalyticsData } from '../config/firebase'; 
import { FaUsers, FaChartLine } from 'react-icons/fa'; // Import a new icon for total visits

const AnalyticsDashboard = () => {
  // State to hold both total visits and unique visitors data
  const [analyticsData, setAnalyticsData] = useState({ totalVisits: null, uniqueVisitors: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // ➡️ Call the new getAnalyticsData function
      const data = await getAnalyticsData();
      setAnalyticsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
        <p className="text-neutral-400 mt-2">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Error loading analytics: {error}</p>
        <button 
          onClick={loadAnalytics}
          className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  // Handle case where no data is available (e.g., initial load before Firestore has data)
  if (analyticsData.totalVisits === null && analyticsData.uniqueVisitors === null) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-400">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-neutral-200 mb-2">Portfolio Analytics</h2>
        <p className="text-neutral-400">Track your portfolio performance</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Unique Visitors Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/20 rounded-full flex items-center justify-center">
            <FaUsers className="text-blue-400 text-xl" />
          </div>
          <div className="text-2xl font-bold text-neutral-200">{analyticsData.uniqueVisitors}</div>
          <div className="text-sm text-neutral-400">Unique Visitors</div>
        </motion.div>

        {/* Total Visits Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <FaChartLine className="text-cyan-400 text-xl" />
          </div>
          <div className="text-2xl font-bold text-neutral-200">{analyticsData.totalVisits}</div>
          <div className="text-sm text-neutral-400">Total Visits (Page Loads)</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center mt-8"
      >
        <button
          onClick={loadAnalytics}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-200"
        >
          Refresh Analytics
        </button>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
