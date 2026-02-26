import { z } from 'zod';

const UNSAFE_MARKUP_REGEX = /<[^>]+>|javascript:|data:text\/html|on\w+\s*=/i;
const UNSAFE_SQL_REGEX = /\b(select|union|insert|update|delete|drop|alter|truncate)\b\s+\b(from|into|table|where|set)\b/i;

export function sanitizeInput(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

export function hasUnsafeInput(value: string): boolean {
  return UNSAFE_MARKUP_REGEX.test(value) || UNSAFE_SQL_REGEX.test(value);
}

export const safeNameSchema = z.string()
  .transform(sanitizeInput)
  .refine((value: string) => value.length >= 2, { message: 'Name must be at least 2 characters.' })
  .refine((value: string) => value.length <= 80, { message: 'Name must be less than 80 characters.' })
  .refine((value: string) => !hasUnsafeInput(value), { message: 'Name contains unsafe content.' });

export const safeEmailSchema = z.string()
  .trim()
  .email({ message: 'Please enter a valid email address.' })
  .transform((value) => value.toLowerCase())
  .refine((value: string) => !hasUnsafeInput(value), { message: 'Email contains unsafe content.' });

export const safeMessageSchema = z.string()
  .transform(sanitizeInput)
  .refine((value: string) => value.length >= 10, { message: 'Message must be at least 10 characters.' })
  .refine((value: string) => value.length <= 500, { message: 'Message must be less than 500 characters.' })
  .refine((value: string) => !hasUnsafeInput(value), { message: 'Message contains unsafe content.' });

export const contactSubmissionSchema = z.object({
  name: safeNameSchema,
  email: safeEmailSchema,
  message: safeMessageSchema,
  companyWebsite: z.string().max(0).optional().default(''),
  startedAt: z.number().int().positive(),
});

export type ContactSubmissionPayload = z.infer<typeof contactSubmissionSchema>;
