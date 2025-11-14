# ARGUED: Landing Page & Frontend Implementation Guide

**Version**: 1.0  
**Last Updated**: November 2025  
**Purpose**: Translate branding philosophy into actionable design patterns for landing page and frontend UI  
**Framework**: Next.js 15 + Tailwind CSS

---

## 1. COLOR IMPLEMENTATION

### Tailwind CSS Configuration

Add these colors to your `tailwindcss.config.ts`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'argued': {
          navy: '#1A3A52',        // Primary - trust, navigation, CTAs
          brown: '#8B6F47',       // Secondary - achievements, accents
          cream: '#F5F3F0',       // Background - warmth, readability
          black: '#1C1C1C',       // Text - authority, contrast
          gold: '#D4A574',        // Highlights - premium, hover states
          success: '#4A7C59',     // Victory, positive states
          error: '#C84C3C',       // Warnings, losses
          gray: '#6B7280',        // Disabled, secondary text
        }
      },
      backgroundColor: {
        'argued-cream': '#F5F3F0',
        'argued-navy': '#1A3A52',
      },
      textColor: {
        'argued-navy': '#1A3A52',
        'argued-black': '#1C1C1C',
        'argued-brown': '#8B6F47',
      }
    }
  }
}
```

### Global Styles (app/globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styling */
body {
  @apply bg-argued-cream text-argued-black font-sans;
}

/* Cream background everywhere */
html, body, #__next {
  @apply bg-argued-cream;
}

/* Links default styling */
a {
  @apply text-argued-navy hover:text-argued-brown transition-colors;
}

/* Form inputs */
input, textarea, select {
  @apply bg-white border-2 border-argued-navy rounded-lg;
}

/* Buttons (see component section) */
.btn-primary {
  @apply bg-argued-navy text-white px-4 py-2 rounded-lg hover:bg-argued-brown transition-colors;
}
```

---

## 2. LANDING PAGE STRUCTURE & LAYOUT

### Page Grid/Layout

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (cream bg, navy text)                           │
│  [Logo] [Nav: Home, Debates, Leaderboard] [Sign In]    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  HERO SECTION (large navy text on cream)               │
│  "Where Quality Arguments Matter"                       │
│  [Logo] - large speech bubble                          │
│  CTA: [Get Started] [Watch Demo]                      │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  VALUE PROPOSITION (3 columns, brown accents)          │
│  ┌─────────┬─────────┬─────────┐                       │
│  │ Icon    │ Icon    │ Icon    │                       │
│  │ Title   │ Title   │ Title   │  (navy text)          │
│  │ Desc    │ Desc    │ Desc    │  (black text)         │
│  └─────────┴─────────┴─────────┘                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  HOW IT WORKS (navy background accent section)         │
│  Step 1: Write Argument                                │
│  Step 2: AI Judges                                     │
│  Step 3: Earn Rating                                   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  SOCIAL PROOF (stats in brown/navy)                    │
│  [# Debates] [# Users] [# Topics]                     │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  CTA SECTION (navy background)                         │
│  "Ready to Argue?" [Sign Up Free] [Explore Debates]   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  FOOTER (navy background, cream text)                   │
│  [Logo] [Links] [Social] [Legal]                       │
└─────────────────────────────────────────────────────────┘
```

### Landing Page React Component Structure

```tsx
// app/page.tsx
export default function Home() {
  return (
    <main className="bg-argued-cream">
      {/* Header */}
      <Header />
      
      {/* Hero */}
      <section className="py-20 px-4">
        <HeroSection />
      </section>
      
      {/* Value Proposition */}
      <section className="py-16 px-4">
        <ValueProposition />
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 bg-argued-navy bg-opacity-5">
        <HowItWorks />
      </section>
      
      {/* Social Proof */}
      <section className="py-12 px-4">
        <SocialProof />
      </section>
      
      {/* CTA */}
      <section className="py-20 px-4 bg-argued-navy">
        <CTASection />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
```

---

## 3. COMPONENT DESIGN PATTERNS

### Header/Navigation

```tsx
// components/Header.tsx
export function Header() {
  return (
    <header className="bg-argued-cream border-b-2 border-argued-navy sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/argued-black-logo.png" alt="ARGUED" className="h-10" />
          <span className="text-argued-navy font-bold text-xl hidden sm:inline">ARGUED</span>
        </div>
        
        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-argued-navy font-medium">
          <a href="/" className="hover:text-argued-brown transition">Home</a>
          <a href="/debates" className="hover:text-argued-brown transition">Debates</a>
          <a href="/leaderboard" className="hover:text-argued-brown transition">Leaderboard</a>
        </div>
        
        {/* CTA */}
        <div className="flex gap-4">
          <button className="text-argued-navy hover:text-argued-brown">Sign In</button>
          <button className="bg-argued-navy text-white px-4 py-2 rounded-lg hover:bg-argued-brown transition">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
```

### Primary Button

```tsx
// components/Button.tsx
export function Button({ 
  children, 
  variant = 'primary', // primary | secondary | outline
  ...props 
}) {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition-colors";
  
  const variants = {
    primary: "bg-argued-navy text-white hover:bg-argued-brown",
    secondary: "bg-argued-brown text-white hover:bg-argued-navy",
    outline: "border-2 border-argued-navy text-argued-navy hover:bg-argued-navy hover:text-white",
  };
  
  return (
    <button className={`${baseClass} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
```

### Card Component (for debates, profiles)

```tsx
// components/Card.tsx
export function Card({ children, highlight = false }) {
  return (
    <div className={`
      bg-white rounded-lg p-6 border-l-4
      ${highlight ? 'border-l-argued-brown shadow-lg' : 'border-l-argued-navy shadow-md'}
      hover:shadow-xl transition-shadow
    `}>
      {children}
    </div>
  );
}
```

### Badge Component (for achievements, ratings)

```tsx
// components/Badge.tsx
export function Badge({ label, value, type = 'default' }) {
  const colors = {
    default: 'bg-argued-navy text-white',
    achievement: 'bg-argued-brown text-white',
    rating: 'bg-argued-gold text-argued-black',
    success: 'bg-argued-success text-white',
    error: 'bg-argued-error text-white',
  };
  
  return (
    <div className={`${colors[type]} px-3 py-1 rounded-full text-sm font-medium`}>
      <span>{label}:</span> <strong>{value}</strong>
    </div>
  );
}
```

### Debate Card Component

```tsx
// components/DebateCard.tsx
export function DebateCard({ debate }) {
  return (
    <Card highlight={debate.featured}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-argued-navy">{debate.topic}</h3>
        <span className="text-sm text-argued-gray">{debate.participants} participants</span>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Badge label="FOR" value={debate.forVotes} type="default" />
        <Badge label="AGAINST" value={debate.againstVotes} type="default" />
      </div>
      
      <p className="text-argued-black mb-4">{debate.description}</p>
      
      <Button variant="primary">Join Debate</Button>
    </Card>
  );
}
```

### Leaderboard Row Component

```tsx
// components/LeaderboardRow.tsx
export function LeaderboardRow({ rank, user, rating, change }) {
  return (
    <div className="bg-white rounded-lg p-4 border-l-4 border-argued-navy flex justify-between items-center hover:bg-argued-cream transition">
      <div className="flex items-center gap-4">
        <span className="text-argued-brown font-bold text-lg w-8">#{rank}</span>
        <div>
          <p className="font-bold text-argued-navy">{user.name}</p>
          <p className="text-sm text-argued-gray">{user.debates} debates</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Badge label="DeLO" value={rating} type="rating" />
        <span className={`text-sm font-bold ${change > 0 ? 'text-argued-success' : 'text-argued-error'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}
        </span>
      </div>
    </div>
  );
}
```

---

## 4. FRONTEND NAVIGATION & PAGE STRUCTURE

### Main App Navigation (Post-Login)

```
┌─────────────────────────────────────┐
│ Header: ARGUED Logo | Nav | Profile │
├─────────────────────────────────────┤
│                                       │
│  SIDEBAR (left, collapsible)          │
│  ├─ Dashboard                         │
│  ├─ Debates                           │
│  │  ├─ Browse                         │
│  │  ├─ My Debates                     │
│  │  └─ Create New                     │
│  ├─ Leaderboard                       │
│  │  ├─ Global                         │
│  │  ├─ Schools of Thought             │
│  │  └─ Friends                        │
│  ├─ Profile                           │
│  │  ├─ My Stats                       │
│  │  ├─ Achievement Badges             │
│  │  └─ Settings                       │
│  └─ Community                         │
│                                       │
├─────────────────────────────────────┤
│                                       │
│  MAIN CONTENT AREA (cream bg)         │
│  (Changes based on selected nav)      │
│                                       │
│                                       │
│                                       │
└─────────────────────────────────────┘
```

### Sidebar Navigation Component

```tsx
// components/Sidebar.tsx
export function Sidebar({ activeRoute }) {
  const navItems = [
    { label: 'Dashboard', icon: '📊', href: '/app/dashboard' },
    { label: 'Debates', icon: '💬', href: '/app/debates' },
    { label: 'Leaderboard', icon: '🏆', href: '/app/leaderboard' },
    { label: 'Profile', icon: '👤', href: '/app/profile' },
    { label: 'Community', icon: '👥', href: '/app/community' },
  ];
  
  return (
    <aside className="w-64 bg-argued-navy text-white p-4 h-screen sticky top-0">
      <div className="mb-8">
        <img src="/argued-white-logo.png" alt="ARGUED" className="h-8 mb-2" />
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`
              block px-4 py-3 rounded-lg transition
              ${activeRoute === item.href 
                ? 'bg-argued-brown text-white' 
                : 'hover:bg-argued-brown text-white hover:bg-opacity-20'
              }
            `}
          >
            <span className="mr-2">{item.icon}</span> {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
```

---

## 5. KEY PAGE DESIGNS

### Dashboard Page Layout

```
┌─────────────────────────────────────────────┐
│ Welcome back, [User]! (navy text)          │
│ Your DeLO Rating: 1,280 ↑ 15 this week    │
│ Your Rank: #247 / 12,420 users            │
├─────────────────────────────────────────────┤
│                                              │
│ QUICK STATS (4-column grid)                │
│ ┌──────────┬──────────┬──────────┬──────┐  │
│ │Debates   │ Win Rate │Avg Score │Streak│  │
│ │24        │73%       │82/100    │12    │  │
│ └──────────┴──────────┴──────────┴──────┘  │
│                                              │
├─────────────────────────────────────────────┤
│                                              │
│ RECENT ACTIVITY (timeline)                 │
│ ✓ Won debate: Free Will vs Determinism    │
│ ✗ Lost debate: Utilitarianism Ethics      │
│ ✓ Earned badge: "First Victory"           │
│                                              │
├─────────────────────────────────────────────┤
│                                              │
│ NEXT DEBATE (featured card, brown accent)  │
│ [Featured debate with CTA]                 │
│                                              │
└─────────────────────────────────────────────┘
```

### Debates List Page

```
┌────────────────────────────────────┐
│ All Debates (filter: all/open/mine)│
│ [Search] [Sort: Recent/Popular]    │
├────────────────────────────────────┤
│                                     │
│ [Debate Card] (navy border-left)   │
│ Topic | 12 participants            │
│ Description...                     │
│ [Join Debate Button]               │
│                                     │
│ [Debate Card]                      │
│ [Debate Card]                      │
│ [Debate Card]                      │
│                                     │
│ [Pagination]                       │
│                                     │
└────────────────────────────────────┘
```

### Single Debate Page

```
┌──────────────────────────────────────────┐
│ DEBATE HEADER (navy background)          │
│ Topic: [Large Text]                      │
│ Status: Open | Created: 2 hours ago      │
│ Participants: 8                          │
├──────────────────────────────────────────┤
│                                           │
│ ARGUMENTS SECTION                        │
│ FOR (left column) | AGAINST (right col)  │
│                                           │
│ ┌──────────────────┐ ┌──────────────────┐│
│ │[Argument Card]   │ │[Argument Card]   ││
│ │Author: Jane      │ │Author: John      ││
│ │Score: 87/100     │ │Score: 82/100     ││
│ │                  │ │                  ││
│ │[Read Full]       │ │[Read Full]       ││
│ └──────────────────┘ └──────────────────┘│
│                                           │
│ [Your Argument Input Field]              │
│ [Submit Argument Button - navy]          │
│                                           │
├──────────────────────────────────────────┤
│                                           │
│ JUDGMENT RESULTS (if debate complete)    │
│ Winner: [User] (brown highlight)        │
│ Winning Score: 88/100                    │
│ Reasoning: [AI explanation]              │
│                                           │
│ Detailed Scores:                         │
│ Logic: [Bar chart - navy]                │
│ Evidence: [Bar chart - navy]             │
│ Rhetoric: [Bar chart - navy]             │
│                                           │
└──────────────────────────────────────────┘
```

### Leaderboard Page

```
┌──────────────────────────────────────────┐
│ LEADERBOARD                              │
│ [View: Global | Schools | Friends]       │
│ [Sort: Rating | Win Rate | Streak]       │
├──────────────────────────────────────────┤
│                                           │
│ #1 | Alice Smith   | DeLO: 2,450        │
│ #2 | Bob Johnson   | DeLO: 2,380        │
│ #3 | Charlie Brown | DeLO: 2,290        │
│ ...                                      │
│ #247 | YOU         | DeLO: 1,280  ↑15   │
│ ...                                      │
│ #12420 | Zoe Lee   | DeLO: 850          │
│                                           │
│ [Pagination]                             │
│                                           │
└──────────────────────────────────────────┘
```

### User Profile Page

```
┌──────────────────────────────────────────┐
│ PROFILE HEADER (navy gradient)           │
│ [Avatar] Name                            │
│ Joined: 3 months ago | 48 debates       │
├──────────────────────────────────────────┤
│                                           │
│ STATS (4-column grid)                    │
│ ┌──────────┬──────────┬──────────┐      │
│ │DeLO:1280 │Win: 73%  │Streak:12 │      │
│ └──────────┴──────────┴──────────┘      │
│                                           │
├──────────────────────────────────────────┤
│                                           │
│ ACHIEVEMENTS (badges in brown)           │
│ 🏆 First Victory | 🎯 Perfect Logic     │
│ 💬 100 Arguments | ⚡ 10 Win Streak     │
│                                           │
├──────────────────────────────────────────┤
│                                           │
│ RECENT DEBATES (timeline)                │
│ ✓ Won vs Alice | Free Will              │
│ ✗ Lost vs Bob  | Ethics                 │
│                                           │
└──────────────────────────────────────────┘
```

---

## 6. COLOR USAGE GUIDE BY COMPONENT

| Component | Primary Color | Secondary Color | Usage |
|-----------|---------------|-----------------|-------|
| **Button (Primary CTA)** | Navy #1A3A52 | Brown hover | "Sign Up", "Start Debate" |
| **Button (Secondary)** | Brown #8B6F47 | Navy hover | "Learn More", "Settings" |
| **Navigation** | Navy #1A3A52 | Gold hover | Header, Sidebar |
| **Links** | Navy #1A3A52 | Brown hover | In-text links |
| **Headers/Titles** | Navy #1A3A52 | - | Page titles, section headers |
| **Achievement Badges** | Brown #8B6F47 | Gold accents | Leaderboard, profile badges |
| **Success State** | Green #4A7C59 | - | Victory, completed actions |
| **Error/Warning** | Red #C84C3C | - | Lost debates, warnings |
| **Background** | Cream #F5F3F0 | - | Primary background |
| **Text** | Black #1C1C1C | Gray secondary | Body text |
| **Borders** | Navy #1A3A52 | - | Card borders, inputs |

---

## 7. RESPONSIVE DESIGN GUIDELINES

### Mobile (< 768px)

- Stack sidebar vertically (hamburger menu)
- Reduce padding to 16px
- Single-column layouts
- Larger touch targets (44px minimum)
- Smaller font sizes (14px body text)

```tsx
// Mobile-first pattern
<div className="px-4 md:px-6 lg:px-8">
  {/* Content scales up */}
</div>
```

### Tablet (768px - 1024px)

- Two-column layouts where appropriate
- Sidebar collapses to icons only
- Medium padding (20px)

### Desktop (> 1024px)

- Full three-column layouts
- Expanded sidebar with labels
- Comfortable spacing (24px+)

---

## 8. MICRO-INTERACTIONS & FEEDBACK

### Hover States

```css
/* Button hover */
.btn-primary:hover {
  @apply bg-argued-brown shadow-lg scale-105 transition-all;
}

/* Card hover */
.card:hover {
  @apply shadow-xl border-argued-brown;
}

/* Link hover */
a:hover {
  @apply underline text-argued-brown;
}
```

### Loading States

```tsx
export function LoadingSpinner() {
  return (
    <div className="animate-spin">
      <svg className="w-8 h-8 text-argued-navy" /* ... */ />
    </div>
  );
}
```

### Toast Notifications (Success/Error)

```tsx
export function Toast({ message, type = 'success' }) {
  const colors = {
    success: 'bg-argued-success',
    error: 'bg-argued-error',
  };
  
  return (
    <div className={`${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg`}>
      {message}
    </div>
  );
}
```

---

## 9. ACCESSIBILITY REQUIREMENTS

### Contrast Ratios

- Navy text on cream: 11.2:1 ✓ (exceeds 4.5:1 WCAG AA)
- Brown text on cream: 6.3:1 ✓ (exceeds 4.5:1)
- Navy buttons (white text): 10:1 ✓ (exceeds 4.5:1)

### Color-Blind Friendly

- Don't rely on color alone for status
- Use icons + color for victory (green ✓) and loss (red ✗)
- Use text labels in addition to badge colors

### Touch Targets

- Minimum 44px x 44px for buttons
- Adequate spacing between clickable elements

---

## 10. IMPLEMENTATION CHECKLIST

Before shipping:

- [ ] Tailwind config includes all argued-* color variables
- [ ] Global styles set cream background
- [ ] Header component uses black logo on cream
- [ ] Navigation uses navy with brown hover
- [ ] All buttons follow primary/secondary/outline patterns
- [ ] Card components have navy/brown left borders
- [ ] Badges use brown for achievements
- [ ] Leaderboard uses navy for rankings
- [ ] Mobile navigation collapses properly
- [ ] All contrast ratios > 4.5:1
- [ ] Touch targets 44px minimum
- [ ] Hover states smooth and visible
- [ ] Loading states use argued-navy spinner
- [ ] Error messages clear and helpful
- [ ] Success states use green + checkmark

---

## 11. EXAMPLE: Complete Debate Card Component

```tsx
// components/DebateCard.tsx - Full implementation
import { Badge } from './Badge';
import { Button } from './Button';

export function DebateCard({ 
  id,
  topic, 
  participants,
  forCount,
  againstCount,
  description,
  featured = false 
}) {
  return (
    <div className={`
      bg-white rounded-lg p-6 border-l-4 shadow-md
      hover:shadow-lg hover:border-l-argued-brown transition-all
      ${featured ? 'border-l-argued-brown' : 'border-l-argued-navy'}
    `}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-argued-navy flex-1">
          {topic}
        </h3>
        <span className="text-sm text-argued-gray whitespace-nowrap ml-2">
          {participants} participants
        </span>
      </div>
      
      {/* Position counters */}
      <div className="flex gap-2 mb-4">
        <Badge label="FOR" value={forCount} type="default" />
        <Badge label="AGAINST" value={againstCount} type="default" />
      </div>
      
      {/* Description */}
      <p className="text-argued-black text-sm mb-6 line-clamp-2">
        {description}
      </p>
      
      {/* CTA Button */}
      <Button 
        onClick={() => window.location.href = `/debates/${id}`}
        className="w-full"
      >
        Join Debate
      </Button>
    </div>
  );
}
```

---

## 12. DEPLOYMENT & TESTING

### Pre-Launch Testing

1. **Color Testing**
   - View on grayscale (accessibility)
   - Test on multiple devices
   - Verify contrast in natural light (mobile)

2. **Component Testing**
   - All buttons respond to clicks
   - Links navigate correctly
   - Forms validate and submit
   - Loading states display

3. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile Safari (iOS)
   - Chrome Mobile (Android)

4. **Performance**
   - Logo images optimized
   - CSS file size minimal
   - No layout shifts on load

---

**ARGUED Implementation Guide Ready for Development**

**Next Steps**:
1. Update `tailwind.config.ts` with color variables
2. Create component library following patterns above
3. Build landing page using page structure
4. Deploy to Vercel
5. Test on production URL
6. Gather user feedback on branding feel

---

*Last updated: November 2025*
*Ready for design hand-off to frontend team*