import useSWR from 'swr';

export function useStudents(instructor) {
  const { data, error, isLoading } = useSWR(
    instructor ? `/api/students/${instructor}` : null
  );

  return {
    students: data?.students || [],
    isLoading,
    error
  };
}