import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
