# App Store Submission Process Timeline

A detailed, step-by-step guide with realistic time estimates for first-time app publishers.

---

## Overview: What to Expect

**Total Timeline for First-Time Publishers:**
- **Minimum**: 12-14 days (everything goes perfectly)
- **Realistic**: 3-4 weeks (includes buffer for learning and minor issues)
- **With Complications**: 4-8 weeks (rejections, D-U-N-S delays, organizational approval)

**Key Factor**: Whether you're enrolling as an individual or organization significantly impacts timeline.

---

## Phase 1: Pre-Submission Preparation

### Step 1.1: Apple Developer Program Enrollment

#### Option A: Individual Developer
**Timeline: 1-3 days**

**Day 1: Application**
- Create/verify Apple ID (30 minutes)
- Enable two-factor authentication (15 minutes)
- Access https://developer.apple.com/programs/enroll/
- Complete enrollment form (30 minutes)
  - Personal information
  - Contact details
  - Accept license agreement
- Submit payment ($99 USD)
- **Status**: Pending review

**Days 1-2: Approval Wait**
- Apple reviews application
- Typical approval: 24-48 hours
- Can take up to 5 business days
- Email confirmation when approved

**Total Time: 1-3 days**

#### Option B: Organization/Company
**Timeline: 7-14 days**

**Days 1-5: D-U-N-S Number Acquisition**
- Check if your organization has a D-U-N-S number (search at developer.apple.com/enroll/duns-lookup/)
- If not, request from Dun & Bradstreet (free)
  - Submit organization information
  - Legal entity name must match exactly
  - Processing time: up to 5 business days
- Verify information is correct in D&B database
- Wait additional 2 business days for Apple to sync with D&B

**Important**: DBAs, fictitious businesses, trade names, and branches are NOT accepted. Must be a recognized legal entity (corporation, LLC, LLP).

**Days 6-7: Apple Developer Enrollment**
- Complete enrollment form with:
  - Legal entity information
  - D-U-N-S number
  - Legal representative details
  - Contact information
- Submit payment ($99 USD)
- **Status**: Pending verification

**Days 7-14: Organization Verification**
- Apple verifies legal entity status
- May require additional documentation
- Phone verification call possible
- Typical approval: 3-7 business days
- Can take up to 2 weeks for complex entities

**Total Time: 7-14 days**

---

### Step 1.2: Create Privacy Policy

**Timeline: 1-3 days**

**Day 1: Draft Privacy Policy**
- Research requirements (2-3 hours)
- Draft privacy policy covering:
  - Data collection types
  - Data usage
  - Third-party sharing (Supabase, analytics, etc.)
  - User rights (access, deletion, export)
  - Contact information
  - Cookie/tracking disclosure
  - GDPR compliance (if targeting EU)
- Review for completeness (1 hour)

**Day 2: Legal Review (Recommended)**
- Have lawyer review (if budget allows)
- Or use privacy policy generator with customization
- Ensure all Supabase data collection is disclosed
- Verify third-party SDK disclosures

**Day 3: Publish Privacy Policy**
- Host on website at permanent URL
- Ensure accessible without login
- Test accessibility from different devices
- Save URL for App Store Connect

**Total Time: 1-3 days** (can overlap with other preparation)

---

### Step 1.3: Prepare Visual Assets

**Timeline: 2-5 days**

**Day 1-2: App Icon Design**
- Design 1024x1024 px app icon
- Requirements:
  - Square, no rounded corners
  - No transparency
  - Simple and memorable
  - Recognizable at small sizes
  - No text unless essential
- Test on different backgrounds
- Export as PNG

**Time**: 4-8 hours (or 1-2 days if hiring designer)

**Day 2-4: Screenshots**
- Plan screenshot content (2 hours)
  - First 3 are most important (shown in search)
  - Show app in actual use
  - Highlight key features
  - Remove status bars

- Create screenshots for required device sizes:
  - **iPhone 6.7"**: 1290 x 2796 px (portrait) or 2796 x 1290 px (landscape)
  - OR iPhone 6.5": 1242 x 2688 px
  - OR iPhone 5.5": 1242 x 2208 px
  - **iPad** (if supporting): 2048 x 2732 px or 2732 x 2048 px

- Options:
  - Pure screenshots from app (quickest)
  - Screenshots with marketing overlays (recommended)
  - Design tools: Figma, Photoshop, Screenshot Designer

- Create 3-10 screenshots per device size
- Export as JPEG or PNG, RGB, 72 DPI

**Time**: 1-3 days depending on complexity

**Day 4-5: App Preview Video (Optional)**
- Script 15-30 second app preview
- Record screen capture
- Edit video
- Export in required format (.mov, .m4v, .mp4)
- H.264 encoding
- Keep under 500 MB file size

**Time**: 4-8 hours (optional, can skip for faster launch)

**Total Time: 2-5 days**

---

### Step 1.4: Write App Store Metadata

**Timeline: 1-2 days**

**App Name Selection**
- Brainstorm options (1 hour)
- Search App Store to check availability
- Select name (max 30 characters)
- Verify follows Apple naming guidelines

**Subtitle Creation**
- Write compelling subtitle (max 30 characters)
- Test different options
- Avoid keyword stuffing

**Description Writing**
- Research competitor descriptions (1 hour)
- Write compelling description (max 4,000 characters)
  - **First 170 characters are critical** (visible without "more")
  - Clear explanation of app purpose
  - Highlight key features
  - Use bullet points for readability
  - No pricing information
  - No competitor comparisons
- Review and edit (1 hour)

**Promotional Text**
- Write optional promotional text (max 170 characters)
- Can be updated anytime without new review
- Use for current promotions or feature highlights

**Keyword Research**
- Research high-volume, low-difficulty keywords (2-3 hours)
- Tools: App Store search, ASO platforms (AppTweak, Sensor Tower, etc.)
- Compile list within 100 character limit
- Format: comma-separated, no spaces
- Avoid: app name, competitor names, category names
- Create different sets for different locales

**Category Selection**
- Choose primary category
- Choose secondary category (optional but recommended)
- Ensure categories match app function

**Support URLs**
- Create/verify support URL
- Create marketing URL (optional)
- Test both URLs are accessible

**Total Time: 1-2 days**

---

## Phase 2: Build Preparation and Upload

### Step 2.1: Finalize and Test App

**Timeline: 3-7 days** (depends on app state)

**Complete All Features**
- Ensure all features are fully functional
- No "Coming soon" placeholders
- No beta/demo labels
- All links work
- Error handling implemented

**Bug Fixing**
- Test on multiple devices
- Test on minimum iOS version
- Test on latest iOS version
- Fix all crashes
- Ensure smooth performance

**Privacy Implementation**
- Implement data collection transparency
- Add required disclosures
- Test data flows
- Verify third-party SDKs

**Total Time: 3-7 days** (may already be complete)

---

### Step 2.2: Configure Code Signing

**Timeline: 0.5-2 days**

**First Time Setup**
- Create App ID in Apple Developer Portal (15 minutes)
- Create certificates (30 minutes)
  - Development certificate
  - Distribution certificate
- Create provisioning profiles (30 minutes)
  - Development profile
  - App Store distribution profile
- Download and install in Xcode (15 minutes)

**Subsequent Builds**
- Verify certificates are valid (5 minutes)
- Update if needed (30 minutes)

**Common Issues Resolution**
- Certificate expired: 30 minutes to renew
- Provisioning profile issues: 1-2 hours troubleshooting

**Total Time: 0.5 days for smooth process, up to 2 days if troubleshooting**

---

### Step 2.3: Create Archive and Validate

**Timeline: 0.5-1 day**

**Create Archive**
- In Xcode: Product → Archive
- Wait for build completion (5-20 minutes)
- **Status**: Archive created

**Validate Archive**
- Use Xcode validation tools (5 minutes)
- Fix any warnings or errors
- Common issues:
  - Missing icons
  - Incorrect bundle ID
  - Code signing issues
  - Missing required device capabilities

**Fix Validation Issues**
- Time varies: 1 hour to 1 day depending on issues

**Total Time: 0.5-1 day**

---

### Step 2.4: Upload Build to App Store Connect

**Timeline: 0.5 day**

**Upload Method Selection**

Choose one:
1. **Xcode Upload** (most common for first-timers)
   - Click "Distribute App" in Xcode
   - Select "App Store Connect"
   - Follow prompts
   - Upload time: 5-30 minutes depending on app size and internet speed

2. **Transporter App**
   - Export .ipa from Xcode
   - Open Transporter app
   - Drag and drop .ipa
   - Upload time: 5-30 minutes

3. **Fastlane** (for advanced users/CI-CD)
   - Configure fastlane
   - Run `fastlane deliver`
   - Upload time: 5-30 minutes

**Build Processing**
- After upload, App Store Connect processes build
- Processing time: 15-60 minutes (sometimes up to 2 hours)
- Email notification when complete
- Build appears in TestFlight section
- **Status**: Ready for testing

**Common Upload Issues**
- Network timeout: retry upload
- Build processing error: check email for specific issue
- Invalid binary: review error messages, fix, and re-upload

**Total Time: 0.5 day**

---

### Step 2.5: TestFlight Beta Testing (Highly Recommended)

**Timeline: 2-7 days** (optional but highly recommended)

**Internal Testing**
- Add internal testers (up to 100, must have App Store Connect access)
- Distribute build to testers
- Testers install via TestFlight app
- Collect feedback (2-5 days)
- Fix critical bugs
- Upload new build if needed

**External Testing** (optional)
- Submit for Beta App Review (required for external testing)
- Review time: typically 24 hours
- Add external testers (up to 10,000)
- Create public link (optional)
- Collect feedback (3-7 days)
- Fix issues
- Upload final build

**Total Time: 2-7 days** (optional, can skip to go live faster)

---

## Phase 3: App Store Connect Setup

### Step 3.1: Create App Record

**Timeline: 0.5 day**

**Create New App**
- Log in to App Store Connect
- Click "My Apps" → "+" → "New App"
- Fill in initial details:
  - Platform: iOS
  - App Name (must be unique, max 30 characters)
  - Primary Language
  - Bundle ID (select from dropdown - created in Developer Portal)
  - SKU (internal identifier, e.g., "philosophy-app-001")
- Click "Create"
- **Status**: Prepare for Submission

**Total Time: 30 minutes - 2 hours** (if name availability issues)

---

### Step 3.2: Complete App Information

**Timeline: 1 day**

**Pricing and Availability** (30 minutes)
- Select price tier (Free or Paid $0.99-$999.99)
- Select available territories (All or specific countries)
- Set release option:
  - Manual: You control release after approval
  - Automatic: Goes live immediately after approval
- Configure pre-orders (optional)

**App Information** (1 hour)
- Enter subtitle (max 30 characters)
- Primary and secondary categories
- Content rights (confirm you own content)
- Age rating questionnaire
  - Answer honestly about content frequency
  - Consider all features including AI/chat
  - Submit questionnaire
  - Rating assigned automatically

**App Privacy** (1-2 hours) - CRITICAL
- Click "Get Started" in Privacy section
- Answer for each data type:
  - Contact Info
  - Health & Fitness
  - Financial Info
  - Location
  - Sensitive Info
  - Contacts
  - User Content
  - Browsing History
  - Search History
  - Identifiers
  - Purchases
  - Usage Data
  - Diagnostics
  - Other Data

- For each collected type, specify:
  - Linked to user? (yes/no)
  - Used for tracking? (yes/no)
  - Purpose (analytics, product personalization, etc.)

- **For Supabase apps, typically collect:**
  - Email Address (Account Creation)
  - User ID (Product Personalization, App Functionality)
  - Product Interaction (Analytics)
  - Usage Data (Analytics)

- Save privacy information
- **Must be accurate and complete**

**Total Time: 3-4 hours**

---

### Step 3.3: Complete Version Information

**Timeline: 1 day**

**Version Details** (30 minutes)
- Version number (start with 1.0)
- Copyright (format: "2025 Your Company Name")
- Upload screenshots for required device sizes
  - Drag and drop images
  - Verify correct order (first 3 most important)
- Upload app icon (1024x1024 px PNG)

**Description and Metadata** (1 hour)
- Enter description (up to 4,000 characters)
- Enter promotional text (up to 170 characters, optional)
- Enter keywords (up to 100 characters total)
  - Comma-separated, no spaces
- Support URL
- Marketing URL (optional)

**Build Selection** (5 minutes)
- Click "Select a build before you submit your app"
- Choose your uploaded build from dropdown
- Wait for build to be selected (can take a few minutes)

**App Review Information** (30 minutes) - CRITICAL
- Contact information (name, phone, email)
- Demo account (if app requires login):
  - Username/email
  - Password
  - **Ensure account has access to ALL features**
  - Consider creating dedicated "applereview" account
- Notes for reviewer:
  - How to test specific features
  - Any special configuration needed
  - Dependencies or limitations
  - Sample data locations
  - **Be clear and thorough**

**Version Release** (5 minutes)
- Choose release option:
  - Automatically release after approval (recommended for first version)
  - Manually release (you control timing)
  - Schedule for specific date (requires approved status first)

**Total Time: 2-3 hours**

---

### Step 3.4: Export Compliance

**Timeline: 15 minutes**

**Answer Export Compliance Questions**
- Does your app use encryption?
  - Most apps: Yes (HTTPS uses encryption)
- Does it use standard encryption?
  - Most apps: Yes
- Is your app exempt from export compliance?
  - Most apps using HTTPS only: Yes

**If Using Strong Encryption**
- May need to submit annual self-classification report
- Or obtain ERN (Encryption Registration Number)
- Or obtain CCATS from U.S. government
- Consult legal counsel if unsure

**Total Time: 15 minutes** (for standard apps)

---

## Phase 4: Submission and Review

### Step 4.1: Submit for Review

**Timeline: Immediate**

**Final Verification** (30 minutes)
- Review all information one last time
- Check all sections show green checkmarks
- Verify:
  - All metadata complete
  - Screenshots uploaded
  - Build selected
  - Privacy information complete
  - Demo account works (test it!)
  - All URLs functional
  - Export compliance answered

**Submit** (5 minutes)
- Click "Add for Review" (top right)
- **Status** changes to "Ready for Review"
- Click "Submit to App Review"
- Confirm submission
- **Status** changes to "Waiting for Review"

**Confirmation**
- Receive email confirmation
- Submission timestamp recorded

**Total Time: 30-60 minutes**

---

### Step 4.2: App Review Process

**Timeline: 24-48 hours** (typically)

**Waiting for Review**
- **Status**: "Waiting for Review"
- Duration: Minutes to 24 hours
- No action needed
- Monitor email and App Store Connect

**In Review**
- **Status**: "In Review"
- Duration: 12-48 hours
- **90% of apps reviewed within 24 hours**
- **50% reviewed within 24 hours**
- Reviewer tests your app:
  - Tests all features
  - Verifies metadata accuracy
  - Checks privacy compliance
  - Tests demo account (if provided)
  - Evaluates content against guidelines
  - Tests performance and stability

**What Reviewers Look For:**
- App doesn't crash
- All features work as described
- Privacy policy accessible
- Privacy labels accurate
- No prohibited content
- Metadata matches app
- Demo account works
- No placeholder content
- Age rating appropriate

**Response Required** (if issues found)
- **Status**: "Waiting for Developer Reply"
- Apple asks questions via Resolution Center
- **Respond within 24 hours** (best practice)
- Provide clarifications or fixes
- Review continues after response

**Expedited Review** (emergency use only)
- Can request if critical business need
- Not guaranteed
- Use sparingly
- Explain urgent need clearly

**Total Time: 24-48 hours** (90% of cases)
**Extended Time**: Up to 7 days for complex apps or advanced features

---

### Step 4.3: Review Outcome

**Timeline: Immediate notification**

#### Outcome A: Approved! 🎉

**Status**: "Pending Developer Release" (if manual release) or "Processing for App Store"

**Manual Release**
- App approved but not live
- You control when to release
- Click "Release This Version" when ready
- Processes for App Store (1-24 hours)
- Goes live

**Automatic Release**
- App automatically processes for App Store
- Processing time: 1-24 hours
- Goes live automatically
- Email notification when live

**After Live**
- **Status**: "Ready for Sale"
- Search App Store (can take a few hours to appear in search)
- Verify listing looks correct
- Monitor for user reviews
- Celebrate! 🎉

**Total Time: 1-24 hours from approval to live**

---

#### Outcome B: Rejected 😞

**Status**: "Rejected"

**Receive Rejection Notice**
- Email with rejection reason
- Specific guideline violated cited
- Details in Resolution Center

**Common Rejection Reasons** (88% of rejections are preventable):
1. **Privacy violations**
   - Missing privacy policy
   - Inaccessible privacy policy URL
   - Incomplete privacy labels
   - Privacy manifest missing (as of May 2024)

2. **Technical issues**
   - App crashes during testing
   - Broken features
   - Poor performance
   - Incomplete UI

3. **Metadata problems**
   - Misleading descriptions
   - Screenshots don't match app
   - Keyword stuffing
   - Placeholder text

4. **Insufficient functionality**
   - Too simple/limited
   - Better suited as website
   - Only useful for small group

5. **Demo account issues**
   - Credentials don't work
   - Account doesn't have full access
   - Missing required features

6. **Content issues**
   - Prohibited content
   - Incorrect age rating
   - Copyright infringement

7. **In-app purchase violations**
   - External payments for digital goods
   - Must use Apple IAP

**Response Process** (1-3 days)
1. **Read rejection carefully** (15 minutes)
   - Identify specific guideline
   - Understand exact issue

2. **Fix the issue** (1 hour to 3 days)
   - Update app code if needed
   - Update metadata if needed
   - Create new build if code changed
   - Upload new build if needed

3. **Respond via Resolution Center** (30 minutes)
   - Explain what you fixed
   - Provide additional context if needed
   - Be professional and respectful

4. **Resubmit** (15 minutes)
   - Click "Submit for Review" again
   - Returns to review queue
   - Typically faster second review (same reviewer)

**Appeal Process** (if rejection seems unfair)
- Use App Review Board link in Resolution Center
- Explain why you believe rejection is incorrect
- Provide evidence
- Be professional
- Response time: 1-3 days

**Total Time: 1-5 days** (depending on fix complexity)

---

## Complete Timeline Summary

### Scenario 1: Individual Developer, Smooth Process

| Phase | Activity | Duration |
|-------|----------|----------|
| **Week 1** | |
| Days 1-2 | Apple Developer enrollment | 2 days |
| Days 2-3 | Create privacy policy | 2 days |
| Days 2-5 | Design app icon and screenshots | 3 days |
| Days 4-5 | Write app metadata | 2 days |
| **Week 2** | |
| Days 6-8 | Final app testing and bug fixes | 3 days |
| Day 8 | Configure code signing, create archive | 0.5 day |
| Day 9 | Upload build to App Store Connect | 0.5 day |
| Day 9 | Create App Store Connect record | 0.5 day |
| Day 10 | Complete all metadata and information | 1 day |
| Day 10 | Submit for review | 0.5 day |
| Days 11-12 | App Review process | 1-2 days |
| Day 12 | Processing for App Store | 0.5 day |
| **Day 13** | **APP GOES LIVE!** | 🎉 |

**Total: 13 days**

---

### Scenario 2: Organization, Smooth Process

| Phase | Activity | Duration |
|-------|----------|----------|
| **Week 1** | |
| Days 1-5 | Request and receive D-U-N-S number | 5 days |
| Days 6-7 | Apple Developer enrollment (start) | 2 days |
| Days 6-8 | Create privacy policy | 3 days |
| Days 7-10 | Design assets (parallel with D-U-N-S) | 4 days |
| **Week 2** | |
| Days 8-10 | Write app metadata | 3 days |
| Days 11-14 | Apple Developer verification | 4 days |
| **Week 3** | |
| Days 14-16 | Final testing and bug fixes | 3 days |
| Day 17 | Build, upload, create App Store record | 1 day |
| Day 18 | Complete metadata and submit | 1 day |
| Days 19-20 | App Review | 2 days |
| Day 21 | Processing for App Store | 1 day |
| **Day 22** | **APP GOES LIVE!** | 🎉 |

**Total: 22 days (3+ weeks)**

---

### Scenario 3: With TestFlight Beta + One Rejection

| Phase | Activity | Duration |
|-------|----------|----------|
| **Weeks 1-2** | Same as Scenario 1 through build upload | 9 days |
| Day 10-11 | TestFlight internal testing | 2 days |
| Day 12-15 | Fix beta feedback, new build | 4 days |
| Day 16 | Complete metadata and submit | 1 day |
| Days 17-18 | First review - REJECTED | 2 days |
| Day 19-20 | Fix issues, resubmit | 2 days |
| Days 21-22 | Second review - APPROVED | 2 days |
| Day 23 | Processing | 1 day |
| **Day 24** | **APP GOES LIVE!** | 🎉 |

**Total: 24 days (3.5 weeks)**

---

### Scenario 4: Realistic First-Timer with Learning Curve

| Phase | Activity | Duration |
|-------|----------|----------|
| **Week 1** | |
| Days 1-3 | Research, Apple Developer enrollment | 3 days |
| Days 3-7 | Create privacy policy, legal review | 4 days |
| **Week 2** | |
| Days 8-12 | Design assets (learning design tools) | 5 days |
| Days 10-14 | Write metadata, keyword research | 4 days |
| **Week 3** | |
| Days 15-18 | Final testing, fixing bugs found | 4 days |
| Days 18-19 | Troubleshoot code signing issues | 2 days |
| Day 20 | Create archive, upload build | 1 day |
| **Week 4** | |
| Days 21-22 | TestFlight testing | 2 days |
| Days 23-24 | Fix TestFlight issues | 2 days |
| Day 25 | Complete App Store Connect metadata | 1 day |
| Day 26 | Submit for review | 1 day |
| Days 27-28 | Review - REJECTED (demo account issue) | 2 days |
| Day 29 | Fix and resubmit | 1 day |
| Days 30-31 | Second review - APPROVED | 2 days |
| Day 32 | Processing | 1 day |
| **Day 33** | **APP GOES LIVE!** | 🎉 |

**Total: 33 days (4.5+ weeks)**

---

## Expediting the Process

### What You CAN Control:
1. **Prepare in advance**
   - Enroll in Developer Program early
   - Create privacy policy before app is finished
   - Design assets while app is in development
   - Write metadata drafts early

2. **Avoid common mistakes**
   - Test demo account thoroughly
   - Triple-check privacy policy URL
   - Complete privacy labels accurately
   - Provide clear reviewer notes

3. **Use TestFlight wisely**
   - Catch bugs before submission
   - Validate metadata with testers
   - Skip if time is critical and app is well-tested

4. **Respond quickly**
   - Monitor email and App Store Connect
   - Respond to reviewer questions within hours
   - Have fixes ready to deploy quickly

### What You CANNOT Control:
1. Apple Developer Program approval time (1-14 days)
2. D-U-N-S number processing (5-7 days for organizations)
3. App Review queue time (hours to days)
4. App Store processing time after approval (1-24 hours)

### Emergency: Expedited Review
- Available for urgent business needs
- Examples: fixing critical bug, time-sensitive content
- Request via App Store Connect
- Explain urgent need clearly
- **Not guaranteed**
- Use sparingly (not for impatience)

---

## Post-Launch Timeline

### After App Goes Live

**Immediate (Day 0)**
- App appears in App Store
- May take 2-4 hours to appear in search results
- Verify listing on actual devices
- Share App Store link
- Monitor crash analytics

**Week 1**
- Monitor user reviews daily
- Respond to user feedback
- Track download metrics
- Identify critical bugs
- Prepare hotfix if needed

**Week 2-4**
- Collect feature requests
- Plan first update
- Monitor ASO performance
- Adjust keywords if needed (requires update)

**Ongoing**
- Update for new iOS versions (annually)
- Submit updates as needed (same review process)
- Renew Developer Program ($99/year)
- Keep privacy policy current

---

## Tips for Staying on Schedule

1. **Start Early**: Enroll in Apple Developer Program before app is finished
2. **Parallel Work**: Create assets and metadata while app is in development
3. **Test Thoroughly**: Avoid rejection delays by testing everything
4. **Clear Communication**: Provide excellent reviewer notes and demo account
5. **Monitor Actively**: Check email and App Store Connect daily during review
6. **Have Backups**: Secondary demo account, tested privacy policy URL
7. **Plan for Delays**: Add 1 week buffer to any deadline
8. **Learn from Rejections**: Read guidelines, join developer forums, learn common pitfalls

---

## Resources for Tracking

- **App Store Review Times**: https://www.runway.team/appreviewtimes (crowdsourced data)
- **App Store Connect**: Check status anytime at appstoreconnect.apple.com
- **Email Notifications**: Enable all notifications in App Store Connect preferences
- **Apple Developer Forums**: Connect with other developers experiencing similar timelines

---

**Remember**: First submission always takes longer due to learning curve. Your second app will be much faster!

**Last Updated**: November 2024
