import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ApplicationData {
  full_name: string;
  email: string;
  phone: string;
  course_branch: string;
  year_semester: string;
  resume_url: string;
  selected_task: string;
  why_join: string;
  github_profile?: string;
  portfolio_link?: string;
  user_id: string;
  internship_id: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const applicationData: ApplicationData = await req.json();
    console.log('Syncing application to Google Sheets:', applicationData);

    const webhookUrl = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL');
    
    if (!webhookUrl) {
      console.error('Google Sheets webhook URL not configured');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Google Sheets webhook not configured' 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Send data to Google Sheets webhook
    const sheetsResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: applicationData.full_name,
        Email: applicationData.email,
        Phone: applicationData.phone,
        'Course / Branch': applicationData.course_branch,
        'Year / Semester': applicationData.year_semester,
        'Resume Link': applicationData.resume_url,
        'Selected Task': applicationData.selected_task,
        'Why Join': applicationData.why_join,
        'GitHub Profile': applicationData.github_profile || 'N/A',
        'Portfolio Link': applicationData.portfolio_link || 'N/A',
        'Submission Date': new Date().toISOString(),
        'User ID': applicationData.user_id,
        'Internship ID': applicationData.internship_id,
      }),
    });

    if (!sheetsResponse.ok) {
      console.error('Failed to sync to Google Sheets:', await sheetsResponse.text());
      throw new Error('Google Sheets sync failed');
    }

    console.log('Successfully synced to Google Sheets');

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in sync-internship-application:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
