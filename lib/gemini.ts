import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Legacy judgment interface (kept for backward compatibility)
export interface JudgmentResult {
  winner: 'for' | 'against' | 'tie';
  reasoning: string;
  factChecks: {
    claim: string;
    verdict: 'accurate' | 'misleading' | 'false';
    explanation: string;
  }[];
  scores: {
    for: {
      logic: number;
      evidence: number;
      rhetoric: number;
    };
    against: {
      logic: number;
      evidence: number;
      rhetoric: number;
    };
  };
}

// New synthesis interface for conversation-first approach
export interface SynthesisResult {
  keyPoints: {
    perspective: string;
    mainArguments: string[];
    strengths: string[];
  }[];
  commonGround: string[];
  tensions: {
    topic: string;
    perspectives: string[];
    explanation: string;
  }[];
  unresolvedQuestions: string[];
  synthesis: string;
  suggestedNextSteps: string[];
}

/**
 * Synthesize a philosophical conversation
 * Instead of judging winners, this facilitates understanding by:
 * - Identifying key points from each perspective
 * - Finding common ground between participants
 * - Highlighting tensions that remain
 * - Suggesting questions for further exploration
 */
export async function synthesizeConversation(
  topic: string,
  contributions: { author: string; content: string; position?: string }[]
): Promise<SynthesisResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const contributionsText = contributions
    .map((c, i) => `[${c.author}${c.position ? ` (${c.position})` : ''}]:\n${c.content}`)
    .join('\n\n---\n\n');

  const prompt = `You are a philosophical facilitator helping to synthesize a conversation. Your role is NOT to judge who is "right" but to help all participants understand each other better and identify productive paths forward.

TOPIC: ${topic}

CONTRIBUTIONS:
${contributionsText}

Please provide a synthesis in the following JSON format:
{
  "keyPoints": [
    {
      "perspective": "Name/label for this perspective",
      "mainArguments": ["Core argument 1", "Core argument 2"],
      "strengths": ["What this perspective does well"]
    }
  ],
  "commonGround": [
    "Points where participants seem to agree or share assumptions"
  ],
  "tensions": [
    {
      "topic": "The specific point of disagreement",
      "perspectives": ["How different contributors view this"],
      "explanation": "Why this tension exists and why it matters"
    }
  ],
  "unresolvedQuestions": [
    "Questions that remain open and could guide further discussion"
  ],
  "synthesis": "A balanced summary that honors all perspectives without declaring a winner. Focus on what can be learned from the exchange.",
  "suggestedNextSteps": [
    "Productive directions the conversation could go"
  ]
}

Guidelines:
1. Honor all perspectives - don't dismiss any view
2. Look for the strongest version of each argument (steel-man, not straw-man)
3. Identify genuine insights from each contributor
4. Frame tensions as opportunities for deeper understanding, not "who's wrong"
5. Suggest questions that could move the conversation forward

Return ONLY valid JSON.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  // Clean up the response to extract JSON
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Legacy judge function - kept for backward compatibility
 * Consider using synthesizeConversation() for new implementations
 * @deprecated Use synthesizeConversation() instead for conversation-first approach
 */
export async function judgeDebate(
  topic: string,
  argumentFor: string,
  argumentAgainst: string
): Promise<JudgmentResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const prompt = `You are an impartial philosophical debate judge. Analyze this debate objectively.

TOPIC: ${topic}

ARGUMENT FOR:
${argumentFor}

ARGUMENT AGAINST:
${argumentAgainst}

Please provide your judgment in the following JSON format:
{
  "winner": "for" | "against" | "tie",
  "reasoning": "Detailed explanation of your decision",
  "factChecks": [
    {
      "claim": "Specific claim made",
      "verdict": "accurate" | "misleading" | "false",
      "explanation": "Why this verdict"
    }
  ],
  "scores": {
    "for": {
      "logic": 0-10,
      "evidence": 0-10,
      "rhetoric": 0-10
    },
    "against": {
      "logic": 0-10,
      "evidence": 0-10,
      "rhetoric": 0-10
    }
  }
}

Criteria:
1. Logic - Soundness of reasoning
2. Evidence - Quality and relevance of support
3. Rhetoric - Clarity and persuasiveness

Return ONLY valid JSON.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  // Clean up the response to extract JSON
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return JSON.parse(jsonMatch[0]);
}
