# 🚀 Zenanlity RAG App - Quick Setup

## What You Have

A complete Next.js RAG application with:
- ✅ Modern UI with Tailwind CSS
- ✅ Document upload and processing
- ✅ Vector similarity search with pgvector
- ✅ Streaming chat interface
- ✅ AIMLAPI integration
- ✅ Supabase vector database
- ✅ Production-ready deployment setup

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create project at [supabase.com](https://supabase.com)
2. Run `supabase-setup.sql` in SQL Editor
3. Get your URL and service key

### 3. Get AIMLAPI Key
1. Sign up at [ai-ml.api](https://ai-ml.api)
2. Copy your API key

### 4. Configure Environment
```bash
cp env.example .env.local
# Edit .env.local with your keys
```

### 5. Test Setup
```bash
npm run test-setup
```

### 6. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` and start chatting!

## File Structure

```
zenanlity-rag/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── page.tsx           # Main UI
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── lib/                   # Core utilities
│   ├── embeddings.ts      # AIMLAPI integration
│   ├── rag.ts            # RAG pipeline
│   ├── supabase.ts       # Database client
│   └── text-processing.ts # Text chunking
├── scripts/              # Setup and testing
└── supabase-setup.sql    # Database schema
```

## Key Features

### 🔍 Smart Document Processing
- Automatic text chunking with overlap
- Intelligent sentence boundary detection
- Clean text preprocessing

### 🧠 Advanced RAG Pipeline
- Semantic similarity search
- Context-aware responses
- Streaming chat interface

### 🎨 Beautiful UI
- Responsive design
- Real-time status updates
- Modern chat interface

### 🚀 Production Ready
- Vercel deployment ready
- Environment variable management
- Error handling and logging

## API Endpoints

- `POST /api/upload` - Upload and process documents
- `POST /api/chat` - Chat with your documents

## Environment Variables

```env
AIMLAPI_API_KEY=sk-your-key
NEXT_PUBLIC_SUPABASE_URL=https://koevoqlppmtdviotpowq.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
```

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

## Customization

### Change AI Models
Edit `lib/embeddings.ts` and `app/api/chat/route.ts`

### Adjust Chunking
Modify `lib/text-processing.ts`

### Custom UI
Update `app/page.tsx` and components

## Support

- 📖 Full documentation: `README.md`
- 🚀 Deployment guide: `DEPLOYMENT.md`
- 🧪 Test setup: `npm run test-setup`

## Next Steps

1. **Add Authentication** - Implement user accounts
2. **File Upload** - Support PDF, DOC, TXT files
3. **Metadata Filtering** - Filter by document type, date, etc.
4. **Caching** - Cache embeddings for performance
5. **Analytics** - Track usage and performance

---

**Built with ❤️ using Next.js, Supabase, and AIMLAPI**
