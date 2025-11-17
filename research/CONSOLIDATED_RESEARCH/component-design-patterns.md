# Component Design Patterns

**Research Date:** November 2025
**Agent:** Agent 6 - Visual Design Language & Component System
**Focus:** Component library, design patterns, interaction states, reusable UI elements

---

## Executive Summary

This document defines the complete component library needed for a conversation-first philosophical platform. Based on analysis of Medium, Notion, Linear, and Reddit, we recommend a **soft, spacious, modern component style** that supports deep reading and thoughtful conversation.

**Key Principles:**
- **Soft over sharp**: Rounded corners (8px), soft shadows, gentle hover states
- **Spacious over compact**: Generous padding, breathing room, comfortable touch targets
- **Clear over clever**: Obvious affordances, predictable interactions, accessible patterns
- **Calm over flashy**: Subtle animations (200-300ms), minimal movement, thoughtful transitions

**Component Inventory:**
- 12 core components for MVP
- 8 enhanced components for Phase 2
- 6 advanced components for future

**Platform Inspiration:**
- **Buttons**: Linear (soft, modern) + Notion (clear states)
- **Cards**: Medium (minimal, elegant) + Reddit (functional)
- **Threads**: Reddit (nested structure) + Notion (block-based)
- **Forms**: Linear (clean, modern) + Notion (inline editing)

---

## Component Philosophy

### Design Principles

#### 1. Soft, Not Sharp

**Visual Treatment:**
- Rounded corners: 8px (buttons, cards), 4px (small elements)
- Soft shadows: `0 2px 8px rgba(0, 0, 0, 0.08)`
- Gentle gradients (optional): subtle, 2-3% opacity variation
- No hard borders except for emphasis

**Why:**
- Feels approachable, modern, friendly
- Reduces visual harshness
- Better for extended reading sessions
- Aligns with conversation-first positioning

---

#### 2. Spacious, Not Cramped

**Padding Guidelines:**
- Buttons: 12px vertical, 24px horizontal (minimum)
- Cards: 24px all sides (desktop), 16px (mobile)
- Touch targets: 44px minimum (mobile)
- List items: 16px vertical, 12px horizontal
- Form inputs: 12px vertical, 16px horizontal

**Why:**
- Philosophy needs space to breathe
- Reduces cognitive load
- Better accessibility (easier to tap)
- Feels premium, thoughtful

---

#### 3. Clear States, Always

Every interactive component must have:
- **Default**: Resting state, clear affordance
- **Hover**: Subtle feedback (desktop only)
- **Focus**: Keyboard navigation indicator
- **Active**: Pressed/clicked state
- **Disabled**: Clearly not interactive
- **Loading**: Progress indication
- **Error**: Problem clearly communicated

**Why:**
- Accessibility (keyboard users, screen readers)
- User confidence (know what will happen)
- Professional polish
- WCAG compliance

---

## Core Components (MVP)

### 1. Buttons

Buttons are the primary action mechanism. Must be obvious, accessible, and consistent.

#### Variants

**Primary Button**
- **Purpose**: Main actions (submit, create, send)
- **Visual**: Solid background, high contrast
- **Color**: Primary blue-gray (#384D5C)
- **Usage**: One per screen section maximum

```css
.btn-primary {
  background: #384D5C;
  color: #F5F3F0;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: #4A6275;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}
```

---

**Secondary Button**
- **Purpose**: Secondary actions (cancel, back, view more)
- **Visual**: Outline style, transparent background
- **Color**: Primary color for border and text
- **Usage**: Pair with primary button

```css
.btn-secondary {
  background: transparent;
  color: #384D5C;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid #384D5C;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background: rgba(56, 77, 92, 0.05);
  border-color: #4A6275;
}

.btn-secondary:active {
  background: rgba(56, 77, 92, 0.1);
}
```

---

**Ghost Button**
- **Purpose**: Tertiary actions (delete, archive, subtle actions)
- **Visual**: Text only, minimal styling
- **Color**: Text color with hover background
- **Usage**: Less important actions

```css
.btn-ghost {
  background: transparent;
  color: #6B7280;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-ghost:hover {
  background: rgba(107, 114, 128, 0.1);
  color: #4B5563;
}
```

---

**Danger Button**
- **Purpose**: Destructive actions (delete, remove, leave)
- **Visual**: Red/warning color
- **Color**: Error color (#C85A54)
- **Usage**: Requires confirmation

```css
.btn-danger {
  background: #C85A54;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-danger:hover {
  background: #D66B60;
}
```

---

#### Button Sizes

```css
.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-md {
  padding: 12px 24px;
  font-size: 16px;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 18px;
}

.btn-full {
  width: 100%;
}
```

---

#### Accessibility

- ✅ Minimum touch target: 44x44px (mobile)
- ✅ Focus ring: 2px solid, offset 2px
- ✅ ARIA labels for icon-only buttons
- ✅ Disabled state announced to screen readers
- ✅ Keyboard accessible (Enter/Space)

---

### 2. Cards

Cards contain conversations, topics, user profiles, and content blocks.

#### Conversation Card

**Purpose**: Display conversation preview in lists/feeds

**Structure:**
- Title (H3, 20px, semibold)
- Preview text (truncated, 2-3 lines)
- Metadata (author, date, replies, views)
- Optional: Topic badge
- Left border accent (4px, primary color)

```css
.card {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  border-left: 4px solid #384D5C;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  border-left-color: #7C9885;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #2A2A2A;
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-preview {
  font-size: 16px;
  color: #4B5563;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-metadata {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #6B7280;
}
```

---

#### Topic Card

**Purpose**: Display philosophical topic/category

**Structure:**
- Icon or emoji (topic representation)
- Title
- Description
- Conversation count
- Category color accent

```css
.topic-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  border-top: 4px solid var(--topic-color);
  text-align: center;
  transition: all 200ms ease;
}

.topic-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: scale(1.02);
}

.topic-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.topic-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.topic-description {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 12px;
}

.topic-count {
  font-size: 12px;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

#### User Card

**Purpose**: Display user profile in lists or sidebar

**Structure:**
- Avatar (profile picture or initials)
- Name
- Bio/description (optional)
- Stats (contributions, topics, etc.)

```css
.user-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #F9F8F5;
  border-radius: 8px;
  transition: all 200ms ease;
}

.user-card:hover {
  background: #F2F0EB;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #384D5C;
  color: #F5F3F0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #2A2A2A;
  margin-bottom: 4px;
}

.user-bio {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
}

.user-stats {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #9CA3AF;
}
```

---

### 3. Thread Items (Conversation UI)

**Purpose**: Display nested conversation threads

**Key Features:**
- Left border indicating depth
- Collapsible (expand/collapse)
- Visual connection to parent
- Author info inline
- Action buttons (reply, upvote, etc.)

```css
.thread-item {
  margin-left: calc(var(--depth) * 24px);
  padding-left: 16px;
  border-left: 3px solid var(--thread-color);
  margin-bottom: 16px;
  position: relative;
}

.thread-item[data-depth="0"] {
  margin-left: 0;
  border-left: none;
}

.thread-item[data-depth="1"] {
  --thread-color: #384D5C;
}

.thread-item[data-depth="2"] {
  --thread-color: #7C9885;
}

.thread-item[data-depth="3"] {
  --thread-color: #6B5738;
}

.thread-item[data-depth="4"],
.thread-item[data-depth="5"] {
  --thread-color: #9CA3AF;
}

.thread-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6B7280;
}

.thread-content {
  font-size: 16px;
  line-height: 1.6;
  color: #2A2A2A;
  margin-bottom: 12px;
}

.thread-actions {
  display: flex;
  gap: 16px;
  font-size: 14px;
}

.thread-action {
  color: #6B7280;
  cursor: pointer;
  transition: color 150ms ease;
}

.thread-action:hover {
  color: #384D5C;
}
```

---

### 4. Topic Badges & Tags

**Purpose**: Categorize conversations visually

**Variants:**
- **Pill badge**: Rounded, colored background
- **Outlined tag**: Border only
- **Small badge**: For counts, notifications

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-filled {
  background: var(--badge-color);
  color: #FFFFFF;
}

.badge-outlined {
  background: transparent;
  border: 1.5px solid var(--badge-color);
  color: var(--badge-color);
}

.badge-subtle {
  background: rgba(var(--badge-color-rgb), 0.1);
  color: var(--badge-color);
}

/* Topic-specific colors */
.badge-ethics {
  --badge-color: #CC7A6F;
  --badge-color-rgb: 204, 122, 111;
}

.badge-metaphysics {
  --badge-color: #8B7AA8;
  --badge-color-rgb: 139, 122, 168;
}

.badge-epistemology {
  --badge-color: #6B9B9E;
  --badge-color-rgb: 107, 155, 158;
}
```

---

### 5. User Avatars

**Purpose**: Visual identity for users

**Variants:**
- **Image avatar**: User-uploaded photo
- **Initials avatar**: Generated from name
- **Icon avatar**: Default icon

**Sizes**: Small (32px), Medium (48px), Large (64px), XL (128px)

```css
.avatar {
  border-radius: 50%;
  background: #384D5C;
  color: #F5F3F0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  overflow: hidden;
  position: relative;
}

.avatar-sm {
  width: 32px;
  height: 32px;
  font-size: 14px;
}

.avatar-md {
  width: 48px;
  height: 48px;
  font-size: 18px;
}

.avatar-lg {
  width: 64px;
  height: 64px;
  font-size: 24px;
}

.avatar-xl {
  width: 128px;
  height: 128px;
  font-size: 48px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Status indicator */
.avatar-online::after {
  content: '';
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #7C9885;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
}
```

---

### 6. Form Components

#### Text Input

```css
.input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-family: inherit;
  color: #2A2A2A;
  background: #FFFFFF;
  border: 2px solid #E5E2DB;
  border-radius: 8px;
  transition: all 200ms ease;
}

.input:hover {
  border-color: #D1CDC3;
}

.input:focus {
  outline: none;
  border-color: #384D5C;
  box-shadow: 0 0 0 3px rgba(56, 77, 92, 0.1);
}

.input::placeholder {
  color: #9CA3AF;
}

.input:disabled {
  background: #F9F8F5;
  color: #9CA3AF;
  cursor: not-allowed;
}

.input-error {
  border-color: #C85A54;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(200, 90, 84, 0.1);
}
```

---

#### Textarea

```css
.textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  font-size: 16px;
  font-family: inherit;
  line-height: 1.6;
  color: #2A2A2A;
  background: #FFFFFF;
  border: 2px solid #E5E2DB;
  border-radius: 8px;
  resize: vertical;
  transition: all 200ms ease;
}

.textarea:focus {
  outline: none;
  border-color: #384D5C;
  box-shadow: 0 0 0 3px rgba(56, 77, 92, 0.1);
}
```

---

#### Checkbox & Radio

```css
.checkbox,
.radio {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #D1CDC3;
  background: #FFFFFF;
  cursor: pointer;
  position: relative;
  transition: all 150ms ease;
}

.checkbox {
  border-radius: 4px;
}

.radio {
  border-radius: 50%;
}

.checkbox:checked,
.radio:checked {
  background: #384D5C;
  border-color: #384D5C;
}

.checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFFFFF;
  font-size: 14px;
  font-weight: bold;
}

.radio:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #FFFFFF;
  border-radius: 50%;
}

.checkbox:focus,
.radio:focus {
  outline: 2px solid #384D5C;
  outline-offset: 2px;
}
```

---

### 7. Navigation Components

#### Header Navigation

```css
.header {
  background: #FFFFFF;
  border-bottom: 1px solid #E5E2DB;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-logo {
  font-size: 24px;
  font-weight: 700;
  color: #2A2A2A;
  text-decoration: none;
}

.header-nav {
  display: flex;
  gap: 32px;
  align-items: center;
}

.header-link {
  font-size: 16px;
  font-weight: 500;
  color: #4B5563;
  text-decoration: none;
  transition: color 150ms ease;
}

.header-link:hover {
  color: #384D5C;
}

.header-link-active {
  color: #384D5C;
  border-bottom: 2px solid #384D5C;
}
```

---

#### Tab Navigation

```css
.tabs {
  display: flex;
  border-bottom: 1px solid #E5E2DB;
  gap: 8px;
}

.tab {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: #6B7280;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 150ms ease;
}

.tab:hover {
  color: #384D5C;
  background: rgba(56, 77, 92, 0.05);
}

.tab-active {
  color: #384D5C;
  border-bottom-color: #384D5C;
}
```

---

### 8. Modals & Overlays

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 200ms ease;
}

.modal {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 250ms ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #2A2A2A;
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
}

.modal-close:hover {
  color: #384D5C;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### 9. Empty States

**Purpose**: Guide users when no content exists

```css
.empty-state {
  text-align: center;
  padding: 64px 24px;
}

.empty-state-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state-title {
  font-size: 20px;
  font-weight: 600;
  color: #2A2A2A;
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 16px;
  color: #6B7280;
  margin-bottom: 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.empty-state-action {
  /* Uses .btn-primary styles */
}
```

---

### 10. Loading States

#### Skeleton Loader

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F9F8F5 0%,
    #F2F0EB 50%,
    #F9F8F5 100%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 16px;
  margin-bottom: 8px;
}

.skeleton-title {
  height: 24px;
  width: 60%;
  margin-bottom: 16px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
```

---

#### Spinner

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E5E2DB;
  border-top-color: #384D5C;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner-sm {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner-lg {
  width: 60px;
  height: 60px;
  border-width: 6px;
}
```

---

### 11. Toast Notifications

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #FFFFFF;
  border-left: 4px solid var(--toast-color);
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 12px;
  align-items: center;
  max-width: 400px;
  animation: slideInRight 250ms ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast-success {
  --toast-color: #7C9885;
}

.toast-warning {
  --toast-color: #D9A55B;
}

.toast-error {
  --toast-color: #C85A54;
}

.toast-info {
  --toast-color: #5B8FA3;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  color: #2A2A2A;
}

.toast-close {
  background: transparent;
  border: none;
  color: #6B7280;
  cursor: pointer;
  font-size: 18px;
}
```

---

### 12. Tooltips

```css
.tooltip-trigger {
  position: relative;
  cursor: help;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: 8px 12px;
  background: #2A2A2A;
  color: #F5F3F0;
  font-size: 13px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #2A2A2A;
}

.tooltip-trigger:hover .tooltip,
.tooltip-trigger:focus .tooltip {
  opacity: 1;
}
```

---

## Enhanced Components (Phase 2)

### 13. Dropdown Menu

```css
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 150ms ease;
}

.dropdown.active .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 14px;
  color: #2A2A2A;
  cursor: pointer;
  transition: background 100ms ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-item:hover {
  background: #F9F8F5;
}

.dropdown-divider {
  height: 1px;
  background: #E5E2DB;
  margin: 8px 0;
}
```

---

### 14. Breadcrumbs

```css
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
}

.breadcrumb-link {
  color: #6B7280;
  text-decoration: none;
  transition: color 150ms ease;
}

.breadcrumb-link:hover {
  color: #384D5C;
}

.breadcrumb-separator {
  color: #9CA3AF;
}

.breadcrumb-current {
  color: #2A2A2A;
  font-weight: 500;
}
```

---

### 15. Progress Indicators

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: #E5E2DB;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #384D5C 0%, #7C9885 100%);
  border-radius: 4px;
  transition: width 300ms ease;
}

/* Step progress */
.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 32px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.progress-step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #E5E2DB;
  border: 2px solid #E5E2DB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: #6B7280;
}

.progress-step.active .progress-step-circle {
  background: #384D5C;
  border-color: #384D5C;
  color: #FFFFFF;
}

.progress-step.completed .progress-step-circle {
  background: #7C9885;
  border-color: #7C9885;
  color: #FFFFFF;
}
```

---

### 16. Pagination

```css
.pagination {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
}

.pagination-button {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid #E5E2DB;
  color: #4B5563;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
}

.pagination-button:hover {
  background: #F9F8F5;
  border-color: #D1CDC3;
}

.pagination-button.active {
  background: #384D5C;
  border-color: #384D5C;
  color: #FFFFFF;
}

.pagination-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

---

## Platform-Specific Patterns

### Reddit-Style Threading

**Visual Pattern:**
- Left border (3px) for each depth level
- Collapsible headers (click to expand/collapse)
- Vote buttons always visible
- Indent: 24px per level (desktop), 16px (mobile)

**Interaction:**
- Click author/timestamp area to collapse
- Reply button inline
- Maximum 5 levels before "continue thread" link

---

### Medium-Style Reading

**Visual Pattern:**
- Centered content (max 680px)
- Large typography (20-21px body)
- Generous line height (1.6-1.7)
- Minimal UI chrome
- Highlight-to-share functionality

**Interaction:**
- Text selection shows action menu
- Clap button (graduated appreciation)
- Scroll progress indicator

---

### Notion-Style Blocks

**Visual Pattern:**
- Each paragraph/element is a discrete block
- Hover shows handle (for drag/reorder)
- Plus button to add new blocks
- Slash commands (/heading, /list)

**Interaction:**
- Click to edit inline
- Drag to reorder
- Nest blocks within blocks

---

## Component States Reference

Every component should support these states:

| State | Purpose | Visual Treatment |
|-------|---------|------------------|
| **Default** | Resting state | Standard colors, no hover |
| **Hover** | Mouse over (desktop) | Slight color shift, subtle shadow |
| **Focus** | Keyboard navigation | 2px outline, offset 2px |
| **Active** | Being clicked | Pressed appearance, darker color |
| **Disabled** | Not interactive | Reduced opacity (60%), no cursor |
| **Loading** | Processing | Spinner or skeleton |
| **Error** | Validation failure | Red accent, error message |
| **Success** | Completed action | Green accent, success message |

---

## Accessibility Checklist

### Every Component Must:

- ✅ Support keyboard navigation (Tab, Enter, Space, Escape)
- ✅ Have clear focus indicators (visible outline)
- ✅ Include ARIA labels where needed
- ✅ Announce state changes to screen readers
- ✅ Meet WCAG AA contrast requirements (4.5:1 minimum)
- ✅ Support browser zoom up to 200%
- ✅ Provide text alternatives for icons
- ✅ Have minimum touch targets (44x44px mobile)

---

## Implementation Priority

### Phase 1: MVP (Essential)

**Must Have:**
1. Buttons (all variants)
2. Cards (conversation, topic, user)
3. Thread items (nested conversation)
4. Topic badges
5. User avatars
6. Form inputs (text, textarea)
7. Navigation (header, tabs)
8. Modals
9. Empty states
10. Loading states (spinner, skeleton)
11. Toast notifications
12. Tooltips

**Timeline:** Before beta launch

---

### Phase 2: Enhanced (2-3 months)

**Should Have:**
1. Dropdown menus
2. Breadcrumbs
3. Progress indicators
4. Pagination
5. Advanced form elements (radio, checkbox, select)
6. Search components
7. Filter components
8. Sorting controls

**Timeline:** Post-launch iteration

---

### Phase 3: Advanced (6+ months)

**Nice to Have:**
1. Rich text editor
2. Markdown preview
3. Argument visualization
4. Comment highlights
5. Collaborative editing
6. Voice/video components
7. Advanced notifications

**Timeline:** Future development

---

## Conclusion

This component library provides a complete foundation for a conversation-first philosophical platform. Key principles:

**Design Philosophy:**
- **Soft & Spacious**: Rounded corners, generous padding, comfortable spacing
- **Clear & Accessible**: Obvious affordances, WCAG AA compliance, keyboard support
- **Calm & Thoughtful**: Subtle animations, minimal distractions, reading-optimized

**Inspired By:**
- **Linear**: Modern, polished, professional
- **Medium**: Reading-focused, elegant, spacious
- **Notion**: Functional, clean, block-based
- **Reddit**: Threaded, scalable, proven

**Implementation:**
Start with 12 core components in MVP, expand to 20 components in Phase 2, and add advanced features in Phase 3. Every component must support all interaction states and meet WCAG AA accessibility standards.

**The Goal:**
Create components that feel modern and polished while supporting deep, thoughtful philosophical conversation. The design should fade into the background, letting ideas take center stage.
