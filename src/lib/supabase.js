import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vzvrqvkunzveitligspe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6dnJxdmt1bnp2ZWl0bGlnc3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4ODM1NjEsImV4cCI6MjA0ODQ1OTU2MX0.PXXI37ejmZ-4B5jMr9wtRj3rZQ7PKaVysePSFvdZHB8';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getInstructorStudents(instructor) {
  const { data, error } = await supabase
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

  if (error) {
    console.error('Error fetching students:', error);
    return [];
  }

  return data;
}

export async function getStudentData(studentId) {
  const { data, error } = await supabase
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

  if (error) {
    console.error('Error fetching student:', error);
    return null;
  }

  return data;
}

export async function updateGrading(studentId, basicGrading, advancedGrading) {
  const { data, error } = await supabase
    .from('grading')
    .upsert({
      student_id: studentId,
      basic_grading: basicGrading,
      advanced_grading: advancedGrading
    })
    .select()
    .single();

  if (error) {
    console.error('Error updating grading:', error);
    return null;
  }

  return data;
}

export async function addComment(studentId, sectionId, text, instructor) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      student_id: studentId,
      section_id: sectionId,
      text,
      instructor
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding comment:', error);
    return null;
  }

  return data;
}

export async function getComments(studentId, sectionId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('student_id', studentId)
    .eq('section_id', sectionId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return data;
}