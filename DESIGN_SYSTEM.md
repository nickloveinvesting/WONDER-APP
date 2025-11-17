# ARGUED Design System

## Overview
This design system is based on the landing page redesign. All components should follow these patterns for visual consistency.

---

## 🎨 Color Palette

### Primary Colors
- **Teal (Actions/CTAs)**:
  - `teal-500`: Primary buttons, accents
  - `teal-600`: Primary button hover
  - `teal-50`: Light backgrounds, hover states
  - `teal-100`: Badges, tags
  - `teal-200`: Borders
  - `teal-300`: Tag borders
  - `teal-400`: Icons
  - `teal-700`: Dark tag text

### Neutral Colors
- **Slate (Content)**:
  - `slate-900`: Headlines, primary text
  - `slate-800`: Dark sections background
  - `slate-700`: Body text, secondary dark
  - `slate-600`: Secondary text
  - `slate-500`: Meta text, tertiary
  - `slate-400`: Disabled text
  - `slate-300`: Borders, secondary
  - `slate-200`: Light borders, dividers
  - `slate-100`: Light backgrounds

### Background Colors
- **Stone/White**:
  - `stone-50`: Subtle background tint
  - `white`: Primary background
  - Gradients: `from-stone-50 via-white to-stone-50`

---

## 📝 Typography

### Font Family
- **Plus Jakarta Sans** (from layout.tsx)

### Hierarchy

#### Headlines
```tsx
// Hero (H1)
className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-tight tracking-tight"

// Section Header (H2)
className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"

// Subsection (H3)
className="text-2xl font-black text-slate-900"

// Card Title
className="text-xl font-black text-slate-900"
```

#### Body Text
```tsx
// Hero description
className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-medium"

// Standard body
className="text-lg text-slate-600 leading-relaxed font-medium"

// Card description
className="text-sm text-slate-600 leading-relaxed"
```

#### Meta/Small Text
```tsx
// Labels
className="text-sm font-bold text-slate-700"

// Secondary info
className="text-xs font-bold text-slate-500"
```

### Font Weights
- `font-black`: Headlines (900)
- `font-bold`: Labels, emphasis (700)
- `font-medium`: Body text (500)

---

## 📏 Spacing

### Section Padding
```tsx
// Hero sections
className="py-8 lg:py-12"

// Standard sections
className="py-16"

// Large sections
className="py-24 lg:py-32"
```

### Container Widths
```tsx
// Wide layout
className="max-w-7xl mx-auto px-6 lg:px-8"

// Standard layout
className="max-w-6xl mx-auto px-6 lg:px-8"

// Narrow layout
className="max-w-4xl mx-auto px-6 lg:px-8"
```

### Component Spacing
```tsx
// Vertical spacing
className="space-y-8"  // Standard
className="space-y-4"  // Compact

// Grid gaps
className="gap-8"      // Standard
className="gap-12"     // Spacious
```

---

## 🔘 Component Patterns

### Buttons

#### Primary CTA
```tsx
className="px-10 py-4 bg-teal-500 text-white text-lg font-black
           rounded-xl hover:bg-teal-600 transition-all shadow-xl
           hover:shadow-2xl transform hover:-translate-y-1"
```

#### Secondary CTA
```tsx
className="px-10 py-4 border-2 border-slate-300 text-slate-700
           text-lg font-black rounded-xl hover:border-teal-500
           hover:bg-teal-50 transition-all shadow-lg"
```

#### Compact Button
```tsx
className="px-5 py-1.5 bg-teal-500 text-white text-sm font-bold
           rounded-lg hover:bg-teal-600 transition-all shadow-lg
           hover:shadow-xl transform hover:-translate-y-0.5"
```

### Cards

#### Standard Card
```tsx
className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl
           transition-all duration-300 border border-slate-200"
```

#### Gradient Card
```tsx
className="bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8
           border-2 border-slate-200 shadow-lg"
```

#### Card with Hover Lift
```tsx
className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200
           hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
```

#### Card with Accent Border
```tsx
className="bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8
           border-2 border-slate-200 shadow-lg border-t-4 border-t-teal-500"
```

### Badges & Tags

#### Social Proof Badge
```tsx
className="inline-flex items-center px-4 py-2 bg-teal-50
           border border-teal-200 rounded-full"
```

#### Topic Tag (Teal)
```tsx
className="px-2 py-1 rounded border font-bold
           bg-teal-100 text-teal-700 border-teal-300"
```

#### Topic Tag (Slate)
```tsx
className="px-2 py-1 rounded border font-bold
           bg-slate-100 text-slate-700 border-slate-300"
```

#### Small Status Badge
```tsx
className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded"
```

---

## 🎭 Navigation Patterns

### Landing Page Navigation (Unauthenticated)
```tsx
<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-1.5">
    {/* Compact, white background with backdrop blur */}
  </div>
</header>
```

#### Navigation Links
```tsx
className="text-sm font-bold text-slate-700 hover:text-teal-600 transition-colors"
```

#### Navigation Button
```tsx
className="px-5 py-1.5 bg-teal-500 text-white text-sm font-bold
           rounded-lg hover:bg-teal-600 transition-all shadow-lg
           hover:shadow-xl transform hover:-translate-y-0.5"
```

### Authenticated Navigation
Should match landing page:
- Height: ~32px (py-1.5)
- Background: `bg-white/80 backdrop-blur-lg`
- Border: `border-b border-slate-200`
- Links: `text-slate-700 hover:text-teal-600`
- Active: `text-teal-600 font-bold`

---

## 🎬 Interaction Patterns

### Hover Effects

#### Lift Effect (Cards)
```tsx
hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
```

#### Subtle Lift (Buttons)
```tsx
hover:shadow-xl transform hover:-translate-y-0.5 transition-all
```

#### Shadow Increase
```tsx
shadow-xl hover:shadow-2xl transition-all
```

### Transitions
```tsx
// Standard
transition-all duration-300

// Quick
transition-all

// Specific properties
transition-colors
transition-shadow
```

---

## 📱 Responsive Patterns

### Typography
```tsx
// Scale up on larger screens
text-4xl lg:text-5xl xl:text-6xl
text-xl lg:text-2xl
```

### Spacing
```tsx
// Increase padding on larger screens
py-8 lg:py-12
py-16 lg:py-24
gap-8 lg:gap-12
```

### Grid Layouts
```tsx
// Stack on mobile, multi-column on desktop
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```

---

## 🏗️ Page Structure Template

```tsx
<div className="min-h-screen">
  {/* Navigation */}
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
    {/* Compact navigation */}
  </header>

  {/* Hero Section */}
  <section className="py-8 lg:py-12 bg-gradient-to-b from-stone-50 via-white to-stone-50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
        Page Title
      </h1>
      <p className="text-xl text-slate-600 font-medium">
        Description
      </p>
    </div>
  </section>

  {/* Content Sections */}
  <section className="py-16 bg-white border-y border-slate-200">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      {/* Content */}
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-slate-900 py-16">
    {/* Footer content */}
  </footer>
</div>
```

---

## ✅ Design Principles

### Visual Hierarchy
1. **Bold headlines** - Always use `font-black` for major titles
2. **Clear sections** - Distinct spacing between content blocks
3. **Purposeful white space** - Don't overcrowd

### Color Usage
1. **Teal for actions** - Primary CTAs, active states, accents
2. **Slate for content** - Text, borders, secondary elements
3. **White/stone for backgrounds** - Clean, professional
4. **Gradients for depth** - Subtle, enhance visual interest

### Interactions
1. **Hover effects** - Always include feedback
2. **Smooth transitions** - Use `transition-all` or specific properties
3. **Lift on hover** - Cards and buttons should feel responsive

### Accessibility
1. **High contrast** - Slate-900 on white backgrounds
2. **Focus states** - Ensure keyboard navigation works
3. **Semantic HTML** - Proper heading hierarchy

---

## 🚫 Don't Do This

- Don't use `indigo` colors (old design)
- Don't use `coral` or other accent colors
- Don't use oversized navigation bars (h-16)
- Don't mix design patterns between old and new
- Don't skip hover states
- Don't use inconsistent spacing

---

*Updated: November 17, 2025*
*Phase 1: Design System Implementation*
