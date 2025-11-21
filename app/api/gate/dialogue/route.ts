import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface DialogueRequest {
  email: string;
  currentPhase: number;
  userResponse: string;
  history: Array<{ role: 'ai' | 'user'; content: string }>;
}

const PHASE_QUESTIONS = [
  // Phase 0 → 1 transition
  {
    followUpTypes: {
      deep: `That's a meaningful change. What was the hardest part about letting go of that belief? Was there a specific moment when you realized, or was it gradual?`,
      shallow: `Let's go a bit deeper. Can you think of something you believed that actually mattered to you? Something where being wrong felt significant?`,
      defensive: `I appreciate the honesty. Let me try a different angle: Is there anything you're uncertain about right now? Something you're actively wondering about?`,
    },
    nextQuestion: `Do you think it's possible to be certain about anything? Not just confident—truly, unshakably certain?

If yes, what are you certain about?
If no, how do you make decisions without certainty?`,
  },
  // Phase 1 → 2 transition
  {
    followUpTypes: {
      nuanced: `You're making distinctions that interest me. That tension between confidence and certainty is something most people don't notice.`,
      certain: `I'm curious about that certainty. What would it take to shake it? Is there even hypothetically something that could change your mind?`,
      uncertain: `If you're uncertain about everything, how do you decide what to do? How do you know this conversation is real, for instance?`,
    },
    nextQuestion: `Is there a question you're afraid to ask yourself? Something you've been avoiding thinking about?

You don't have to share what it is. But I'm curious: Do you think there are questions we shouldn't ask?`,
  },
  // Phase 2 → 3 transition
  {
    followUpTypes: {
      vulnerable: `Thank you for trusting me with that. Without needing to go deeper than you want: What do you think makes that question so hard?`,
      deflected: `I understand—some things are private. Let me rephrase: Do you think curiosity has limits? Are there things humans shouldn't try to understand?`,
      philosophical: `That's a fascinating framing. You're suggesting there might be value in some questions remaining unanswered. Have you always thought this way?`,
    },
    nextQuestion: `What surprised you about this conversation? Or—if nothing surprised you—what did you notice about yourself?`,
  },
];

export async function POST(request: Request) {
  try {
    const body: DialogueRequest = await request.json();
    const { userResponse, currentPhase, history } = body;

    if (!userResponse || currentPhase >= PHASE_QUESTIONS.length) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Use Gemini to analyze the response and choose appropriate follow-up
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const phaseConfig = PHASE_QUESTIONS[currentPhase];
    const followUpOptions = Object.entries(phaseConfig.followUpTypes)
      .map(([type, text]) => `${type}: "${text}"`)
      .join('\n');

    const prompt = `You are a Socratic dialogue partner evaluating a response in a philosophical entry conversation.

Previous conversation:
${history.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n')}

Latest user response:
"${userResponse}"

Analyze the response and choose the most appropriate follow-up type from these options:
${followUpOptions}

Consider:
- Did they show genuine reflection or give a surface answer?
- Did they express uncertainty or claim certainty?
- Were they vulnerable or defensive?
- Did they engage thoughtfully or dismiss the question?

Then create a personalized transition that:
1. Acknowledges something specific from their response (1-2 sentences)
2. Naturally leads into the next question

The next main question is:
"${phaseConfig.nextQuestion}"

Respond with ONLY valid JSON:
{
  "selectedType": "<chosen follow-up type>",
  "acknowledgment": "<1-2 sentence personalized acknowledgment of their specific response>",
  "fullResponse": "<acknowledgment + next question combined naturally>"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the response
    let aiResponse: string;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        aiResponse = parsed.fullResponse;
      } else {
        // Fallback to generic transition
        aiResponse = `I appreciate you sharing that.\n\n${phaseConfig.nextQuestion}`;
      }
    } catch {
      aiResponse = `That's interesting to consider.\n\n${phaseConfig.nextQuestion}`;
    }

    return NextResponse.json({ aiResponse });
  } catch (error) {
    console.error('Dialogue generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
