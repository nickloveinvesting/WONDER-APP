# Ponder - Ponder Together

A philosophical conversation platform where curious minds explore ideas together—from casual questions to deep debates. Built with Next.js 15, Supabase, and Gemini AI.

## Features

- **Philosophical Conversations**: Engage in multi-round discussions on ethics, AI, existence, and more
- **AI Facilitation**: Gemini 2.5 Flash helps synthesize key points and areas of agreement
- **Multiple Perspectives**: Share and explore diverse viewpoints collaboratively
- **Fact Checking**: AI-powered fact checking for claims in conversations
- **Community**: Connect with curious thinkers in meaningful dialogue

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **AI**: Google Gemini 2.5 Flash
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Google AI Studio API key (for Gemini)
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nickloveinvesting/ponder-app.git
cd ponder-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

4. Run Supabase migrations:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the content from `supabase/migrations/20250113_init.sql`
   - Execute the query

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

- **profiles**: User profiles with influence scores and interests
- **conversations**: Conversation topics and status
- **conversation_messages**: Individual perspectives in conversations
- **message_feedback**: Community signals and AI synthesis

## How It Works

1. User starts a conversation on any philosophical topic
2. Multiple participants join to share perspectives
3. All contribute multiple rounds of thoughtful dialogue
4. Optionally request AI synthesis to:
   - Summarize key points from all contributors
   - Identify areas of agreement and productive disagreements
   - Highlight unresolved questions
5. Build influence through thoughtful participation and collaboration
6. Explore ideas from casual questions to rigorous debates

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Or use the Vercel CLI:
```bash
vercel --prod
```

## Project Structure

```
app/
├── api/synthesize/     # AI synthesis API endpoint
├── auth/               # Authentication pages (login/signup)
├── (authenticated)/
│   ├── debates/        # Conversation pages (list, create, detail)
│   ├── discuss/        # Perspective sharing
│   ├── leaderboard/    # Contributors page
│   └── profile/        # User profiles
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Home page

lib/
├── supabase/           # Supabase client utilities
├── gemini.ts           # Gemini AI integration
└── database.types.ts   # Database TypeScript types

supabase/
└── migrations/         # Database migration files
```

## Brand Colors

- Primary: Teal-500 (#14b8a6) - Thoughtful, collaborative
- Accent: Slate-700 (#334155) - Intellectual depth
- Background: Stone-50 to White gradient

## Contributing

This is an MVP. Contributions welcome!

## License

MIT

## Contact

For questions or feedback, open an issue on GitHub.

---

**Built with [Claude Code](https://claude.com/claude-code)**
