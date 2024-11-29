import { writeBatch, collection, doc, getDoc } from 'firebase/firestore';
import { db } from './config';
import { initializePersistence } from './persistence';

const createUniqueId = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};

export const initializeFirebaseData = async () => {
  // Initialize persistence first
  await initializePersistence();

  try {
    const studentsRef = collection(db, 'students');
    const batch = writeBatch(db);
    
    const studentsData = [
      {
        name: 'Aguilar, Axel',
        instructor: 'Ray Cheang',
        documentUrl: 'https://docs.google.com/document/d/1vOqwAmrvO9EW8q8h19aVj9HLydItFruftAmROV8_4ww/preview',
      },
      {
        name: 'Aponte, Sergio',
        instructor: 'Jeremiah Hatcher',
        documentUrl: 'https://docs.google.com/document/d/1UjQjyG7UfkNLL_8k6152dIqnd4FPxBMFK8GADnTa_Zk/preview',
      },
    ];

    for (const student of studentsData) {
      const studentId = createUniqueId(student.name);
      const studentRef = doc(studentsRef, studentId);
      const existingDoc = await getDoc(studentRef);
      
      if (!existingDoc.exists()) {
        batch.set(studentRef, {
          ...student,
          id: studentId,
          basicGrading: { states: Array(100).fill(0) },
          advancedGrading: {
            patho: Array(3).fill({ scores: Array(4).fill(0) }),
            diagnosis: Array(3).fill({ scores: Array(4).fill(0) }),
            treatment: Array(1).fill({ scores: Array(4).fill(0) }),
            narrative: Array(1).fill({ scores: Array(4).fill(0) }),
            radio: Array(1).fill({ scores: Array(4).fill(0) }),
            drugCards: 0,
            format: 0,
          },
          comments: {},
          createdAt: new Date().toISOString(),
        });
      }
    }

    await batch.commit();
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};