import { collection, doc, getDoc, getDocs, query, where, limit, orderBy, startAfter, setDoc } from 'firebase/firestore';
import { db } from './config';
import { getCached, setCache, clearCacheByPrefix } from './cache';

const CACHE_PREFIX = {
  STUDENT: 'student_',
  INSTRUCTOR_STUDENTS: 'instructor_students_',
  PAGINATION: 'pagination_'
};

const STUDENTS_PER_PAGE = 10;

export const getInstructorStudents = async (instructorName, lastStudent = null) => {
  const cacheKey = `${CACHE_PREFIX.INSTRUCTOR_STUDENTS}${instructorName}_${lastStudent || 'first'}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const studentsRef = collection(db, 'students');
    let q = query(
      studentsRef,
      where('instructor', '==', instructorName),
      orderBy('name'),
      limit(STUDENTS_PER_PAGE)
    );

    if (lastStudent) {
      const lastDocRef = doc(db, 'students', lastStudent);
      const lastDocSnap = await getDoc(lastDocRef);
      if (lastDocSnap.exists()) {
        q = query(q, startAfter(lastDocSnap));
      }
    }

    const snapshot = await getDocs(q);
    const students = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    const result = {
      students,
      hasMore: students.length === STUDENTS_PER_PAGE,
      lastStudent: students[students.length - 1]?.id
    };

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error getting instructor students:', error);
    return { students: [], hasMore: false };
  }
};

export const getStudentData = async (studentName) => {
  const safeId = studentName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  const cacheKey = `${CACHE_PREFIX.STUDENT}${safeId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const studentRef = doc(db, 'students', safeId);
    const snapshot = await getDoc(studentRef);
    
    if (!snapshot.exists()) {
      return null;
    }

    const data = {
      ...snapshot.data(),
      id: snapshot.id,
      lastFetched: Date.now()
    };

    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error getting student data:', error);
    return null;
  }
};

export const updateStudentGrading = async (studentName, gradingData) => {
  const safeId = studentName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  try {
    const studentRef = doc(db, 'students', safeId);
    const updateData = {
      basicGrading: gradingData.basicGrading,
      advancedGrading: gradingData.advancedGrading,
      lastUpdated: new Date().toISOString()
    };

    await setDoc(studentRef, updateData, { merge: true });
    
    // Clear related caches
    clearCacheByPrefix(`${CACHE_PREFIX.STUDENT}${safeId}`);
    
    return true;
  } catch (error) {
    console.error('Error updating student grading:', error);
    return false;
  }
};