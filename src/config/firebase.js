// src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { collection, getDocs } from 'firebase/firestore';

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDLi8kAIKzbOBIUajVjgKRLV62_gmdiNEI",
  authDomain: "portfolio-cda03.firebaseapp.com",
  projectId: "portfolio-cda03",
  storageBucket: "portfolio-cda03.appspot.com",
  messagingSenderId: "787586669322",
  appId: "1:787586669322:web:09ddfca1fb0cd1d3dbf8f3",
  measurementId: "G-6PREME4JJN"
};

// ✅ Init
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// -------- Tracking functions --------
export const trackPageView = async (pageName) => {
  logEvent(analytics, 'page_view', {
    page_name: pageName,
    sessionId: sessionStorage.getItem('sessionId'),
    timestamp: Date.now()
  });
};

export const trackUserInteraction = async (action, data = {}) => {
  logEvent(analytics, 'user_interaction', {
    action,
    ...data,
    sessionId: sessionStorage.getItem('sessionId'),
    timestamp: Date.now()
  });
};

export const trackSectionUnlock = async (sectionName) => {
  logEvent(analytics, 'section_unlocked', {
    section_name: sectionName,
    sessionId: sessionStorage.getItem('sessionId'),
    timestamp: Date.now()
  });
};

export const trackPortfolioCompletion = async (userChoices = {}) => {
  logEvent(analytics, 'portfolio_completed', {
    ...userChoices,
    sessionId: sessionStorage.getItem('sessionId'),
    timestamp: Date.now()
  });
};

// -------- Session --------
export const initializeSession = () => {
  if (!sessionStorage.getItem('sessionId')) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionStorage.getItem('sessionId');
};
initializeSession();

// -------- Custom Analytics Data --------
export const getAnalyticsData = async () => {
  try {
    const snapshot = await getDocs(collection(db, "analyticsEvents"));

    let totalVisitors = 0;
    let completedVisitors = 0;
    let pageViews = 0;
    const techChoices = {};
    const interests = {};
    const projects = {};
    const recentActivity = [];

    snapshot.forEach((doc) => {
      const event = doc.data();
      totalVisitors++;

      if (event.type === "page_view") pageViews++;

      if (event.type === "portfolio_completed") {
        completedVisitors++;
        if (event.details?.techStack) {
          techChoices[event.details.techStack] =
            (techChoices[event.details.techStack] || 0) + 1;
        }
        if (event.details?.interest) {
          interests[event.details.interest] =
            (interests[event.details.interest] || 0) + 1;
        }
        if (event.details?.project) {
          projects[event.details.project] =
            (projects[event.details.project] || 0) + 1;
        }
      }

      recentActivity.push({
        action: event.type,
        timestamp: event.timestamp?.toDate
          ? event.timestamp.toDate().getTime()
          : Date.now(),
      });
    });

    return {
      success: true,
      data: {
        totalVisitors,
        completedVisitors,
        completionRate: totalVisitors
          ? Math.round((completedVisitors / totalVisitors) * 100)
          : 0,
        pageViews,
        techChoices,
        interests,
        projects,
        recentActivity: recentActivity
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 10),
      },
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return { success: false, error: error.message };
  }
};

export default firebaseConfig;
