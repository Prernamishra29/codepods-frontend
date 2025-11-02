import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const HF_TOKEN = process.env.HF_TOKEN;
    if (!HF_TOKEN) {
      return NextResponse.json({ error: "Missing HF_TOKEN" }, { status: 500 });
    }

    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: HF_TOKEN,
    });

    const systemPrompt = `
You are an expert AI that generates step-by-step learning roadmaps. Return ONLY a JSON array with objects having: id (string), title (string), weekRange (string), tasks (array of strings).
    `.trim();

    const completion = await client.chat.completions.create({
      model: "MiniMaxAI/MiniMax-M2:novita",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const aiResponse = completion.choices[0]?.message?.content || "[]";

    return NextResponse.json({ result: aiResponse });
  } catch (error: any) {
    console.error("🔥 Error in /api/roadmap:", error);
    return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
  }
}
