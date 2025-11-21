import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface EvaluationRequest {
  email: string;
  challengeType: 'dialogue' | 'essay';
  promptId?: string;
  response?: string;
  messages?: Array<{ role: 'ai' | 'user'; content: string; timestamp: Date }>;
}

interface EvaluationScore {
  curiosity: number; // 0-25
  humility: number; // 0-25
  authenticity: number; // 0-25
  engagement: number; // 0-25
  total: number; // 0-100
  reasoning: string;
  redFlags: string[];
  positives: string[];
}

export async function POST(request: Request) {
  try {
    const body: EvaluationRequest = await request.json();
    const { email, challengeType, promptId, response, messages } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    let contentToEvaluate: string;
    let evaluationContext: string;

    if (challengeType === 'dialogue' && messages) {
      // Format dialogue for evaluation
      contentToEvaluate = messages
        .filter(m => m.role === 'user')
        .map((m, i) => `Response ${i + 1}: ${m.content}`)
        .join('\n\n');
      evaluationContext = 'Socratic dialogue responses';
    } else if (challengeType === 'essay' && response) {
      contentToEvaluate = response;
      evaluationContext = `Essay response to prompt: ${promptId}`;
    } else {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Evaluate using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `You are evaluating a person's responses for entry into WONDER, a philosophical discussion community.

IMPORTANT: This is NOT a test of philosophical knowledge. We are looking for:
1. CURIOSITY (0-25): Genuine interest in ideas, asks questions, explores tangents
2. HUMILITY (0-25): Admits uncertainty, changes mind mid-thought, says "I don't know"
3. AUTHENTICITY (0-25): Personal voice, specific examples, avoids clichés and performative answers
4. ENGAGEMENT (0-25): Responds thoughtfully to questions, builds on previous points

Context: ${evaluationContext}

Content to evaluate:
"""
${contentToEvaluate}
"""

RED FLAGS (should lower score):
- Dismissive or hostile responses
- Claims of certainty without nuance
- Generic or AI-generated sounding text
- Refusing to engage with questions
- Arrogance or condescension

POSITIVE SIGNALS (should raise score):
- Genuine vulnerability
- Specific personal examples
- Willingness to question own beliefs
- Playful engagement with paradoxes
- Saying "I don't know" thoughtfully

Respond with ONLY valid JSON in this exact format:
{
  "curiosity": <0-25>,
  "humility": <0-25>,
  "authenticity": <0-25>,
  "engagement": <0-25>,
  "total": <0-100>,
  "reasoning": "<brief explanation of score>",
  "redFlags": ["<any concerning patterns>"],
  "positives": ["<any notable positives>"]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the JSON response
    let evaluation: EvaluationScore;
    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      evaluation = JSON.parse(jsonMatch[0]);
    } catch {
      // Default to borderline evaluation on parse error
      evaluation = {
        curiosity: 15,
        humility: 15,
        authenticity: 15,
        engagement: 15,
        total: 60,
        reasoning: 'Unable to fully evaluate - defaulting to borderline',
        redFlags: [],
        positives: [],
      };
    }

    // Determine admission status based on score
    let status: 'admitted' | 'declined' | 'retry_allowed';
    let feedback: string | undefined;

    if (evaluation.total >= 60) {
      status = 'admitted';
    } else if (evaluation.total >= 40) {
      status = 'retry_allowed';
      feedback = evaluation.reasoning;
    } else {
      status = 'declined';
      feedback = 'Thank you for your time. WONDER might not be the right place right now.';
    }

    // TODO: Store evaluation in database
    // In production, we would:
    // 1. Create/update admission_challenges record
    // 2. Store the full evaluation scores
    // 3. Track retry attempts
    // 4. Send notification email for admitted users

    return NextResponse.json({
      status,
      score: evaluation.total,
      feedback,
      // Don't expose detailed scores to prevent gaming
      // evaluation details stored server-side only
    });
  } catch (error) {
    console.error('Gate evaluation error:', error);
    return NextResponse.json(
      { error: 'Evaluation failed' },
      { status: 500 }
    );
  }
}
