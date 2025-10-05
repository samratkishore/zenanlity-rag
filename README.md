# Zenanlity RAG App

A Next.js Retrieval-Augmented Generation (RAG) application using AIMLAPI, Supabase (pgvector), and Vercel AI SDK.

## 🚀 Features

- **Document Upload**: Upload and process text documents
- **Vector Search**: Semantic similarity search using pgvector
- **Streaming Chat**: Real-time chat interface with streaming responses
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Free Tier**: Built entirely on free services

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **AI Models**: AIMLAPI (GPT-4o-mini, text-embedding-3-large)
- **Vector Database**: Supabase with pgvector extension
- **Streaming**: Vercel AI SDK
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (frontend) + Supabase (database)

## 📋 Prerequisites

- Node.js 18+ 
- Supabase account
- AIMLAPI account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd zenanlity-rag
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-setup.sql`
3. Get your project URL and service role key from Settings > API

### 3. Configure Environment Variables

Create a `.env.local` file:

```bash
cp env.example .env.local
```

Fill in your API keys:

```env
AIMLAPI_API_KEY=sk-your-aimlapi-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
zenanlity-rag/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # Chat endpoint with RAG
│   │   └── upload/route.ts    # Document upload endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main chat interface
├── lib/
│   ├── embeddings.ts          # AIMLAPI embedding helper
│   ├── rag.ts                 # RAG pipeline logic
│   └── supabase.ts            # Supabase client
├── supabase-setup.sql         # Database setup script
└── package.json
```

## 🔧 API Endpoints

### POST /api/upload
Upload and process documents for embedding.

**Request:**
```json
{
  "text": "Your document content here..."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Document uploaded and processed successfully"
}
```

### POST /api/chat
Chat with your documents using RAG.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What is the main topic?"
    }
  ]
}
```

**Response:** Streaming AI response

## 🗄️ Database Schema

### documents table
```sql
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(3072),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### match_documents function
```sql
CREATE FUNCTION match_documents(
  query_embedding VECTOR(3072),
  match_count INT DEFAULT 3
) RETURNS TABLE(id BIGINT, content TEXT, similarity FLOAT)
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Supabase Setup

1. Run the SQL setup script in Supabase SQL Editor
2. Configure Row Level Security (RLS) if needed
3. Set up proper permissions

## 🔒 Security Considerations

- Use service role key only on the server side
- Implement proper authentication for production
- Consider rate limiting for API endpoints
- Validate and sanitize user inputs

## 🧪 Testing

Test the application by:

1. Upload a document via the text area
2. Ask questions about the uploaded content
3. Verify that responses are relevant to your documents

## 🔄 Workflow

1. **Upload**: User uploads document → generates embeddings → stores in Supabase
2. **Query**: User asks question → generates query embedding → similarity search
3. **Retrieve**: Gets relevant document chunks → formats context
4. **Generate**: Sends context + question to LLM → streams response

## 🛠️ Customization

### Change AI Model
Edit `lib/embeddings.ts` and `app/api/chat/route.ts`:

```typescript
// For embeddings
model: aimlapi.textEmbeddingModel("your-model")

// For chat
model: aimlapi.chatModel("your-model")
```

### Adjust Retrieval
Modify `lib/rag.ts`:

```typescript
// Change number of retrieved documents
const relevantDocs = await retrieveRelevantDocuments(userQuery, 5);
```

### Custom UI
Modify `app/page.tsx` to customize the interface.

## 🐛 Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check your `.env.local` file
   - Verify Supabase URL and service key

2. **"Failed to generate embedding"**
   - Verify AIMLAPI key is correct
   - Check AIMLAPI service status

3. **"Failed to retrieve documents"**
   - Ensure pgvector extension is enabled
   - Check if documents table exists
   - Verify RLS policies

### Debug Mode

Add logging to see what's happening:

```typescript
console.log("Query:", userQuery);
console.log("Retrieved docs:", relevantDocs);
```

## 📈 Performance Optimization

- Use connection pooling for Supabase
- Implement caching for embeddings
- Consider chunking large documents
- Add pagination for large result sets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) for streaming
- [Supabase](https://supabase.com/) for vector database
- [AIMLAPI](https://ai-ml.api/) for AI models
- [Next.js](https://nextjs.org/) for the framework
