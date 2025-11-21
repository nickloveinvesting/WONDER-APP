# WONDER - App Store Submission & Launch Strategy
## Complete iOS Launch Playbook for Philosophical Conversation Platform

**Document Date:** November 2025
**Target Launch:** Q1 2026
**Platform:** Apple App Store
**Target Audience:** Philosophy enthusiasts, curious thinkers, academic communities

---

## EXECUTIVE SUMMARY

WONDER is a philosophical conversation platform combining user-generated debate content with AI-powered judgment. This document provides a complete roadmap for App Store submission, approval, and launch success.

**Key Challenge:** Managing user-generated content while maintaining App Store compliance
**Key Opportunity:** Niche but loyal audience with high engagement potential
**Timeline:** 3-month pre-launch → 2-month TestFlight → Launch → 12-month growth

---

# PART 1: APP STORE TECHNICAL REQUIREMENTS (2025)

## 1.1 SDK & Build Requirements

### Current Requirements (April 2025)
- **Xcode Version:** Minimum Xcode 16
- **iOS SDK:** iOS 18 SDK (minimum)
- **Minimum Deployment Target:** iOS 15.0+ (recommended: iOS 15.0-16.0 range)
- **Signing:** 64-bit only
- **Architecture:** arm64

### Action Items
```
BEFORE SUBMISSION:
☐ Update project to build with Xcode 16
☐ Set iOS SDK to iOS 18
☐ Verify min deployment target: iOS 15.0
☐ Run: xcodebuild clean build-for-testing
☐ Test on minimum target iOS device (iPhone 11 or SE 2nd Gen)
☐ Validate 64-bit binary: otool -hv [app.ipa]
```

## 1.2 Device Requirements & Screen Sizes

### Required Device Support
| Device | Screen Size | Required? |
|--------|------------|-----------|
| iPhone SE (1st Gen) | 4" | Optional |
| iPhone 6/6s/7/8 | 4.7" | Minimum |
| iPhone X/XS/11 Pro | 5.8" | Required |
| iPhone 12/13/14/15 | 5.8-6.7" | Required |
| iPhone 16 | 5.8-6.7" | Required |
| iPad | 10.2-12.9" | Recommended |
| iPad mini | 7.9-8.3" | Recommended |

### Testing Checklist
```
DEVICE TESTING:
☐ iPhone 15 (6.1" - latest standard)
☐ iPhone 15 Plus (6.7" - large screen)
☐ iPhone 16 Pro Max (6.9" - largest screen)
☐ iPad Pro 12.9" (if tablet support added)
☐ Test Dark Mode on all devices
☐ Test Landscape orientation on all devices
☐ Test Dynamic Type (Accessibility) at 100%-200%
☐ Verify app launches in under 20 seconds
```

## 1.3 Performance Requirements

### App Size Limits
- **Initial Download:** < 4 GB (typically < 200 MB)
- **Current Target:** ~80-120 MB expected

### Performance Targets
| Metric | Target | WONDER Status |
|--------|--------|---------------|
| Cold Start Time | < 20 seconds | ✓ Next.js optimized |
| Memory Usage | < 500 MB avg | ✓ Should verify |
| Battery Impact | Minimal | ✓ No continuous tracking |
| Network | Works on 2G+ | ✓ Uses Supabase API |

### Action Items
```
BEFORE SUBMISSION:
☐ Run Xcode Performance Profiler
  - Instruments > System Trace
  - Check app launch time
  - Monitor memory allocation
  - Identify any thread issues
☐ Verify network efficiency
  - Analyze API requests
  - Ensure request batching
  - Verify caching strategy
☐ Test on iPhone with 2G/LTE connection
  - Use Xcode Network Link Conditioner
  - Ensure graceful degradation
☐ Battery drain test (30 minutes continuous use)
```

## 1.4 Security & Encryption

### Required Compliance
- **ATS (App Transport Security):** Enabled (default)
- **SSL/TLS:** HTTPS only for all network requests
- **Encryption:** Export compliance declaration required

### Implementation Verification
```
SECURITY CHECKLIST:
☐ All API calls use HTTPS
  - Verify: curl -I https://[api-endpoint]
  - No HTTP fallback
☐ Supabase uses HTTPS
  - Check: NEXT_PUBLIC_SUPABASE_URL
  - Must be https:// not http://
☐ Certificate validation enabled
  - No self-signed certs in production
☐ Request signing (if applicable)
  - No API keys in client code
  - Server-side token validation
☐ Export compliance declaration
  - ITAR/EAR assessment (standard apps exempt)
  - File: https://developer.apple.com/documentation/security/

**Status for WONDER:**
✓ Supabase handles HTTPS encryption
✓ Gemini API uses HTTPS
✓ No export-controlled encryption
→ Action: Complete crypto self-classification questionnaire in App Store Connect
```

## 1.5 iOS Capabilities & Entitlements

### Required for WONDER
```
ENTITLEMENTS TO CONFIGURE:
☐ Push Notifications (if adding notifications)
☐ Sign In with Apple (required if using OAuth)
☐ Internet (default - always enabled)
☐ User Privacy Statements
  - Philosophical beliefs (category from privacy labels)
  - User-generated content
```

### Optional for Future Features
```
FUTURE CAPABILITIES:
☐ Camera (if adding profile photos)
☐ Photo Library (if adding debate illustrations)
☐ Microphone (if adding voice debates)
☐ Local Network (if adding local discovery)
```

---

# PART 2: APP STORE REVIEW GUIDELINES COMPLIANCE

## 2.1 Critical: Guideline 1.2 - User-Generated Content

This is THE critical guideline for WONDER. Failure to comply results in immediate rejection.

### Apple's 4 Required Components

#### Component 1: Content Filtering System
**Requirement:** Method for filtering objectionable material from being posted

**WONDER's Implementation:**
```
Current:
- Supabase Row-Level Security (RLS) prevents unauthorized access
- Content stored in debates/arguments tables

Required Additions:
☐ Pre-publication filtering layer
  - Automated content checks (profanity, harassment)
  - Use solution: OpenAI Moderation API or similar
  - Flag suspicious content before posting

✓ Recommended Implementation:
1. User submits argument text
2. API calls content moderation service
3. If flagged, show user warning + suggestions
4. Allow user to edit or proceed anyway
5. Flag content for human review if high confidence

Code Location:
- app/api/judge/route.ts (add moderation step)
- app/(authenticated)/debates/[id]/DebateActions.tsx (client submission)
```

#### Component 2: Reporting Mechanism
**Requirement:** Mechanism to report offensive content with timely responses

**WONDER's Implementation:**
```
Current:
- FeedbackModal exists (GitHub issue creation)
- But NO in-app content reporting system

Required Addition:
☐ Add "Report Content" button to every argument/comment
  - Location: app/(authenticated)/debates/[id]/page.tsx
  - Show modal with report reason dropdown
  - Reasons: Harassment, Hate speech, Off-topic, Spam, Other
  - Optional description field
  - Store reports in new table: content_reports

Schema Addition:
CREATE TABLE content_reports (
  id UUID PRIMARY KEY,
  reported_content_id TEXT,
  content_type VARCHAR,  -- 'argument', 'comment', 'user'
  reporter_id UUID NOT NULL,
  reason VARCHAR NOT NULL,
  description TEXT,
  status VARCHAR DEFAULT 'pending',  -- pending, under_review, resolved
  resolution TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (reporter_id) REFERENCES profiles(id),
  FOREIGN KEY (reported_content_id) REFERENCES arguments(id)
);

Timely Response Requirement:
- SLA: Respond to reports within 24-72 hours
- Resolution: Remove content, warn/ban user, or dismiss report
- Email reporter with outcome within 24 hours
```

#### Component 3: User Blocking & Account Management
**Requirement:** Ability to block abusive users from the service

**WONDER's Implementation:**
```
Current:
- User profiles exist
- No blocking mechanism

Required Addition:
☐ Implement user blocking system

Database Schema:
CREATE TABLE blocked_users (
  id UUID PRIMARY KEY,
  blocker_id UUID NOT NULL,
  blocked_user_id UUID NOT NULL,
  reason VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_user_id),
  FOREIGN KEY (blocker_id) REFERENCES profiles(id),
  FOREIGN KEY (blocked_user_id) REFERENCES profiles(id)
);

UI Implementation:
- Add "Block User" option in user profile menu
- Add "Blocked Users" section in Settings page
- Hide blocked user's posts in feed
- Prevent blocked user from messaging
- Allow unblocking from settings

Moderation Panel (Admin):
- Add moderator ability to soft-ban (suspend)
- Add moderator ability to hard-ban (delete)
- Add moderation log to document actions
- Make mod actions appealable
```

#### Component 4: Contact Information
**Requirement:** Published contact information so users can reach you

**WONDER's Implementation:**
```
Current:
✓ Privacy policy page exists
✓ Terms of service page exists
✓ Feedback modal exists

Required Addition:
☐ Add dedicated "Contact Us" page or email
☐ Add contact info to Privacy Policy
☐ Add contact info to Terms of Service
☐ In-app: Settings → Help & Support → Contact Form

Implementation:
- Create app/contact/page.tsx
- List: Email, support form, GitHub issues link
- Add to Terms & Privacy footer
- Response SLA: 48 hours for UGC reports
```

## 2.2 Guideline 1.2.1 - Creator Content Apps (Age Gates)

### New Requirement (November 2025 Update)

**Requirement:** If app content exceeds age rating, implement age verification gate

**WONDER's Current Rating:** 12+
- Reason: Philosophical debate, no explicit content

**Required Implementation:**
```
IF upgrading to allow college/adult-only content:
☐ Implement age verification
  - Request user birthdate at signup
  - Verify age >= 17 (or your threshold)
  - Gate sensitive content behind age check
  - Store verified age in profiles table

Code Example:
// app/(authenticated)/settings/page.tsx
if (userAge < 17 && contentType === 'sensitive_philosophy') {
  return <AgeVerificationGate />;
}

Current Plan:
- Keep app at 12+ rating
- No explicit content restrictions needed
- Moderate via community/moderation, not age gates
→ Action: Ensure Terms clearly state expected age of users
```

## 2.3 Guideline 4.2.1 - Sign In with Apple

**Requirement:** If offering third-party login, must offer Sign In with Apple

**WONDER's Current Status:**
```
Current Implementation:
- Supabase Auth handles authentication
- Third-party OAuth options: [verify which ones enabled]

Required Action:
☐ Determine: Does WONDER use Google/Facebook login?
  - If YES: Must add Sign In with Apple
  - If NO (Supabase email only): No requirement

If third-party login exists:
☐ Implement Sign In with Apple
  - Use: ASAuthorizationAppleIDProvider
  - Coordinate with Supabase Auth (might already support)
  - Verify: User can use Apple ID without creating email account
  - Privacy option: Hide real email (use private relay)

Testing:
☐ Create Apple ID for testing
☐ Verify Sign In with Apple works
☐ Test email privacy feature
☐ Verify profile creation on first login
```

## 2.4 Other Critical Guidelines

### Guideline 2.1 - App Completeness
**Requirement:** No crashes, placeholder text, or unfinished features

```
PRE-SUBMISSION TESTING:
☐ Comprehensive functionality testing
  - Create account
  - Create debate
  - Submit argument
  - View leaderboard
  - Edit profile
  - Submit feedback
  - Test all navigation paths
  
☐ Crash testing
  - Rapid tapping on buttons
  - Network interruption scenarios
  - Low memory conditions
  - Background/foreground transitions
  
☐ Text review
  - No "Lorem ipsum"
  - No "TODO" or "FIXME"
  - No placeholder buttons
  - All strings localized
```

### Guideline 4.3 - Spam & Functionality
**Requirement:** No spam, no misleading functionality

```
SPAM PREVENTION:
☐ Implement rate limiting
  - Max debates created per hour: 5
  - Max arguments per debate: 2
  - Max reports per day: 10
  - Cooldown between actions: 30 seconds

✓ Current Protection:
- Database constraints prevent duplicate entries
- User auth prevents bot access (mostly)

Additional:
☐ Implement CAPTCHAs for:
  - Account signup
  - Report submission
  - High-volume content creation
```

### Guideline 5.1 - Legal Requirements
**Requirement:** Privacy Policy, Terms of Service, contact info

```
✓ WONDER Already Has:
- Privacy Policy page
- Terms of Service page

Required Updates:
☐ Add to Privacy Policy:
  1. Data retention policies
  2. User rights (GDPR/CCPA)
  3. Data deletion procedures
  4. AI (Gemini) data usage
  5. Third-party services (Supabase, Gemini)
  6. Contact email for privacy concerns

☐ Add to Terms of Service:
  1. Content ownership clause (users own their posts)
  2. License grant to WONDER (to display/store content)
  3. Moderation policy
  4. User conduct rules
  5. Dispute resolution
  6. Limitation of liability

☐ Update both documents:
  - Version numbering (e.g., v1.0)
  - Last updated date
  - Clear acceptance mechanism
  - Link in-app Settings → Legal
```

---

# PART 3: APP STORE OPTIMIZATION (ASO)

## 3.1 App Metadata

### App Name (30 characters max - visible)
**Current:** WONDER
**Length:** 7 characters ✓

**Why This Works:**
- Memorable, one word
- Searchable (intent-driven)
- Brand-aligned
- Room for subtitle (see below)

### Subtitle (30 characters max - visible in search results)
**Recommendations (choose one):**

| Subtitle | Length | Pros | Cons |
|----------|--------|------|------|
| "Debate Philosophy Together" | 26 | Clear value prop | Generic |
| "Deep Philosophical Debates" | 27 | Keyword-rich | Not unique |
| "Socratic Dialogue Platform" | 26 | Niche appeal | Might confuse |
| "Discuss Ideas Deeply" | 20 | Action-oriented | Vague |
| "Philosophical Debates & AI" | 26 | Differentiates (AI) | Complex |

**Recommended:** "Deep Philosophical Debates"
- Includes: "debate" + "philosophy" (high-volume keywords)
- Clear value
- Appeals to target audience

### Keywords (100 characters hidden - for ASO only)

**Priority Keywords Research:**
```
High-Volume, Low-Competition (Target):
- philosophy app (volume: high, competition: medium)
- debate app (volume: high, competition: high)
- socratic (volume: medium, competition: low)
- think deeply (volume: medium, competition: low)

Long-Tail (Niche):
- philosophical discussion (volume: low, competition: low)
- ethics debate (volume: low, competition: low)
- metaphysics (volume: low, competition: low)
- existentialism (volume: low, competition: low)

Trending:
- philosophy (high volume)
- ai philosophy (emerging)
- stoicism (sub-category trending)

WONDER's Keywords String (100 characters):
"philosophy,debate,discussion,socratic,ethics,metaphysics,thinking,dialogue,ideas,wisdom"

Optimization:
- 85 characters used
- Singular forms (Apple indexes plurals)
- No spaces between commas
- Most important terms first
- Terms referenced in description

Tools for Validation:
- Sensor Tower (premium)
- Mobile Action
- App Annie
- Competitor analysis (search App Store for top philosophy apps)
```

### App Description (4000 characters - visible)

**Structure:**
1. Hook (2-3 sentences)
2. Value proposition
3. Key features
4. How it works
5. Community benefits
6. Call to action

**Draft Description:**

```
WONDER is where curious minds come together to explore big ideas.

Whether you're passionate about ethics, fascinated by metaphysics, 
or interested in the nature of consciousness—WONDER is your platform 
for philosophical dialogue that matters.

KEY FEATURES:
- Deep Debates: Propose philosophical questions and defend your views 
  against others who see it differently
- AI Judgment: Our AI analyzes arguments on logic, evidence, and 
  persuasiveness—giving structured feedback on your reasoning
- Fact-Checking: Every claim is examined. Strengthen your arguments 
  with evidence
- Earn Influence: Build reputation through thoughtful participation
- Track Progress: See your philosophical growth with streak tracking 
  and depth scoring
- Discuss Ideas: Engage in conversations that actually make you think

HOW IT WORKS:
1. Create or join a debate on any philosophical topic
2. Submit your argument (for or against)
3. Our AI judges both sides fairly
4. Learn from the reasoning, evidence, and rhetoric
5. Engage with other thinkers who challenge your assumptions

COMMUNITY:
Join thousands of philosophers, students, professionals, and curious 
minds exploring questions that matter. WONDER is built on good faith—
where we attack arguments, not people.

For technical details, visit WONDER.app

NO ADS. NO POLITICS. JUST PHILOSOPHY.

[Character count: ~1000/4000]

Include:
- Privacy policy link
- Terms of service link
- Support email
- Version number
- Last updated date
```

## 3.2 Visual Assets

### App Icon
```
Requirements:
- 1024x1024 pixels (App Store display)
- Also submit: 180x180, 120x120, 58x58 (for device use)
- Format: JPEG or PNG
- No rounded corners (iOS adds them)
- No transparency required
- Legible at 27x27 pixels (smallest size)

Design Principles:
✓ Current WONDER logo (black/teal)
✓ Keep minimal, bold
✓ Works on dark/light backgrounds
✓ Stands out in app grid
✓ Passes contrast ratio (4.5:1 AAA)

Status: [Verify current logo meets requirements]
```

### App Screenshots (5-10 per device class)

**Required Device Classes:**
- iPhone 6.5" (e.g., iPhone 15 Plus)
- iPhone 5.5" (e.g., iPhone 8 Plus) - if supporting smaller screens

**Recommended Sequence:**
```
Screenshot 1: Core Value Prop
- Headline: "Debate Philosophy Together"
- Visual: App home screen showing featured debates
- Style: Real app UI (not marketing language)
- Text: 2-3 lines max

Screenshot 2: Debate Creation
- Headline: "Propose Big Questions"
- Visual: Create debate flow
- Shows: Topic input, description

Screenshot 3: AI Judgment
- Headline: "AI Judges Your Arguments"
- Visual: Judgment result screen
- Shows: Logic score, evidence score, rhetoric score
- Highlight: This is unique differentiator

Screenshot 4: Community Features
- Headline: "Engage with Thinkers"
- Visual: Discussion/comment section
- Shows: Upvotes, replies, user profiles

Screenshot 5: Progress Tracking
- Headline: "Build Your Reputation"
- Visual: Leaderboard screen
- Shows: Reputation scores, streaks, badges

Screenshot 6: Philosophical Depth
- Headline: "Track Your Growth"
- Visual: Profile/analytics screen
- Shows: Participation stats, expertise areas
- Optional: Depth scoring visualization

Design Guidelines:
✓ Use real app screenshots (not renders)
✓ Add text overlays (readable at small size)
✓ Avoid excessive branding/logos
✓ Use app's teal/slate color scheme
✓ No extraneous UI elements
✓ Portrait orientation only
✓ Text in large, readable font
✓ Maximum 2-3 key points per screenshot

Tools:
- Figma (design overlays)
- App previewer (local testing)
- ScreenFlow/QuickTime (capture real device)
```

### App Preview Video (30 seconds)

**Structure:**
```
0-5 seconds: Hook
- "Explore big ideas with brilliant minds"
- Visual: App loading, home screen

5-15 seconds: Core Feature Demo
- Create a debate (3 sec)
- Submit argument (3 sec)
- View AI judgment (4 sec)
- Highlight: Logic, evidence, rhetoric scores

15-25 seconds: Engagement & Community
- Upvote/discuss (3 sec)
- View leaderboard (2 sec)
- User profiles (2 sec)
- Daily streak notification (2 sec)

25-30 seconds: CTA
- "Download WONDER on the App Store"
- App icon + download button visual
- Tagline: "WONDER Together"

Production:
- Dimensions: 1920x1080 (16:9) or actual device ratio
- Frame rate: 30 fps
- Format: MOV, MP4 (H.264)
- Audio: Background music + optional voiceover
- No talking heads (pure product demo)
- Music: Royalty-free, matching brand tone

Tools:
- Adobe Premiere Pro
- Final Cut Pro
- iMovie (basic)
- Descript (easy voiceover)
```

## 3.3 ASO Optimization Checklist

```
PRE-LAUNCH:
☐ Conduct competitive analysis
  - Search "philosophy app", "debate app", "socratic"
  - Analyze top 10 competitors
  - Note: keywords, descriptions, ratings, reviews
  - Tools: App Store directly, Sensor Tower, Mobile Action

☐ Keyword selection
  - Create spreadsheet: Keyword | Volume | Competition | Relevance
  - Target: 5-8 primary keywords
  - Include: 2-3 long-tail keywords
  - Validate: User-tested, real search volume

☐ A/B test (if possible)
  - Use TestFlight variants (limited)
  - Compare: Two subtitle versions
  - Track: Download rate, retention, engagement
  - Timeline: 2 weeks minimum

☐ Localization for ASO
  - If expanding to UK: Use "Debate" (American English OK)
  - If expanding to Australia: Localize screenshots
  - If expanding to non-English: Translate description
  - Status: English-only for launch

POST-LAUNCH:
☐ Monitor weekly
  - Track keyword positions (where does WONDER rank?)
  - Measure conversion rate
  - Analyze user reviews for feedback
  - Note: Keyword rankings stabilize after 2-4 weeks

☐ Update quarterly
  - Refresh screenshots if needed
  - Update description for seasonal events
  - Add new features to highlights
  - Respond to top negative reviews
```

---

# PART 4: CONTENT MODERATION & COMPLIANCE STRATEGY

## 4.1 Pre-Launch Moderation Setup

### Database Schema Additions

```sql
-- 1. Content Reports Table
CREATE TABLE content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_content_id TEXT NOT NULL,
  content_type VARCHAR(20) NOT NULL,  -- 'argument', 'comment', 'debate'
  content_preview TEXT,  -- Store text for offline review
  reporter_id UUID NOT NULL,
  reason VARCHAR(50) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',  -- pending, under_review, resolved, dismissed
  mod_action TEXT,  -- removed, warned, banned, etc.
  mod_notes TEXT,  -- Moderator's decision notes
  resolved_by UUID,  -- Moderator who resolved it
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (reporter_id) REFERENCES profiles(id),
  FOREIGN KEY (resolved_by) REFERENCES profiles(id)
);

-- 2. Moderation Log (for transparency)
CREATE TABLE moderation_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mod_id UUID NOT NULL,
  action VARCHAR(50),  -- removed_content, suspended_user, banned_user, etc.
  target_user_id UUID,
  target_content_id TEXT,
  reason TEXT,
  severity VARCHAR(20),  -- low, medium, high, critical
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (mod_id) REFERENCES profiles(id),
  FOREIGN KEY (target_user_id) REFERENCES profiles(id)
);

-- 3. Blocked Users Table
CREATE TABLE blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL,
  blocked_user_id UUID NOT NULL,
  reason VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_user_id),
  FOREIGN KEY (blocker_id) REFERENCES profiles(id),
  FOREIGN KEY (blocked_user_id) REFERENCES profiles(id)
);

-- 4. User Suspensions (soft ban)
CREATE TABLE user_suspensions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  reason TEXT NOT NULL,
  suspended_by UUID NOT NULL,
  suspended_until TIMESTAMP NOT NULL,
  can_appeal BOOLEAN DEFAULT true,
  appeal_submitted_at TIMESTAMP,
  appeal_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES profiles(id),
  FOREIGN KEY (suspended_by) REFERENCES profiles(id)
);

-- 5. User Bans (hard ban)
CREATE TABLE user_bans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  reason TEXT NOT NULL,
  banned_by UUID NOT NULL,
  permanent BOOLEAN DEFAULT false,
  ban_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES profiles(id),
  FOREIGN KEY (banned_by) REFERENCES profiles(id)
);

-- 6. Content Warnings (for flagged-but-allowed content)
CREATE TABLE content_warnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id TEXT NOT NULL,
  content_type VARCHAR(20),
  warning_type VARCHAR(50),  -- misinformation, disputed, contentious, etc.
  warning_text TEXT,
  added_by UUID,
  added_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (added_by) REFERENCES profiles(id)
);

-- 7. Appeal Table
CREATE TABLE moderation_appeals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_report_id UUID,
  original_action_id UUID,
  appealer_id UUID NOT NULL,
  appeal_reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',  -- pending, accepted, rejected
  reviewed_by UUID,
  review_notes TEXT,
  decision TEXT,
  decided_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (appealer_id) REFERENCES profiles(id),
  FOREIGN KEY (reviewed_by) REFERENCES profiles(id)
);
```

### Row-Level Security (RLS) Policies

```sql
-- Users can see their own reports
CREATE POLICY "Users can view their own reports"
  ON content_reports
  FOR SELECT
  USING (auth.uid() = reporter_id);

-- Moderators can see all reports
CREATE POLICY "Moderators can view all reports"
  ON content_reports
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_moderator = true
    )
  );

-- Users can create reports
CREATE POLICY "Users can create reports"
  ON content_reports
  FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

-- Moderators can update report status
CREATE POLICY "Moderators can update reports"
  ON content_reports
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_moderator = true
    )
  );

-- Blocked users are hidden from each other
CREATE POLICY "Hide blocked users' content"
  ON arguments
  FOR SELECT
  USING (
    NOT EXISTS (
      SELECT 1 FROM blocked_users
      WHERE (blocker_id = auth.uid() AND blocked_user_id = user_id)
      OR (blocker_id = user_id AND blocked_user_id = auth.uid())
    )
  );
```

## 4.2 Automated Moderation Setup

### Content Moderation Service Integration

```typescript
// lib/moderation.ts
import Anthropic from "@anthropic-sdk/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function checkContentSafety(
  text: string,
  context?: string
): Promise<{
  safe: boolean;
  score: number;
  categories: string[];
  reasoning: string;
}> {
  const message = await anthropic.messages.create({
    model: "claude-opus-4-1-20250805",
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content: `Analyze this philosophical argument/debate content for safety issues.
        
Content: "${text}"

Context: ${context || "philosophical debate"}

Rate safety (1-10, 10=safe):
- Check for: personal attacks, harassment, hate speech, misinformation, spam
- Philosophy-specific: Allow controversial ideas, but flag bad faith
- Return JSON: {safe: boolean, score: number, categories: string[], reasoning: string}`,
      },
    ],
  });

  const response = message.content[0];
  if (response.type === "text") {
    try {
      const parsed = JSON.parse(response.text);
      return {
        safe: parsed.score >= 7,
        score: parsed.score,
        categories: parsed.categories || [],
        reasoning: parsed.reasoning,
      };
    } catch {
      // Fallback to safe if parsing fails
      return {
        safe: true,
        score: 8,
        categories: [],
        reasoning: "Default safe (parsing failed)",
      };
    }
  }

  return { safe: true, score: 10, categories: [], reasoning: "No issue detected" };
}

// Use in API route
export async function POST(request: NextRequest) {
  const { content, type } = await request.json();

  const moderation = await checkContentSafety(content, type);

  if (!moderation.safe) {
    // Return warning to user
    return NextResponse.json(
      {
        warning: true,
        message: `Your ${type} may violate community guidelines: ${moderation.reasoning}`,
        categories: moderation.categories,
      },
      { status: 400 }
    );
  }

  // If flagged but safe, let through but add to review queue
  if (moderation.score < 8.5) {
    // Flag for human review but allow posting
    // Store in moderation queue
  }

  // Safe to post
  return NextResponse.json({ safe: true });
}
```

### Moderation UI Components

```typescript
// components/ReportContentButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Flag } from "lucide-react";

export function ReportContentButton({
  contentId,
  contentType,
}: {
  contentId: string;
  contentType: "argument" | "comment" | "user";
}) {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    "Harassment or bullying",
    "Hate speech",
    "Misinformation",
    "Spam",
    "Off-topic",
    "Other",
  ];

  const handleSubmit = async () => {
    const response = await fetch("/api/report-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contentId,
        contentType,
        reason,
        description,
      }),
    });

    if (response.ok) {
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowModal(true)}
        className="text-slate-500 hover:text-red-500"
      >
        <Flag size={16} />
        Report
      </Button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Report This Content</h2>

            {!submitted ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Reason
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select a reason...</option>
                    {reasons.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Additional Details (optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded px-3 py-2 resize-none"
                    rows={3}
                    placeholder="Tell us more..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!reason}
                    className="flex-1"
                  >
                    Submit Report
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-green-600 font-medium">
                  Thank you for reporting.
                  <br />
                  We'll review this within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
```

## 4.3 Moderation Dashboard (Admin)

```typescript
// app/(authenticated)/admin/moderation-dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Report {
  id: string;
  reported_content_id: string;
  content_type: string;
  reason: string;
  status: string;
  created_at: string;
  reporter_id: string;
}

export default function ModerationDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("content_reports")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      setReports(data || []);
      setLoading(false);
    };

    fetchReports();
  }, []);

  const handleResolve = async (reportId: string, action: string) => {
    const supabase = createClient();
    await supabase
      .from("content_reports")
      .update({
        status: "resolved",
        mod_action: action,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    // Remove from list
    setReports(reports.filter((r) => r.id !== reportId));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-6">Moderation Dashboard</h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Pending Reports ({reports.length})</h2>

        {reports.length === 0 ? (
          <p className="text-slate-600">No pending reports</p>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold">{report.reason}</p>
                    <p className="text-sm text-slate-600">
                      {report.content_type}: {report.reported_content_id}
                    </p>
                  </div>
                  <time className="text-sm text-slate-500">
                    {new Date(report.created_at).toLocaleDateString()}
                  </time>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleResolve(report.id, "remove_content")}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Remove Content
                  </button>
                  <button
                    onClick={() => handleResolve(report.id, "warn_user")}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Warn User
                  </button>
                  <button
                    onClick={() => handleResolve(report.id, "dismiss")}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

# PART 5: LAUNCH STRATEGY

## 5.1 Pre-Launch Timeline

### T-12 Weeks: Foundation
```
Week 1-2:
☐ Finalize app name, tagline, branding
☐ Update Privacy Policy (comprehensive)
☐ Update Terms of Service (moderation policy)
☐ Create Privacy Nutrition Label (in App Store Connect)
☐ Implement all moderation database tables
☐ Add content reporting UI
☐ Create moderator dashboard

Week 3-4:
☐ Set up TestFlight testing environment
☐ Create test accounts for internal testers
☐ Build iOS app (debug build)
☐ Write comprehensive marketing copy
☐ Prepare screenshots & preview video
☐ Create App Store product page (draft)
```

### T-8 Weeks: Closed Beta
```
Week 5-6:
☐ Submit first build to TestFlight
☐ Recruit 50-100 internal beta testers
  - Philosophy professors/instructors
  - Active Reddit r/philosophy users
  - Philosophy app enthusiasts
  - Diverse demographics (age, geography)

Week 7-8:
☐ Collect beta feedback
☐ Track metrics:
  - Crash reports
  - Feature usage
  - Engagement patterns
  - Time to first value
☐ Fix critical bugs
☐ Iterate on UI/UX
☐ Test moderation flows (simulate bad content)
```

### T-4 Weeks: Open Beta (TestFlight)
```
Week 9-10:
☐ Create public TestFlight link
☐ Announce in:
  - r/philosophy
  - Philosophy Discord servers
  - Philosophy Twitter/X accounts
  - Academia.edu / ResearchGate
  - Philosophy professor mailing lists

Week 11-12:
☐ Target: 500-1000 beta testers
☐ Monitor feedback constantly
☐ Rapidly iterate on issues
☐ Polish final UI
☐ Finalize screenshots
☐ Prepare submission materials

Metrics to track:
- Daily active beta testers
- Time to first debate
- Completion rate (create debate > view results)
- Retention (return after 24h, 7d, 30d)
- Crash-free user rate
- Average rating in TestFlight
```

### T-2 Weeks: Final Preparation
```
Week 13:
☐ Complete all 7 App Store Connect sections:
  1. App Information
  2. Pricing & Availability
  3. App Privacy
  4. Screenshots & Preview Video
  5. Marketing URL
  6. Support URL
  7. Description & Keywords

☐ Create binary release (production build)
  - Set version: 1.0.0
  - Build number: 1
  - Strip debug symbols
  - Verify code signing (distribution certificate)
  - Test on device one final time

☐ Final review of:
  - Copy (no typos, professional tone)
  - Links (privacy policy, terms, etc.)
  - Contact info (support email)
  - Graphics (1024x1024 icon, 5 screenshots, video)

☐ Prepare submission documentation:
  - Anything needed to review certain features
  - If Sign In with Apple: note implementation
  - If moderation: note reporting & blocking features
  - Example test account (optional)

Week 14:
☐ Submit to App Store
☐ Estimate: 24-48 hours for review (could be longer)
☐ Be prepared to respond to reviewer feedback
☐ Have appeals ready if rejected
```

## 5.2 TestFlight Beta Strategy

### Phase 1: Closed Beta (50-100 testers)
```
Duration: 2 weeks
Audience: Friends, family, philosophy enthusiasts

Goals:
- Find critical bugs
- Validate core flows
- Measure crash-free rate
- Collect qualitative feedback

Recruitment:
- Email personal network
- Post in Discord
- Ask for referrals
- Target: Tech-savvy philosophers

Testing Plan:
- Create debate flow
- Submit arguments
- View AI judgment
- Check leaderboard
- Test on iPhone 11, 13, 15

Metrics:
- Crashes per session
- Feature completion rate
- Session length
- "Would you use this app?" (5-point scale)
```

### Phase 2: Open Beta (500-1000 testers)
```
Duration: 3-4 weeks
Audience: Public via TestFlight link

Goals:
- Scale from 100 to 1000 users
- Identify edge cases
- Measure market fit
- Generate testimonials

Distribution:
- Public TestFlight link in:
  * r/philosophy
  * r/stoicism
  * Philosophy Discord servers
  * Twitter/X mentions
  * LinkedIn posts (to academics)
  * Philosophy newsletter sign-ups
  * Email to philosophy professors

Incentives:
- "Help shape the future of philosophical debate"
- Early access to new features (beta label)
- Mention in launch credits
- Exclusive "Beta Tester" badge

Feedback Collection:
- In-app feedback form (modified)
- Weekly surveys (5 questions)
- Focus groups (video calls with 10-20 engaged testers)
- Bug reporting (easy one-click)

Success Metrics:
- > 4.5 star rating in TestFlight
- < 2% crash rate
- > 50% 7-day retention
- > 20 qualitative testimonials
```

## 5.3 Market Positioning

### Target Audience Segments

```
Primary (Launch Focus):
1. Philosophy Students (18-25)
   - Location: US colleges, universities
   - Motivation: Intellectual engagement, grades
   - Channels: University email lists, Facebook groups
   - Message: "Debate your way to better grades"

2. Philosophy Hobbyists (25-45)
   - Location: Global (US 40%, EU 30%, Rest 30%)
   - Motivation: Intellectual curiosity, community
   - Channels: Reddit, Twitter/X, Discord
   - Message: "Find your philosophical tribe"

3. Educators (30+)
   - Location: Academic institutions
   - Motivation: Student engagement tool
   - Channels: LinkedIn, academic conferences
   - Message: "Bring Socratic dialogue to your classroom"

Secondary (Phase 2):
4. Professional Development (35-65)
   - Location: Corporate, consulting
   - Motivation: Critical thinking, communication
   - Channels: LinkedIn, professional podcasts
   - Message: "Sharpen your reasoning at scale"

5. Spiritual/Self-Improvement (25-55)
   - Location: Global (wellness apps crossover)
   - Motivation: Personal growth, mindfulness
   - Channels: App Store lifestyle category
   - Message: "Philosophical meditation in action"
```

### Marketing Channels & Messaging

```
REDDIT (High Priority)
├─ r/philosophy (120K members)
│  Message: "New app for philosophical debate - just launched"
│  Post Type: Screenshot + 3-sentence pitch
│  Tone: Genuine, not spammy
│  Posting: 1-2 times only (launch + follow-up)
│
├─ r/stoicism (80K members)
│  Message: "Explore Stoic philosophy in live debates"
│  Specific to subreddit (not generic)
│
└─ r/existentialism, r/ethics (10-30K members)
   Message: Tailored to subreddit interests
   Post once per subreddit

TWITTER/X (High Priority)
├─ Tweet 1: "We just launched WONDER on the App Store"
│  Link + screenshot + 280 characters
│
├─ Tweet 2: Thread explaining core features
│  1. Create debate
│  2. Argue your position
│  3. AI judges fairly
│  4. Build reputation
│
├─ Tag: Philosophy accounts, education accounts, AI accounts
│
└─ Hashtags: #philosophy #debate #ai #education

LINKEDIN (Medium Priority - Educators)
├─ Post: "Teachers: Bring Socratic dialogue to your classroom"
│  Target: Philosophy professors, educational institutions
│  Format: Article or carousel post
│  CTA: "Download the app, use in your next class"

DISCORD (Medium Priority - Community)
├─ Philosophy Discords:
│  - List: https://disboard.org (search "philosophy")
│  - Post: Announcement in announcements channel only
│  - Message: Authentic, helpful, link in bio
│
└─ Educational Discords:
   - University servers
   - Study group servers
   - Post with permission

EMAIL (Low Volume, High Value)
├─ Philosophy professors (research via ACE database)
│  Subject: "Free platform for your students' debates"
│  Body: How WONDER adds value to their courses
│
├─ Philosophy newsletter authors
│  Pitch: "Share WONDER with your audience"
│  Ask: Mention in newsletter (no paid promotion)
│
└─ Early beta testers
   Email: Exclusive launch day access, launch link
   Message: "You helped build this. Here's the App Store link."

PAID (Only if budget allows)
├─ Apple Search Ads
│  Keywords: "philosophy app", "debate app", "thinking app"
│  Budget: $500-1000 initially
│  CPC: ~$0.15-0.50
│  Target: First 30 days (awareness)
│
└─ Subreddits (premium ads)
   r/philosophy: Targeted ad placement
   Budget: $200-500
   Discount: Use "first time advertiser" coupon
```

## 5.4 Launch Day Plan

### 24 Hours Before Launch
```
☐ Final QA checks on App Store listing
☐ Notify beta testers: "App launches tomorrow!"
☐ Schedule launch day social media posts
☐ Prepare launch-day responses to comments/questions
☐ Ensure support email is monitored
☐ Brief any team members on handling inbound
☐ Set up crash monitoring (Sentry, Firebase Crashlytics)
☐ Set up analytics dashboard (Firebase, Amplitude)
```

### Launch Day
```
6:00 AM:
☐ Verify app is live in App Store
  - Search "WONDER"
  - Download test on device
  - Verify all core functions work

7:00 AM:
☐ Post launch announcement on social media
  - Reddit: r/philosophy, r/stoicism, etc.
  - Twitter: Launch tweet + thread
  - LinkedIn: Article about mission
  - Discord: Brief mention in philosophy servers

8:00 AM:
☐ Monitor:
  - Crash reports (should see some early installs)
  - Reviews (respond to first reviews immediately)
  - Social media comments/questions
  - Email inbox for support requests

Throughout Day:
☐ Respond to every comment/question (first 24h is critical)
☐ Thank people for downloads
☐ Address bugs or issues in real-time
☐ Share screenshots of positive feedback
☐ Monitor App Store ranking in search

Evening:
☐ Check metrics:
  - How many downloads in first 12 hours?
  - What's the initial rating?
  - Are there any critical issues?
  - User retention (sessions, time in app)

Post-Day Analysis:
☐ Review first 50 reviews carefully
☐ Identify patterns (what users love/hate)
☐ Note any bugs or issues
☐ Plan Day 2 updates if needed
```

### First Week Metrics to Monitor
```
Download Velocity:
- Target: 100+ downloads on day 1
- Target: 50-100 per day for week 1
- Target: Growing trend (not declining)

App Store Ranking:
- Target: Top 200 in Utilities (US)
- Target: Top 100 in Education (US)
- Monitor: Keyword ranking for "philosophy"

User Engagement:
- Target: > 40% 1-day retention
- Target: > 20% 7-day retention
- Monitor: Session length, debates created, completion rate

Ratings & Reviews:
- Target: > 4.3 star average (after 20+ reviews)
- Monitor: Review sentiment, bug reports
- Action: Respond to every review (first month)

Technical Health:
- Target: < 1% crash rate
- Target: < 5 second app launch time
- Monitor: Crash logs, performance metrics
```

---

# PART 6: POST-LAUNCH OPERATIONS

## 6.1 Review Response Strategy

### Response Time Targets
```
1-Star Reviews:  < 24 hours (most urgent)
2-Star Reviews:  < 24-48 hours
3-Star Reviews:  < 48 hours
4-5 Star Reviews: < 72 hours (not urgent, but acknowledge)

Response Rate Target: 90%+ of reviews (especially first month)
```

### Review Response Templates

#### For Crash/Bug Reports (1-2 star)
```
TEMPLATE: Crash/Bug Acknowledgment

"Thank you for reporting this! We're sorry you had a crash. 
We've identified the issue and have a fix ready for the next 
update (launching in 2-3 days). Please try updating when it's 
available. If you continue to experience issues, please email 
support@wonder.app with your device model. We appreciate your 
patience!"

Key Elements:
✓ Acknowledge the problem
✓ Specific timeline ("2-3 days")
✓ Actionable solution (update)
✓ Backup solution (email support)
✓ Thank them
```

#### For Feature Requests (3-4 star)
```
TEMPLATE: Feature Request Response

"Great idea! We love that you're thinking about how to make 
WONDER even better. Your suggestion about [specific feature] 
is noted and we'll discuss it with the team. You can also 
submit feature ideas through Settings > Feedback. Thanks for 
using WONDER!"

Key Elements:
✓ Validate the suggestion
✓ Show you read their specific feedback
✓ Concrete next step
✓ Alternative feedback channel
```

#### For Missing Features (2-3 star)
```
TEMPLATE: Not-Yet-Available Feature

"Thanks for trying WONDER! We know you'd love to see [feature]. 
This is on our roadmap—here's what's coming soon: [brief list]. 
In the meantime, [workaround if available]. We're building 
WONDER together with our community!"

Key Elements:
✓ Acknowledge what's missing
✓ Show roadmap is active
✓ Provide workaround
✓ Invite continued participation
```

#### For Positive Reviews (4-5 star)
```
TEMPLATE: Thank You Response

"Thank you so much! We're thrilled you're enjoying WONDER. 
Your feedback means everything to us. Keep spreading the word 
about philosophical debate—help us grow the community!"

Key Elements:
✓ Genuine thanks
✓ Brief & personal
✓ Invite sharing
✓ Call to action (optional)
```

#### For Community/Moderation Feedback (Any rating)
```
TEMPLATE: Community Standards

"Thanks for your feedback on how we handle the community. 
Our moderation approach is [transparency, fairness, education]. 
If you have concerns about specific content, please use the 
Report button in the app or email support@wonder.app. We 
review all reports within 24 hours."

Key Elements:
✓ Explain your moderation philosophy
✓ Direct to proper channels
✓ Set expectations (24-hour SLA)
```

## 6.2 Update Cadence & Release Schedule

### First 30 Days (Aggressive)
```
Goal: Fix bugs, address crash reports, show momentum

Week 1:
- Day 1: Launch
- Day 3-4: Patch (if critical bugs found)
- Day 5: Minor update (UI polish, small fixes)

Week 2:
- Day 8: Patch (address review feedback)
- Day 10-12: Feature update (show progress)

Week 3-4:
- Day 15: Update (moderation improvements, community feedback)
- Day 22: Update (performance optimization, new feature)
- Day 28: Update (address long-standing requests)

Communication:
- In-app notification for each update
- Version notes: What's new + what's fixed
- Social media announcements (highlight features)
```

### Ongoing Schedule (Sustainable)
```
Goal: Regular improvement without burnout

Typical Pattern:
- Bi-weekly updates (every 2 weeks)
- Alternating: Feature + Polish updates
- Monthly: Major feature release

Update Types:
1. Bug Fixes (weekly releases if needed)
2. Performance (every 4 weeks)
3. Features (every 2-3 weeks)
4. Community Feedback (continuous improvement)

Versioning Scheme:
- Major.Minor.Patch (1.0.0, 1.1.0, 1.1.1)
- Major: Significant feature sets (2-3x per year)
- Minor: New features (every 2-3 weeks)
- Patch: Bug fixes (as needed, weekly)

Release Communications:
- In-app notes (What's New section)
- Social media (Twitter, Reddit)
- Email to engaged users (optional)
- App Store description (always up to date)
```

## 6.3 Analytics & KPIs

### Key Metrics to Track

```
Acquisition:
📊 Daily Downloads
   - Target Week 1: 100+
   - Target Week 2-4: 50-75/day
   - Target Month 2: 30-50/day
   
📊 Install Sources
   - App Store Search: 60%+
   - Direct (links): 20%
   - Organic (word of mouth): 10%
   - Paid ads: 10%

📊 Cost Per Install (if running ads)
   - Target: < $2 per install
   - Monitor: ROAS (revenue per acquisition)

Engagement:
📊 Daily Active Users (DAU)
   - Target Week 1: 30-40%
   - Target Week 2-4: 20-30%
   - Target Month 3: 15-25%

📊 Session Length
   - Target: 10+ minutes average
   - Monitor: Time to first debate

📊 Feature Usage
   - % Creating debates
   - % Submitting arguments
   - % Viewing judgments
   - % Checking leaderboard
   - Target: > 60% complete first debate

Retention:
📊 1-Day Retention
   - Target: > 40%
   - Benchmark: Social apps avg 30%

📊 7-Day Retention
   - Target: > 20%
   - Benchmark: Social apps avg 15%

📊 30-Day Retention
   - Target: > 10%
   - Benchmark: Social apps avg 5%

📊 Churn Rate
   - Target: < 5% per week
   - Monitor: Weekly uninstalls

Revenue (if applicable):
📊 Average Revenue Per User (ARPU)
   - Track if monetization added
   - Monitor: $ per active user

Quality:
📊 Crash-Free Users
   - Target: > 99%
   - Monitor: Daily

📊 Average Rating
   - Target: > 4.3 stars
   - Monitor: Review trends

📊 App Store Ranking
   - Track: Category rankings
   - Monitor: Keyword positions
   - Target: Top 100 in Education

Community:
📊 Debates Created
   - Target: 50+ per day (Week 1)
   - Monitor: Growth trend

📊 Arguments Submitted
   - Target: 100+ per day (Week 1)
   - Monitor: Engagement depth

📊 Moderation Reports
   - Target: < 5% of content reported
   - Monitor: Report reasons
   - Action: High report % = moderation issue

📊 User Retention (not just sessions)
   - Track: % of users active week 2, week 4, etc.
   - Monitor: Cohort analysis
```

### Dashboard Setup

```
Recommended Tools:
1. Firebase Analytics (free, built-in)
   - Track all default metrics
   - Custom events (create debate, submit arg, etc.)
   - User properties (philosophy interest, etc.)

2. App Store Connect Analytics (free, provided by Apple)
   - Downloads, updates, deletions
   - Ratings & reviews
   - Impressions & conversion

3. Crash Monitoring: Sentry or Firebase Crashlytics (free tier)
   - All crashes tracked
   - Stack traces for debugging
   - Alerts for new crash types

4. Advanced Analytics (optional):
   - Amplitude
   - Mixpanel
   - Flurry Analytics
   - Usually requires custom implementation

Custom Dashboard (recommended):
- Weekly metrics report
- Auto-generated by script
- Emailed to team
- Includes: Week-over-week changes, goals vs. actuals
```

## 6.4 Growth Roadmap (Post-Launch)

### Month 1: Foundation
```
Goal: Achieve product-market fit, fix critical issues

Focus:
- Monitor crashes obsessively
- Respond to every review
- Fix moderation issues
- Optimize onboarding (make first debate easy)
- Build community (Reddit engagement, Twitter)

Success Metric:
- 1000+ users by end of Month 1
- > 4.3 star rating
- < 1% crash rate
- 15%+ 7-day retention
```

### Month 2-3: Growth
```
Goal: Double user base, establish community

Initiatives:
- Influencer outreach (philosophy YouTubers)
- Paid ads (Apple Search Ads)
- Content marketing (blog about app launch)
- Community challenges (debate competitions)
- Partner with philosophy professors (education)

Success Metric:
- 3000+ total users
- 30%+ DAU/MAU ratio
- Regular "top debate" highlights
- 5+ philosophy educator partnerships
```

### Month 4-6: Scale
```
Goal: Establish WONDER as primary philosophy platform

Initiatives:
- Premium features (optional, revenue)
- Mobile web version (PWA)
- Desktop web app (full feature parity)
- API for integrations (Zapier, etc.)
- Philosophy course partnerships

Success Metric:
- 10,000+ users
- Sustainable DAU growth
- User-generated moderation (community mods)
- First PR/press mentions
```

### Month 7-12: Expansion
```
Goal: International growth, feature expansion

Initiatives:
- Localization (Spanish, French, German, Mandarin)
- International marketing
- Major feature releases (groups, events, etc.)
- Educational partnerships
- Android version (if iOS successful)

Success Metric:
- 50,000+ users
- 20%+ international users
- 100+ educator accounts
- Press coverage in education publications
```

---

# PART 7: SUBMISSION CHECKLIST

## 7.1 Complete Submission Checklist

```
APP INFORMATION:
☐ App name: WONDER
☐ Subtitle: Deep Philosophical Debates
☐ Bundle ID: com.wonder.app
☐ Version: 1.0.0
☐ Build: 1
☐ Primary language: English
☐ Category: Education OR Social Networking
☐ Content rating: 12+
☐ Keywords: philosophy,debate,discussion,socratic,ethics,metaphysics,thinking,dialogue,ideas,wisdom

CAPABILITIES:
☐ Push Notifications: OFF (for now)
☐ Sign In with Apple: OFF (unless OAuth enabled)
☐ Internet: ON
☐ Entitlements: Review in Xcode settings

APP PRIVACY:
☐ Complete privacy nutrition label:
  - Data collected: Email, username, profile info, debates, arguments
  - Linked to user: Yes
  - Purpose: Provide service, moderation
  - Third-party: Supabase (declared), Gemini API (declared)
  - Delete: User can delete account
  - Tracking: Not used
  - Declare crypto (likely exempt)

SCREENSHOTS & PREVIEW:
☐ Screenshots (5-10): Create, Submit, Judge, Discuss, Progress
☐ Preview video (30s): Feature demo + CTA
☐ App icon (1024x1024): High quality
☐ All assets tested at various sizes

DESCRIPTION:
☐ 4000 character description (see Section 3.2)
☐ What's New (first release): Copy of features
☐ Support URL: https://wonder.app/support
☐ Privacy Policy URL: https://wonder.app/privacy
☐ Terms & Conditions: https://wonder.app/terms
☐ Marketing URL: https://wonder.app (optional)

RATINGS & REVIEW:
☐ Age rating questionnaire completed
  - No medical claims
  - No graphic violence
  - No copyrighted content
  - No inappropriate user content
  - No excessive ads
  - No commercial transaction (unless IAP added)

RIGHTS & CERTIFICATION:
☐ Agree to Apple's terms
☐ Check: App does not contain prohibited content
☐ Certify: Rights to use all assets
☐ Confirmed: GDPR, privacy laws compliance

BUILD:
☐ Xcode 16 or later
☐ iOS 18 SDK
☐ Minimum deployment: iOS 15.0
☐ 64-bit only
☐ Signing certificate: Distribution
☐ Provisioning profile: App Store distribution
☐ Code signing verified
☐ No debug symbols in release build

TESTING:
☐ Build on actual device (iPhone 15 or similar)
☐ All core features tested:
  - Sign up / Log in
  - Create debate
  - Submit argument
  - View AI judgment
  - View leaderboard
  - View profile
  - Edit settings
  - Submit feedback
  - Report content (moderation)
  
☐ No crashes on:
  - Cold start
  - Hot start
  - Background/foreground transitions
  - Network interruptions
  - Low memory conditions

☐ Performance tested:
  - App launch < 20 seconds
  - Average memory < 500 MB
  - No excessive battery drain
  - Responsive UI (no freezes)

☐ Accessibility:
  - VoiceOver compatible
  - Dynamic Type (size adjustments)
  - Color contrast ratio > 4.5:1
  - No UI elements smaller than 44x44 points

PRIVACY & LEGAL:
☐ Privacy Policy:
  - Data collection explained
  - User rights listed
  - Deletion process clear
  - Contact email present
  - Third-party services disclosed

☐ Terms of Service:
  - User conduct rules (good faith, respectful)
  - Content ownership (users own, WONDER licenses)
  - Moderation policy (reporting, blocking, appeals)
  - Limitations of liability
  - Contact for support

MODERATION FEATURES:
☐ Content reporting button visible
☐ User blocking works
☐ Report reason options present
☐ Success message after report
☐ Moderator dashboard accessible (admin accounts)
☐ Test moderation flow end-to-end

FINAL REVIEW:
☐ No placeholder text in app
☐ No TODO/FIXME comments visible
☐ All images optimized for performance
☐ URLs correct (no staging URLs)
☐ Copy proofread (no typos)
☐ Links tested (privacy policy, terms, support)
☐ Feature flags: All production enabled
☐ API endpoints: All production URLs
☐ Environment variables: All set correctly
```

## 7.2 Common Rejection Scenarios & Responses

### Scenario 1: Content Moderation Concerns
```
Possible Rejection:
"We found that your app facilitates user-generated content 
but lacks adequate moderation mechanisms. Guideline 1.2 requires 
filtering, reporting, blocking, and contact info."

Response:
"Thank you for the feedback. We've implemented comprehensive 
moderation features:

1. Content Filtering: All content is checked by our AI 
   moderation system before posting.
2. Reporting: Users can report content with the Report button 
   visible on every argument (attached screenshot).
3. Blocking: Users can block other users (Settings > Blocked 
   Users section, attached screenshot).
4. Contact: Support email listed at support@wonder.app and 
   visible in Privacy Policy.

We're committed to maintaining a respectful, intellectually 
honest community. Attached are detailed screenshots showing 
these features in action. We're ready for resubmission."

Attachments:
- Screenshot: Report button
- Screenshot: Block user UI
- Screenshot: Moderation dashboard
- Explanation of content moderation strategy
```

### Scenario 2: Sign In with Apple Required
```
Possible Rejection:
"Your app uses third-party authentication (Google/Facebook) 
but does not offer Sign In with Apple. Per Guideline 4.2.1, 
you must offer Apple authentication."

Response:
"Thank you for the feedback. We've implemented Sign In with Apple 
as the primary authentication method. Users now have the option to:

1. Sign in with Apple ID (new - meets guideline)
2. Continue with email/password
3. [Third-party] (if we had it)

This ensures user privacy and compliance with App Review 
Guidelines. The updated build is ready for submission."

Action Required:
- Implement Sign In with Apple SDK
- Test on TestFlight
- Resubmit new build
```

### Scenario 3: App Completeness Issues
```
Possible Rejection:
"We found that the app crashed when [specific action]. 
Please ensure the app is fully functional before submission."

Response:
"Thank you for identifying this issue. We've fixed the crash 
that occurred when [action]. Root cause was [brief explanation]. 

The fix has been tested thoroughly on [list of devices]. We've 
included the updated build [version X.X.X] for your review. 
We're confident it's now stable."

Action Required:
- Fix the crash (reproduce, identify root cause, test fix)
- Resubmit with new build
- Consider adding try/catch or defensive programming
```

### Scenario 4: Misleading Description
```
Possible Rejection:
"Your app description claims [feature] but we could not 
verify this functionality during review."

Response:
"Thank you for the feedback. We've clarified the description 
to accurately reflect [feature status]:

Previous: '[Misleading text]'
Updated: '[Accurate description]'

The feature [is/will be] available [explain status]. 
We apologize for the confusion and have updated the description 
for clarity."

Action Required:
- Review all marketing copy for accuracy
- Resubmit updated description
- Avoid superlatives without proof ("best", "top", etc.)
```

---

# PART 8: PRIVACY & LEGAL COMPLIANCE

## 8.1 GDPR Compliance (for European users)

```
Requirements:
☐ Legal basis for data processing (Legitimate interest: provide platform)
☐ Data Processing Agreement with Supabase
☐ Data retention policy (e.g., delete after 2 years inactivity)
☐ Right to be forgotten (delete all user data on request)
☐ Data breach notification procedure
☐ Privacy impact assessment (if processing sensitive data)

Implementation:
1. User rights page (Settings > Data Rights)
   - Request data export
   - Request account deletion
   - Opt-out of analytics
   - View data collection

2. Privacy Policy updates
   - Legal basis for processing
   - Data retention timeline
   - User rights procedures
   - Contact DPO (if applicable)

3. Cookies/Tracking (if used)
   - Explicitly ask permission
   - Allow opt-out
   - Document purpose
   
Status for WONDER:
✓ Supabase is GDPR compliant (European data centers available)
✓ Gemini API: Review data processing terms
→ Action: Review and update Privacy Policy with legal counsel
```

## 8.2 CCPA Compliance (California users)

```
Requirements (if applicable to your user base):
☐ Privacy Policy: Disclose data collection
☐ User rights: Access, deletion, opt-out
☐ Do Not Track: Honor CCPA opt-out requests
☐ Non-discrimination: Don't penalize users for exercising rights

Implementation:
1. Privacy Policy: Include CCPA section
2. "Do Not Sell My Personal Information" link (if selling data)
   - WONDER doesn't sell data, but must state this clearly

Status for WONDER:
✓ WONDER does not sell personal data
✓ No third-party data brokers
→ Action: Clearly state "We don't sell your data" in Privacy Policy
```

## 8.3 Child Safety (COPPA - if allowing under-13 users)

```
Requirements:
☐ Don't allow children under 13 (recommended)
☐ If you do:
  - Parental consent required
  - No data collection from children
  - No behavioral advertising
  - Age verification at signup

WONDER's Approach:
✓ Set minimum age to 13
✓ Age verification at signup (birthdate)
✓ App rated for 12+ (philosophical content)
✓ No direct targeting of children
✓ No excessive ads or monetization

Implementation:
- Signup flow: "You must be 13+ to use WONDER"
- Parents section (optional, for education use)
- Clear consent mechanism
```

---

# PART 9: CRISIS MANAGEMENT & ESCALATION

## 9.1 Handling Bad Press or Negative Feedback

### If App Gets Bad Review (Multiple 1-Stars)
```
Response Protocol:

1. ASSESS (Within 2 hours):
   - Read all negative reviews
   - Identify common complaints
   - Determine if it's a bug or feature request
   - Decide: Quick fix, medium fix, or acknowledgment only

2. RESPOND (Within 24 hours):
   - Reply to each 1-star review
   - Acknowledge legitimate concerns
   - Explain what's coming
   - Offer workarounds if available
   - Examples in Section 6.1

3. FIX (If applicable):
   - If it's a bug: Prioritize immediately
   - If it's a feature: Add to roadmap
   - Communicate timeline (e.g., "Fixed in next week's update")

4. FOLLOW UP:
   - After fix is released: Re-engage reviewers
   - Example: "We've fixed the issue you reported. 
     Please try the new version and let us know!"
   - Hope: They update their review (5-star conversion)
```

### If App Gets Removed/Rejected After Launch
```
Worst-Case Scenario: Apple removes app from App Store

Possible Reasons:
1. Moderation failure (content slips through)
2. Legal violation (copyright, trademark)
3. Security issue (data breach)
4. Misleading app store listing
5. Violates specific guideline (undiscovered during review)

Response Protocol:

1. CONTACT Apple Support:
   - Email: appstorereview@apple.com
   - Phone: (833) 712-0042
   - Get specific removal reason

2. UNDERSTAND The Issue:
   - Read removal reason carefully
   - Don't argue—ask clarifying questions
   - Example: "Could you point to the specific content that violates [guideline]?"

3. FIX The Issue:
   - If content moderation: Improve moderation systems
   - If legal: Consult lawyer, fix violation
   - If guideline: Update app/description to comply

4. RESUBMIT:
   - Include explanation of fix
   - Show evidence of improvement
   - Be humble, professional, solution-focused
   - Example: "We've reviewed the issue and made the following changes..."

5. COMMUNICATE with Users:
   - In-app message: "We're working on an update..."
   - No need to mention removal (users may not know)
   - Be transparent but not alarmist
```

---

# PART 10: LAUNCH CHECKLIST (FINAL)

## 10.1 Final Pre-Launch Verification

**Run through this list 24 hours before submission:**

```
TECHNICAL:
☐ Xcode build: Clean build, no warnings
☐ Code signing: Distribution certificate verified
☐ Provisioning profile: Active, not expiring soon
☐ Version & build: Incremented correctly
☐ Environment variables: All production URLs
☐ API keys: Correct (Supabase, Gemini)
☐ Analytics: Enabled, dashboard ready

APP STORE CONNECT:
☐ App name & subtitle: Final
☐ Keywords: Optimized
☐ Description: Proofread, final
☐ Screenshots: 5+ uploaded, proper dimensions
☐ Preview video: Uploaded, correct format
☐ App icon: 1024x1024, proper format
☐ Privacy policy: URL works, content complete
☐ Terms of service: URL works, content complete
☐ Support email: Correct, monitored
☐ Age rating: Set to 12+

FEATURE VERIFICATION:
☐ Create debate: Works end-to-end
☐ Submit argument: Works
☐ AI judgment: Returns results
☐ View leaderboard: Displays correctly
☐ Moderation: Report button works
☐ User profile: Edit works
☐ Settings: All options functional
☐ Feedback: Can submit (redirects properly)

SECURITY:
☐ No API keys in code
☐ HTTPS everywhere (Supabase confirmed)
☐ Certificate validation enabled
☐ SSL pinning (optional): Configured if needed
☐ No sensitive logs in console

PERFORMANCE:
☐ Launch time: < 20 seconds on iPhone 11
☐ Memory: < 500 MB on average
☐ Crashes: Run Xcode crash debugger (simulated)
☐ Network: Works on simulated 3G connection

ACCESSIBILITY:
☐ VoiceOver: Test basic navigation
☐ Dynamic Type: Test at 100%, 150%, 200%
☐ Color contrast: Verify (use Color Contrast Analyzer)
☐ Touch targets: All buttons 44x44 minimum

INTERNATIONAL:
☐ Language: English (US)
☐ Strings: No hardcoded text (all localized)
☐ Numbers/dates: Use Locale formatting
☐ RTL languages: Not needed for launch

TEAM COORDINATION:
☐ Notify team: "Launching tomorrow"
☐ Support person assigned: Monitor emails
☐ Social media posts: Scheduled or ready
☐ Marketing copy: Proofread and approved
☐ Feedback form: Ready to accept community feedback
☐ Analytics: Dashboard created, alerts set up
```

---

# CONCLUSION

WONDER is positioned to be the premier platform for philosophical dialogue. By following this playbook:

1. **Technical Requirements Met:** iOS 18 SDK, Xcode 16, proper security
2. **Compliance Achieved:** Guideline 1.2 (UGC) fully implemented
3. **Market Position Strong:** Niche but passionate audience
4. **Launch Strategy Clear:** TestFlight → Launch → Growth
5. **Sustainability Plan:** Regular updates, community engagement

## Key Success Factors

- **Launch Week:** Fix bugs immediately, respond to every review
- **Month 1-2:** Build community, reach 3000+ users, 4.3+ rating
- **Ongoing:** Quarterly major features, monthly smaller updates, active moderation

## Timeline Summary

```
NOW:              Begin prep (PART 1-3)
T-8 Weeks:        Beta development complete
T-4 Weeks:        TestFlight beta (PART 5.2)
T-2 Weeks:        Final polish, submission prep
T-0 (Launch):     Submit to App Store
T+1 Day:          App goes live (hopefully)
T+30 Days:        Monitor metrics, fix issues
T+90 Days:        Major feature release
T+6 Months:       Evaluate expansion (Android, international)
```

Good luck with WONDER's App Store launch! 

**For questions:**
- Review Apple's App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Check app-specific requirements in App Store Connect
- Contact: appstorereview@apple.com

---

**Document Version:** 1.0
**Last Updated:** November 2025
**Next Review:** Upon major feature release or guideline changes

