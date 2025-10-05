import { aimlapi } from "@ai-ml.api/aimlapi-vercel-ai";
import { embed } from "ai";

export async function getEmbedding(text: string) {
  try {
    const { embedding } = await embed({
      model: aimlapi.textEmbeddingModel("text-embedding-ada-002"),
      value: text,
    });
    return embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    
    // Check if it's an API limit error
    if (error && typeof error === 'object' && 'responseBody' in error) {
      const responseBody = (error as any).responseBody;
      if (responseBody && responseBody.includes('exhausted the available')) {
        throw new Error("API quota exceeded. Please check your AIMLAPI billing or use a different API key.");
      }
    }
    
    throw new Error("Failed to generate embedding. Please check your API key and try again.");
  }
}
