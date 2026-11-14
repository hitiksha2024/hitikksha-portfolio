import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/utils/portfolio-data";

// ─── Rate Limiting (Simple In-Memory) ───
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const IS_DEV = process.env.NODE_ENV === "development";
const RATE_LIMIT = 40; // requests per minute
const RATE_WINDOW = 60 * 1000;

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

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// ─── Groq Client (singleton) ───
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ─── Active Models on Groq (Checked dynamically, with robust fallback order) ───
const CANDIDATE_MODELS = [
  "qwen/qwen3.8-27b",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "llama3-70b-8192",
  "llama3-8b-8192",
];

// ─── Intelligent Knowledge-Base Fallback Generator ───
// Guarantees the chatbot NEVER breaks even if Groq is down or models are retired
function generateKnowledgeFallback(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Experience & Background
  if (
    q.includes("experience") ||
    q.includes("year") ||
    q.includes("background") ||
    q.includes("journey") ||
    q.includes("career") ||
    q.includes("elaunch")
  ) {
    return `Hitiksha Pandav is a Full Stack Developer & Freelance Engineer with **2+ years of professional software engineering experience**.\n\n` +
      `Here is a snapshot of her professional journey at **ELaunch Infotech**:\n` +
      `• **Software Developer (2025 — Present)**: Leading full-stack engineering, architecting RESTful APIs, and optimizing MongoDB queries for high-concurrency systems.\n` +
      `• **Junior Software Developer (Dec 2024 — 2025)**: Promoted within 6 months due to high performance; built scalable backend services and Socket.io real-time solutions.\n` +
      `• **Software Engineer Intern (June 2024 — Dec 2024)**: Contributed to production-grade code from week one immediately after graduating with a BCA.\n\n` +
      `She is actively open for freelance engineering contracts and full-time opportunities! 💼`;
  }

  // 2. Freelance & Hiring
  if (
    q.includes("freelance") ||
    q.includes("hire") ||
    q.includes("available") ||
    q.includes("contract") ||
    q.includes("pricing") ||
    q.includes("service") ||
    q.includes("cost") ||
    q.includes("rate") ||
    q.includes("work with")
  ) {
    return `Hitiksha is actively available for **freelance projects, MVP prototyping, and contract engineering**, as well as **full-time software developer opportunities**! 🚀\n\n` +
      `**Her Core Freelance Solutions:**\n` +
      `1. **Full-Stack Web & MVP Launches**: Rapid prototype to live production (React, Next.js, Node.js, MongoDB).\n` +
      `2. **Scalable Backend & REST APIs**: High-throughput microservices, authentication (JWT/OAuth), and payment integrations.\n` +
      `3. **Real-time WebSockets**: In-app chat, matchmaking, and live notification engines using Socket.io.\n` +
      `4. **UI/UX Modernization**: High-speed, responsive frontend overhauls with Framer Motion animations.\n\n` +
      `**Client Guarantees**: Rapid sprint milestones, clean maintainable code, < 12-hour reply guarantee, and post-launch support.\n\n` +
      `Feel free to send a message through the contact form or email her directly at **pandavhitiksha@gmail.com**!`;
  }

  // 3. Projects & Production Deployments
  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("oppi") ||
    q.includes("trippica") ||
    q.includes("cool match") ||
    q.includes("nexus") ||
    q.includes("ecommerce") ||
    q.includes("shipped") ||
    q.includes("app") ||
    q.includes("deployment")
  ) {
    return `Hitiksha has engineered and shipped multiple production applications: 🚀\n\n` +
      `• **Oppi Wallet** (Full Stack Developer): Real-world financial platform live on the Play Store & App Store. Built authentication, transaction APIs, and a sleek mobile-responsive web UI.\n` +
      `• **Trippica** (Backend Developer): Live travel-booking engine with scalable microservices engineered for high reliability.\n` +
      `• **Cool Match** (Backend Developer): Real-time matchmaking platform powered by Socket.io and high-concurrency event pipelines.\n` +
      `• **Nexus** (Full Stack Developer): Enterprise task management platform featuring Role-Based Access Control (RBAC) and real-time status tracking.\n` +
      `• **E-Commerce Web** (Full Stack Developer): End-to-end retail system with catalog management, cart logic, and payment integration.\n\n` +
      `You can explore live previews in the **DEPLOYMENTS** section above!`;
  }

  // 4. Skills & Tech Stack
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("technology") ||
    q.includes("language") ||
    q.includes("react") ||
    q.includes("node") ||
    q.includes("mongo") ||
    q.includes("tools")
  ) {
    return `Hitiksha's core technical arsenal includes: ⚡\n\n` +
      `• **Core Stack**: MERN (MongoDB, Express.js, React.js, Node.js)\n` +
      `• **Frontend**: React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5, CSS3\n` +
      `• **Backend & APIs**: Node.js, Express.js, RESTful APIs, Socket.io (Real-time WebSockets)\n` +
      `• **Database**: MongoDB (Aggregation pipelines, Schema design, Indexing, Query optimization)\n` +
      `• **DevOps & Cloud**: Docker, AWS (Deployment), Git/GitHub, Firebase\n` +
      `• **Philosophy**: Clean code mindset, performance tuning, and scalable architecture.`;
  }

  // 5. Education
  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("study") ||
    q.includes("graduate") ||
    q.includes("bca") ||
    q.includes("sutex")
  ) {
    return `Hitiksha completed her **Bachelor of Computer Applications (BCA)** from **Sutex Bank of Computer Application & Science**, graduating in **2024**. 🎓\n\n` +
      `Demonstrating exceptional technical readiness, she immediately joined ELaunch Infotech upon graduation and has been building production software continuously.`;
  }

  // 6. Contact / Email / Socials
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("message") ||
    q.includes("call")
  ) {
    return `You can connect with Hitiksha directly through any of these channels: 📬\n\n` +
      `• **Email**: [pandavhitiksha@gmail.com](mailto:pandavhitiksha@gmail.com)\n` +
      `• **LinkedIn**: [linkedin.com/in/hitiksha-pandav](https://linkedin.com/in/hitiksha-pandav)\n` +
      `• **GitHub**: [github.com/hitiksha-pandav](https://github.com/hitiksha-pandav)\n\n` +
      `She typically responds to project and hiring inquiries within **12 hours**!`;
  }

  // 7. Greetings
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.startsWith("hello") ||
    q.startsWith("hi ") ||
    q.startsWith("hey ")
  ) {
    return `Greetings! I am Hitiksha's AI Envoy. 👋\n\n` +
      `I can help you explore her **2+ years of full-stack experience**, live production projects (**Oppi Wallet, Trippica, Cool Match**), core tech stack (**MERN & Next.js**), and her availability for **freelance projects or full-time roles**.\n\n` +
      `How can I assist you today?`;
  }

  // 8. General Default Knowledge Response
  return `Hitiksha Pandav is a Full Stack Developer & Freelance Engineer with **2+ years of professional experience** building scalable web platforms, robust APIs, and real-time systems. 💼\n\n` +
    `She specializes in the **MERN Stack (MongoDB, Express, React, Node.js)** and **Next.js**, with proven deployments like **Oppi Wallet** (live on Play Store & App Store) and **Trippica**.\n\n` +
    `She is actively available for **freelance project inquiries, MVP development**, and **full-time software engineering roles**. You can contact her directly at **pandavhitiksha@gmail.com** or use the contact form on this page!`;
}

// Helper to stream static text gracefully chunk by chunk
function createTextStream(fullText: string): Response {
  const encoder = new TextEncoder();
  const words = fullText.split(" ");
  let i = 0;

  const readableStream = new ReadableStream({
    async start(controller) {
      while (i < words.length) {
        // Stream 2-4 words at a time for natural typewriter feel
        const chunk = words.slice(i, i + 3).join(" ") + (i + 3 < words.length ? " " : "");
        controller.enqueue(encoder.encode(chunk));
        i += 3;
        await new Promise((res) => setTimeout(res, 25));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}

// ─── POST Handler ───
export async function POST(request: Request) {
  let userMessage = "";
  try {
    // 1. Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!IS_DEV && isRateLimited(ip)) {
      return Response.json(
        {
          error: "You're sending messages too quickly. Please wait a moment and try again 😊",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { message, history } = body as {
      message: string;
      history?: { role: "user" | "model"; parts: { text: string }[] }[];
    };

    userMessage = message || "";

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Please enter a message." }, { status: 400 });
    }

    if (message.length > 1000) {
      return Response.json(
        { error: "Message is too long. Please keep it under 1000 characters." },
        { status: 400 }
      );
    }

    // If API key is missing, immediately stream graceful knowledge fallback
    if (!process.env.GROQ_API_KEY) {
      console.warn("GROQ_API_KEY missing, using knowledge fallback");
      return createTextStream(generateKnowledgeFallback(message));
    }

    // 3. Build message history
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (Array.isArray(history)) {
      const recentHistory = history.slice(-8);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.role === "model" ? "assistant" : "user",
          content: msg.parts[0]?.text || "",
        });
      }
    }

    messages.push({ role: "user", content: message });

    // 4. Try candidate models in order
    type ChatStreamType = AsyncIterable<{ choices: { delta: { content?: string } }[] }>;
    let stream: ChatStreamType | null = null;
    let modelUsed = "";

    for (const modelName of CANDIDATE_MODELS) {
      try {
        stream = (await groq.chat.completions.create({
          model: modelName,
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 650,
          top_p: 0.9,
        })) as unknown as ChatStreamType;
        modelUsed = modelName;
        break;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`Groq candidate model ${modelName} failed:`, msg);
        continue;
      }
    }

    // 5. Dynamic fallback: if candidate models failed, query groq for any active chat model
    if (!stream) {
      try {
        console.log("Candidate models failed. Discovering active models on Groq...");
        const modelsList = await groq.models.list();
        interface ModelItem {
          id: string;
          active?: boolean;
          output_modalities?: string[];
        }
        const activeModels = (modelsList.data as unknown as ModelItem[])
          .filter(
            (m) =>
              m.active &&
              m.output_modalities?.includes("text") &&
              !m.id.includes("whisper") &&
              !m.id.includes("guard")
          )
          .map((m) => m.id);

        for (const dynModel of activeModels) {
          try {
            stream = (await groq.chat.completions.create({
              model: dynModel,
              messages,
              stream: true,
              temperature: 0.7,
              max_tokens: 650,
              top_p: 0.9,
            })) as unknown as ChatStreamType;
            modelUsed = dynModel;
            console.log(`Successfully connected to dynamic model: ${dynModel}`);
            break;
          } catch {
            continue;
          }
        }
      } catch (discoveryErr) {
        console.warn("Model discovery error:", discoveryErr);
      }
    }

    // 6. Zero-failure fallback: If Groq is completely unavailable, stream knowledge base!
    if (!stream) {
      console.warn("All Groq models failed. Serving intelligent local fallback response.");
      return createTextStream(generateKnowledgeFallback(message));
    }

    // 7. Stream LLM response
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
          console.error("Stream error with model", modelUsed, streamError);
          // If streaming aborts mid-way, enqueue fallback info smoothly
          controller.enqueue(
            encoder.encode("\n\nFor more details or direct inquiries, please feel free to email Hitiksha at pandavhitiksha@gmail.com! 💼")
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat route critical error:", error);
    // Even in catastrophic catch, return intelligent fallback stream instead of 500!
    return createTextStream(generateKnowledgeFallback(userMessage || "Hello"));
  }
}
