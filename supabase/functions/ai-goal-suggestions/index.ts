import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userContext, goalType, subject, timeframe } = await req.json();

    const systemPrompt = `You are an AI assistant that helps students create SMART goals for their learning journey. Create realistic, achievable goals based on the user's context.

Guidelines:
- Goals should be Specific, Measurable, Achievable, Relevant, and Time-bound
- Provide realistic timelines based on the goal complexity
- Include 3-5 actionable milestones for each goal
- Estimate time investment required
- Consider the user's experience level and available time
- Suggest success metrics that can be tracked

Respond with a JSON array of 3 goal suggestions in this format:
{
  "goals": [
    {
      "title": "Goal title",
      "description": "Detailed description of what the goal entails",
      "category": "short-term|medium-term|long-term|exam-preparation|skill-development",
      "priority": "high|medium|low",
      "estimatedTimeHours": 40,
      "successMetrics": "Specific criteria for measuring success",
      "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
      "timeline": "Recommended timeframe",
      "difficulty": "beginner|intermediate|advanced"
    }
  ]
}`;

    const userPrompt = `Create goal suggestions for:
- Goal type: ${goalType}
- Subject: ${subject || 'General'}
- Timeframe: ${timeframe || 'Flexible'}
- User context: ${userContext || 'Student looking to improve their learning'}

Please provide 3 different goal suggestions with varying difficulty levels and approaches.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    const suggestions = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(suggestions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-goal-suggestions function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      goals: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});