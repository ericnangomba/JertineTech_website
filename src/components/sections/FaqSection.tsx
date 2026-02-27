"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, Loader2, Send } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Reveal from '@/components/ui/reveal';
import { commonFaqs } from '@/lib/faq-data';

const faqFormSchema = z.object({
  question: z.string().min(5, { message: 'Question must be at least 5 characters.' }).max(200, { message: 'Question must be less than 200 characters.' }),
});

type FaqFormValues = z.infer<typeof faqFormSchema>;
type FaqApiResponse = {
  answer?: string;
  error?: string;
};

interface FaqSectionProps {
  id: string;
}

const defaultFallbackAnswer =
  'Thank you for your question. Please contact Jertine Tech for further details on the provided contact form.';

function getFallbackAnswer(question: string): string {
  const normalizedQuestion = question.toLowerCase();
  let bestAnswer = '';
  let bestScore = 0;

  for (const item of commonFaqs) {
    const candidate = `${item.question} ${item.answer}`.toLowerCase();
    const score = normalizedQuestion
      .split(/\s+/)
      .filter((token) => token.length > 2)
      .reduce((sum, token) => (candidate.includes(token) ? sum + 1 : sum), 0);

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = item.answer;
    }
  }

  return bestScore > 0 ? bestAnswer : defaultFallbackAnswer;
}

export default function FaqSection({ id }: FaqSectionProps) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: { question: '' },
  });

  const onSubmit: SubmitHandler<FaqFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: data.question }),
      });

      if (!response.ok) {
        throw new Error('Unable to fetch AI response');
      }

      const result = (await response.json()) as FaqApiResponse;
      if (!result.answer) {
        throw new Error(result.error ?? 'No answer returned');
      }

      setAnswer(result.answer);
    } catch (_error) {
      setAnswer(getFallbackAnswer(data.question));
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-shell grid gap-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-headline text-3xl font-bold md:text-5xl">
              Answers for operations
              <span className="block text-lime-300">where uptime matters.</span>
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <div className="mt-8 glass-card rounded-2xl p-6">
              <Accordion type="single" collapsible className="w-full">
                {commonFaqs.map((item, idx) => (
                  <AccordionItem value={`item-${idx + 1}`} key={item.question}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={120}>
        <div className="glass-card hover-lift rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-lime-300" />
            <p className="font-headline text-xl font-semibold">AI FAQ Assistant</p>
          </div>
          <p className="mb-4 text-sm text-muted-foreground text-balance">Ask about software delivery, hardware support, timelines, or support models.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Can you support 20 office desktops and a custom portal?" {...field} className="rounded-xl border-white/20 bg-white/5 pr-12" />
                        <Button type="submit" size="icon" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-lg bg-gradient-to-r from-lime-400 to-red-400 text-black hover:from-lime-300 hover:to-red-300" disabled={isLoading}>
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {isLoading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </div>
          )}

          {error && (
            <Alert className="mt-4 border-destructive/40 bg-destructive/10">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {answer && !error && (
            <Alert className="mt-4 border-lime-300/40 bg-lime-500/10">
              <AlertTitle className="text-lime-300">Answer</AlertTitle>
              <AlertDescription>{answer}</AlertDescription>
            </Alert>
          )}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
