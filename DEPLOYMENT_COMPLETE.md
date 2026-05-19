# 🚀 Complete Deployment Instructions

## Overview

This guide covers deploying the Architectural Code Review MVP to production. The recommended platform is Vercel, but other platforms are supported.

---

## Option 1: Deploy to Vercel (Recommended)

### Why Vercel?
- Zero configuration needed
- Automatic HTTPS
- Edge network (fast globally)
- Generous free tier
- Seamless Next.js integration
- Environment variable management

### Prerequisites
- GitHub account
- Vercel account (free at https://vercel.com)
- Anthropic API key (https://console.anthropic.com/settings/keys)

### Steps

#### 1. Push Code to GitHub

```bash
# Initialize git if you haven't
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Architectural Code Review MVP"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/arch-review-mvp.git
git branch -M main
git push -u origin main
```

#### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js

#### 3. Configure Environment Variables

In the Vercel import screen:

**Add Environment Variable:**
- Name: `ANTHROPIC_API_KEY`
- Value: `sk-ant-xxxxxxxxxxxxx` (your actual key)

Click "Add" to save.

#### 4. Deploy

Click "Deploy" button.

Vercel will:
1. Install dependencies
2. Build the Next.js app
3. Deploy to production
4. Give you a URL: `https://your-project.vercel.app`

**First deployment takes 2-3 minutes.**

#### 5. Verify Deployment

1. Visit your deployment URL
2. Click "Load Example"
3. Click "Analyze Architecture"
4. Should see results in 15-20 seconds

✅ **You're live!**

---

### Continuous Deployment

Every push to `main` branch automatically deploys:

```bash
git add .
git commit -m "Update feature"
git push
```

Vercel deploys in ~1 minute.

---

### Custom Domain (Optional)

1. Go to Project Settings in Vercel
2. Navigate to "Domains" tab
3. Click "Add Domain"
4. Enter your domain (e.g., `archreview.yourdomain.com`)
5. Follow DNS instructions:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Wait for DNS propagation (5-30 minutes)

---

## Option 2: Deploy to Other Platforms

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up

# Add environment variable
railway variables set ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### Render

1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: arch-review
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: ANTHROPIC_API_KEY
        sync: false
```

2. Push to GitHub
3. Connect repository in Render dashboard
4. Add `ANTHROPIC_API_KEY` in environment variables

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Add environment variable in Netlify dashboard
```

### Self-Hosted (Docker)

```bash
# Build
docker build -t arch-review .

# Run
docker run -p 3000:3000 \
  -e ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx \
  arch-review
```

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key | `sk-ant-api03-...` |

Get API key: https://console.anthropic.com/settings/keys

---

## Post-Deployment Checklist

- [ ] Deployment successful
- [ ] Environment variables set
- [ ] Test with example analysis
- [ ] Custom domain configured (optional)
- [ ] Monitoring enabled
- [ ] API usage tracking set up

---

## Monitoring & Maintenance

### Vercel Analytics

Enable in Project Settings → Analytics:
- Page views
- API response times
- Error tracking

### Anthropic API Monitoring

Monitor at https://console.anthropic.com:
- API usage
- Cost tracking
- Rate limits
- Error rates

### Logs

**View logs in Vercel:**
```
Project → Logs → Real-time logs
```

**Key things to monitor:**
- API errors
- Failed analyses
- Timeout issues
- Rate limit hits

---

## Cost Estimation

### Anthropic API Costs

Based on Claude Sonnet 4 pricing:
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

**Per Analysis:**
- Input tokens: ~4,000
- Output tokens: ~2,000
- Cost: **$0.02 - $0.04**

**Monthly estimates:**
- 100 analyses: ~$2-4
- 500 analyses: ~$10-20
- 1,000 analyses: ~$20-40
- 10,000 analyses: ~$200-400

### Vercel Hosting Costs

**Hobby (Free):**
- Perfect for personal use
- 100 GB bandwidth/month
- Serverless function executions: 100 GB-hours

**Pro ($20/month):**
- Team collaboration
- 1 TB bandwidth
- Priority support
- Advanced analytics

---

## Scaling Considerations

### Current Limits
- Each analysis: 15-25 seconds
- Concurrent analyses: Limited by Vercel serverless concurrency
- API rate limits: Per Anthropic account tier

### If You Need More Scale

1. **Upgrade Anthropic tier** for higher rate limits
2. **Add request queuing** for high concurrency
3. **Implement caching** for repeated analyses
4. **Consider batch processing** for multiple PRs

---

## Troubleshooting

### Build Failures

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**TypeScript errors:**
```bash
# Check types locally
npm run build
# Fix errors before deploying
```

### Runtime Errors

**"Analysis failed" error:**
1. Check API key is set correctly
2. Verify API key has credits
3. Check Anthropic API status: https://status.anthropic.com
4. Review Vercel function logs

**Timeout errors:**
- Increase Vercel function timeout in `vercel.json`
- Optimize prompts to reduce token usage

**Rate limit errors:**
- Upgrade Anthropic API tier
- Implement request throttling

### Performance Issues

**Slow analysis:**
- Normal: 15-25 seconds total
- If slower, check Anthropic API latency
- Consider using Claude Haiku for faster results (less accurate)

---

## Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use Vercel environment variables

2. **Rotate API keys regularly**
   - Update in Vercel dashboard
   - Redeploy automatically picks up new key

3. **Monitor API usage**
   - Set up billing alerts in Anthropic console
   - Track unusual spikes

4. **Rate limiting** (optional)
   - Add rate limiting middleware if public-facing
   - Prevent API key abuse

---

## Backup & Recovery

### Vercel Deployments

- Previous deployments are saved
- Rollback via Vercel dashboard: Deployments → Previous → Promote

### Database-less Architecture

- No database to backup
- Stateless design
- All data ephemeral

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Anthropic Docs**: https://docs.anthropic.com
- **Anthropic Support**: https://support.anthropic.com

---

## Success Checklist

✅ Application deployed and accessible  
✅ Environment variables configured  
✅ Test analysis completes successfully  
✅ Monitoring enabled  
✅ Custom domain configured (if applicable)  
✅ Team has access  
✅ Documentation shared  

---

**Need help?** Open an issue on GitHub or contact support.

**Happy deploying! 🚀**
