import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not found' }, { status: 500 });
    }

    // Read knowledge base
    const knowledgePath = path.join(process.cwd(), 'knowledge.md');
    let knowledgeBase = '';
    try {
      knowledgeBase = fs.readFileSync(knowledgePath, 'utf8');
    } catch (error) {
      console.warn('Knowledge base file not found:', error);
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Construct system prompt with knowledge base
    const systemPrompt = `
      Bạn là Nguyệt Minh, một trợ lý ảo thông minh và thân thiện.
      Nhiệm vụ của bạn là giải đáp thắc mắc và hỗ trợ người dùng khám phá sách thực tế ảo.
      Dưới đây là thông tin chi tiết về dự án và kịch bản ứng dụng. Hãy sử dụng thông tin này để trả lời câu hỏi của người dùng một cách chính xác nhất.
      Nếu thông tin không có trong tài liệu, hãy trả lời dựa trên kiến thức chung nhưng vẫn giữ vai trò là trợ lý ảo của ứng dụng.

      --- Bắt đầu Kho Tri Thức ---
      ${knowledgeBase}
      --- Kết thúc Kho Tri Thức ---

      Hãy trả lời ngắn gọn, súc tích, thân thiện và hữu ích.
    `;

    // Convert messages to Gemini format
    // Gemini expects 'user' and 'model' roles. 'system' prompt is usually passed as instruction or first message part.
    // For simplicity with chat history, we'll prepend system prompt to the chat session or valid history.

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Chào bạn, mình là Nguyệt Minh. Mình đã sẵn sàng hỗ trợ bạn!' }],
        },
        ...messages.slice(0, -1).map((msg: any) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
      ],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ role: 'assistant', content: text });
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
