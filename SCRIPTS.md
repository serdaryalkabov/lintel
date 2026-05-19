# Package Scripts Reference

## Available Commands

### Development
```bash
npm run dev
```
Starts the development server at http://localhost:3000
- Hot reload enabled
- Error overlay in browser
- Fast refresh for React components

### Production Build
```bash
npm run build
```
Creates an optimized production build
- Minifies JavaScript/CSS
- Optimizes images
- Generates static pages
- Type checks TypeScript

### Production Server
```bash
npm run start
```
Runs the production build locally
- Must run `npm run build` first
- Serves on http://localhost:3000
- Use for testing production build locally

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality
- Checks TypeScript files
- Checks React best practices
- Reports errors and warnings

## Development Workflow

### Local Development
1. `npm install` - Install dependencies
2. `npm run dev` - Start dev server
3. Make changes - Hot reload automatically
4. `npm run lint` - Check for issues
5. `npm run build` - Test production build

### Pre-Deployment
```bash
npm run lint && npm run build
```
Ensures clean build before deploying

## Environment Variables

Create `.env.local` for local development:
```bash
cp .env.example .env.local
```

Variables are loaded automatically by Next.js.

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Type Errors
```bash
# Check TypeScript
npx tsc --noEmit
```
