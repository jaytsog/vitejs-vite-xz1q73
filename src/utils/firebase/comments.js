import { doc, setDoc } from 'firebase/firestore';
import { db } from './config';

export const addStudentComment = async (studentName, sectionId, comment, instructor) => {
  try {
    const studentRef = doc(db, 'students', studentName);
    const commentId = Date.now().toString();
    
    await setDoc(studentRef, {
      [`comments.${commentId}`]: {
        sectionId,
        text: comment,
        instructor,
        timestamp: new Date().toISOString(),
      }
    }, { merge: true });
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};