import useSWR from 'swr';

export function useGrading(studentId) {
  const { data, error, isLoading, mutate } = useSWR(
    studentId ? `/api/grading/${studentId}` : null
  );

  const updateGrading = async (gradingData) => {
    try {
      const response = await fetch(`/api/grading/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gradingData)
      });
      
      if (!response.ok) throw new Error('Failed to update grading');
      
      mutate();
      return true;
    } catch (error) {
      console.error('Error updating grading:', error);
      return false;
    }
  };

  return {
    grading: data,
    isLoading,
    error,
    updateGrading
  };
}