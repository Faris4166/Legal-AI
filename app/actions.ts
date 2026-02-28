"use server";

import { client, LEGAL_SYSTEM_PROMPT } from "@/lib/gemini";

export async function transformToLegalLanguage(userInput: string) {
  if (!userInput || userInput.trim() === "") {
    return { error: "กรุณาระบบเหตุการณ์" };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Mock response for testing UI without API key
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { 
      content: `[โหมดจำลอง: ยังไม่ได้ระบุ API Key] ข้าพเจ้าได้ดำเนินการวิเคราะห์เรื่องราวของท่านแล้ว หากมี API Key ของ Gemini ข้าพเจ้าจะทำการเรียบเรียงข้อความ: "${userInput}" ให้เป็นภาษากฎหมายที่ถูกต้องทันที`,
      isMock: true
    };
  }

  try {
    const prompt = `${LEGAL_SYSTEM_PROMPT}\n\nผู้ใช้เขียนว่า: "${userInput}"\nAI ช่วยเรียบเรียงเป็นภาษากฎหมาย:`;

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return { content: response.text };
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    
    const err = error as any;
    // Handle Quota Exceeded (429)
    if (err?.status === 429 || err?.message?.includes("429") || err?.message?.includes("quota")) {
      return { error: "ขออภัยครับ ตอนนี้โควต้าการใช้งาน Gemini ของคุณเต็มแล้ว โปรดรอสักครู่แล้วลองใหม่อีกครั้ง หรือตรวจสอบ API Key ของคุณ" };
    }
    
    return { error: "เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini AI กรุณาลองใหม่อีกครั้ง" };
  }
}
