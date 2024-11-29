import { collection, doc, setDoc, getDocs, getDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const createUniqueId = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};

export const initializeFirebaseData = async () => {
  try {
    const studentsRef = collection(db, 'students');
    
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

    const batch = [];
    for (const student of studentsData) {
      const studentId = createUniqueId(student.name);
      const studentRef = doc(studentsRef, studentId);
      const existingDoc = await getDoc(studentRef);
      
      if (!existingDoc.exists()) {
        batch.push(
          setDoc(studentRef, {
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
            createdAt: serverTimestamp(),
          })
        );
      }
    }

    await Promise.all(batch);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};

export const getInstructorStudents = async (instructorName) => {
  if (!instructorName) return [];
  
  try {
    const studentsRef = collection(db, 'students');
    const q = query(
      studentsRef, 
      where('instructor', '==', instructorName),
      orderBy('name')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
  } catch (error) {
    console.error('Error getting instructor students:', error);
    return [];
  }
};

export const getStudentData = async (studentId) => {
  if (!studentId) return null;
  
  try {
    const studentRef = doc(db, 'students', studentId);
    const snapshot = await getDoc(studentRef);
    return snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null;
  } catch (error) {
    console.error('Error getting student data:', error);
    return null;
  }
};

export const updateStudentGrading = async (studentId, gradingData) => {
  if (!studentId || !gradingData) return;
  
  try {
    const studentRef = doc(db, 'students', studentId);
    await setDoc(
      studentRef,
      {
        basicGrading: gradingData.basicGrading,
        advancedGrading: gradingData.advancedGrading,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating student grading:', error);
  }
};

export const addStudentComment = async (studentId, sectionId, comment, instructor) => {
  if (!studentId || !sectionId || !comment || !instructor) return null;
  
  try {
    const studentRef = doc(db, 'students', studentId);
    const commentId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await setDoc(
      studentRef,
      {
        [`comments.${commentId}`]: {
          id: commentId,
          sectionId,
          text: comment,
          instructor,
          timestamp: serverTimestamp(),
        },
      },
      { merge: true }
    );
    
    return commentId;
  } catch (error) {
    console.error('Error adding comment:', error);
    return null;
  }
};

export const getCommentsForSection = async (studentId, sectionId) => {
  if (!studentId || !sectionId) return [];
  
  try {
    const studentRef = doc(db, 'students', studentId);
    const snapshot = await getDoc(studentRef);
    
    if (!snapshot.exists()) return [];
    
    const data = snapshot.data();
    const comments = data.comments || {};
    
    return Object.values(comments)
      .filter(comment => comment.sectionId === sectionId)
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error getting comments:', error);
    return [];
  }
};