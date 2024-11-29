import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAfnL6TRNowCTYY8XFFPJTbdV7DNGJc_V0',
  authDomain: 'pcr-calculator.firebaseapp.com',
  projectId: 'pcr-calculator',
  storageBucket: 'pcr-calculator.firebasestorage.app',
  messagingSenderId: '784841162775',
  appId: '1:784841162775:web:ac31a96f1b6753f0099c52',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };