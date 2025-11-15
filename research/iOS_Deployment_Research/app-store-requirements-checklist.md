# App Store Requirements Checklist

Everything Apple needs to approve and publish your iOS app.

---

## 1. Apple Developer Program Membership

### Account Setup
- [ ] **Apple ID created** with two-factor authentication enabled
- [ ] **Valid payment method** added to Apple ID
- [ ] **Email verification** completed

### Enrollment Type Decision
Choose one:
- [ ] **Individual Account** - For solo developers
  - Cost: $99/year USD
  - No D-U-N-S number required
  - Apps published under your personal name

- [ ] **Organization Account** - For companies/entities
  - Cost: $99/year USD
  - **D-U-N-S Number required** (allow 7+ business days)
  - Must be a legal entity (corporation, LLC, LLP)
  - NOT for DBAs, fictitious businesses, or trade names
  - Apps published under company name

### D-U-N-S Number (Organizations Only)
- [ ] Request D-U-N-S number from Dun & Bradstreet (free)
- [ ] Wait 5 business days to receive number
- [ ] Wait additional 2 business days for Apple to receive data from D&B
- [ ] Verify legal entity name matches exactly

### Program Enrollment
- [ ] Submit enrollment application
- [ ] Accept Apple Developer Program License Agreement
- [ ] Complete payment ($99/year)
- [ ] Wait for approval (typically 24-48 hours, can take longer for organizations)

---

## 2. Technical Requirements

### iOS Version Support
- [ ] **Minimum iOS version** determined (recommend iOS 15.0+ for 2025)
- [ ] App tested on minimum supported iOS version
- [ ] App tested on latest iOS version

### Device Compatibility
- [ ] iPhone compatibility verified
- [ ] iPad compatibility decided and configured
- [ ] All device sizes tested (if supporting multiple)
- [ ] App works in both portrait and landscape (if applicable)

### Build Requirements
- [ ] **Xcode** installed (or alternative build solution)
- [ ] Valid **provisioning profile** created
- [ ] **Code signing certificate** configured
- [ ] App successfully builds without errors
- [ ] **No crashes** during testing on real devices
- [ ] All advertised features fully functional

### Performance Standards
- [ ] App launches within 3 seconds
- [ ] No memory leaks or excessive battery drain
- [ ] Smooth scrolling and animations (60fps target)
- [ ] Handles network interruptions gracefully
- [ ] Works on low-end devices within support range

---

## 3. Privacy Requirements (MANDATORY)

### Privacy Policy
- [ ] **Privacy policy URL** created and hosted
- [ ] Privacy policy accessible without login
- [ ] Privacy policy in English (and other supported languages)
- [ ] Privacy policy covers ALL data collection
- [ ] Privacy policy includes:
  - [ ] What data is collected
  - [ ] How data is used
  - [ ] Third-party data sharing
  - [ ] User rights (access, deletion, portability)
  - [ ] Contact information
  - [ ] Cookie/tracking disclosure

### Privacy Nutrition Labels (App Store Connect)
- [ ] All data collection types identified
- [ ] Third-party SDK data collection documented
- [ ] Data linked to user identity specified
- [ ] Data used for tracking specified
- [ ] Questions answered for:
  - [ ] Contact Info
  - [ ] Health & Fitness
  - [ ] Financial Info
  - [ ] Location
  - [ ] Sensitive Info
  - [ ] Contacts
  - [ ] User Content
  - [ ] Browsing History
  - [ ] Search History
  - [ ] Identifiers
  - [ ] Purchases
  - [ ] Usage Data
  - [ ] Diagnostics
  - [ ] Other Data

### Privacy Manifest (Required as of May 1, 2024)
- [ ] **Privacy manifest file** created for your app
- [ ] Required reason APIs documented
- [ ] Third-party SDKs on Apple's list include privacy manifests
- [ ] Valid signatures for binary dependencies
- [ ] For Supabase usage:
  - [ ] Network data collection disclosed
  - [ ] Authentication data collection disclosed
  - [ ] Database operations data disclosed

### GDPR Compliance (if targeting EU users)
- [ ] Cookie consent mechanism (if applicable)
- [ ] Data deletion mechanism available
- [ ] Data export mechanism available
- [ ] Legal basis for processing identified

---

## 4. Content Guidelines Compliance

### Prohibited Content Check
Verify your app does NOT contain:
- [ ] Pornography or overtly sexual content
- [ ] Defamatory, discriminatory, or hateful content
- [ ] Realistic portrayals of extreme violence
- [ ] Illegal drugs or excessive alcohol/tobacco use
- [ ] Gambling with real money (without proper licensing)
- [ ] Promotion of terrorist organizations
- [ ] Misleading or deceptive content
- [ ] Content that encourages illegal activities

### Age Rating Determination
- [ ] **Age rating questionnaire completed** in App Store Connect
- [ ] Honest answers about content frequency
- [ ] AI/chatbot features considered in rating
- [ ] Rating appropriate for all app features
- [ ] **Deadline aware**: All apps must have updated ratings by January 31, 2026

### Age Rating Categories
Choose the appropriate rating based on content:
- **4+** - No objectionable content
- **9+** - Mild or infrequent content
- **13+** - Moderate content
- **16+** - Frequent mature content
- **18+** - Restricted content

### Metadata Age Rating
- [ ] App icon appropriate for 4+ rating (regardless of app rating)
- [ ] Screenshots appropriate for 4+ rating
- [ ] Preview videos appropriate for 4+ rating
- [ ] App description appropriate for all ages

---

## 5. App Metadata Requirements

### Basic Information
- [ ] **App Name** (max 30 characters)
  - [ ] Name available in App Store (search to verify)
  - [ ] Follows naming guidelines (no special characters like ™ unless owned)
  - [ ] Relevant to app function

- [ ] **Subtitle** (max 30 characters)
  - [ ] Clear, concise value proposition
  - [ ] No keyword stuffing

- [ ] **Primary Language** selected

- [ ] **Bundle ID** created (reverse domain format: com.company.appname)
  - [ ] Cannot be changed after creation

- [ ] **SKU** (internal identifier, not visible to users)

### Descriptions
- [ ] **Description** written (max 4,000 characters)
  - [ ] First 170 characters compelling (visible without "more")
  - [ ] Clear explanation of app purpose
  - [ ] Key features highlighted
  - [ ] No competitor comparisons
  - [ ] No pricing/promotional language in description
  - [ ] Accurate representation of app functionality

- [ ] **Promotional Text** (max 170 characters, can be updated anytime)
  - [ ] Optional but recommended
  - [ ] Can highlight current features or promotions

### Keywords (Apple App Store)
- [ ] **Keywords** selected (max 100 characters total)
  - [ ] No app name repetition
  - [ ] No competitor names
  - [ ] No category names
  - [ ] Comma-separated (no spaces after commas)
  - [ ] Research completed for high-volume, low-difficulty keywords
  - [ ] Different keyword sets per locale

### Categories
- [ ] **Primary Category** selected
- [ ] **Secondary Category** selected (optional but recommended)
- [ ] Categories accurately reflect app function

### Support Information
- [ ] **Support URL** (customer support website)
  - [ ] URL active and functional
  - [ ] No login required to access

- [ ] **Marketing URL** (optional - app homepage)
  - [ ] URL active and functional

- [ ] **Copyright** information (format: "2025 Company Name")

---

## 6. Visual Assets

### App Icon
- [ ] **1024x1024 px** PNG file created
- [ ] Square shape, no rounded corners (Apple adds these)
- [ ] No transparency
- [ ] No alpha channels
- [ ] Opaque, solid background
- [ ] Simple, memorable design
- [ ] Recognizable at small sizes
- [ ] No text unless essential to brand
- [ ] Looks good on light and dark backgrounds

### Screenshots (REQUIRED)

#### iPhone Screenshots
Must provide for at least ONE of these sizes:
- [ ] **6.7" display** (1290 x 2796 px portrait OR 2796 x 1290 px landscape)
  - iPhone 15 Pro Max, iPhone 15 Plus, iPhone 14 Pro Max

- [ ] **6.5" display** (1242 x 2688 px portrait OR 2688 x 1242 px landscape)
  - iPhone 11 Pro Max, iPhone XS Max

- [ ] **5.5" display** (1242 x 2208 px portrait OR 2208 x 1242 px landscape)
  - iPhone 8 Plus, iPhone 7 Plus

#### iPad Screenshots (if supporting iPad)
- [ ] **12.9" iPad Pro** (2048 x 2732 px portrait OR 2732 x 2048 px landscape)

#### Screenshot Requirements
- [ ] JPEG or PNG format, RGB color space
- [ ] 72 DPI resolution
- [ ] No transparency
- [ ] 1-10 screenshots per device size
- [ ] **First 3 screenshots are critical** (shown in search results)
- [ ] Show app in actual use (not just splash screens)
- [ ] No status bars visible
- [ ] Screenshots match app functionality exactly
- [ ] Optional: Marketing overlays with text/graphics

### App Preview Videos (Optional but Recommended)
- [ ] .mov, .m4v, or .mp4 format
- [ ] H.264 encoding (or ProRes 422 HQ for .mov)
- [ ] 15-30 seconds duration recommended
- [ ] Up to 3 previews per device size
- [ ] Shows actual app functionality
- [ ] No placeholder/demo content
- [ ] Appropriate for 4+ rating

---

## 7. Pricing and Availability

### Pricing
- [ ] **Price tier** selected (Free or Paid)
- [ ] If paid: Price tier selected ($0.99 - $999.99)
- [ ] Currency conversions reviewed for all regions

### In-App Purchases (if applicable)
- [ ] All IAPs created in App Store Connect
- [ ] IAP descriptions written
- [ ] IAP screenshots provided
- [ ] IAP pricing configured
- [ ] **Apple's 30% commission understood**
- [ ] Digital goods MUST use Apple IAP (not external payment)

### Availability
- [ ] **Release date** decided
  - [ ] Manual release (you control when it goes live)
  - [ ] Automatic release (goes live immediately after approval)

- [ ] **Geographic availability** selected
  - [ ] All territories (recommended for most apps)
  - [ ] Specific countries only

- [ ] **Pre-order** decided (optional, requires 2-180 days lead time)

---

## 8. Legal and Compliance

### Terms and Conditions
- [ ] User agreement/TOS created and accessible
- [ ] Content policy defined (if UGC app)
- [ ] Community guidelines published (if social app)

### Export Compliance
- [ ] Export compliance questions answered
- [ ] Encryption usage declared
- [ ] CCATS or ERN provided if using strong encryption

### Content Rights
- [ ] All content in app is original or properly licensed
- [ ] No copyright infringement
- [ ] Proper attribution for third-party content
- [ ] User-generated content moderation plan (if applicable)

### Accessibility (Recommended)
- [ ] VoiceOver support implemented
- [ ] Dynamic Type supported
- [ ] Color contrast ratios meet WCAG standards
- [ ] Accessibility labels on UI elements
- [ ] Keyboard navigation support (where applicable)

---

## 9. Testing Checklist

### Functional Testing
- [ ] All features work as described
- [ ] No broken links or placeholder content
- [ ] Forms validate properly
- [ ] Error messages are clear and helpful
- [ ] Offline functionality works (if claimed)
- [ ] Push notifications work (if implemented)
- [ ] Sign in/sign up flows complete successfully
- [ ] Password reset works
- [ ] Deep links work correctly

### Device Testing
- [ ] Tested on iPhone (multiple models if possible)
- [ ] Tested on iPad (if supporting iPad)
- [ ] Tested on minimum supported iOS version
- [ ] Tested on latest iOS version
- [ ] Tested on low-end device within support range
- [ ] Tested on high-end device

### Performance Testing
- [ ] No crashes during extended use
- [ ] No memory leaks
- [ ] Acceptable battery usage
- [ ] Fast app launch times
- [ ] Smooth animations and scrolling
- [ ] Proper handling of low memory warnings

### Network Testing
- [ ] Works on WiFi
- [ ] Works on cellular data
- [ ] Handles network interruptions
- [ ] Shows appropriate loading states
- [ ] Displays error messages for network failures

---

## 10. App Store Connect Build Upload

### Build Preparation
- [ ] Archive created in Xcode (or alternative tool)
- [ ] Archive validated with Xcode validation tools
- [ ] All warnings addressed
- [ ] Build number incremented from previous version

### Upload Method Selected
Choose one:
- [ ] **Xcode** (direct upload, requires Mac)
- [ ] **Transporter app** (requires Mac, can upload without Xcode)
- [ ] **Fastlane** (command-line automation)
- [ ] **CI/CD pipeline** (GitHub Actions, Bitrise, etc.)
- [ ] **Third-party service** (if using submission service)

### Build Upload
- [ ] .ipa file uploaded to App Store Connect
- [ ] Build processing complete (can take 15-60 minutes)
- [ ] No errors in build processing
- [ ] Build appears in TestFlight
- [ ] Build selected for App Store submission

---

## 11. TestFlight Beta Testing (Highly Recommended)

### Internal Testing
- [ ] Internal testers added (up to 100)
- [ ] Build distributed to internal testers
- [ ] Feedback collected
- [ ] Critical bugs fixed

### External Testing (Optional)
- [ ] Beta App Review submitted (required for external testing)
- [ ] External testers invited (up to 10,000)
- [ ] Test flight public link created (optional)
- [ ] Feedback collected
- [ ] Issues addressed

---

## 12. Pre-Submission Verification

### Final Checks
- [ ] All metadata fields completed
- [ ] All screenshots uploaded for required device sizes
- [ ] App icon uploaded
- [ ] Privacy policy URL added
- [ ] Privacy nutrition labels completed
- [ ] Age rating set
- [ ] Keywords entered
- [ ] Build selected
- [ ] Pricing configured
- [ ] Availability settings confirmed
- [ ] Export compliance completed

### App Store Review Information
- [ ] **Demo account credentials** provided (if app requires login)
  - [ ] Username/email
  - [ ] Password
  - [ ] Account has access to all features

- [ ] **Review notes** added explaining:
  - [ ] Special configurations needed
  - [ ] How to test specific features
  - [ ] Any testing limitations
  - [ ] Third-party service dependencies

- [ ] **Contact information** (name, phone, email)

### Common Pitfalls to Avoid
- [ ] No placeholder text or "Lorem ipsum"
- [ ] No broken features or "Coming soon" functionality
- [ ] No crashes or obvious bugs
- [ ] No misleading screenshots
- [ ] No references to non-iOS platforms (Android, Windows)
- [ ] No "beta" or "demo" labels (unless actually a beta)
- [ ] Privacy policy is not a 404 page

---

## 13. Submission

### Submit for Review
- [ ] All above checklist items completed
- [ ] "Submit for Review" button clicked
- [ ] Submission confirmation received
- [ ] Status changes to "Waiting for Review"

### Timeline Expectations
- **Validation**: Immediate (catches basic errors)
- **Waiting for Review**: Minutes to 24 hours
- **In Review**: 12-48 hours (90% reviewed within 24 hours)
- **Processing for App Store**: 1-24 hours after approval

### Monitor Review Status
- [ ] Check App Store Connect regularly
- [ ] Email notifications enabled
- [ ] Ready to respond to questions within 24 hours

---

## 14. If Rejected (Don't Panic!)

### Review Rejection Response
- [ ] Read rejection reason carefully
- [ ] Identify specific guideline violated
- [ ] Make necessary changes to app or metadata
- [ ] Respond via Resolution Center if needed
- [ ] Resubmit with fixes

### Common Reasons for Rejection (88% of rejections)
- Missing or inaccessible privacy policy
- Incomplete app information
- Crashes or bugs
- Missing demo account credentials
- Broken links or features
- Metadata doesn't match app functionality
- Privacy labels incomplete or inaccurate
- Age rating inaccurate

### Appeal Process (if rejection seems unfair)
- [ ] Use App Review Board appeal
- [ ] Clearly explain why rejection is incorrect
- [ ] Provide evidence supporting your case
- [ ] Be professional and respectful

---

## 15. Post-Approval

### After Approval
- [ ] Verify app appears in App Store search
- [ ] Test App Store listing on actual devices
- [ ] Verify all links work in live listing
- [ ] Monitor reviews and ratings
- [ ] Respond to user feedback

### Ongoing Requirements
- [ ] Renew Apple Developer Program annually ($99/year)
- [ ] Update privacy information when practices change
- [ ] Update app for new iOS versions
- [ ] Address critical bugs quickly
- [ ] Keep contact information current
- [ ] Maintain privacy policy URL

---

## Quick Start Timeline Estimate

**Individual Developer with existing Apple ID:**
- Days 1-2: Enroll in Apple Developer Program, wait for approval
- Days 2-7: Finalize app, fix bugs, create privacy policy
- Days 7-8: Create app icon and screenshots
- Day 8: Create App Store Connect record, upload build
- Day 9: Complete all metadata, submit for review
- Days 10-11: Review process (typically 24-48 hours)
- Day 12: App live in App Store!

**Organization (Company):**
- Days 1-7: Request D-U-N-S number, wait for processing
- Days 8-9: Enroll in Apple Developer Program, wait for approval
- Days 10-16: Finalize app, create assets, upload build
- Day 17: Submit for review
- Days 18-19: Review process
- Day 20: App live in App Store!

**Realistic Timeline with Buffer: 2-4 weeks from start to live app**

---

## Resources

- **Apple Developer Portal**: https://developer.apple.com
- **App Store Connect**: https://appstoreconnect.apple.com
- **App Store Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **App Store Connect Help**: https://developer.apple.com/help/app-store-connect/
- **Privacy Requirements**: https://developer.apple.com/app-store/app-privacy-details/
- **D-U-N-S Number Lookup**: https://developer.apple.com/enroll/duns-lookup/
- **Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/

---

**Last Updated**: November 2024
**Note**: Apple's requirements change periodically. Always verify with official Apple documentation before submission.
