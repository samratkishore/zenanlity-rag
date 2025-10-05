import { NextRequest } from "next/server";
import { aimlapi } from "@ai-ml.api/aimlapi-vercel-ai";
import { generateText } from "ai";

export async function GET() {
  try {
    // Test AIMLAPI connection with a simple request
    const { text } = await generateText({
      model: aimlapi('gpt-4o-mini'),
      prompt: "Say 'Hello' in one word",
      maxOutputTokens: 5,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      response: text,
      message: "AIMLAPI is working correctly"
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("API Test error:", error);
    
    let errorMessage = "Unknown error";
    let errorDetails = "";
    
    if (error && typeof error === 'object') {
      if ('responseBody' in error) {
        const responseBody = (error as any).responseBody;
        errorDetails = responseBody;
        if (responseBody && responseBody.includes('exhausted the available')) {
          errorMessage = "API quota exceeded";
        } else if (responseBody && responseBody.includes('Forbidden')) {
          errorMessage = "Invalid API key or authentication error";
        }
      } else if ('message' in error) {
        errorMessage = (error as any).message;
      }
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage,
      details: errorDetails,
      message: "AIMLAPI test failed"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
