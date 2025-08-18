// src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, runTransaction, collection, getDocs } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

// ✅ Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Init
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// -------- Session --------
// Initializes a session ID and returns true if it's a new session, false otherwise.
export const initializeSession = () => {
  let isNew = false;
  if (!sessionStorage.getItem('sessionId')) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
    isNew = true; // Mark as new session if no existing ID found
  }
  return isNew; 
};

// -------- Visitor Counter Functions --------

// Increments the 'totalVisits' counter in Firestore. This runs on every page load.
export const incrementTotalVisits = async () => {
  const counterRef = doc(db, 'analytics', 'totalVisits');

  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(counterRef);
      if (!sfDoc.exists()) {
        // If the document doesn't exist, create it with count 1
        transaction.set(counterRef, { count: 1 });
      } else {
        // Otherwise, increment the existing count
        const newCount = sfDoc.data().count + 1;
        transaction.update(counterRef, { count: newCount });
      }
    });
  } catch (e) {
    console.error("Total visits transaction failed: ", e);
  }
};

// Increments the 'uniqueVisitors' counter in Firestore. This runs only for new sessions.
export const incrementUniqueVisitors = async () => {
  const counterRef = doc(db, 'analytics', 'uniqueVisitors');
  
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(counterRef);
      if (!sfDoc.exists()) {
        // If the document doesn't exist, create it with count 1
        transaction.set(counterRef, { count: 1 });
      } else {
        // Otherwise, increment the existing count
        const newCount = sfDoc.data().count + 1;
        transaction.update(counterRef, { count: newCount });
      }
    });
  } catch (e) {
    console.error("Unique visitors transaction failed: ", e);
  }
};

// Fetches both total visits and unique visitors counts from Firestore.
export const getAnalyticsData = async () => {
  try {
    const totalRef = doc(db, 'analytics', 'totalVisits');
    const uniqueRef = doc(db, 'analytics', 'uniqueVisitors');

    // Use Promise.all to fetch both documents concurrently for efficiency
    const [totalDocSnapshot, uniqueDocSnapshot] = await Promise.all([
      getDocs(collection(db, 'analytics')).then(querySnapshot => querySnapshot.docs.find(doc => doc.id === 'totalVisits')),
      getDocs(collection(db, 'analytics')).then(querySnapshot => querySnapshot.docs.find(doc => doc.id === 'uniqueVisitors'))
    ]);

    // Extract counts, defaulting to 0 if documents don't exist
    const totalCount = totalDocSnapshot?.exists() ? totalDocSnapshot.data().count : 0;
    const uniqueCount = uniqueDocSnapshot?.exists() ? uniqueDocSnapshot.data().count : 0;

    return { totalVisits: totalCount, uniqueVisitors: uniqueCount };
  } catch (e) {
    console.error("Error fetching analytics data: ", e);
    // Return nulls or appropriate default values on error
    return { totalVisits: null, uniqueVisitors: null };
  }
};

// -------- Tracking functions (logging events only, no direct counter increments) --------
export const trackPageView = async (pageName) => {
  logEvent(analytics, 'page_view', {
    page_name: pageName,
    sessionId: sessionStorage.getItem('sessionId'),
    timestamp: Date.now()
  });
  // Note: Counter increments (total/unique) are now handled in App.jsx's useEffect
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

export default firebaseConfig;
