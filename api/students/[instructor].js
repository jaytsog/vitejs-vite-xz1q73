import { getInstructorStudents } from '../../src/lib/db';

export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(req.url);
  const instructor = url.pathname.split('/').pop();

  try {
    const students = await getInstructorStudents(instructor);
    return new Response(JSON.stringify(students), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}