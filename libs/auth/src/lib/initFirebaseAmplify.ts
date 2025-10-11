import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Define the shape of the Firebase configuration object
type FirebaseConfig = {
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
};

// This function initializes Firebase and Amplify for the application.
const initFirebaseAmplify = (config: FirebaseConfig) => {
  // Validate the Firebase configuration
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Missing Firebase config value for ${key}`);
    }
  }

  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
  };

  try {
    // Check if a Firebase app has already been initialized.
    const app = getApp();
    const auth = getAuth(app);

    return { app, auth };
  } catch (error) {
    // If the app is not initialized, initialize it.
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    return { app, auth };
  }
};

export { initFirebaseAmplify };
