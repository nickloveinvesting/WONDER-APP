# PhiloDuel - Where Philosophy Comes Alive

A revolutionary philosophical social network where users engage in fair, AI-judged debates. Built with Next.js 15, Supabase, and Gemini AI.

## Features

- **Fair AI Judgment**: Gemini 2.5 Flash analyzes arguments based on logic, evidence, and rhetoric
- **Reputation System**: Win debates to earn points and climb the leaderboard
- **Real-time Debates**: Structured debate format with automatic AI judging
- **Fact Checking**: AI-powered fact checking for claims made in arguments
- **Community**: Connect with fellow philosophers in meaningful discourse

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
git clone https://github.com/nickloveinvesting/Philosophy-app.git
cd Philosophy-app
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

- **profiles**: User profiles with reputation scores
- **debates**: Debate topics and status
- **arguments**: Individual arguments in debates
- **judgments**: AI-generated judgments with scores and fact checks

## How It Works

1. User creates a debate topic
2. Another philosopher joins to argue FOR or AGAINST
3. Both submit their arguments (one round each)
4. Gemini AI judges based on:
   - Logic: Soundness of reasoning
   - Evidence: Quality and relevance of support
   - Rhetoric: Clarity and persuasiveness
5. Winner earns reputation points
6. AI provides detailed reasoning and fact checks

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
├── api/judge/          # AI judgment API endpoint
├── auth/               # Authentication pages (login/signup)
├── debates/            # Debate pages (list, create, detail)
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

- Primary: Indigo-600 (#3d5adb) - Wisdom, intellect
- Accent: Coral-500 (#ff6b47) - Competition, energy
- Background: Slate-900 gradient

## Contributing

This is an MVP. Contributions welcome!

## License

MIT

## Contact

For questions or feedback, open an issue on GitHub.

---

**Built with [Claude Code](https://claude.com/claude-code)**
