import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const { interview_id } = resolvedParams;

  console.log("Fetching interview ID:", interview_id);

  try {
    const { data, error } = await supabase
  .from('Interviews')
  .select('*')
  .eq('interview_id', interview_id)  // Use the varchar column here
  .single();


    if (error) {
      console.error('Supabase fetch error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 404 });
    }

    return new Response(JSON.stringify({ interviewInfo: data }), { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
