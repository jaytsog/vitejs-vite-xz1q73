import useSWR from 'swr';

export function useComments(studentId, sectionId) {
  const { data, error, isLoading, mutate } = useSWR(
    studentId && sectionId ? `/api/comments?studentId=${studentId}&sectionId=${sectionId}` : null
  );

  const addComment = async (comment, instructor) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, sectionId, comment, instructor })
      });
      
      if (!response.ok) throw new Error('Failed to add comment');
      
      mutate();
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      return false;
    }
  };

  return {
    comments: data?.comments || [],
    isLoading,
    error,
    addComment
  };
}