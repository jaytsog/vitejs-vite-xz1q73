import { useState } from 'react';

export function useInstructor() {
  const [currentInstructor, setCurrentInstructor] = useState(null);

  return {
    currentInstructor,
    setCurrentInstructor
  };
}