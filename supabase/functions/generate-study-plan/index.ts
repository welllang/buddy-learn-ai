import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { subject, targetDate, dailyTime, difficultyLevel, learningStyle, goals } = await req.json();

    if (!subject) {
      throw new Error('Subject is required');
    }

    const prompt = `Create a comprehensive, personalized study plan for ${subject}.

Study Parameters:
- Target completion date: ${targetDate}
- Available daily study time: ${dailyTime} minutes
- Difficulty level: ${difficultyLevel}
- Learning style: ${learningStyle}
- Goals: ${goals}

Please provide a structured study plan with:
1. Weekly breakdown with specific topics
2. Daily learning objectives
3. Recommended study techniques based on learning style
4. Progress milestones
5. Review and assessment schedule

Format the response as JSON with this structure:
{
  "title": "Study Plan Title",
  "duration": "X weeks",
  "weeklyBreakdown": [
    {
      "week": 1,
      "focus": "Topic Area",
      "topics": ["Topic 1", "Topic 2"],
      "dailyObjectives": ["Objective 1", "Objective 2"],
      "techniques": ["Technique 1", "Technique 2"],
      "assessment": "Assessment method"
    }
  ],
  "studyTechniques": {
    "primary": "Main technique based on learning style",
    "supporting": ["Supporting technique 1", "Supporting technique 2"]
  },
  "milestones": ["Milestone 1", "Milestone 2"],
  "reviewSchedule": "Review strategy"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert educational AI that creates personalized study plans. Always respond with valid JSON and focus on evidence-based learning techniques.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const data = await response.json();
    let studyPlan;
    
    try {
      // Try to parse the JSON response
      const content = data.choices[0].message.content;
      studyPlan = JSON.parse(content);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      studyPlan = {
        title: `${subject} Study Plan`,
        duration: "4 weeks",
        weeklyBreakdown: [
          {
            week: 1,
            focus: "Foundation",
            topics: ["Basic concepts", "Terminology"],
            dailyObjectives: ["Understand fundamentals", "Practice basic exercises"],
            techniques: ["Active reading", "Note-taking"],
            assessment: "Self-quiz"
          }
        ],
        studyTechniques: {
          primary: learningStyle === 'visual' ? 'Visual mapping' : 'Active recall',
          supporting: ['Spaced repetition', 'Practice testing']
        },
        milestones: ["Complete foundation", "Master intermediate concepts"],
        reviewSchedule: "Weekly reviews with spaced repetition"
      };
    }

    return new Response(JSON.stringify({ studyPlan }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-study-plan function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});