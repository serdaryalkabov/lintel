# Deployment Guide

## Quick Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/arch-review-mvp)

### Manual Deployment

1. **Prerequisites**
   - GitHub account
   - Vercel account (free)
   - Anthropic API key

2. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/arch-review-mvp.git
git push -u origin main
```

3. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add Environment Variables:
     - Key: `ANTHROPIC_API_KEY`
     - Value: Your Anthropic API key
   - Click "Deploy"

4. **Done!**
   - Your app will be live at `https://your-project.vercel.app`
   - Every push to `main` will auto-deploy

## Environment Variables

### Required

- `ANTHROPIC_API_KEY`: Get from [console.anthropic.com](https://console.anthropic.com)

## Custom Domain

1. Go to Project Settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Tips

- The app uses Claude Sonnet 4 which has ~3-5 second response times per pass
- Total analysis time: 15-25 seconds for 4-pass pipeline
- Consider adding caching for repeated analyses
- Monitor API usage in Anthropic console

## Troubleshooting

### Build Failures

**Error: Module not found**
- Run `npm install` locally to verify dependencies
- Check that all imports use correct paths

**TypeScript errors**
- Run `npm run build` locally first
- Fix any type errors before deploying

### Runtime Errors

**API Key Issues**
- Verify `ANTHROPIC_API_KEY` is set in Vercel
- Check key has proper permissions in Anthropic console

**Analysis Failures**
- Check API rate limits
- Verify input format (valid git diff)
- Review Vercel function logs

## Monitoring

- View logs in Vercel Dashboard → Project → Logs
- Monitor API usage at console.anthropic.com
- Set up Vercel Analytics for user metrics

## Cost Estimation

### Anthropic API Costs (approximate)

- Input: ~4,000 tokens per analysis
- Output: ~2,000 tokens per analysis
- Cost per analysis: ~$0.02-0.04
- 1,000 analyses/month: ~$20-40

### Vercel Costs

- Hobby plan: Free for personal projects
- Pro plan: $20/month for team use
- Serverless function limits apply

## Support

For issues:
1. Check Vercel build logs
2. Review Anthropic API status
3. Open GitHub issue with error details
