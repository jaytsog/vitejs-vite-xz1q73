import { enableIndexedDbPersistence } from 'firebase/firestore';
import { db } from './config';

let persistenceInitialized = false;

export const initializePersistence = async () => {
  if (persistenceInitialized) return;
  
  try {
    await enableIndexedDbPersistence(db);
    persistenceInitialized = true;
  } catch (err) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support persistence');
    }
  }
};