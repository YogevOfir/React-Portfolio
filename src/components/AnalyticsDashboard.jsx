// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { getAnalyticsData } from '../config/firebase';
// import { FaUsers, FaChartLine, FaTrophy, FaEye, FaUnlock, FaCheckCircle, FaCode, FaHeart, FaStar } from 'react-icons/fa';


// const AnalyticsDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadAnalytics();
//   }, []);

//   const loadAnalytics = async () => {
//     try {
//       setLoading(true);
//       const result = await getAnalyticsData();
//       if (result.success) {
//         setAnalytics(result.data);
//       } else {
//         setError(result.error);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
//         <p className="text-neutral-400 mt-2">Loading analytics...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-red-400">Error loading analytics: {error}</p>
//         <button 
//           onClick={loadAnalytics}
//           className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!analytics) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-neutral-400">No analytics data available</p>
//       </div>
//     );
//   }

//   const formatDate = (timestamp) => {
//     return new Date(timestamp).toLocaleDateString();
//   };

//   return (
//     <div className="py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center mb-8"
//       >
//         <h2 className="text-2xl font-bold text-neutral-200 mb-2">Portfolio Analytics</h2>
//         <p className="text-neutral-400">Track your portfolio performance and user engagement</p>
//       </motion.div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 text-center"
//         >
//           <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/20 rounded-full flex items-center justify-center">
//             <FaUsers className="text-blue-400 text-xl" />
//           </div>
//           <div className="text-2xl font-bold text-neutral-200">{analytics.totalVisitors}</div>
//           <div className="text-sm text-neutral-400">Total Visitors</div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2 }}
//           className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 text-center"
//         >
//           <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
//             <FaTrophy className="text-green-400 text-xl" />
//           </div>
//           <div className="text-2xl font-bold text-neutral-200">{analytics.completedVisitors}</div>
//           <div className="text-sm text-neutral-400">Completed Journey</div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//           className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 text-center"
//         >
//           <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/20 rounded-full flex items-center justify-center">
//             <FaChartLine className="text-purple-400 text-xl" />
//           </div>
//           <div className="text-2xl font-bold text-neutral-200">{analytics.completionRate}%</div>
//           <div className="text-sm text-neutral-400">Completion Rate</div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.4 }}
//           className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 text-center"
//         >
//           <div className="w-12 h-12 mx-auto mb-3 bg-cyan-500/20 rounded-full flex items-center justify-center">
//             <FaEye className="text-cyan-400 text-xl" />
//           </div>
//           <div className="text-2xl font-bold text-neutral-200">{analytics.pageViews}</div>
//           <div className="text-sm text-neutral-400">Page Views</div>
//         </motion.div>
//       </div>

//       {/* Detailed Analytics */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Technology Preferences */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.5 }}
//           className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
//         >
//           <h3 className="text-lg font-semibold text-neutral-200 mb-4 flex items-center gap-2">
//             <FaCode className="text-cyan-400" />
//             Technology Preferences
//           </h3>
//           <div className="space-y-3">
//             {Object.entries(analytics.techChoices)
//               .sort(([,a], [,b]) => b - a)
//               .map(([tech, count]) => (
//                 <div key={tech} className="flex items-center justify-between">
//                   <span className="text-neutral-300 capitalize">{tech}</span>
//                   <div className="flex items-center gap-2">
//                     <div className="w-20 bg-neutral-700 rounded-full h-2">
//                       <div 
//                         className="bg-cyan-400 h-2 rounded-full"
//                         style={{ width: `${(count / Math.max(...Object.values(analytics.techChoices))) * 100}%` }}
//                       />
//                     </div>
//                     <span className="text-cyan-400 font-medium text-sm">{count}</span>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </motion.div>

//         {/* User Interests */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.6 }}
//           className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
//         >
//           <h3 className="text-lg font-semibold text-neutral-200 mb-4 flex items-center gap-2">
//             <FaStar className="text-yellow-400" />
//             User Interests
//           </h3>
//           <div className="space-y-3">
//             {Object.entries(analytics.interests)
//               .sort(([,a], [,b]) => b - a)
//               .map(([interest, count]) => (
//                 <div key={interest} className="flex items-center justify-between">
//                   <span className="text-neutral-300 capitalize">{interest}</span>
//                   <div className="flex items-center gap-2">
//                     <div className="w-20 bg-neutral-700 rounded-full h-2">
//                       <div 
//                         className="bg-yellow-400 h-2 rounded-full"
//                         style={{ width: `${(count / Math.max(...Object.values(analytics.interests))) * 100}%` }}
//                       />
//                     </div>
//                     <span className="text-yellow-400 font-medium text-sm">{count}</span>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </motion.div>

//         {/* Popular Projects */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.7 }}
//           className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
//         >
//           <h3 className="text-lg font-semibold text-neutral-200 mb-4 flex items-center gap-2">
//             <FaHeart className="text-pink-400" />
//             Popular Projects
//           </h3>
//           <div className="space-y-3">
//             {Object.entries(analytics.projects)
//               .sort(([,a], [,b]) => b - a)
//               .map(([project, count]) => (
//                 <div key={project} className="flex items-center justify-between">
//                   <span className="text-neutral-300 capitalize">{project}</span>
//                   <div className="flex items-center gap-2">
//                     <div className="w-20 bg-neutral-700 rounded-full h-2">
//                       <div 
//                         className="bg-pink-400 h-2 rounded-full"
//                         style={{ width: `${(count / Math.max(...Object.values(analytics.projects))) * 100}%` }}
//                       />
//                     </div>
//                     <span className="text-pink-400 font-medium text-sm">{count}</span>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </motion.div>

//         {/* Recent Activity */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.8 }}
//           className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
//         >
//           <h3 className="text-lg font-semibold text-neutral-200 mb-4 flex items-center gap-2">
//             <FaUnlock className="text-green-400" />
//             Recent Activity
//           </h3>
//           <div className="space-y-2 max-h-48 overflow-y-auto">
//             {analytics.recentActivity.slice(0, 8).map((activity, index) => (
//               <div key={index} className="flex items-center gap-2 text-sm">
//                 <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
//                 <span className="text-neutral-400">
//                   {activity.action || activity.section || activity.page}
//                 </span>
//                 <span className="text-neutral-500 text-xs">
//                   {formatDate(activity.timestamp)}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Refresh Button */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.9 }}
//         className="text-center mt-8"
//       >
//         <button
//           onClick={loadAnalytics}
//           className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-200"
//         >
//           Refresh Analytics
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;
