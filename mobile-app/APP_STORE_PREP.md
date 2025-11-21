# WONDER iOS App - App Store Preparation Guide

**Submission Target:** Q1 2025
**Review Time:** 3-7 business days typical
**Category:** Education > Philosophy

---

## Table of Contents

1. [Pre-Submission Checklist](#1-pre-submission-checklist)
2. [App Store Connect Metadata](#2-app-store-connect-metadata)
3. [Screenshot Requirements](#3-screenshot-requirements)
4. [Marketing Copy](#4-marketing-copy)
5. [Privacy & Legal](#5-privacy--legal)
6. [Review Response Templates](#6-review-response-templates)
7. [Launch Day Checklist](#7-launch-day-checklist)

---

## 1. Pre-Submission Checklist

### 1.1 Technical Requirements

**Build Configuration:**
- [ ] Xcode 16+ installed
- [ ] iOS 18 SDK (minimum)
- [ ] Minimum deployment target: iOS 15.0
- [ ] 64-bit only (arm64)
- [ ] App size < 200MB (target: 80-120MB)

**App Functionality:**
- [ ] All features work without crashing
- [ ] No placeholder content ("Lorem ipsum", "TODO")
- [ ] All navigation paths tested
- [ ] Network error handling
- [ ] Offline mode graceful degradation
- [ ] Deep links working (wonder://)

**Performance:**
- [ ] Cold start < 20 seconds
- [ ] Memory usage < 500MB average
- [ ] No memory leaks (Instruments verified)
- [ ] Smooth 60fps scrolling
- [ ] Battery efficient (no background drain)

### 1.2 User-Generated Content (Guideline 1.2) - CRITICAL

**Content Filtering:**
- [ ] Pre-publication content moderation implemented
- [ ] Profanity filter active
- [ ] Harassment detection enabled
- [ ] Spam prevention (rate limiting)

**Reporting Mechanism:**
- [ ] "Report" button on all arguments
- [ ] Report reasons: Harassment, Hate speech, Spam, Off-topic, Other
- [ ] Reports stored in `content_reports` table
- [ ] 24-72 hour response SLA documented

**User Blocking:**
- [ ] Block user option in profile menu
- [ ] Blocked users hidden from feed
- [ ] Blocked users cannot message
- [ ] Unblock available in Settings

**Contact Information:**
- [ ] Support email visible in app
- [ ] Contact form accessible
- [ ] Privacy policy linked
- [ ] Terms of service linked

### 1.3 Legal & Privacy

- [ ] Privacy Policy URL live and accessible
- [ ] Terms of Service URL live and accessible
- [ ] App Privacy Details completed in App Store Connect
- [ ] GDPR compliance (EU users)
- [ ] CCPA compliance (California users)
- [ ] Data deletion request process documented

### 1.4 Accessibility

- [ ] VoiceOver tested on all screens
- [ ] Dynamic Type scaling works (100%-200%)
- [ ] Color contrast meets 4.5:1 minimum
- [ ] Touch targets minimum 44x44pt
- [ ] Reduce Motion respected

### 1.5 Device Testing Matrix

| Device | iOS Version | Status |
|--------|-------------|--------|
| iPhone 15 Pro Max (6.7") | iOS 18 | [ ] Tested |
| iPhone 15 (6.1") | iOS 17 | [ ] Tested |
| iPhone SE (4.7") | iOS 16 | [ ] Tested |
| iPhone 13 mini (5.4") | iOS 15 | [ ] Tested |
| iPad Pro 12.9" (optional) | iOS 17 | [ ] Tested |

---

## 2. App Store Connect Metadata

### 2.1 Basic Information

| Field | Value | Character Limit |
|-------|-------|-----------------|
| **App Name** | WONDER | 30 chars |
| **Subtitle** | Deep Philosophical Debates | 30 chars |
| **Bundle ID** | com.wonder.philosophy | N/A |
| **SKU** | wonder-ios-001 | N/A |
| **Primary Category** | Education | N/A |
| **Secondary Category** | Social Networking | N/A |
| **Age Rating** | 12+ | N/A |

### 2.2 Keywords (100 characters)

```
philosophy,debate,discussion,socratic,ethics,metaphysics,thinking,dialogue,ideas,wisdom
```

**Keyword Strategy:**
- High-volume: philosophy, debate, discussion
- Niche/low-competition: socratic, metaphysics
- Singular forms (Apple indexes plurals)
- No spaces between commas
- Most important first

### 2.3 App Privacy Details

**Data Types Collected:**

| Data Type | Usage | Linked to User? |
|-----------|-------|-----------------|
| Email Address | Account creation | Yes |
| Name | Profile display | Yes |
| User Content | App functionality | Yes |
| Usage Data | Analytics | Yes |
| Diagnostics | Crash reports | No |

**Tracking:**
- [ ] App does NOT track users across apps
- [ ] Third-party tracking: None

### 2.4 Version Information

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Build | 1 |
| Copyright | © 2025 WONDER |
| Support URL | https://wonder.app/support |
| Marketing URL | https://wonder.app |
| Privacy Policy URL | https://wonder.app/privacy |

---

## 3. Screenshot Requirements

### 3.1 Required Sizes

| Device | Size (pixels) | Required |
|--------|---------------|----------|
| iPhone 6.7" | 1290 x 2796 | Yes |
| iPhone 6.5" | 1284 x 2778 | Yes |
| iPhone 5.5" | 1242 x 2208 | Yes |
| iPad 12.9" | 2048 x 2732 | If iPad supported |

### 3.2 Screenshot Content Plan

**Screenshot 1: Daily Question**
```
Title: "Start Each Day with Wonder"
Screen: Home tab with Today's Question card
Highlights: Daily philosophical prompt, user stats
```

**Screenshot 2: Discussion Thread**
```
Title: "Engage in Meaningful Debate"
Screen: Discussion detail with multiple arguments
Highlights: Depth scores, Snap/Zap counts
```

**Screenshot 3: Snap/Zap Voting**
```
Title: "Thoughtful Feedback, Not Karma"
Screen: Close-up of voting interaction
Highlights: Snap (agreement), Zap (challenge)
```

**Screenshot 4: Profile & Achievements**
```
Title: "Track Your Philosophical Journey"
Screen: Profile with stats and achievements
Highlights: Streak, Influence, Depth Score
```

**Screenshot 5: Write Argument**
```
Title: "Craft Your Argument"
Screen: Argument editor with formatting
Highlights: Templates, citations, preview
```

### 3.3 Screenshot Guidelines

- **Background:** Use device frames (optional but recommended)
- **Text:** Plus Jakarta Sans, max 2 lines
- **Colors:** WONDER brand colors (Teal primary)
- **Content:** Use real-looking philosophical discussions
- **Avoid:** Placeholder text, error states, loading screens

### 3.4 App Preview Video (Optional but Recommended)

| Specification | Value |
|---------------|-------|
| Duration | 15-30 seconds |
| Format | H.264, .mov or .mp4 |
| Resolution | Device-specific |
| Audio | Optional (most users mute) |

**Video Flow:**
1. App opens → Daily Question (3s)
2. Scroll through discussions (5s)
3. Read an argument, see depth score (5s)
4. Snap vote with animation (3s)
5. Write argument with templates (5s)
6. Profile with achievements (3s)
7. Logo + tagline (3s)

---

## 4. Marketing Copy

### 4.1 App Store Description (4000 characters max)

```
WONDER: Where Philosophy Comes Alive

Join a community of curious minds exploring ideas that matter. Unlike traditional social media, WONDER rewards depth over popularity—thoughtful arguments rise based on their quality, not their virality.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY WONDER IS DIFFERENT

• No Downvotes, No Karma Farming
Traditional platforms encourage pile-ons and popularity contests. WONDER uses Snap (agreement) and Zap (thoughtful challenge) to create constructive dialogue.

• Depth Scores, Not Like Counts
Every argument receives a Depth Score based on reading time, citations, and genuine engagement—encouraging substance over soundbites.

• Daily Philosophical Challenges
Start each day with a thought-provoking question curated to spark meaningful discussion.

• Your Ideas, Preserved
Build a personal Vault of your best arguments and insights. Your philosophical journey matters.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FEATURES

◆ Daily Questions - Fresh philosophical prompts every day
◆ Structured Debates - Take positions, make arguments, engage respectfully
◆ Depth Scoring - Quality metrics for every contribution
◆ Snap & Zap - Express agreement or constructive challenge
◆ Streak System - Build consistent thinking habits
◆ Personal Vault - Save and organize your best work
◆ Dark Mode - Perfect for late-night philosophical reading
◆ AI Judgment - Fair, unbiased debate resolution

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOPICS WE EXPLORE

Philosophy of Mind • Ethics & Morality • Free Will
Logic & Reasoning • Political Philosophy • Aesthetics
Metaphysics • Epistemology • Existentialism
AI & Technology Ethics • Ancient Philosophy • Modern Thought

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHO IS WONDER FOR?

• Philosophy enthusiasts seeking deeper conversations
• Students exploring ideas beyond the classroom
• Professionals wanting intellectual discourse
• Curious minds tired of social media noise
• Anyone who believes ideas deserve respect

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOIN THE CONVERSATION

WONDER is free to use. Create an account and start exploring the questions that have puzzled humanity for millennia—with a community that takes ideas seriously.

Think deeper. WONDER together.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions or feedback? Contact us at support@wonder.app

Privacy Policy: wonder.app/privacy
Terms of Service: wonder.app/terms
```

### 4.2 What's New (Release Notes)

**Version 1.0.0:**
```
Welcome to WONDER!

We're excited to bring philosophical discourse to your pocket. This initial release includes:

• Daily philosophical questions to spark your thinking
• Structured debates with FOR and AGAINST positions
• Snap and Zap voting for constructive feedback
• Depth Scores to highlight quality arguments
• Personal Vault to save your best work
• Dark mode for comfortable reading
• Streak tracking to build thinking habits

We'd love your feedback! Reach out at support@wonder.app

WONDER together.
```

### 4.3 Promotional Text (170 characters)

```
Think deeper with WONDER. Join philosophical debates, build your Depth Score, and explore ideas with a community that values substance over soundbites.
```

---

## 5. Privacy & Legal

### 5.1 Privacy Policy Requirements

**Must Include:**
- [ ] What data is collected
- [ ] How data is used
- [ ] Third-party sharing (Supabase, Gemini)
- [ ] User rights (access, deletion, portability)
- [ ] Data retention periods
- [ ] Cookie/tracking disclosure
- [ ] Children's privacy (COPPA)
- [ ] Contact information
- [ ] Last updated date

**Privacy Policy URL:** `https://wonder.app/privacy`

### 5.2 Terms of Service Requirements

**Must Include:**
- [ ] User eligibility (age 13+)
- [ ] Account responsibilities
- [ ] Content ownership and license
- [ ] Prohibited content list
- [ ] Moderation policy
- [ ] Termination clause
- [ ] Dispute resolution
- [ ] Limitation of liability
- [ ] Changes notification
- [ ] Contact information

**Terms URL:** `https://wonder.app/terms`

### 5.3 Age Rating Questionnaire

| Question | Answer |
|----------|--------|
| Cartoon/Fantasy Violence | None |
| Realistic Violence | None |
| Sexual Content | None |
| Nudity | None |
| Profanity/Crude Humor | Infrequent/Mild (user content) |
| Mature/Suggestive Themes | None |
| Alcohol/Tobacco/Drugs | None |
| Gambling | None |
| Horror/Fear Themes | None |
| Medical/Treatment Info | None |
| Unrestricted Web Access | No |

**Result:** 12+ (due to user-generated content)

### 5.4 Export Compliance

- [ ] App uses standard encryption (HTTPS)
- [ ] No custom encryption algorithms
- [ ] Self-classification: Standard encryption exempt

---

## 6. Review Response Templates

### 6.1 Rejection Response: Guideline 1.2 (UGC)

```
Subject: Appeal - Guideline 1.2 Compliance for WONDER

Dear App Review Team,

Thank you for your review of WONDER. We have addressed the concerns regarding user-generated content:

CONTENT FILTERING:
- Implemented automated content moderation using [service name]
- Pre-publication filtering for profanity and harassment
- Real-time spam detection

REPORTING MECHANISM:
- "Report" button added to all user content
- Report categories: Harassment, Hate speech, Spam, Off-topic, Other
- 24-hour response SLA for all reports
- Dedicated moderation queue

USER BLOCKING:
- Users can block others from their profile
- Blocked users' content is hidden
- Unblock available in Settings > Blocked Users

CONTACT INFORMATION:
- Support email: support@wonder.app
- In-app contact form in Settings > Help
- Response time: Within 24 hours

We have attached screenshots demonstrating each feature. Please let us know if you need additional information.

Best regards,
[Your Name]
WONDER Team
```

### 6.2 Rejection Response: Guideline 4.2 (Minimum Functionality)

```
Subject: Appeal - Minimum Functionality for WONDER

Dear App Review Team,

Thank you for your feedback. We'd like to clarify WONDER's unique value:

WONDER provides native features not available via web:
1. Push notifications for debate updates and daily questions
2. Offline reading of saved arguments
3. Haptic feedback for Snap/Zap interactions
4. Native share sheet integration
5. Widget support for daily questions (coming soon)

Our app is not a web wrapper—it's built natively with React Native, providing:
- Native navigation and gestures
- 60fps smooth scrolling
- iOS-native UI components
- Optimized performance for mobile reading

We're happy to demonstrate these features via TestFlight or provide additional documentation.

Best regards,
[Your Name]
WONDER Team
```

### 6.3 User Review Response: Positive

```
Thank you so much for your kind words! We're thrilled that WONDER is helping you engage with philosophical ideas. Your support means everything to us. If you have any suggestions for topics or features, we'd love to hear them at support@wonder.app. WONDER together! 🌟
```

### 6.4 User Review Response: Bug Report

```
Thank you for bringing this to our attention, and we apologize for the inconvenience. Our team is investigating this issue. Could you please email us at support@wonder.app with details about your device and iOS version? We'll work to resolve this as quickly as possible. Your feedback helps us improve WONDER for everyone.
```

### 6.5 User Review Response: Feature Request

```
Thank you for your suggestion! We love hearing ideas from our community. This is definitely something we're considering for future updates. We've added it to our roadmap for review. Stay tuned, and keep sharing your thoughts with us at support@wonder.app!
```

### 6.6 User Review Response: Negative (Constructive)

```
We're sorry WONDER didn't meet your expectations. Your feedback is valuable, and we're always working to improve. Could you share more details at support@wonder.app? We'd love the opportunity to address your concerns and make WONDER better. Thank you for giving us a chance.
```

---

## 7. Launch Day Checklist

### 7.1 Pre-Launch (T-7 Days)

- [ ] Final TestFlight build distributed to beta testers
- [ ] All screenshots uploaded and approved
- [ ] App preview video uploaded (if applicable)
- [ ] Marketing copy finalized
- [ ] Privacy policy and terms live
- [ ] Support email ready (support@wonder.app)
- [ ] Social media accounts prepared
- [ ] Press kit ready

### 7.2 Submission Day (T-3 Days)

- [ ] Production build created via EAS Build
- [ ] Build uploaded to App Store Connect
- [ ] All metadata fields completed
- [ ] Pricing set (Free)
- [ ] Territories selected (All available)
- [ ] Release option: Manual (recommended for first launch)
- [ ] Submit for review

### 7.3 During Review (T-1 to T-3 Days)

- [ ] Monitor App Store Connect for status changes
- [ ] Prepare for potential rejection response
- [ ] Have team available for quick fixes
- [ ] Test production build on TestFlight

### 7.4 Approval Received

- [ ] Review release notes one final time
- [ ] Coordinate launch timing with team
- [ ] Prepare social media posts
- [ ] Set up analytics monitoring
- [ ] Set up crash reporting alerts

### 7.5 Launch Day (T-0)

**Morning:**
- [ ] Press "Release This Version" in App Store Connect
- [ ] Verify app appears in App Store (may take 2-24 hours)
- [ ] Test purchase/download flow

**Afternoon:**
- [ ] Post on social media (Twitter/X, LinkedIn, Reddit)
- [ ] Submit to ProductHunt
- [ ] Email to beta testers
- [ ] Monitor crash reports
- [ ] Monitor first reviews

**Evening:**
- [ ] Respond to any reviews
- [ ] Check download numbers
- [ ] Team celebration 🎉

### 7.6 Post-Launch Week (T+1 to T+7)

**Daily:**
- [ ] Monitor crash reports (target: <1% crash rate)
- [ ] Respond to all reviews within 24 hours
- [ ] Check analytics (downloads, DAU, session length)
- [ ] Monitor social media mentions

**Weekly:**
- [ ] Compile metrics report
- [ ] Prioritize bug fixes
- [ ] Plan first update (submit within 2 weeks)
- [ ] Gather feature feedback

---

## Appendix A: App Store Connect Fields Reference

| Section | Field | Required | Notes |
|---------|-------|----------|-------|
| App Information | Name | Yes | 30 chars |
| App Information | Subtitle | No | 30 chars, appears in search |
| App Information | Privacy Policy URL | Yes | Must be live |
| App Information | Category | Yes | Primary + Secondary |
| Pricing | Price | Yes | Set to Free |
| Availability | Territories | Yes | Recommend: All |
| Version | Screenshots | Yes | Per device size |
| Version | Description | Yes | 4000 chars max |
| Version | Keywords | Yes | 100 chars |
| Version | Support URL | Yes | Must be live |
| Version | Marketing URL | No | Recommended |
| Version | What's New | Yes | For updates |
| App Privacy | Data Types | Yes | Select all that apply |
| App Privacy | Tracking | Yes | Yes/No |
| Age Rating | Questionnaire | Yes | Answer all questions |

---

## Appendix B: Common Rejection Reasons & Prevention

| Reason | Prevention |
|--------|------------|
| **1.2 UGC Safety** | Implement reporting, blocking, moderation |
| **2.1 Crashes** | Thorough device testing, crash monitoring |
| **2.1 Placeholders** | Remove all TODO, Lorem ipsum |
| **4.2 Minimum Functionality** | Add native features beyond web |
| **4.3 Spam** | Rate limiting, CAPTCHA |
| **5.1 Privacy** | Complete privacy policy, data disclosure |
| **5.1.1 Data Collection** | Accurate App Privacy labels |

---

## Appendix C: Key Dates & Deadlines

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Development Complete | Week 4 | [ ] |
| TestFlight Beta | Week 4 | [ ] |
| Screenshots Ready | Week 4 | [ ] |
| Marketing Copy Final | Week 4 | [ ] |
| Submit for Review | Week 4-5 | [ ] |
| Expected Approval | Week 5-6 | [ ] |
| Launch | Week 5-6 | [ ] |

---

**Document Version:** 1.0
**Last Updated:** November 21, 2025
**Next Review:** Before submission
