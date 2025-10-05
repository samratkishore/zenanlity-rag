import { NextRequest } from "next/server";
import { aimlapi } from "@ai-ml.api/aimlapi-vercel-ai";
import { generateText } from "ai";
import { retrieveRelevantDocuments, formatContext } from "@/lib/rag";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      throw new Error("No prompt provided");
    }

    // Retrieve relevant documents
    const relevantDocs = await retrieveRelevantDocuments(prompt, 3);
    const context = formatContext(relevantDocs);

    // Create system message with context
    const systemPrompt = `You are a helpful assistant that answers questions based on the provided context. 
      
Context from documents:
${context}

Instructions:
- Use the context above to answer the user's question
- If the context doesn't contain relevant information, say so
- Be concise and accurate
- Cite specific parts of the context when relevant

User question: ${prompt}`;

    // Generate response with Vercel AI SDK
    const { text } = await generateText({
      model: aimlapi('gpt-4o-mini'),
      prompt: systemPrompt,
      temperature: 0.7,
      maxOutputTokens: 1000,
    });

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Chat API error:", error);
    
    let errorMessage = "Failed to process request";
    if (error && typeof error === 'object' && 'responseBody' in error) {
      const responseBody = (error as any).responseBody;
      if (responseBody && responseBody.includes('exhausted the available')) {
        errorMessage = "API quota exceeded. Please check your AIMLAPI billing or use a different API key.";
      }
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
