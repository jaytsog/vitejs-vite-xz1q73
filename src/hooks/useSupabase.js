import useSWR from 'swr';
import { supabase } from '../lib/supabase';

export function useInstructorStudents(instructor) {
  const { data, error, isLoading, mutate } = useSWR(
    instructor ? ['students', instructor] : null,
    async () => {
      const { data } = await supabase
        .from('students')
        .select(`
          *,
          grading (
            basic_grading,
            advanced_grading
          )
        `)
        .eq('instructor', instructor)
        .order('name');
      return data;
    }
  );

  return {
    students: data || [],
    isLoading,
    error,
    mutate
  };
}

export function useStudentData(studentId) {
  const { data, error, isLoading, mutate } = useSWR(
    studentId ? ['student', studentId] : null,
    async () => {
      const { data } = await supabase
        .from('students')
        .select(`
          *,
          grading (
            basic_grading,
            advanced_grading
          )
        `)
        .eq('id', studentId)
        .single();
      return data;
    }
  );

  return {
    student: data,
    isLoading,
    error,
    mutate
  };
}

export function useComments(studentId, sectionId) {
  const { data, error, isLoading, mutate } = useSWR(
    studentId && sectionId ? ['comments', studentId, sectionId] : null,
    async () => {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('student_id', studentId)
        .eq('section_id', sectionId)
        .order('created_at', { ascending: false });
      return data;
    }
  );

  const addComment = async (text, instructor) => {
    try {
      await supabase
        .from('comments')
        .insert({
          student_id: studentId,
          section_id: sectionId,
          text,
          instructor
        });
      
      mutate();
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      return false;
    }
  };

  return {
    comments: data || [],
    isLoading,
    error,
    addComment
  };
}