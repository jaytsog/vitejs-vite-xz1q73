import { collection, doc, getDocs, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './config';

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
    const students = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    
    // Remove duplicates based on student name
    const uniqueStudents = Array.from(new Map(
      students.map(student => [student.name, student])
    ).values());
    
    return uniqueStudents;
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