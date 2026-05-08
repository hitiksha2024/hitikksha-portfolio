import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/utils/portfolio-data";

// ─── Rate Limiting (Simple In-Memory) ───
// Tracks requests per IP to prevent abuse
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const IS_DEV = process.env.NODE_ENV === "development";
const RATE_LIMIT = 30; // max requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

// Clean up old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// ─── Chat History Type (Groq uses OpenAI-compatible format) ───
interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// ─── Groq Client (singleton — reused across requests) ───
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ─── Model Config ───
// llama-3.3-70b-versatile: Best quality for portfolio chatbot (fast + smart)
// Fallbacks: llama-3.1-8b-instant (lighter, faster)
const MODELS = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];

// ─── POST Handler ───
export async function POST(request: Request) {
  try {
    // 1. Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!IS_DEV && isRateLimited(ip)) {
      return Response.json(
        {
          error:
            "You're sending messages too quickly. Please wait a moment and try again 😊",
        },
        { status: 429 }
      );
    }

    // 2. Validate API key exists
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set in environment variables");
      return Response.json(
        { error: "AI service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    // 3. Parse and validate request body
    const body = await request.json();
    const { message, history } = body as {
      message: string;
      history?: { role: "user" | "model"; parts: { text: string }[] }[];
    };

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return Response.json(
        {
          error:
            "Message is too long. Please keep it under 1000 characters.",
        },
        { status: 400 }
      );
    }

    // 4. Build messages array (Groq uses OpenAI-compatible format)
    // System prompt goes first, then conversation history, then current message
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    // Convert frontend history format to Groq format
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10); // Keep last 10 for context
      for (const msg of recentHistory) {
        messages.push({
          role: msg.role === "model" ? "assistant" : "user",
          content: msg.parts[0]?.text || "",
        });
      }
    }

    // Add the current user message
    messages.push({ role: "user", content: message });

    // 5. Try models with fallback
    let stream;
    let lastError: Error | null = null;

    for (const modelName of MODELS) {
      try {
        stream = await groq.chat.completions.create({
          model: modelName,
          messages,
          stream: true,
          temperature: 0.7, // Balanced creativity vs accuracy
          max_tokens: 512, // Keep responses concise for portfolio chatbot
          top_p: 0.9,
        });
        break; // Success — exit the loop
      } catch (modelError) {
        lastError =
          modelError instanceof Error
            ? modelError
            : new Error(String(modelError));
        console.warn(
          `Model ${modelName} failed, trying next...`,
          lastError.message
        );
        continue;
      }
    }

    if (!stream) {
      throw lastError || new Error("All AI models failed");
    }

    // 6. Create a readable stream for the response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (streamError) {
          console.error("Stream error:", streamError);
          controller.enqueue(
            encoder.encode(
              "\n\nSorry, I encountered an issue. Please try again!"
            )
          );
          controller.close();
        }
      },
    });

    // 7. Return streaming response
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Handle Groq-specific errors
    if (
      errorMessage.includes("API key") ||
      errorMessage.includes("authentication") ||
      errorMessage.includes("401")
    ) {
      return Response.json(
        { error: "AI service authentication failed. Please try again later." },
        { status: 500 }
      );
    }

    if (
      errorMessage.includes("content_filter") ||
      errorMessage.includes("moderation")
    ) {
      return Response.json(
        {
          error:
            "I couldn't process that request. Could you rephrase your question? 😊",
        },
        { status: 400 }
      );
    }

    if (
      errorMessage.includes("429") ||
      errorMessage.includes("rate_limit") ||
      errorMessage.includes("Too Many Requests")
    ) {
      return Response.json(
        {
          error:
            "The AI is taking a short break due to high demand. Please try again in about 30 seconds! ⏳",
        },
        { status: 429 }
      );
    }

    if (errorMessage.includes("503") || errorMessage.includes("overloaded")) {
      return Response.json(
        {
          error:
            "The AI service is temporarily busy. Please try again in a moment! 🔄",
        },
        { status: 503 }
      );
    }

    return Response.json(
      {
        error: "Something went wrong. Please try again in a moment! 🙏",
      },
      { status: 500 }
    );
  }
}
 