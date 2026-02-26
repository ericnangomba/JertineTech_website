import { NextResponse } from 'next/server';
import { z } from 'zod';

import { aiFAQ } from '@/ai/flows/ai-faq';

const faqRequestSchema = z.object({
  question: z.string().min(5).max(200),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = faqRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please provide a question between 5 and 200 characters.' },
        { status: 400 }
      );
    }

    const result = await aiFAQ(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Unable to process request.' }, { status: 500 });
  }
}
