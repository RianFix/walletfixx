# WalletFix Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Supabase account (free tier available)

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API to get:
   - Project URL
   - Anon/Public key
4. Go to SQL Editor and run the database setup SQL (from README.md)

### Step 2: Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/walletfix.git
git push -u origin main
\`\`\`

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - \`NEXT_PUBLIC_SUPABASE_URL\`
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
5. Click "Deploy"

### Step 4: Verify Deployment

1. Visit your deployed URL
2. Test wallet generation
3. Test wallet connection
4. Verify database connectivity

## 🔧 Manual Deployment

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

### Environment Variables (Production)

Create \`.env.production\`:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
NODE_ENV=production
\`\`\`

### Custom Domain Setup

1. In Vercel dashboard, go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for SSL certificate provisioning

### Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Configure image domains in next.config.js

2. **Code Splitting**
   - Already handled by Next.js App Router
   - Use dynamic imports for heavy components

3. **Caching**
   - Configure headers in next.config.js
   - Use Vercel Edge Caching

4. **CDN**
   - Vercel provides global CDN automatically
   - Configure cache headers for static assets

## 📊 Monitoring

### Set Up Monitoring

1. **Vercel Analytics**
   - Enable in project settings
   - Track page views and performance

2. **Error Tracking**
   - Consider Sentry integration
   - Monitor client and server errors

3. **Database Monitoring**
   - Use Supabase Dashboard
   - Set up alerts for high usage

### Health Checks

Create a health check endpoint:

\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
}
\`\`\`

## 🔒 Production Security Checklist

- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables set
- [ ] Database RLS enabled
- [ ] Rate limiting configured
- [ ] CSP headers active
- [ ] Admin access restricted
- [ ] Backup strategy implemented
- [ ] Monitoring active
- [ ] Error tracking configured
- [ ] Documentation updated

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

Create \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
\`\`\`

## 📈 Scaling Considerations

### Database Scaling
- Monitor Supabase usage
- Upgrade to Pro plan if needed
- Consider read replicas for high traffic

### Application Scaling
- Vercel scales automatically
- Monitor serverless function usage
- Optimize cold start times

### Caching Strategy
- Use SWR for client-side caching
- Configure ISR for static pages
- Cache API responses appropriately

## 🆘 Troubleshooting

### Common Issues

**Issue**: Build fails on Vercel
- Check Node version compatibility
- Verify all dependencies are listed
- Check environment variables

**Issue**: Database connection fails
- Verify Supabase URL and key
- Check RLS policies
- Ensure network connectivity

**Issue**: Slow performance
- Enable Vercel Analytics
- Check bundle size
- Optimize images and assets

### Support

For deployment issues:
- Check Vercel documentation
- Review Supabase guides
- Contact support@walletfix.io

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Need Help?** Contact us at support@walletfix.io
