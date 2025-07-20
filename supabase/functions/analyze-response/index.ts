import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, response, interviewType } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Analyze this interview response and provide constructive feedback:

Question: ${question}
Response: ${response}
Interview Type: ${interviewType}

Provide feedback on:
1. Content quality and completeness
2. Structure and clarity
3. Specific improvements
4. ${interviewType === 'behavioral' ? 'STAR method usage (Situation, Task, Action, Result)' : ''}
5. ${interviewType === 'technical' ? 'Technical accuracy and problem-solving approach' : ''}

Keep feedback constructive, specific, and encouraging. Provide actionable suggestions.`;

    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert interview coach providing detailed, constructive feedback to help candidates improve their interview responses.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!apiResponse.ok) {
      throw new Error(`OpenAI API error: ${apiResponse.statusText}`);
    }

    const data = await apiResponse.json();
    const feedback = data.choices[0].message.content;

    return new Response(JSON.stringify({ feedback }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-response function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});