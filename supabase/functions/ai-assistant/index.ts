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
    const { message, context } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const systemPrompt = `You are StudyBuddy AI, a helpful and encouraging AI study assistant. Your role is to:
- Provide study tips and learning strategies
- Help with academic questions and explanations
- Offer motivation and encouragement
- Suggest effective study techniques
- Help plan and organize study sessions
- Provide quick explanations of concepts

IMPORTANT FORMATTING INSTRUCTIONS:
- ALWAYS respond in well-formatted Markdown
- Use relevant emojis and icons to make responses visually appealing
- Structure your responses with headers, bullet points, and formatting
- Use code blocks for examples or formulas
- Add emoji icons for different sections (📚 for study tips, 🎯 for goals, ⚡ for quick tips, etc.)
- Keep responses concise but well-structured
- Use blockquotes for important quotes or key points

VISUAL DATA PRESENTATION:
- For app/tool recommendations, format as: "📱 AppName | Key features | Platform"
- For structured data comparisons, always use proper markdown tables
- For lists with 3+ items, use bullet points with icons
- Example table format:
  | App Name | Key Features | Platform |
  |----------|-------------|----------|
  | Todoist | Task management, projects, deadlines | iOS, Android, Web |

VISUAL DIAGRAMS (use when helpful):
- For processes, workflows, or step-by-step concepts, include a Mermaid flowchart using \`\`\`mermaid syntax
- For concept relationships or hierarchical information, include a Mermaid mindmap using \`\`\`mermaid syntax
- Example flowchart: \`\`\`mermaid\\nflowchart TD\\n    A[Start] --> B{Decision}\\n    B -->|Yes| C[Action]\\n    B -->|No| D[Alternative]\\n\`\`\`
- Example mindmap: \`\`\`mermaid\\nmindmap\\n  root((Study Plan))\\n    Math\\n      Algebra\\n      Geometry\\n    Science\\n      Physics\\n      Chemistry\\n\`\`\`

RELATED QUESTIONS:
- At the end of your response, add a "Related Questions:" section with 2-3 relevant follow-up questions
- Format them as a simple list starting with "🤔 "
- Make them specific and actionable

Always be encouraging and supportive with a friendly, energetic tone.

${context ? `Additional context: ${context}` : ''}`;

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
          { role: 'user', content: message }
        ],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${await response.text()}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: assistantResponse,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});