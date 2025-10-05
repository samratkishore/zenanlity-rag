import { NextRequest, NextResponse } from "next/server";
import { getEmbedding } from "@/lib/embeddings";
import { supabase } from "@/lib/supabase";
import { chunkText, cleanText } from "@/lib/text-processing";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text content is required" },
        { status: 400 }
      );
    }

    // Clean and chunk the text
    const cleanedText = cleanText(text);
    const chunks = chunkText(cleanedText, 1000, 200);

    // Process each chunk
    let documents;
    try {
      const embeddingPromises = chunks.map(async (chunk) => {
        const embedding = await getEmbedding(chunk);
        return {
          content: chunk,
          embedding: embedding,
        };
      });

      documents = await Promise.all(embeddingPromises);
    } catch (error) {
      console.error("Embedding generation failed:", error);
      return NextResponse.json(
        { 
          error: error instanceof Error ? error.message : "Failed to generate embeddings" 
        }, 
        { status: 500 }
      );
    }

    // Store all chunks in Supabase
    const { error } = await supabase.from("documents").insert(documents);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to store document" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      status: "success", 
      message: `Document uploaded and processed successfully. Created ${chunks.length} chunks.` 
    });

  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
