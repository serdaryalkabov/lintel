# 📦 Architectural Code Review MVP - Setup & Deployment Guide

## What You've Got

A production-ready AI-powered architectural code review tool that finds risks other AI reviewers miss.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Claude Sonnet 4

---

## 🎯 Quick Start (5 Minutes)

### 1. Extract the ZIP file

```bash
unzip arch-review-mvp.zip
cd arch-review-mvp
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~391 packages, takes 30-60 seconds).

### 3. Set Up Your API Key

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

**Get your API key here:** https://console.anthropic.com/settings/keys

### 4. Run the App

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Try the Example

1. Click the **"Load Example"** button
2. Click **"Analyze Architecture"**
3. Wait 15-20 seconds for the 4-pass AI analysis
4. Review the architectural findings

✅ **You're running!**

---

## 🚀 Deploy to Production (Vercel - Recommended)

### Why Vercel?
- **Zero configuration** - Just works
- **Free tier** - Perfect for getting started
- **Auto-deploy** - Push to git → automatic deployment
- **Global CDN** - Fast everywhere
- **Built for Next.js** - Optimal performance

### Deployment Steps

#### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Architectural Code Review MVP"

# Create a new repository on GitHub (https://github.com/new), then:
git remote add origin https://github.com/YOUR_USERNAME/arch-review-mvp.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Web UI (Easiest)**

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Click **"Import Project"**
4. Select your `arch-review-mvp` repository
5. Vercel auto-detects Next.js ✓
6. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your API key (starts with `sk-ant-`)
7. Click **"Deploy"**

**Takes 2-3 minutes for first deployment.**

**Option B: CLI (For Developers)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, then add environment variable in dashboard
```

#### 3. Verify Deployment

You'll get a URL like: `https://arch-review-mvp.vercel.app`

1. Visit the URL
2. Click "Load Example"
3. Click "Analyze Architecture"
4. Should see results in 15-20 seconds

✅ **You're live!**

---

## 📁 Project Structure

```
arch-review-mvp/
├── app/
│   ├── api/analyze/route.ts    # API endpoint for analysis
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Main page component
│   └── globals.css             # Global styles
│
├── components/
│   ├── ui/                     # Base UI components
│   │   ├── button.tsx
│   │   └── textarea.tsx
│   ├── analysis-form.tsx       # Main input form
│   ├── finding-card.tsx        # Risk finding display
│   ├── loading-state.tsx       # Animated loading UI
│   ├── empty-state.tsx         # No findings state
│   └── error-state.tsx         # Error handling UI
│
├── lib/
│   ├── pipeline.ts             # Multi-pass AI analysis engine
│   ├── prompts.ts              # AI prompt templates
│   ├── types.ts                # TypeScript definitions
│   └── utils.ts                # Utility functions
│
├── public/
│   └── favicon.svg             # Site icon
│
├── .env.example                # Environment variables template
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Full documentation
```

---

## 🧠 How It Works

### The 4-Pass AI Pipeline

**Pass 1: Context Extraction**
- Extracts architectural invariants from your rules
- Identifies service boundaries
- Maps forbidden patterns
- Output: Structured architectural context

**Pass 2: Diff Analysis**
- Analyzes code changes against context
- Identifies architectural violations
- Calculates confidence scores
- Output: Raw findings with reasoning

**Pass 3: Risk Scoring**
- Calculates blast radius (1-10)
- Evaluates operational impact (1-10)
- Assigns severity levels
- Output: Scored findings

**Pass 4: Compression**
- Removes low-confidence findings
- Merges overlapping issues
- Keeps only top 3-5 most critical
- Output: Final high-signal findings

### What It Finds

✅ **High-Signal Risks:**
- Architectural invariant violations
- Cross-service coupling
- Runtime performance risks (N+1 queries, race conditions)
- Transactional integrity issues
- Data consistency risks
- Deployment breaking changes

❌ **Explicitly Ignores:**
- Code style and formatting
- Naming conventions
- Test coverage comments
- Generic cleanup suggestions
- Low-confidence speculation

---

## 💰 Costs

### Anthropic API
- **Per Analysis:** $0.02 - $0.04
- **100 analyses/month:** ~$2-4
- **1,000 analyses/month:** ~$20-40

### Vercel Hosting
- **Hobby (Free):** Perfect for personal/small team use
- **Pro ($20/month):** For production team use

---

## 🎨 Design Philosophy

The UI is inspired by **ElevenLabs**:
- Minimalist and calm
- Dark mode with subtle gradients
- Typography-first layout
- Generous spacing
- Smooth animations
- High signal-to-noise ratio
- Premium feel

---

## 📚 Documentation Files

- **README.md** - Full project documentation
- **QUICKSTART.md** - 5-minute getting started guide
- **DEPLOYMENT_COMPLETE.md** - Comprehensive deployment guide
- **SCRIPTS.md** - NPM scripts reference

---

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Create production build
npm run start            # Run production build locally
npm run lint             # Check code quality

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production
```

---

## 🔧 Troubleshooting

### "Analysis failed" Error

**Cause:** API key issues
**Fix:**
1. Check `.env` file has correct API key
2. Verify key at https://console.anthropic.com/settings/keys
3. Check you have API credits

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Slow Analysis

**Normal:** 15-25 seconds total (4 AI passes)
- Pass 1: ~5 seconds
- Pass 2: ~7 seconds
- Pass 3: ~5 seconds
- Pass 4: ~5 seconds

---

## 🎯 Usage Tips

1. **Be Specific in Rules**
   - Instead of: "No coupling"
   - Write: "Payment service must never directly call Inventory service"

2. **Include Context**
   - Service names
   - Tech stack
   - Message queue type
   - Database structure

3. **Test with Real Violations**
   - The example shows a real architectural violation
   - Use actual diffs from your team

4. **Iterate on Rules**
   - Start with 3-5 critical invariants
   - Add more based on findings quality
   - Remove rules that generate noise

---

## 📊 Monitoring

### Anthropic API Usage

Monitor at: https://console.anthropic.com
- Token usage
- Costs
- Rate limits

### Vercel Analytics

Enable in: Project Settings → Analytics
- Page views
- Response times
- Error tracking

### Logs

**Vercel Logs:**
```
Dashboard → Project → Logs → Real-time
```

**Local Logs:**
```bash
npm run dev
# Check terminal output
```

---

## 🔐 Security

- ✅ Never commit `.env` files (already in `.gitignore`)
- ✅ Use environment variables in Vercel
- ✅ Rotate API keys regularly
- ✅ Monitor API usage for anomalies
- ✅ Set up billing alerts

---

## 🌐 Custom Domain (Optional)

1. Go to Vercel Project Settings
2. Navigate to "Domains"
3. Add your domain: `archreview.yourdomain.com`
4. Add DNS record:
   ```
   Type: CNAME
   Name: archreview
   Value: cname.vercel-dns.com
   ```
5. Wait 5-30 minutes for DNS propagation

---

## 🚢 Production Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variable set (`ANTHROPIC_API_KEY`)
- [ ] Test analysis works
- [ ] Custom domain configured (optional)
- [ ] Monitoring enabled
- [ ] Team has access

---

## 📞 Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Anthropic Docs:** https://docs.anthropic.com
- **Anthropic Support:** https://support.anthropic.com

---

## 🎉 You're All Set!

Your architectural code review tool is ready to use.

**Next Steps:**
1. Try the example analysis
2. Deploy to Vercel
3. Share with your team
4. Customize the architecture rules for your codebase

**Questions?** Check the documentation files or open an issue on GitHub.

---

**Built with Claude Sonnet 4 • Designed for high-signal engineering teams**
