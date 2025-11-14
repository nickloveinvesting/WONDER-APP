# PhiloDuel Visual Assets & Design Specifications

---

## 1. LOGO DESIGN CONCEPTS

### Logo Mark Concept 1: Philosophical Duel Sword (PRIMARY)

**Description:** 
Two crossed swords forming a philosophical duel, with the blades creating a thinking shape. Modern, geometric, instantly recognizable.

**SVG Implementation:**
```svg
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <!-- Define gradient -->
  <defs>
    <linearGradient id="dueling-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3d5adb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff6b47;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Left sword (indigo) -->
  <line x1="16" y1="16" x2="48" y2="48" stroke="#3d5adb" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Right sword (coral) -->
  <line x1="48" y1="16" x2="16" y2="48" stroke="#ff6b47" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Center circle (intersection) -->
  <circle cx="32" cy="32" r="6" fill="url(#dueling-gradient)"/>
  
  <!-- Guard details (left sword) -->
  <line x1="32" y1="32" x2="42" y2="22" stroke="#3d5adb" stroke-width="2"/>
  <line x1="32" y1="32" x2="42" y2="42" stroke="#3d5adb" stroke-width="2"/>
  
  <!-- Guard details (right sword) -->
  <line x1="32" y1="32" x2="22" y2="22" stroke="#ff6b47" stroke-width="2"/>
  <line x1="32" y1="32" x2="22" y2="42" stroke="#ff6b47" stroke-width="2"/>
</svg>
```

**Logo Variations:**
- Horizontal (logo + wordmark)
- Icon only (square, rounded square, circular)
- Vertical (wordmark above icon)
- Monochrome (black, white)
- Single color (indigo)

---

### Logo Mark Concept 2: Geometric Brain (ALTERNATIVE)

**Description:**
Abstract geometric brain shape formed by connected nodes (representing networks of thinkers).

**Characteristics:**
- Left and right hemispheres
- Connected nodes forming synapses
- Minimalist, technical feel
- Works as icon or standalone logo

**Use Case:** For tech-forward positioning, academic partnerships

---

### Logo Mark Concept 3: Philosophy Symbol Hybrid (ALTERNATIVE)

**Description:**
Classic philosophy symbol (Greek letter Phi: Φ) reimagined with debate sword element.

**Characteristics:**
- Instantly recognizable to philosophers
- Modern twist with sword through center
- Strong academic credibility
- Distinctive from competitors

---

## 2. FAVICON SPECIFICATIONS

### Favicon Variants Required

| Size | Format | Purpose |
|------|--------|---------|
| 16x16 | .ico | Browser tab |
| 32x32 | .png | Browser bookmarks |
| 64x64 | .png | Legacy |
| 128x128 | .png | Tablet icons |
| 256x256 | .png | High DPI displays |
| 512x512 | .png | Apple touch icon |
| SVG | .svg | Scalable vector |

### Apple Touch Icon (Mobile)
- Size: 180x180px
- Format: PNG
- Filename: apple-touch-icon.png
- Margin: 10px safe area from edges
- Rounded corners: 20px radius

### Implementation HTML:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#3d5adb">
```

---

## 3. SOCIAL MEDIA PROFILE IMAGES

### Profile Picture / Avatar

**Specifications:**
- Size: 1200x1200px (minimum)
- Format: PNG or JPG
- Safe area: 100px padding
- Background: Gradient (Indigo → Coral) or solid Indigo
- Content: Logo icon only, centered

**Variations:**
- Light background (for dark mode social platforms)
- Dark background (for light mode platforms)
- Transparent background (for overlay)

### Cover/Header Image

**Specifications:**

| Platform | Size | Aspect Ratio |
|----------|------|-------------|
| Twitter/X | 1500x500px | 3:1 |
| LinkedIn | 1584x396px | 4:1 |
| Facebook | 820x312px | 2.6:1 |
| Discord | 1920x1080px | 16:9 |

**Design Concept:**
- Feature brand colors prominently
- Include tagline: "Where Philosophy Comes Alive"
- Minimalist design, not cluttered
- Test readability on mobile

---

## 4. SOCIAL MEDIA POST TEMPLATES

### Static Post Template (Instagram, Twitter)

**Dimensions:** 1080x1080px (square) or 1080x1350px (vertical)

**Layout:**
```
[Top Section - 20%]
Brand color bar (Indigo gradient)

[Middle Section - 60%]
Main message/value prop
Large, readable text
Minimum font size: 48px

[Bottom Section - 20%]
Logo + CTA text
"Join PhiloDuel"
```

**Color Scheme Options:**
1. Indigo background + White text
2. White background + Indigo text + Coral accent
3. Gradient background (Indigo → Coral)

### Quote Graphic Template

**Dimensions:** 1080x1080px

**Layout:**
```
Full screen background: Light blue (#c2d7ff)
Center: Large quote in Indigo
Bottom: Attribution + Logo
```

**Example:**
> "Philosophy isn't a luxury—it's a necessity for thinking well."
— PhiloDuel Community

---

## 5. EMAIL GRAPHICS

### Email Header Banner

**Specifications:**
- Width: 600px (desktop email standard)
- Height: 200px
- Format: PNG or JPG
- File size: <50KB

**Design:**
- Logo + Brand name (left)
- Tagline (center)
- CTA preview (right)

### Email Footer

**Specifications:**
- Width: 600px
- Height: 100px
- Dark background (--color-neutral-900)
- White text
- Social media links (24px icons)
- Legal links

---

## 6. PRESENTATION ASSETS

### Slide Deck Template

**Dimensions:** 1920x1080px (16:9)

**Master Slides:**
1. **Title Slide** - Logo centered, tagline, date
2. **Heading Slide** - Title only, Indigo background
3. **Content Slide** - White background, heading + bullet points
4. **Feature Slide** - Image left, text right
5. **Quote Slide** - Centered quote in large font
6. **Closing Slide** - CTA + logo

**Font:** Plus Jakarta Sans (headings & body)
**Color Scheme:** Indigo + Coral + White + Gray

---

## 7. ADVERTISING GRAPHICS

### Google Ads Responsive Image Ads

**Required Dimensions:**
- 1200x628px (landscape)
- 1200x1500px (portrait)
- 300x300px (square)
- Format: PNG, JPG

**Design Principles:**
- Logo visible
- Clear value proposition
- CTA button or text ("Learn More")
- High contrast for readability

### Facebook/Instagram Ad Template

**Dimensions:** 1080x1350px (portrait), 1080x1080px (square)

**Layout:**
```
[Top 30%]
Attention-grabbing headline
"Join 500+ Philosophers"

[Middle 40%]
Image/graphic:
- Community of people thinking
- Or abstract philosophy visual

[Bottom 30%]
CTA: "Get Early Access"
Brand colors + Button styling
```

**Copy Guidelines:**
- Maximum 3 lines headline
- Maximum 90 characters description
- Include benefit statement
- Clear CTA text

### LinkedIn Sponsored Content

**Dimensions:** 1200x628px

**Design:**
- Professional aesthetic
- Include impressive stat
- Feature credible element (university logos, numbers)
- CTA: "Learn More" or "Join"

---

## 8. PRINT MATERIALS (Future)

### Business Card

**Dimensions:** 3.5" x 2" (89mm x 51mm)

**Layout:**
```
Front:
- Logo (left)
- Name & Title (center)
- PhiloDuel (right)

Back:
- Website
- Email
- Social handles
- QR code to landing page
```

**Colors:**
- Front: White with Indigo logo
- Back: Indigo background with white text

### Poster

**Dimensions:** 11" x 17" (A3) or 24" x 36" (A1)

**Design:**
- Large, bold headline
- Logo prominent
- High-contrast colors
- QR code to landing page
- Minimal text

---

## 9. BRAND ANIMATION CONCEPTS

### Logo Animation: Sword Clash

**Duration:** 2 seconds (0.5s delay, 1.5s animation)

```css
@keyframes sword-clash {
  0% {
    transform: rotateZ(0deg) translateX(0);
    opacity: 0;
  }
  50% {
    transform: rotateZ(45deg) translateX(10px);
    opacity: 1;
  }
  100% {
    transform: rotateZ(0deg) translateX(0);
    opacity: 1;
  }
}

.logo-animate {
  animation: sword-clash 2s ease-in-out;
}
```

**Use Cases:**
- Page load
- Loading states
- Success animations
- Brand transition screens

### Loading Spinner

**Design:** 
- Two interlocking Indigo and Coral rings
- Rotating continuously
- Size: 48x48px

### Pulse Animation (for CTAs)

```css
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(61, 90, 219, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(61, 90, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(61, 90, 219, 0);
  }
}

.btn-primary.pulse {
  animation: pulse 2s infinite;
}
```

---

## 10. VIDEO ASSETS (Future)

### Intro/Teaser Video

**Duration:** 15 seconds
**Format:** MP4, WebM
**Resolution:** 1920x1080 (60fps recommended)

**Concept:**
1. Fade in: Logo with sword clash sound (2s)
2. Zoom through abstract philosophy visuals (6s)
3. Cut to: "Where Philosophy Comes Alive" (3s)
4. CTA: "Join PhiloDuel" with link (4s)

### Landing Page Hero Background Video

**Duration:** Looping, 8-12 seconds
**Format:** MP4 (H.264), WebM (VP9)
**Resolution:** 1920x1080
**File Size:** <10MB

**Concept:**
- Abstract, contemplative visuals
- Flowing lines, geometric shapes
- Indigo and Coral color palette
- Subtle, not distracting
- No audio or low ambient sound

---

## 11. ASSET ORGANIZATION STRUCTURE

```
/assets/
├── /logo/
│   ├── logo-horizontal.svg
│   ├── logo-icon.svg
│   ├── logo-wordmark.svg
│   ├── logo-dark-bg.svg
│   └── logo-mono.svg
├── /favicon/
│   ├── favicon.svg
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-512x512.png
│   └── apple-touch-icon.png
├── /social/
│   ├── profile-picture-1200x1200.png
│   ├── twitter-cover-1500x500.png
│   ├── linkedin-cover-1584x396.png
│   └── instagram-post-template.psd
├── /email/
│   ├── header-banner-600x200.png
│   ├── footer-600x100.png
│   └── confirmation-email.html
├── /ads/
│   ├── google-ads-1200x628.png
│   ├── facebook-ad-1080x1350.png
│   └── linkedin-ads-1200x628.png
├── /print/
│   ├── business-card.pdf
│   └── poster-24x36.pdf
└── /video/
    ├── intro-teaser-15s.mp4
    └── hero-bg-loop.mp4
```

---

## 12. DESIGN FILE SPECIFICATIONS

### Primary Design File Format
- **Tool:** Figma (cloud-based, collaborative)
- **Alternative:** Adobe XD or Sketch
- **Export Formats:** SVG (vectors), PNG (raster, 2x)

### File Naming Convention
```
philoduel-[component]-[variant]-[version].format

Examples:
- philoduel-logo-horizontal-v1.svg
- philoduel-social-twitter-profile-v2.png
- philoduel-email-header-v1.html
```

### Version Control
- Use date-based versioning: `philoduel-logo-v2024-01-15.svg`
- Keep changelog of design iterations
- Archive old versions (don't delete)

---

## 13. BRAND ASSET GUIDELINES

### Usage Rights & Permissions

**Internal Use (PhiloDuel Team):** ✓ Unlimited
- Copy files
- Modify for internal projects
- Use in pitches and presentations

**External Use (Partners, Press):** ⚠️ Request Permission
- Always ask before using
- Provide proper attribution
- Don't modify without approval

**Prohibited Uses:**
- ✗ Don't use logo on products you don't own
- ✗ Don't modify colors/proportions
- ✗ Don't combine with competing brands
- ✗ Don't use in misleading contexts

---

## 14. ASSET CREATION CHECKLIST

Before considering assets complete:

### Logo
- [ ] Primary horizontal version (SVG)
- [ ] Icon only version (SVG)
- [ ] Vertical version (SVG)
- [ ] Monochrome version (SVG)
- [ ] Minimum size test (16x16px - still legible)
- [ ] All color background tests
- [ ] Animation tests

### Favicon
- [ ] SVG version
- [ ] 16x16, 32x32, 64x64, 256x256, 512x512 PNGs
- [ ] Apple touch icon (180x180)
- [ ] Tested in browser (actual tab, bookmark)

### Social Media
- [ ] Profile pictures (all platforms)
- [ ] Cover images (Twitter, LinkedIn, Facebook, Discord)
- [ ] Post templates (various dimensions)
- [ ] Story templates (if using Stories)

### Email
- [ ] Header banner
- [ ] Footer design
- [ ] Confirmation email template
- [ ] Weekly digest template

### Advertising
- [ ] Google Ads (responsive sizes)
- [ ] Facebook/Instagram Ads
- [ ] LinkedIn Ads

---

## 15. DESIGN SYSTEM TOKENS (For Developers)

### Color Tokens (For Implementation)
```css
--logo-primary-color: #3d5adb; /* Indigo */
--logo-secondary-color: #ff6b47; /* Coral */
--logo-gradient: linear-gradient(135deg, #3d5adb, #ff6b47);
```

### Typography Tokens
```css
--logo-font: 'Plus Jakarta Sans', sans-serif;
--logo-font-weight: bold;
--logo-font-size-base: 24px;
```

### Spacing Tokens
```css
--logo-padding: 16px; /* Minimum clear space around logo */
--logo-min-width: 120px; /* Minimum horizontal space */
--logo-min-height: 32px; /* Minimum vertical space */
```

---

## 16. DESIGN HANDOFF CHECKLIST

Before sharing with developers/partners:

- [ ] All assets exported at correct sizes
- [ ] File names are clear and organized
- [ ] Color values documented (hex, RGB, HSL)
- [ ] Font specifications included
- [ ] Spacing/alignment guides provided
- [ ] Responsive behavior documented
- [ ] Animation specifications in code ready
- [ ] README file explains each asset
- [ ] Assets compressed but not quality-compromised
- [ ] Shared in accessible location (Figma, GitHub, Drive)

---

## IMPLEMENTATION NOTES

### What's Ready Now
- Logo concepts (described above, ready to design in Figma)
- Favicon specifications (can be generated)
- Social media template dimensions
- Email graphic specifications

### What Needs Design
- Actual SVG files (use Figma or Adobe)
- Specific photography (hire photographer or use stock)
- Video content (hire videographer)
- Print materials (coordinate with printer)

### Recommended Next Steps
1. Create Figma file with design system
2. Design primary logo in Figma
3. Export logo in all required formats
4. Create social media templates
5. Design email graphics
6. Prepare advertising creatives

---

**Asset Library Last Updated:** January 2025
**Version:** 1.0
**Design Tool:** Figma (Recommended)

For questions on asset usage: [design@philoduel.com]
