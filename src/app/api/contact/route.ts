import { NextResponse } from 'next/server';
import { createHmac, randomUUID } from 'node:crypto';
import { contactSubmissionSchema } from '@/lib/contact-security';

type RateRecord = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_SUBMIT_TIME_MS = 3000;
const WEBHOOK_MAX_ATTEMPTS = 2;

const rateLimitStore = new Map<string, RateRecord>();

function parseTimeoutMs(value: string | undefined): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1000) {
    return 8000;
  }
  return Math.min(parsed, 30000);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function forwardInquiryToWebhook(payload: {
  submissionId: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  rateKey: string;
}): Promise<void> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    // Fallback for environments where delivery integration is not configured yet.
    console.info('Contact inquiry accepted (webhook not configured)', {
      name: payload.name,
      email: payload.email,
      messageLength: payload.message.length,
      receivedAt: payload.receivedAt,
      rateKey: payload.rateKey,
    });
    return;
  }

  const timeoutMs = parseTimeoutMs(process.env.CONTACT_WEBHOOK_TIMEOUT_MS);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'User-Agent': 'JertineTechContact/1.0',
  };

  const bearerToken = process.env.CONTACT_WEBHOOK_BEARER_TOKEN;
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }

  const requestBody = JSON.stringify({
    source: 'jertinetech-website',
    type: 'contact_inquiry',
    ...payload,
  });

  const signingSecret = process.env.CONTACT_WEBHOOK_SIGNING_SECRET;
  if (signingSecret) {
    headers['X-Jertine-Signature-SHA256'] = createHmac('sha256', signingSecret)
      .update(requestBody)
      .digest('hex');
  }

  let lastError: unknown = null;
  for (let attempt = 1; attempt <= WEBHOOK_MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: requestBody,
        signal: controller.signal,
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}`);
      }

      return;
    } catch (error) {
      lastError = error;
      if (attempt < WEBHOOK_MAX_ATTEMPTS) {
        await sleep(250 * attempt);
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Webhook request failed');
}

function getRateLimitKey(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [ip] = forwardedFor.split(',');
    if (ip) return ip.trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const userAgent = request.headers.get('user-agent') ?? 'unknown-agent';
  return `unknown:${userAgent}`;
}

function isRateLimited(key: string, now: number): boolean {
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return existing.count > RATE_LIMIT_MAX;
}

function pruneRateLimitStore(now: number): void {
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

export async function POST(request: Request) {
  const now = Date.now();
  pruneRateLimitStore(now);

  const rateKey = getRateLimitKey(request);
  if (isRateLimited(rateKey, now)) {
    return NextResponse.json(
      { success: false, message: 'Too many attempts. Please try again shortly.' },
      { status: 429 }
    );
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload.' },
      { status: 400 }
    );
  }

  const parsed = contactSubmissionSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid form fields.' },
      { status: 400 }
    );
  }

  const { name, email, message, companyWebsite, startedAt } = parsed.data;

  if (companyWebsite) {
    return NextResponse.json(
      { success: false, message: 'Submission blocked.' },
      { status: 400 }
    );
  }

  if (now - startedAt < MIN_SUBMIT_TIME_MS) {
    return NextResponse.json(
      { success: false, message: 'Submission blocked. Please retry.' },
      { status: 400 }
    );
  }

  const receivedAt = new Date(now).toISOString();
  const submissionId = randomUUID();
  try {
    await forwardInquiryToWebhook({
      submissionId,
      name,
      email,
      message,
      receivedAt,
      rateKey,
    });
  } catch (error) {
    console.error('Contact inquiry delivery failed', {
      submissionId,
      error: error instanceof Error ? error.message : 'unknown_error',
      receivedAt,
      rateKey,
    });

    return NextResponse.json(
      { success: false, message: 'We could not submit your inquiry right now. Please try again shortly.' },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Your inquiry was sent. We'll reply within one business day.",
  });
}
