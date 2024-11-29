import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getInstructorStudents,
  getStudentData,
  updateStudentGrading,
  addStudentComment,
  getCommentsForSection as getComments,
} from '../utils/firebaseUtils';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [currentInstructor, setCurrentInstructor] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [instructorStudents, setInstructorStudents] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      if (currentInstructor) {
        const students = await getInstructorStudents(currentInstructor);
        setInstructorStudents(students);
      } else {
        setInstructorStudents([]);
      }
    };
    loadStudents();
  }, [currentInstructor]);

  const loadStudentData = async (studentName) => {
    try {
      const data = await getStudentData(studentName);
      setCurrentStudent(studentName);
      setStudentData(data);
      return data;
    } catch (error) {
      console.error('Error loading student data:', error);
      throw error;
    }
  };

  const updateGrading = async (gradingData) => {
    if (currentStudent) {
      await updateStudentGrading(currentStudent, gradingData);
      const updatedData = await getStudentData(currentStudent);
      setStudentData(updatedData);
    }
  };

  const addComment = async (studentId, sectionId, comment) => {
    if (currentInstructor) {
      const commentId = await addStudentComment(studentId, sectionId, comment, currentInstructor);
      if (commentId) {
        const updatedData = await getStudentData(studentId);
        setStudentData(updatedData);
        return commentId;
      }
    }
    return null;
  };

  const getCommentsForSection = async (studentId, sectionId) => {
    return await getComments(studentId, sectionId);
  };

  return (
    <FirebaseContext.Provider
      value={{
        currentInstructor,
        setCurrentInstructor,
        currentStudent,
        setCurrentStudent,
        studentData,
        instructorStudents,
        updateGrading,
        addComment,
        getCommentsForSection,
        loadStudentData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);