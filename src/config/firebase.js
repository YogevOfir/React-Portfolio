// Firebase configuration for the gamified portfolio
// This file contains placeholder configuration for future Firebase integration

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Firebase initialization (commented out until you add firebase dependency)
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// Placeholder functions for user choice storage
export const saveUserChoice = async (section, choice) => {
  try {
    // TODO: Implement Firebase save
    console.log(`Saving ${section}:`, choice);
    
    // Example Firebase save (uncomment when ready):
    // const docRef = await addDoc(collection(db, "userChoices"), {
    //   section,
    //   choice,
    //   timestamp: new Date(),
    //   sessionId: sessionStorage.getItem('sessionId') || 'anonymous'
    // });
    
    // For now, save to localStorage as fallback
    const existingChoices = JSON.parse(localStorage.getItem('portfolioChoices') || '{}');
    existingChoices[section] = {
      choice,
      timestamp: new Date().toISOString(),
      sessionId: sessionStorage.getItem('sessionId') || 'anonymous'
    };
    localStorage.setItem('portfolioChoices', JSON.stringify(existingChoices));
    
    return { success: true, id: 'local' };
  } catch (error) {
    console.error('Error saving user choice:', error);
    return { success: false, error: error.message };
  }
};

export const getUserChoices = async () => {
  try {
    // TODO: Implement Firebase fetch
    // For now, return from localStorage
    const choices = JSON.parse(localStorage.getItem('portfolioChoices') || '{}');
    return { success: true, data: choices };
  } catch (error) {
    console.error('Error fetching user choices:', error);
    return { success: false, error: error.message };
  }
};

// Session management
export const initializeSession = () => {
  if (!sessionStorage.getItem('sessionId')) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionStorage.getItem('sessionId');
};

// Analytics tracking (placeholder)
export const trackEvent = (eventName, data) => {
  try {
    // TODO: Implement Firebase Analytics
    console.log(`Event: ${eventName}`, data);
    
    // Save to localStorage for now
    const events = JSON.parse(localStorage.getItem('portfolioEvents') || '[]');
    events.push({
      event: eventName,
      data,
      timestamp: new Date().toISOString(),
      sessionId: sessionStorage.getItem('sessionId')
    });
    localStorage.setItem('portfolioEvents', JSON.stringify(events));
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

export default firebaseConfig;
