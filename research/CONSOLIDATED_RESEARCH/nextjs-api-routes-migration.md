# Migrating Next.js API Routes to Supabase for Static Export

## The Problem

Next.js API routes (`app/api/*`) **DO NOT WORK** with static export (`output: 'export'`). This is a fundamental limitation because:

1. API routes require a Node.js server to handle requests
2. Static export generates only HTML/CSS/JS files
3. Capacitor apps run entirely client-side (no server)

## Current API Route in Our App

We have **one** API route that needs migration:

**File**: `/home/user/Philosophy-app/app/api/judge/route.ts`

```typescript
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { debateId, topic, argumentFor, argumentAgainst } = body;

    // Get AI judgment from Gemini
    const judgment = await judgeDebate(topic, argumentFor, argumentAgainst);

    // Determine winner
    const { data: debate } = await supabase
      .from('debates')
      .select('for_participant, against_participant')
      .eq('id', debateId)
      .single();

    const winnerId = judgment.winner === 'for'
      ? debate.for_participant
      : judgment.winner === 'against'
      ? debate.against_participant
      : null;

    // Save judgment to database
    await supabase.from('judgments').insert({
      debate_id: debateId,
      winner_position: judgment.winner,
      reasoning: judgment.reasoning,
      fact_checks: judgment.factChecks,
      scores: judgment.scores,
    });

    // Update debate status
    await supabase.from('debates').update({
      status: 'completed',
      winner_id: winnerId,
      completed_at: new Date().toISOString(),
    }).eq('id', debateId);

    return NextResponse.json({ success: true, judgment });
  } catch (error: any) {
    console.error('Error judging debate:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to judge debate' },
      { status: 500 }
    );
  }
}
```

**What it does**:
1. Authenticates the user
2. Receives debate data
3. Calls Gemini AI to judge the debate
4. Saves judgment to Supabase
5. Updates debate status

**Why it can't work in static export**:
- Uses server-side authentication
- Needs to call external API (Gemini) with API keys that shouldn't be exposed to client
- Requires server runtime to execute

## Migration Options

You have **three main options** for migrating this API route:

### Option 1: Supabase Edge Functions (RECOMMENDED)

### Option 2: Direct Client-Side Call (NOT RECOMMENDED for this use case)

### Option 3: Database Functions + RPC (Partial solution)

Let's explore each option:

---

## Option 1: Supabase Edge Functions (RECOMMENDED)

**Best for**: Server-side logic, API calls with secrets, complex processing

Supabase Edge Functions are serverless Deno functions that run on Supabase's infrastructure.

### Pros
- ✅ Secure (API keys stay on server)
- ✅ Server-side execution
- ✅ Can call external APIs (Gemini)
- ✅ Integrated with Supabase Auth
- ✅ TypeScript support
- ✅ Built-in CORS handling

### Cons
- ❌ Requires Deno (different from Node.js)
- ❌ Separate deployment from Next.js
- ❌ Learning curve
- ❌ Cold starts (first request may be slow)

### Implementation Steps

#### Step 1: Install Supabase CLI

```bash
npm install -g supabase

# Or use npx
npx supabase --version
```

#### Step 2: Initialize Supabase Functions

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Create a new function
supabase functions new judge-debate
```

This creates: `supabase/functions/judge-debate/index.ts`

#### Step 3: Write the Edge Function

```typescript
// supabase/functions/judge-debate/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Gemini AI types (simplified)
interface JudgmentResult {
  winner: 'for' | 'against' | 'tie';
  reasoning: string;
  factChecks: Array<{
    claim: string;
    verdict: string;
    explanation: string;
  }>;
  scores: {
    for: { logic: number; evidence: number; rhetoric: number };
    against: { logic: number; evidence: number; rhetoric: number };
  };
}

// Function to call Gemini AI
async function judgeDebate(
  topic: string,
  argumentFor: string,
  argumentAgainst: string
): Promise<JudgmentResult> {
  const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an impartial debate judge. Analyze this philosophical debate and provide a detailed judgment.

Topic: ${topic}

Argument FOR:
${argumentFor}

Argument AGAINST:
${argumentAgainst}

Provide your judgment in JSON format with:
1. winner: "for", "against", or "tie"
2. reasoning: detailed explanation of your decision
3. scores: { for: { logic: 0-10, evidence: 0-10, rhetoric: 0-10 }, against: { ... } }
4. factChecks: array of fact checks with claim, verdict, and explanation

Return ONLY valid JSON.`
          }]
        }],
      }),
    }
  );

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  // Parse JSON from Gemini response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse Gemini response');
  }

  return JSON.parse(jsonMatch[0]);
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's auth token
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { debateId, topic, argumentFor, argumentAgainst } = await req.json();

    if (!debateId || !topic || !argumentFor || !argumentAgainst) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get AI judgment from Gemini
    const judgment = await judgeDebate(topic, argumentFor, argumentAgainst);

    // Get debate info to determine winner user ID
    const { data: debate, error: debateError } = await supabase
      .from('debates')
      .select('for_participant, against_participant')
      .eq('id', debateId)
      .single();

    if (debateError || !debate) {
      return new Response(
        JSON.stringify({ error: 'Debate not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const winnerId =
      judgment.winner === 'for'
        ? debate.for_participant
        : judgment.winner === 'against'
        ? debate.against_participant
        : null;

    // Save judgment to database
    const { error: judgmentError } = await supabase.from('judgments').insert({
      debate_id: debateId,
      winner_position: judgment.winner,
      reasoning: judgment.reasoning,
      fact_checks: judgment.factChecks,
      scores: judgment.scores,
    });

    if (judgmentError) {
      throw judgmentError;
    }

    // Update debate status and winner
    const { error: updateError } = await supabase
      .from('debates')
      .update({
        status: 'completed',
        winner_id: winnerId,
        completed_at: new Date().toISOString(),
      })
      .eq('id', debateId);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, judgment }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error judging debate:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to judge debate',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
})
```

#### Step 4: Set Environment Variables

```bash
# Set the Gemini API key in Supabase
supabase secrets set GEMINI_API_KEY=your_gemini_api_key_here
```

Environment variables are automatically available:
- `SUPABASE_URL` - Auto-injected
- `SUPABASE_ANON_KEY` - Auto-injected
- `GEMINI_API_KEY` - Set manually (above)

#### Step 5: Deploy the Function

```bash
# Deploy to Supabase
supabase functions deploy judge-debate --project-ref YOUR_PROJECT_REF

# Or deploy without project ref (uses linked project)
supabase functions deploy judge-debate
```

#### Step 6: Update Client Code

Replace the API route call with Edge Function call:

```typescript
// Before (API route)
const response = await fetch('/api/judge', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ debateId, topic, argumentFor, argumentAgainst }),
});

// After (Edge Function)
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();
const { data: { session } } = await supabase.auth.getSession();

const response = await fetch(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/judge-debate`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`,
    },
    body: JSON.stringify({ debateId, topic, argumentFor, argumentAgainst }),
  }
);

const result = await response.json();
```

**Or use Supabase client helper**:

```typescript
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

const { data, error } = await supabase.functions.invoke('judge-debate', {
  body: { debateId, topic, argumentFor, argumentAgainst },
});

if (error) {
  console.error('Error:', error);
} else {
  console.log('Judgment:', data.judgment);
}
```

#### Step 7: Test the Function

```bash
# Test locally
supabase functions serve judge-debate

# Make a test request
curl -i --location --request POST 'http://localhost:54321/functions/v1/judge-debate' \
  --header 'Authorization: Bearer YOUR_USER_JWT' \
  --header 'Content-Type: application/json' \
  --data '{"debateId":"123","topic":"Test","argumentFor":"Yes","argumentAgainst":"No"}'
```

### Updating Existing Code

**Files to modify**:

1. **Remove API route**: Delete `/app/api/judge/route.ts`

2. **Update component that calls it** (likely in `DebateActions.tsx` or similar):

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';

export default function JudgeDebateButton({ debateId, topic, argumentFor, argumentAgainst }) {
  const [loading, setLoading] = useState(false);

  async function handleJudge() {
    setLoading(true);
    try {
      const supabase = createClient();

      // Call Edge Function
      const { data, error } = await supabase.functions.invoke('judge-debate', {
        body: { debateId, topic, argumentFor, argumentAgainst },
      });

      if (error) throw error;

      console.log('Judgment complete:', data.judgment);
      // Handle success (e.g., redirect, show results, etc.)
    } catch (error) {
      console.error('Failed to judge debate:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleJudge} disabled={loading}>
      {loading ? 'Judging...' : 'Request Judgment'}
    </button>
  );
}
```

---

## Option 2: Direct Client-Side Call (NOT RECOMMENDED)

**Only use if**: You're okay exposing your Gemini API key to clients (NOT recommended)

### Why Not Recommended

- ❌ Exposes your Gemini API key in client code
- ❌ Users can extract and abuse your API key
- ❌ No rate limiting or abuse prevention
- ❌ Higher costs (users can make unlimited requests)

### Implementation (if you must)

```typescript
'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@/lib/supabase/client';

export default function JudgeDebateButton({ debateId, topic, argumentFor, argumentAgainst }) {
  async function handleJudge() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      // WARNING: API key is exposed to client!
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Call Gemini from client
      const result = await model.generateContent(/* prompt */);
      const judgment = parseJudgment(result);

      // Save to Supabase
      await supabase.from('judgments').insert({
        debate_id: debateId,
        winner_position: judgment.winner,
        reasoning: judgment.reasoning,
        fact_checks: judgment.factChecks,
        scores: judgment.scores,
      });

      // Update debate
      await supabase.from('debates').update({
        status: 'completed',
        winner_id: winnerId,
        completed_at: new Date().toISOString(),
      }).eq('id', debateId);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return <button onClick={handleJudge}>Judge Debate</button>;
}
```

**Use only for**: Public APIs, services that don't require secrets

---

## Option 3: Database Functions + RPC (Partial Solution)

**Best for**: Simple database operations, no external API calls

Supabase supports PostgreSQL functions that can be called via RPC.

### Limitations

- ❌ Can't call external APIs (Gemini)
- ❌ Limited to SQL/PL/pgSQL
- ✅ Good for database logic
- ✅ Server-side execution
- ✅ Fast (no cold starts)

### Example Use Case

This won't work for our judge API (needs Gemini), but could work for simpler operations:

```sql
-- Create a database function
CREATE OR REPLACE FUNCTION join_debate(
  p_debate_id UUID,
  p_user_id UUID,
  p_position TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
BEGIN
  -- Update debate
  IF p_position = 'for' THEN
    UPDATE debates
    SET for_participant = p_user_id, status = 'in_progress'
    WHERE id = p_debate_id AND for_participant IS NULL;
  ELSE
    UPDATE debates
    SET against_participant = p_user_id, status = 'in_progress'
    WHERE id = p_debate_id AND against_participant IS NULL;
  END IF;

  -- Return result
  SELECT jsonb_build_object('success', true) INTO v_result;
  RETURN v_result;
END;
$$;
```

Call from client:

```typescript
const { data, error } = await supabase.rpc('join_debate', {
  p_debate_id: debateId,
  p_user_id: userId,
  p_position: 'for',
});
```

**For our judge API**: This won't work because we need to call Gemini API, which requires external HTTP requests not available in PostgreSQL.

---

## Recommendation for Our App

**Use Option 1: Supabase Edge Functions**

Why?
1. ✅ Secure (keeps Gemini API key server-side)
2. ✅ Can call external APIs
3. ✅ Integrated with Supabase ecosystem
4. ✅ TypeScript/Deno (similar to Node.js)
5. ✅ Built-in auth integration
6. ✅ Easy deployment

## Migration Checklist

- [ ] Install Supabase CLI
- [ ] Login and link project
- [ ] Create `judge-debate` Edge Function
- [ ] Copy logic from API route to Edge Function
- [ ] Convert Node.js imports to Deno imports
- [ ] Set `GEMINI_API_KEY` secret
- [ ] Test function locally
- [ ] Deploy function to Supabase
- [ ] Update client code to call Edge Function
- [ ] Delete old API route file
- [ ] Test end-to-end in mobile app
- [ ] Monitor Edge Function logs

## Testing Edge Functions

### Local Testing

```bash
# Start local Supabase (includes Edge Functions)
supabase start

# Serve specific function
supabase functions serve judge-debate

# The function will be available at:
# http://localhost:54321/functions/v1/judge-debate
```

### Production Testing

```bash
# View logs
supabase functions logs judge-debate

# Check recent invocations
supabase functions list
```

## Cost Considerations

**Supabase Edge Functions Pricing**:
- Free tier: 500K function invocations/month
- Pro tier: 2M invocations/month
- Additional: $2 per 1M invocations

**Gemini API Pricing**:
- Check Google AI pricing for current rates
- Gemini Pro is currently free for limited usage

**For a debate app**: Unless you have millions of debates per month, you'll likely stay in the free tier.

## Troubleshooting

### Common Errors

**1. CORS Error**

Add CORS headers to your Edge Function response:

```typescript
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

**2. Authentication Error**

Make sure you're passing the auth token:

```typescript
const { data: { session } } = await supabase.auth.getSession();

await supabase.functions.invoke('judge-debate', {
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
  },
  body: { /* ... */ },
});
```

**3. Cold Start Delays**

First request may be slow (cold start). Subsequent requests are faster.

Solution: Accept the tradeoff, or implement a warming mechanism (periodic calls).

## Alternative: Cloudflare Workers, AWS Lambda, etc.

If you don't want to use Supabase Edge Functions, you could deploy the same logic to:
- Cloudflare Workers
- AWS Lambda + API Gateway
- Vercel Edge Functions (but this ties you to Vercel hosting)

However, Supabase Edge Functions are the simplest for this use case since you're already using Supabase.

## Summary

**Current State**: 1 API route (`/app/api/judge/route.ts`) that calls Gemini AI

**Required Action**: Migrate to Supabase Edge Function

**Migration Steps**:
1. Create Edge Function with same logic
2. Set Gemini API key as secret
3. Deploy to Supabase
4. Update client code to call Edge Function
5. Delete old API route

**Effort**: 2-4 hours for migration and testing

**Result**: Fully static Next.js app that works with Capacitor
