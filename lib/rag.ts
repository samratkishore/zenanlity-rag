import { getEmbedding } from "./embeddings";
import { supabase } from "./supabase";

export interface DocumentMatch {
  id: number;
  content: string;
  similarity: number;
}

export async function retrieveRelevantDocuments(query: string, matchCount: number = 3): Promise<DocumentMatch[]> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await getEmbedding(query);

    // Retrieve similar documents from Supabase
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_count: matchCount,
    });

    if (error) {
      console.error("Error retrieving documents:", error);
      throw new Error("Failed to retrieve documents");
    }

    return data || [];
  } catch (error) {
    console.error("Error in retrieveRelevantDocuments:", error);
    throw error;
  }
}

export function formatContext(documents: DocumentMatch[]): string {
  if (!documents || documents.length === 0) {
    return "No relevant documents found.";
  }

  return documents
    .map((doc, index) => `Document ${index + 1}:\n${doc.content}`)
    .join("\n\n");
}
