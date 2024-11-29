import { addComment, getComments } from '../../src/lib/db';

export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  if (req.method === 'POST') {
    const { studentId, sectionId, comment, instructor } = await req.json();
    
    try {
      const commentId = await addComment(studentId, sectionId, comment, instructor);
      return new Response(JSON.stringify({ id: commentId }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  if (req.method === 'GET') {
    const url = new URL(req.url);
    const studentId = url.searchParams.get('studentId');
    const sectionId = url.searchParams.get('sectionId');

    try {
      const comments = await getComments(studentId, sectionId);
      return new Response(JSON.stringify(comments), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}