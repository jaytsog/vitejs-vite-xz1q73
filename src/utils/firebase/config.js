import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAfnL6TRNowCTYY8XFFPJTbdV7DNGJc_V0',
  authDomain: 'pcr-calculator.firebaseapp.com',
  projectId: 'pcr-calculator',
  storageBucket: 'pcr-calculator.firebasestorage.app',
  messagingSenderId: '784841162775',
  appId: '1:784841162775:web:ac31a96f1b6753f0099c52',
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with optimized settings
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalForceLongPolling: true,
  experimentalAutoDetectLongPolling: true,
  ignoreUndefinedProperties: true
});

// Enable offline persistence with error handling
enableIndexedDbPersistence(db, {
  synchronizeTabs: true
}).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('Browser doesn\'t support persistence');
  }
});

export { db };