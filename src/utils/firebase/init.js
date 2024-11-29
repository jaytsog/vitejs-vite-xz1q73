import { writeBatch, collection, doc } from 'firebase/firestore';
import { db } from './config';

const studentsData = {
  'Accoh, Nonivia': { instructor: 'Josh Daisy' },
  'Aguilar, Axel': { instructor: 'Ray Cheang' },
  'Aponte, Sergio': { instructor: 'Jeremiah Hatcher' },
  'Bell, Kera': { instructor: 'Josh Daisy' },
  'Brown, Deja': { instructor: 'TBD' },
};

const instructorsData = {
  'Jeremiah Hatcher': ['Aponte, Sergio'],
  'Ray Cheang': ['Aguilar, Axel'],
  'TBD': ['Brown, Deja'],
  'Josh Daisy': ['Accoh, Nonivia', 'Bell, Kera'],
};

export const initializeFirebaseData = async () => {
  try {
    const batch = writeBatch(db);
    const studentsRef = collection(db, 'students');

    Object.entries(studentsData).forEach(([name, data]) => {
      const safeId = name.replace(/[^a-zA-Z0-9]/g, '_');
      const studentDoc = doc(studentsRef, safeId);
      batch.set(studentDoc, {
        name,
        instructor: data.instructor,
        basicGrading: { states: [] },
        advancedGrading: {},
        comments: {},
        createdAt: new Date().toISOString(),
      });
    });

    const instructorsRef = collection(db, 'instructors');
    Object.entries(instructorsData).forEach(([name, students]) => {
      const safeId = name.replace(/[^a-zA-Z0-9]/g, '_');
      const instructorDoc = doc(instructorsRef, safeId);
      batch.set(instructorDoc, { 
        name, 
        students,
        createdAt: new Date().toISOString(),
      });
    });

    await batch.commit();
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};