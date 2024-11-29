import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export function useInstructorStudents(instructor) {
  const { data, error, isLoading } = useSWR(
    instructor ? `/api/students/${instructor}` : null,
    fetcher
  );

  return {
    students: data,
    isLoading,
    error
  };
}

export function useStudentComments(studentId, sectionId) {
  const { data, error, isLoading, mutate } = useSWR(
    studentId && sectionId ? `/api/comments?studentId=${studentId}&sectionId=${sectionId}` : null,
    fetcher
  );

  const addComment = async (comment, instructor) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, sectionId, comment, instructor })
      });
      
      if (!response.ok) throw new Error('Failed to add comment');
      
      mutate(); // Refresh comments list
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      return false;
    }
  };

  return {
    comments: data,
    isLoading,
    error,
    addComment
  };
}