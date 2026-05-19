# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

Get your API key from: https://console.anthropic.com/settings/keys

### Step 3: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Step 4: Try the Example

1. Click "Load Example" button
2. Click "Analyze Architecture"
3. Wait 15-20 seconds for the 4-pass analysis
4. Review the architectural findings

## 📦 What You Get

- **Context Extraction**: AI extracts architectural invariants from your rules
- **Diff Analysis**: Identifies architectural violations in code changes
- **Risk Scoring**: Ranks findings by blast radius and operational impact
- **Compression**: Surfaces only the top 3-5 most critical findings

## 🎯 How to Use

### Input Format

**Pull Request Diff**: Standard git diff output
```bash
git diff main feature-branch > diff.txt
```

**Architecture Rules**: Your team's architectural constraints
```
# Service Boundaries
- No synchronous calls between services
- All cross-service communication via message queues

# Transactional Integrity
- Payment and inventory must be eventually consistent
```

**Repository Context** (optional): Additional context
```
Services: payment, inventory, orders
Database: PostgreSQL per service
Message Queue: RabbitMQ
```

## 🎨 Design Philosophy

The UI is inspired by ElevenLabs:
- Minimal, elegant, calm
- Typography-first
- Dark mode with subtle gradients
- Smooth animations
- High information density without clutter

## 🧠 What It Finds

✅ **Catches:**
- Architectural boundary violations
- Cross-service coupling
- Race conditions and N+1 queries
- Transactional integrity issues
- Deployment risks

❌ **Ignores:**
- Code style nitpicks
- Naming conventions
- Test coverage comments
- Generic refactoring suggestions

## 🚢 Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

**Quick Vercel Deploy:**
```bash
npm install -g vercel
vercel
```

Then add `ANTHROPIC_API_KEY` in Vercel dashboard.

## 📊 Performance

- **Analysis Time**: 15-25 seconds (4 AI passes)
- **Cost**: ~$0.02-0.04 per analysis
- **Concurrency**: Handles multiple analyses via serverless functions

## 🔧 Troubleshooting

**"Analysis failed" error:**
- Check your API key is valid
- Verify you have API credits
- Check Vercel function logs

**Slow analysis:**
- Normal: each pass takes 3-5 seconds
- Total: 15-25 seconds for full pipeline

**No findings:**
- This is good! Means no architectural risks detected
- Try the example to verify it's working

## 📚 Learn More

- [Full README](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Anthropic Docs](https://docs.anthropic.com)

## 💡 Tips

1. Be specific in architecture rules
2. Include actual violations in your diff for testing
3. Use the example to understand output format
4. Start with critical invariants only
5. Iterate on rules based on findings quality

---

Need help? Open an issue on GitHub.
