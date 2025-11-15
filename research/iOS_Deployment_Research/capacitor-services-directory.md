# Capacitor Services Directory

## Table of Contents
1. [Overview](#overview)
2. [Freelance Developer Platforms](#freelance-developer-platforms)
3. [CI/CD and Build Services](#cicd-and-build-services)
4. [Cloud Mac Services](#cloud-mac-services)
5. [Ionic Commercial Services](#ionic-commercial-services)
6. [Full-Service Development Agencies](#full-service-development-agencies)
7. [Service Comparison](#service-comparison)
8. [Recommendations by Use Case](#recommendations-by-use-case)

---

## Overview

This directory lists services and companies that can help you implement Capacitor, build iOS apps, or manage deployment.

### Service Categories

1. **Freelance Developers** - Hire individual contractors for setup/implementation
2. **CI/CD Services** - Automated building and deployment (no Mac needed!)
3. **Cloud Mac Services** - Rent macOS machines for building iOS apps
4. **Managed Services** - End-to-end app management (discontinued by Ionic)
5. **Development Agencies** - Full-service teams for complex projects

---

## Freelance Developer Platforms

Hire experienced Capacitor developers for implementation, setup, or ongoing support.

### Arc.dev

**Best for**: Hiring vetted, senior developers

**Overview:**
- Platform specializing in top 2.3% of developers
- 1,046+ Ionic Capacitor programmers available
- Freelance and full-time options

**Process:**
- Post your project requirements
- Get matched with developers in 72 hours (freelance)
- 14 days for full-time hires
- Interview candidates
- Start working

**Pricing:**
- Freelance: Varies by developer (typically $50-150/hour)
- Full-time: Standard salary negotiations
- Platform handles payroll and compliance

**Engagement Types:**
- Freelance (project-based)
- Part-time
- Full-time
- Contract-to-hire

**Pros:**
- ✅ Highly vetted developers (rigorous screening)
- ✅ Fast matching (72 hours)
- ✅ Handles international payments and compliance
- ✅ Partnership with Deel and Remote for global hiring
- ✅ Quality guarantee

**Cons:**
- ⚠️ Higher rates than other platforms
- ⚠️ Best for serious, long-term projects

**Website:** https://arc.dev/hire-developers/ionic-capacitor

---

### UpStack

**Best for**: Quick hiring with trial period

**Overview:**
- Vetted Capacitor developers
- Risk-free 14-day trial period
- Simple billing model

**Process:**
- Browse developer profiles
- Select developer
- Start 14-day trial
- Continue or switch developers

**Pricing:**
- Hourly rates: $65-75/hour average
- Weekly billing
- No platform fees (pay developer directly)

**Trial Period:**
- 14 days risk-free
- Can cancel or switch developers
- No long-term commitment required

**Pros:**
- ✅ Risk-free trial period
- ✅ Transparent, standard hourly rates
- ✅ Simple billing (weekly)
- ✅ Pre-vetted developers
- ✅ Good for trying before committing

**Cons:**
- ⚠️ Smaller developer pool than larger platforms
- ⚠️ Limited to 2-minute signup process

**Website:** https://upstackhq.com/hire-developers/capacitor

---

### Upwork

**Best for**: Budget-friendly options and large selection

**Overview:**
- Largest freelance platform
- Wide range of experience levels
- Competitive pricing

**Process:**
- Post job description
- Receive proposals from freelancers
- Review portfolios and ratings
- Interview and hire
- Pay through platform (escrow protection)

**Pricing:**
- Junior developers: $25-50/hour
- Mid-level: $50-100/hour
- Senior: $100-200/hour
- Platform fee: 10-20% (paid by freelancer)

**Pros:**
- ✅ Huge selection of developers
- ✅ Competitive rates
- ✅ Payment protection (escrow)
- ✅ Detailed reviews and ratings
- ✅ Good for smaller budgets

**Cons:**
- ⚠️ Quality varies widely
- ⚠️ Need to vet candidates carefully
- ⚠️ Time-consuming to find right developer
- ⚠️ Some developers inflate hours

**Best Practices:**
- Look for "Top Rated" or "Rising Talent" badges
- Check previous Capacitor/Ionic projects
- Start with small test project
- Use milestone-based payments

**Website:** https://www.upwork.com

---

### Ionic Forum Job Board

**Best for**: Finding specialized Capacitor experts

**Overview:**
- Official Ionic community job board
- Developers already familiar with Capacitor
- Direct connection to Ionic ecosystem

**Process:**
- Post in Jobs category on Ionic Forum
- Connect with respondents directly
- Negotiate terms
- No platform fees

**Pricing:**
- Negotiate directly with developer
- Typical rates: $50-150/hour
- No platform fees

**Pros:**
- ✅ Developers already know Capacitor
- ✅ Active, engaged community
- ✅ No platform fees
- ✅ Direct communication

**Cons:**
- ⚠️ No payment protection
- ⚠️ No vetting process
- ⚠️ Must handle contracts yourself
- ⚠️ Smaller pool than major platforms

**Website:** https://forum.ionicframework.com/c/jobs

---

### Fiverr

**Best for**: Small, one-off tasks

**Overview:**
- Gig-based platform
- Fixed-price packages
- Quick turnaround

**Pricing:**
- Basic Capacitor setup: $100-500
- Full implementation: $500-2,000
- Custom features: $200-1,000

**Pros:**
- ✅ Fixed, upfront pricing
- ✅ Fast delivery
- ✅ Good for simple tasks
- ✅ Budget-friendly

**Cons:**
- ⚠️ Quality varies significantly
- ⚠️ Not ideal for complex projects
- ⚠️ Limited support after delivery
- ⚠️ Communication can be challenging

**Best For:**
- Initial Capacitor setup
- Configuration help
- Simple bug fixes
- One-time integrations

**Website:** https://www.fiverr.com

---

## CI/CD and Build Services

Automated building and deployment services - **no Mac required!**

### Codemagic

**Best for**: Building iOS apps without a Mac (highly recommended!)

**Overview:**
- Cloud-based CI/CD for mobile apps
- Built-in Capacitor support
- macOS build machines in the cloud
- Automatic code signing
- Direct App Store/Play Store publishing

**Features:**
- ✅ macOS build machines (M1 and Intel)
- ✅ Automatic iOS code signing
- ✅ App Store Connect integration
- ✅ Google Play publishing
- ✅ Slack/Discord notifications
- ✅ Built-in artifact storage
- ✅ Pre-configured Capacitor workflows

**Pricing:**

**Free Tier:**
- 500 build minutes/month
- macOS M1 instances
- 3 team members
- Good for personal projects

**Starter Plan: $99/month**
- 1,500 build minutes
- 5 concurrent builds
- 5 team members
- Email support

**Professional: $299/month**
- 5,000 build minutes
- 10 concurrent builds
- 10 team members
- Priority support

**Pay-as-you-go:**
- $0.095/minute (macOS M1)
- $0.038/minute (Linux)
- No monthly commitment

**Setup Process:**

1. Connect GitHub/GitLab/Bitbucket repository
2. Create `codemagic.yaml` configuration:

```yaml
workflows:
  ios-workflow:
    name: iOS Build
    instance_type: mac_mini_m1
    environment:
      groups:
        - app_store_credentials
      node: 18
    scripts:
      - name: Install dependencies
        script: npm install
      - name: Build web app
        script: npm run build
      - name: Sync Capacitor
        script: npx cap sync ios
      - name: Build iOS
        script: |
          xcodebuild -workspace ios/App/App.xcworkspace \
            -scheme App \
            -configuration Release \
            -archivePath build/App.xcarchive \
            archive
      - name: Export IPA
        script: |
          xcodebuild -exportArchive \
            -archivePath build/App.xcarchive \
            -exportPath build \
            -exportOptionsPlist ExportOptions.plist
    artifacts:
      - build/**/*.ipa
    publishing:
      app_store_connect:
        api_key: $APP_STORE_CONNECT_KEY
```

3. Add code signing certificates
4. Trigger builds (automatic on git push)

**Pros:**
- ✅ No Mac required!
- ✅ Easy setup for Capacitor
- ✅ Automatic code signing (huge time saver)
- ✅ Direct App Store publishing
- ✅ Excellent documentation
- ✅ Fast M1 build machines
- ✅ Free tier for testing

**Cons:**
- ⚠️ Build minutes can add up for frequent builds
- ⚠️ Learning curve for YAML configuration
- ⚠️ Costs scale with usage

**Best For:**
- Teams without Macs
- Automating App Store releases
- Consistent, reproducible builds
- Saving time on manual builds

**Website:** https://codemagic.io

---

### GitHub Actions

**Best for**: Teams already using GitHub

**Overview:**
- Integrated with GitHub repositories
- macOS runners available
- Free tier for public repos
- Flexible workflow configuration

**Pricing:**

**Free Tier:**
- Unlimited minutes for public repos
- 2,000 minutes/month for private repos (Linux)
- 500 minutes/month for private repos (macOS)

**Paid Plans:**
- macOS: $0.08/minute
- Linux: $0.008/minute
- Included minutes with GitHub Teams/Enterprise

**Features:**
- ✅ Integrated with GitHub
- ✅ macOS runners (Big Sur, Monterey, Ventura)
- ✅ Flexible YAML workflows
- ✅ Large ecosystem of actions
- ✅ Secrets management

**Example Workflow:**

```yaml
# .github/workflows/ios-build.yml
name: Build iOS App

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: macos-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build web app
        run: npm run build

      - name: Sync Capacitor
        run: npx cap sync ios

      - name: Setup certificates
        env:
          CERTIFICATE_BASE64: ${{ secrets.CERTIFICATE_BASE64 }}
        run: |
          # Import certificate
          echo $CERTIFICATE_BASE64 | base64 --decode > certificate.p12
          # ... certificate setup

      - name: Build iOS
        run: |
          xcodebuild -workspace ios/App/App.xcworkspace \
            -scheme App \
            -configuration Release \
            archive

      - name: Upload IPA
        uses: actions/upload-artifact@v3
        with:
          name: app-ipa
          path: build/**/*.ipa
```

**Pros:**
- ✅ Integrated with GitHub
- ✅ Free for public repos
- ✅ Generous free tier
- ✅ Flexible and powerful
- ✅ Large community

**Cons:**
- ⚠️ macOS minutes limited (500/month free)
- ⚠️ Manual certificate management
- ⚠️ More complex setup than Codemagic
- ⚠️ Slower than dedicated CI/CD

**Website:** https://github.com/features/actions

---

### Bitrise

**Best for**: Mobile-first CI/CD with visual workflow builder

**Overview:**
- Mobile-focused CI/CD platform
- Visual workflow builder (no YAML required)
- Pre-built Capacitor integrations

**Pricing:**

**Hobby (Free):**
- 200 build minutes/month
- 1 concurrency
- 2 team members

**Standard: $90/month**
- 1,500 build minutes
- 2 concurrency
- 10 team members

**Pro: Custom pricing**
- Unlimited builds
- Custom concurrency
- Enterprise support

**Features:**
- ✅ Visual workflow builder
- ✅ Pre-built Capacitor steps
- ✅ Automatic code signing
- ✅ App Store/Play Store deployment
- ✅ Easy to use

**Pros:**
- ✅ No YAML needed (visual builder)
- ✅ Mobile-specific features
- ✅ Easy setup
- ✅ Good documentation

**Cons:**
- ⚠️ More expensive than alternatives
- ⚠️ Limited free tier
- ⚠️ Less flexible than GitHub Actions

**Website:** https://bitrise.io

---

## Cloud Mac Services

Rent macOS machines in the cloud for building iOS apps.

### MacStadium

**Best for**: Long-term Mac rental, enterprise use

**Overview:**
- Dedicated Mac hardware in the cloud
- Full administrator access
- Enterprise-grade infrastructure

**Pricing:**

**Mac Mini Plans:**
- Starting at $109/month
- M1/M2/M4 Mac Mini options
- Monthly or annual billing

**Orka Platform:**
- $499/month (Small Teams edition)
- Mac orchestration for CI/CD
- Scalable Mac infrastructure

**Features:**
- ✅ Dedicated Mac hardware (not shared)
- ✅ Full administrator/root access
- ✅ Can install Xcode, Android Studio, etc.
- ✅ Persistent storage
- ✅ Enterprise support

**Setup:**
1. Choose plan and Mac model
2. Provision your Mac (within minutes)
3. Access via VNC or SSH
4. Install Xcode and development tools
5. Build your Capacitor app

**Pros:**
- ✅ Full Mac control
- ✅ Dedicated hardware (better performance)
- ✅ Can run 24/7
- ✅ Good for CI/CD integration
- ✅ Enterprise reliability

**Cons:**
- ⚠️ Higher cost than hourly services
- ⚠️ Monthly commitment
- ⚠️ Overkill for occasional builds

**Best For:**
- Teams needing regular iOS builds
- CI/CD pipelines
- Multiple developers sharing Mac
- Long-term projects

**Website:** https://macstadium.com

---

### MacinCloud

**Best for**: Pay-as-you-go, occasional builds

**Overview:**
- Rent Macs by the hour or day
- No long-term commitment
- Perfect for occasional iOS builds

**Pricing:**

**Pay-As-You-Go:**
- $1/hour
- $4/day
- $30 minimum (30 hours)

**Managed Server Plans:**
- 3-hour plan: Weekly/monthly
- 8-hour plan: Weekly/monthly
- No daily limit plan: Weekly/monthly/quarterly/yearly
- First-time users get 24-hour trial

**Dedicated Server Plans:**
- Full root/sudo access
- Mac Mini 2012, 2018, 2020 (M1), 2023 (M2), 2024 (M4)
- Various pricing tiers

**Features:**
- ✅ Multiple Mac models available
- ✅ Pre-installed Xcode
- ✅ VNC access
- ✅ Shared or dedicated servers
- ✅ 24-hour trial available

**Setup:**
1. Create account and select plan
2. Choose Mac model and OS version
3. Access via web-based VNC
4. Upload your project
5. Build in Xcode

**Pros:**
- ✅ True pay-as-you-go ($1/hour)
- ✅ No monthly commitment
- ✅ Perfect for occasional builds
- ✅ Multiple Mac models
- ✅ 24-hour free trial

**Cons:**
- ⚠️ Shared servers (slower performance)
- ⚠️ $30 minimum purchase
- ⚠️ Manual builds (not automated)
- ⚠️ Learning curve if unfamiliar with Xcode

**Best For:**
- Solo developers
- Occasional iOS builds
- Learning iOS development
- Testing before buying a Mac

**Website:** https://macincloud.com

---

## Ionic Commercial Services

### Ionic AppFlow (Being Discontinued)

**Status:** ⚠️ **No longer accepting new customers**

**Background:**
- Ionic's managed CI/CD platform
- Automated builds and deployments
- Live updates (over-the-air)

**Important Update (2024):**

Ionic has discontinued new customer sales for all commercial products:
- Ionic AppFlow
- Identity Vault
- Portals
- Other paid components

**Current Status:**
- Existing customers: Multi-year discontinuation process
- New customers: Cannot sign up
- Alternative: Use Codemagic, GitHub Actions, or other CI/CD

**Why the Change:**

Ionic was acquired by OutSystems. The focus shifted to:
- Open source products (Capacitor, Ionic Framework)
- Enterprise integration with OutSystems
- Commercial products being phased out

**Recommendations:**
- ✅ Use Capacitor (still maintained, open source)
- ✅ Use Codemagic for builds (AppFlow alternative)
- ✅ Use code-push alternatives for live updates

**Website:** https://ionic.io/appflow (historical reference)

---

## Full-Service Development Agencies

For complete, turnkey Capacitor implementation.

### When to Hire an Agency

**Good reasons:**
- You need complete app design + development
- Complex integrations required
- No technical team in-house
- Need ongoing support and maintenance
- Want quality guarantee and project management

**Not needed if:**
- You have internal developers
- Simple Capacitor wrapper needed
- Budget constraints
- You want to learn and DIY

### Finding Capacitor Agencies

**Platforms:**

1. **Clutch.co**
   - Review-based agency directory
   - Filter by: Mobile Development, React, Ionic
   - View portfolios and client reviews
   - https://clutch.co

2. **GoodFirms**
   - Similar to Clutch
   - Verified reviews
   - https://goodfirms.co

3. **Ionic Partners Program** (check current status)
   - Ionic-certified development partners
   - May be affected by Ionic/OutSystems changes

### Typical Agency Pricing

**Small Projects:**
- Basic Capacitor wrapper: $5,000 - $15,000
- 2-4 weeks timeline

**Medium Projects:**
- Full app with custom features: $25,000 - $75,000
- 2-3 months timeline
- Design + Development + Testing

**Large Projects:**
- Complex apps with integrations: $75,000 - $200,000+
- 3-6+ months timeline
- Full team (PM, designers, developers, QA)

**Hourly Rates:**
- Junior developers: $50-80/hour
- Mid-level: $80-120/hour
- Senior: $120-180/hour
- Agencies typically charge $90-150/hour blended rate

### Questions to Ask Agencies

1. **Experience:**
   - Have you built Capacitor apps before?
   - Can we see examples in App Store?
   - Specifically worked with Next.js + Capacitor?

2. **Process:**
   - What's your development methodology?
   - How do you handle changes/revisions?
   - What's included in the quote?

3. **Support:**
   - Do you provide post-launch support?
   - What about App Store submission?
   - Ongoing maintenance options?

4. **Technical:**
   - How do you handle iOS updates?
   - Experience with Supabase or our backend?
   - Testing process (devices, scenarios)?

---

## Service Comparison

### Quick Comparison Table

| Service | Best For | Pricing | Mac Needed? | Learning Curve |
|---------|----------|---------|-------------|----------------|
| **Arc.dev** | Quality developers | $50-150/hr | No | Low (they do the work) |
| **UpStack** | Risk-free trial | $65-75/hr | No | Low |
| **Upwork** | Budget flexibility | $25-200/hr | No | Medium (vetting needed) |
| **Codemagic** | Automated builds | $99-299/mo | ❌ No! | Medium |
| **GitHub Actions** | GitHub users | Free-$0.08/min | ❌ No! | High |
| **MacStadium** | Long-term rental | $109+/mo | ❌ No! | High |
| **MacinCloud** | Occasional builds | $1/hr | ❌ No! | High |
| **Agencies** | Turnkey solution | $5k-200k+ | No | Low (they do everything) |

### Effort Required

**Least Effort → Most Effort**

1. **Full-service agency** - They do everything
2. **Arc.dev developer** - Hire expert, minimal management
3. **Codemagic** - Setup once, automated after
4. **UpStack developer** - Some management needed
5. **GitHub Actions** - Requires YAML expertise
6. **Upwork freelancer** - Need to vet and manage
7. **MacinCloud** - Manual builds, Xcode knowledge needed
8. **DIY** - You do everything yourself

---

## Recommendations by Use Case

### "I need someone to set up Capacitor for me"

**Best Options:**
1. **UpStack** ($65-75/hour) - 14-day trial, quick start
2. **Arc.dev** ($100-150/hour) - Higher quality, fast matching
3. **Upwork** ($50-100/hour) - Budget option, more vetting needed

**Expected Cost:** $500-2,000 for initial setup

**Timeline:** 1-2 weeks

---

### "I don't have a Mac and need to build iOS apps"

**Best Options:**
1. **Codemagic** (Free tier or $99/month) - Easiest, automated
2. **GitHub Actions** (Free for public repos) - If already on GitHub
3. **MacinCloud** ($1/hour) - Occasional manual builds

**Recommendation:** Start with Codemagic free tier (500 min/month)

---

### "I need ongoing iOS build automation"

**Best Options:**
1. **Codemagic** ($99-299/month) - Best mobile CI/CD
2. **GitHub Actions** (Free + pay-as-you-go) - If using GitHub
3. **MacStadium** ($109/month) - Full Mac control

**Recommendation:** Codemagic for easiest setup and maintenance

---

### "I want someone to build the entire app"

**Best Options:**
1. **Full-service agency** ($25k-75k) - Turnkey solution
2. **Arc.dev full-time hire** (Salary-based) - Dedicated developer
3. **Upwork team** ($50k+) - Budget-friendly full team

**Questions to ask yourself:**
- Do you have a design already? (Saves $10-20k)
- Do you have backend already? (Saves $20-40k)
- Do you need ongoing support? (Add 20-30% annual)

---

### "I'm on a tight budget"

**Best Options:**
1. **DIY** (Free) - Follow the guides in this research
2. **Fiverr** ($100-500) - Basic setup help
3. **Upwork junior developer** ($25-50/hour) - Affordable freelancer
4. **GitHub Actions** (Free tier) - Free builds for public repos

**Estimated Total Cost:** $0-1,000

---

### "I want the fastest solution"

**Best Options:**
1. **Arc.dev** (72-hour matching) - Fast, quality developers
2. **Codemagic** (Same-day setup) - Automated builds immediately
3. **UpStack** (Immediate start) - Start within days

**Timeline:** Can be building within 3-5 days

---

### "I want to learn and do it myself"

**Resources:**
1. **Official Capacitor Docs** - https://capacitorjs.com
2. **This research folder** - Complete guides provided
3. **YouTube tutorials** - Search "Next.js Capacitor"
4. **Ionic Forum** - Ask questions, get help

**Support Services:**
- **Fiverr** ($50-200) - One-off help when stuck
- **Ionic Forum** (Free) - Community support

**Timeline:** 2-4 weeks to learn and implement

---

## Summary

### Most Recommended Services

**For Build Automation (No Mac):**
1. 🥇 **Codemagic** - Best all-around
2. 🥈 **GitHub Actions** - Best for GitHub users
3. 🥉 **MacinCloud** - Best pay-as-you-go

**For Hiring Developers:**
1. 🥇 **Arc.dev** - Best quality
2. 🥈 **UpStack** - Best trial period
3. 🥉 **Upwork** - Best selection and price range

**For Complete Solutions:**
1. 🥇 **Development Agency** - Best for non-technical founders
2. 🥈 **Arc.dev Full-time** - Best for ongoing development
3. 🥉 **Upwork Team** - Best budget option

### Cost-Effectiveness Rankings

**Best Value:**
1. DIY + GitHub Actions (Free)
2. DIY + Codemagic Free Tier (Free)
3. Upwork developer ($500-2,000 one-time)

**Best Time Savings:**
1. Codemagic ($99/month, saves weeks of Mac setup)
2. Arc.dev ($3,000-6,000, saves months of learning)
3. Agency ($25k+, saves everything)

---

## Additional Resources

**Communities for Finding Help:**
- Ionic Forum: https://forum.ionicframework.com
- Capacitor Discord: https://ionic.link/discord
- Stack Overflow: Tag with 'capacitor' and 'ionic'
- Reddit: r/ionic

**Learning Resources:**
- Ionic YouTube: https://youtube.com/@ionicframework
- Capacitor Docs: https://capacitorjs.com/docs
- This research folder: Complete implementation guides

---

**Document Version**: 1.0
**Last Updated**: November 2024
**Next Review**: Check for new CI/CD services and pricing updates
