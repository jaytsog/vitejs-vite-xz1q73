import { sql } from '@vercel/postgres';

export async function getInstructorStudents(instructorName) {
  try {
    const { rows } = await sql`
      SELECT s.*, g.basic_grading, g.advanced_grading 
      FROM students s
      LEFT JOIN grading g ON s.id = g.student_id
      WHERE s.instructor = ${instructorName}
      ORDER BY s.name ASC
    `;
    return rows;
  } catch (error) {
    console.error('Error getting instructor students:', error);
    return [];
  }
}

export async function getStudentData(studentId) {
  try {
    const { rows } = await sql`
      SELECT s.*, g.basic_grading, g.advanced_grading
      FROM students s
      LEFT JOIN grading g ON s.id = g.student_id
      WHERE s.id = ${studentId}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error getting student data:', error);
    return null;
  }
}

export async function updateGrading(studentId, basicGrading, advancedGrading) {
  try {
    const { rows } = await sql`
      INSERT INTO grading (student_id, basic_grading, advanced_grading)
      VALUES (${studentId}, ${basicGrading}, ${advancedGrading})
      ON CONFLICT (student_id) 
      DO UPDATE SET 
        basic_grading = ${basicGrading},
        advanced_grading = ${advancedGrading},
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error updating grading:', error);
    return null;
  }
}

export async function addComment(studentId, sectionId, text, instructor) {
  try {
    const { rows } = await sql`
      INSERT INTO comments (student_id, section_id, text, instructor)
      VALUES (${studentId}, ${sectionId}, ${text}, ${instructor})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error adding comment:', error);
    return null;
  }
}

export async function getComments(studentId, sectionId) {
  try {
    const { rows } = await sql`
      SELECT * FROM comments
      WHERE student_id = ${studentId}
      AND section_id = ${sectionId}
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error getting comments:', error);
    return [];
  }
}