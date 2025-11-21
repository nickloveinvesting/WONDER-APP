# WONDER iOS: Gesture Interaction Map & Flow Diagrams

---

## GESTURE INTERACTION FLOWS

### Flow 1: Quick Snap Vote (Double-Tap)

```
User Double-Taps on Argument Card
│
├─ Detect tap location (top/bottom half)
│  └─ Top half = Snap, Bottom half = Zap
│
├─ Haptic Feedback
│  ├─ Light impact (14pt vibration)
│  └─ Play success pattern
│
├─ Visual Animation (200ms)
│  ├─ Emit 3-5 particles (2pt circles)
│  ├─ Particles scale: 100% → 0%
│  ├─ Opacity: 100% → 0%
│  ├─ Direction: Upward (gravity affected)
│  └─ Color: Snap=teal-500, Zap=slate-500
│
├─ Counter Update (animated)
│  ├─ Text scale: 1.0 → 1.2 → 1.0 (spring)
│  ├─ Color change (500ms)
│  └─ Icon fill animation
│
└─ Server Action
   ├─ Optimistic update on UI
   ├─ POST /api/vote
   └─ Revert if error
```

**Implementation Details:**

```swift
// Haptic patterns
let lightImpact = UIImpactFeedbackGenerator(style: .light)
let pattern = [0, 40, 20, 40]  // ms timing for success

// Particle animation
var particles: [CAEmitterCell] = []
let emitter = CAEmitterLayer()
emitter.emitterPosition = tapLocation
emitter.emitterShape = .circle
emitter.emitterSize = CGSize(width: 4, height: 4)
emitter.birthRate = 1.0
emitter.renderMode = .additive
```

---

### Flow 2: Swipe-to-Vote (Horizontal Reveal)

```
User Swipes Left on Argument Card (80pt minimum)
│
├─ Detect swipe direction & velocity
│  └─ Minimum velocity: 300pt/sec
│
├─ Reveal Animation (300ms)
│  ├─ Card content slides left
│  ├─ Zap button slides in from right
│  ├─ Spring curve (stiffness: 300, damping: 30)
│  └─ Shadow increases on card
│
├─ Tap Zap Button
│  ├─ Animate button press (scale 0.95)
│  ├─ Haptic medium feedback
│  ├─ Vote counter animates (+1)
│  └─ Card springs back to center
│
└─ Release Before Threshold (< 40pt)
   └─ Card bounces back automatically
```

**Swipe Velocity Calculation:**

```
velocity = |endPoint - startPoint| / timeInterval

Fast swipe (>300pt/sec):   Auto-completes reveal
Slow swipe (<300pt/sec):   User must tap button
Release distance <40pt:    Spring back closed
Release distance >80pt:    Auto-reveal (momentum)
```

---

### Flow 3: Pull-to-Refresh

```
User Pulls Screen Down from Top (>60pt)
│
├─ Visual Feedback
│  ├─ Show loading spinner
│  ├─ Scale in animation
│  └─ Rotate 360° continuous
│
├─ Haptic Pulse (every 500ms)
│  ├─ Light impact
│  └─ Pattern.pulse
│
├─ Release After 60pt
│  ├─ Trigger refresh action
│  ├─ Show "Loading..." state
│  └─ Keep spinner visible
│
├─ Data Loaded (200ms)
│  ├─ Fade out spinner
│  ├─ Spring content back up
│  ├─ Show success checkmark (500ms)
│  └─ Auto-dismiss feedback
│
└─ Error State
   ├─ Show error message (2 seconds)
   ├─ Allow retry
   └─ Restore previous content
```

---

### Flow 4: Long-Press Context Menu

```
User Long-Presses on Post Card (200ms hold)
│
├─ Haptic Selection Feedback
│  └─ UISelectionFeedbackGenerator()
│
├─ Show Context Menu
│  ├─ Appear at tap location
│  ├─ Max width: 240pt
│  ├─ 6pt corner radius
│  └─ Spring animation (scale 0 → 1)
│
├─ Menu Items
│  ├─ "View Full Argument"
│  ├─ "Copy to Draft"
│  ├─ "Share"
│  ├─ "Bookmark"
│  └─ "Report" (if applicable)
│
├─ Tap Menu Item
│  ├─ Haptic light impact
│  ├─ Execute action
│  ├─ Dismiss menu (fade)
│  └─ Navigate if needed
│
└─ Tap Outside Menu
   └─ Dismiss (no feedback)
```

---

### Flow 5: Pinch-to-Zoom (Reading View)

```
User Pinches in Reading View
│
├─ Detect pinch gesture
│  └─ Track scale factor (1.0 - 3.0)
│
├─ Font Size Adjustment
│  ├─ Base: 16pt
│  ├─ Min: 12pt (scale 0.75)
│  ├─ Max: 24pt (scale 1.5)
│  └─ Apply to all text elements
│
├─ Line Height Adjustment
│  ├─ Scale proportionally
│  ├─ Maintain 1.6-1.8 ratio
│  └─ Ensure readability
│
├─ Visual Feedback
│  ├─ Show current size: "16pt" (hint label)
│  ├─ Fade out after pinch ends (1 sec)
│  └─ No haptic (continuous gesture)
│
└─ Persist Zoom Level
   ├─ Save to UserDefaults
   ├─ Apply on future views
   └─ Reset with app restart (optional)
```

---

## SCREEN TRANSITION FLOWS

### Tab Switching Navigation

```
User Taps Different Tab
│
├─ Haptic Selection Feedback
│  └─ UISelectionFeedbackGenerator()
│
├─ Tab Bar Animation
│  ├─ Selected icon scales (0.95 → 1.1)
│  ├─ Icon color animates (400ms)
│  └─ Label font-weight increases
│
├─ Content Transition
│  ├─ Fade transition (200ms)
│  │  └─ For same-level tabs
│  │
│  └─ Push/Pop for hierarchical navigation
│
├─ State Preservation
│  ├─ Save scroll position per tab
│  ├─ Restore when returning
│  └─ Maintain form state (unsaved)
│
└─ Scroll Position Reset
   ├─ If data refreshed: Jump to top
   ├─ If no refresh: Preserve position
   └─ Smooth animation with timing curve
```

---

### Modal Sheet Presentation

```
User Taps "Create Argument" (Write Tab)
│
├─ Present Half-Sheet
│  ├─ Height: 40% of screen
│  ├─ Corner radius: 20pt (top)
│  ├─ Background: White/80 blur
│  └─ Drag indicator: Yes (optional)
│
├─ Animation
│  ├─ Slide up from bottom (300ms)
│  ├─ Fade in background (300ms)
│  └─ Spring curve (stiffness: 200)
│
├─ User Interaction
│  ├─ Swipe down to dismiss
│  ├─ Tap outside to dismiss
│  ├─ Tap CTA to advance flow
│  └─ Haptic feedback per action
│
├─ Scroll Behavior
│  ├─ Content scrolls within sheet
│  ├─ Pull-down threshold: 200pt
│  └─ Dismiss momentum from swipe
│
└─ Dismiss Animation
   ├─ Slide down (300ms)
   ├─ Fade out background
   └─ Spring curve (bounce if needed)
```

---

### Full-Screen Modal (Editor)

```
User Selects "Edit Argument"
│
├─ Present Full-Screen
│  ├─ Covers entire screen (safe area)
│  ├─ Title bar with close (X) button
│  └─ Keyboard handling: Push content up
│
├─ Animation
│  ├─ Slide from right (250ms)
│  ├─ No background dimming
│  └─ Easing: easeOut
│
├─ Keyboard Integration
│  ├─ Detect keyboard appearance
│  ├─ Adjust content inset (animated)
│  ├─ Show formatting toolbar above keyboard
│  └─ Handle keyboard dismiss
│
├─ Auto-Save During Edit
│  ├─ Save 2 seconds after stop typing
│  ├─ Show "Saving..." indicator
│  └─ Persist to database
│
├─ Unsaved Changes
│  ├─ Show indicator dot in title
│  ├─ Warn on close if modified
│  └─ Allow save/discard options
│
└─ Close Modal
   ├─ Slide to right (250ms)
   ├─ Dismiss keyboard
   └─ Trigger save confirmation if needed
```

---

## SPECIFIC INTERACTION DETAILS

### Argument Card Expand/Collapse

```
Initial State: Collapsed Card (120pt height)
│
├─ Show: Avatar + Name + Position Badge
├─ Show: 2-line preview text
├─ Show: Snap/Zap/Depth metrics
└─ Show: "Expand ▼" button

User Taps Card or Expand Button
│
├─ Animation (400ms)
│  ├─ Content expand upward
│  ├─ Height animate to full
│  ├─ Show full argument text (fade in)
│  ├─ Author info expand
│  ├─ Depth score card appear
│  └─ Comments section fade in
│
├─ Haptic Feedback
│  └─ Light impact (14pt)
│
├─ Scroll Behavior
│  ├─ Expanded card stays centered
│  ├─ Other cards scroll out of view
│  └─ Pull-to-collapse if needed
│
└─ Tap Collapse
   ├─ Animation reverse (400ms)
   ├─ Return to compact state
   └─ Scroll position adjusted
```

---

### Depth Score Breakdown Reveal

```
Initial State: Compact Badge
┌──────────────┐
│ 📈 Depth: 72 │
│ Exceptional  │
└──────────────┘

User Taps Badge
│
├─ Animation (300ms)
│  ├─ Badge scale: 1.0 → 1.05
│  ├─ Breakdown card fade in below
│  ├─ Spring curve on appearance
│  └─ Cast shadow increases
│
├─ Breakdown Card Content
│  ├─ Animated progress bars
│  │  ├─ Bar fills left-to-right
│  │  ├─ Duration: 500ms per bar
│  │  ├─ Stagger: 100ms between bars
│  │  └─ Easing: easeInOut
│  │
│  └─ Value counters
│     ├─ Number animates 0 → final value
│     ├─ Duration: 600ms
│     └─ Easing: easeOut
│
├─ Tap Again to Collapse
│  └─ Reverse animation (300ms)
│
└─ Tap Outside
   └─ Dismiss with fade (200ms)
```

---

### Streak Shield Purchase & Animation

```
User Views Streak Display
│
├─ Current State: 🔥 5 days (unprotected)
│
├─ User Taps "Use Streak Shield"
│  ├─ Show confirmation dialog
│  └─ Cost: 10 influence points
│
├─ User Confirms Purchase
│  ├─ Haptic heavy impact (32pt)
│  │
│  ├─ Shield Icon Animation
│  │  ├─ Shield appears, scale 0 → 1 (300ms)
│  │  ├─ Shine effect (gradient animation)
│  │  ├─ Glow effect (shadow pulse)
│  │  └─ Particles around shield (5 items)
│  │
│  ├─ Counter Update
│  │  ├─ Influence score decreases
│  │  ├─ Animation: scale 1 → 0.8 → 1
│  │  └─ Color flash (orange brief)
│  │
│  └─ Notification
│     ├─ Toast: "Shield activated! ✨"
│     ├─ Duration: 2 seconds
│     └─ Position: Bottom-right
│
└─ New State: 🔥 5 days 🛡️ (protected)
```

---

### Voice Dictation Waveform Animation

```
User Taps 🎤 Microphone Icon
│
├─ Audio Engine Starts
│  └─ Request microphone permission (if needed)
│
├─ Waveform Visualization
│  ├─ 7 vertical bars (center-aligned)
│  ├─ Height range: 20-60pt
│  ├─ Color: Teal-600
│  ├─ Update rate: 60 FPS
│  ├─ Responsive to audio level
│  │
│  └─ Animation details:
│     ├─ Bar animation: Ease-out curve
│     ├─ Decay time: 150ms (after audio peak)
│     ├─ Minimum height: 8pt
│     ├─ Max height: 60pt
│     └─ Spacing between bars: 4pt
│
├─ Real-time Transcription
│  ├─ Display below waveform
│  ├─ Update as speech recognized
│  ├─ Latency: <250ms from speech
│  ├─ Sentence capitalization: Auto
│  └─ Punctuation: Auto (periods, question marks)
│
├─ User Stops Speaking
│  ├─ Silence detection: 3 seconds
│  ├─ Waveform fades out
│  ├─ Show final transcription
│  └─ Haptic success feedback
│
└─ User Taps "Stop"
   ├─ Audio recording stops
   ├─ Waveform animation ends
   ├─ Transcription inserted at cursor
   └─ Ready for editing
```

---

## ACCESSIBILITY GESTURE CUSTOMIZATION

### VoiceOver Optimized Gestures

```
Standard Tap
├─ Activate selected element
├─ Read element description
└─ Haptic feedback: Selection changed

Double-Tap
├─ Snap vote (on argument)
├─ Open detail view
└─ Haptic feedback: Light impact

Three-Finger Tap
├─ Toggle dark mode
└─ Haptic feedback: Success pattern

Swipe Right
├─ Previous element (focus navigation)
└─ Haptic feedback: Selection changed

Swipe Left
├─ Next element (focus navigation)
└─ Haptic feedback: Selection changed

Swipe Up
├─ Read status bar
└─ Haptic feedback: None

Swipe Down
├─ Read page summary
└─ Haptic feedback: None

Two-Finger Z Gesture
├─ Toggle custom rotor
└─ Haptic feedback: Selection changed

Magic Tap (Two-Finger Double-Tap)
├─ Publish argument (from editor)
├─ Refresh feed
└─ Haptic feedback: Success
```

---

## GESTURE CONFLICT RESOLUTION

### Priority When Gestures Overlap

```
If multiple gestures possible in same context:

1. Long-Press (200ms minimum hold)
   └─ Takes precedence over tap

2. Swipe (80pt minimum movement)
   └─ Takes precedence over drag

3. Double-Tap (2 taps within 0.2s)
   └─ Takes precedence over single tap

4. Pinch (two-finger, >10pt distance)
   └─ Cannot conflict with others

5. Pan (continuous movement)
   └─ Low priority, can be interrupted
```

### Example: Argument Card Long-Press vs Tap

```
User Action Timeline:

0ms:      Touch down on card
├─ Start detecting all gestures
│
100ms:    Touch still held, no movement
├─ Long-press timer starts
│
200ms:    Long-press threshold reached
├─ Haptic selection feedback (if hold continues)
├─ Show context menu preview
├─ Cancel tap detection
│
300ms:    User releases touch
├─ If held >200ms: Execute long-press action
├─ If held <200ms: Execute tap action
└─ Hide context menu

If user moves >10pt during hold:
├─ Cancel both gestures
├─ Start pan/swipe detection
└─ No haptic feedback
```

---

## ANIMATION CURVES & TIMING

### Standard Animation Curves

```
Easing: easeInOut
├─ Duration: 300-400ms (standard transitions)
├─ Stiffness: 170
├─ Damping: 26
└─ Use for: Card open/close, modal dismiss

Spring: Medium Bounce
├─ Duration: 250-350ms
├─ Stiffness: 300
├─ Damping: 30
└─ Use for: Button press, expand animations

Spring: High Energy
├─ Duration: 150-200ms
├─ Stiffness: 400
├─ Damping: 20
└─ Use for: Snap feedback, impact animations

Linear
├─ Duration: 200-300ms
├─ Curve: 1:1 timing
└─ Use for: Progress indicators, continuous motion

Decay
├─ Initial velocity: User swipe velocity
├─ Deceleration: 0.998
└─ Use for: Momentum scroll, swipe completion
```

---

