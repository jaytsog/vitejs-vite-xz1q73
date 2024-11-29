import React, { createContext, useContext } from 'react';
import { useInstructor } from '../hooks/useInstructor';
import { useStudents } from '../hooks/useStudents';
import { useGrading } from '../hooks/useGrading';
import { useComments } from '../hooks/useComments';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { currentInstructor, setCurrentInstructor } = useInstructor();
  const { students, isLoading: studentsLoading } = useStudents(currentInstructor);
  
  const value = {
    currentInstructor,
    setCurrentInstructor,
    students,
    studentsLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}