import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

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