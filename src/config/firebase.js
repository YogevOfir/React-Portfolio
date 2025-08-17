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
export const initializeSession = () => {
  if (!sessionStorage.getItem('sessionId')) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionStorage.getItem('sessionId');
};
initializeSession();

// -------- Firestore Visit Counter --------
export const incrementVisitCounter = async () => {
  const counterRef = doc(db, "analytics", "visits");
  try {
    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(counterRef);
      if (!snapshot.exists()) {
        transaction.set(counterRef, { count: 1 });
      } else {
        const newCount = (snapshot.data().count || 0) + 1;
        transaction.update(counterRef, { count: newCount });
      }
    });
  } catch (err) {
    console.error("Error incrementing counter:", err);
  }
};

// -------- Tracking functions --------
export const trackPageView = async (pageName) => {
  logEvent(analytics, 'page_view', {
    page_name: pageName,
    sessionId: sessionStorage.getItem('sessionId'),
    timestamp: Date.now()
  });

  // 🔥 also increment Firestore counter
  incrementVisitCounter();
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

// -------- Custom Analytics Data (Firestore counter) --------
export const getVisitCount = async () => {
  try {
    const counterDoc = await getDocs(collection(db, "analytics"));
    let count = 0;
    counterDoc.forEach((docSnap) => {
      if (docSnap.id === "visits") {
        count = docSnap.data().count || 0;
      }
    });
    return count;
  } catch (error) {
    console.error("Error fetching visit count:", error);
    return 0;
  }
};

export default firebaseConfig;
