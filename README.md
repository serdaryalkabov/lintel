# Architectural Code Review MVP

A production-quality AI-powered architectural code review tool. Find the risks other AI reviewers miss.

## Product Positioning

**"Architectural code review for high-signal engineering teams."**

This is NOT a generic AI code reviewer. It feels like a senior staff engineer reviewing system risk, architecture, and operational implications.

## Features

- **Multi-pass AI Analysis Pipeline**
  - Context extraction from architecture rules
  - Diff analysis for architectural violations
  - Risk scoring with blast radius and operational impact
  - Intelligent compression to surface only high-signal findings

- **High-Signal Focus**
  - Architectural invariant violations
  - Cross-service coupling
  - Runtime risks (N+1 queries, race conditions)
  - Transactional integrity issues
  - Async consistency risks

- **ElevenLabs-Inspired Design**
  - Luxury AI product aesthetic
  - Minimalist dark mode
  - Typography-first layout
  - Subtle gradients and animations
  - Calm visual hierarchy

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Anthropic Claude Sonnet 4
- Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd arch-review-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Paste Pull Request Diff**: Copy your git diff output
2. **Define Architecture Rules**: Specify your architectural constraints, service boundaries, and invariants
3. **Add Optional Context**: Include additional repository context if needed
4. **Analyze**: The system runs a multi-pass analysis and returns high-signal findings

### Example Analysis

Click "Load Example" to see a sample analysis of a microservices payment system with architectural violations.

## Analysis Pipeline

The tool uses a 4-pass AI pipeline:

1. **Context Extraction**: Extracts architectural invariants, business rules, service boundaries, and forbidden patterns
2. **Diff Analysis**: Identifies architectural risks in the code changes
3. **Risk Scoring**: Ranks findings by severity, blast radius, and operational impact
4. **Compression**: Aggressively filters to top 3-5 most significant findings

## What It Finds

✅ **High-Signal Risks:**
- Architectural invariant violations
- Cross-service coupling
- Runtime performance risks
- Data consistency issues
- Deployment risks

❌ **Explicitly Ignores:**
- Code style and formatting
- Naming conventions
- Test coverage comments
- Generic cleanup suggestions

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Deploy

### Other Platforms

Build the production bundle:
```bash
npm run build
npm start
```

## Project Structure

```
arch-review-mvp/
├── app/
│   ├── api/analyze/       # API route for analysis
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── ui/               # Base UI components
│   ├── analysis-form.tsx # Input form
│   ├── finding-card.tsx  # Finding display
│   ├── loading-state.tsx # Loading UI
│   ├── empty-state.tsx   # No findings state
│   └── error-state.tsx   # Error handling
├── lib/
│   ├── pipeline.ts       # AI analysis pipeline
│   ├── prompts.ts        # AI prompt templates
│   ├── types.ts          # TypeScript definitions
│   └── utils.ts          # Utility functions
└── public/              # Static assets
```

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)

## License

MIT

## Contributing

This is an MVP. Contributions welcome for:
- Improved prompt engineering
- Better error handling
- Performance optimizations
- UI/UX enhancements

---

Built with Claude Sonnet 4 • Designed for high-signal engineering teams
