import { getStudentData, updateGrading } from '../../src/lib/db';

export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  const url = new URL(req.url);
  const studentId = url.pathname.split('/').pop();

  if (req.method === 'GET') {
    try {
      const data = await getStudentData(studentId);
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { basicGrading, advancedGrading } = await req.json();
      const data = await updateGrading(studentId, basicGrading, advancedGrading);
      return new Response(JSON.stringify(data), {
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