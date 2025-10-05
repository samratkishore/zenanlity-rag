# Deployment Guide

This guide will walk you through deploying the Zenanlity RAG App to production.

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Supabase account (free tier)
- AIMLAPI account

## Step 1: Set Up Supabase

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `zenanlity-rag`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"

### 1.2 Configure Database

1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase-setup.sql`
3. Click "Run" to execute the SQL

### 1.3 Get API Keys

1. Go to Settings > API
2. Copy the following:
   - Project URL (starts with `https://`)
   - `service_role` key (not the anon key)

## Step 2: Set Up AIMLAPI

1. Go to [ai-ml.api](https://ai-ml.api) and create an account
2. Get your API key from the dashboard
3. Note: The free tier should be sufficient for testing

## Step 3: Deploy to Vercel

### 3.1 Prepare Your Code

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/zenanlity-rag.git
git push -u origin main
```

### 3.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"

### 3.3 Configure Environment Variables

1. In your Vercel project dashboard, go to Settings > Environment Variables
2. Add the following variables:

```
AIMLAPI_API_KEY=sk-your-aimlapi-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

3. Click "Save" and redeploy

## Step 4: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://zenanlity-rag.vercel.app`)
2. Upload a test document
3. Ask questions about the document
4. Verify that responses are relevant

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for DNS propagation

## Troubleshooting

### Common Issues

1. **"Missing environment variables"**
   - Check that all environment variables are set in Vercel
   - Redeploy after adding variables

2. **"Database connection failed"**
   - Verify Supabase URL and service key
   - Check if pgvector extension is enabled
   - Ensure RLS policies are configured correctly

3. **"Embedding generation failed"**
   - Verify AIMLAPI key is correct
   - Check AIMLAPI service status
   - Ensure you have sufficient credits

4. **"Function timeout"**
   - Increase function timeout in `vercel.json`
   - Optimize your code for faster execution

### Performance Optimization

1. **Enable Edge Functions** (if supported):
   - Convert API routes to Edge Functions for faster cold starts

2. **Implement Caching**:
   - Cache embeddings for repeated queries
   - Use Supabase caching features

3. **Optimize Database**:
   - Add proper indexes
   - Use connection pooling

## Monitoring

### Vercel Analytics

1. Enable Vercel Analytics in your project
2. Monitor function execution times
3. Track error rates

### Supabase Monitoring

1. Use Supabase dashboard to monitor:
   - Database performance
   - Query execution times
   - Storage usage

### Logs

1. Check Vercel function logs for errors
2. Monitor Supabase logs for database issues
3. Set up error tracking (e.g., Sentry)

## Security Considerations

1. **Environment Variables**: Never commit API keys to Git
2. **CORS**: Configure CORS properly for production
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Authentication**: Add user authentication for production use
5. **Input Validation**: Validate all user inputs

## Scaling

### When to Scale

- High traffic volume
- Large document collections
- Complex queries

### Scaling Options

1. **Vercel Pro**: Higher function limits
2. **Supabase Pro**: More database resources
3. **CDN**: Add CDN for static assets
4. **Caching**: Implement Redis or similar

## Cost Optimization

### Free Tier Limits

- **Vercel**: 100GB bandwidth, 100 function executions/day
- **Supabase**: 500MB database, 50MB file storage
- **AIMLAPI**: Check current pricing

### Optimization Tips

1. Cache embeddings to reduce API calls
2. Use efficient chunking strategies
3. Implement proper error handling
4. Monitor usage regularly

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Vercel and Supabase documentation
3. Check AIMLAPI status page
4. Open an issue in the GitHub repository
