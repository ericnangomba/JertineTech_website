"use client";

import { useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Reveal from '@/components/ui/reveal';
import {
  contactSubmissionSchema,
  hasUnsafeInput,
  type ContactSubmissionPayload,
} from '@/lib/contact-security';

async function submitInquiryAction(data: ContactSubmissionPayload): Promise<{ success: boolean; message: string }> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok) {
    return {
      success: false,
      message: result.message ?? 'Submission failed. Please try again.',
    };
  }

  return {
    success: true,
    message: result.message ?? "Your inquiry was sent. We'll reply within one business day.",
  };
}

interface ContactSectionProps {
  id: string;
}

export default function ContactSection({ id }: ContactSectionProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAtRef = useRef<number>(Date.now());

  const form = useForm<ContactSubmissionPayload>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      companyWebsite: '',
      startedAt: startedAtRef.current,
    },
  });

  const onSubmit: SubmitHandler<ContactSubmissionPayload> = async (data) => {
    // Defense-in-depth check before passing values onward.
    if (
      hasUnsafeInput(data.name) ||
      hasUnsafeInput(data.email) ||
      hasUnsafeInput(data.message)
    ) {
      toast({
        title: 'Blocked',
        description: 'Unsafe input detected. Please remove code-like content and try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitInquiryAction(data);
      toast({
        title: result.success ? 'Message Sent' : 'Submission Failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
      if (result.success) {
        form.reset();
      }
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className="pb-24 pt-20 md:pb-28 md:pt-28">
      <div className="section-shell grid gap-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-body text-3xl font-bold md:text-5xl">
              Need software delivery
              <span className="block text-lime-300">plus dependable hardware support?</span>
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Tell us your technical pressure points. We will propose a scoped software plan and the right support model for your devices and infrastructure.
            </p>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="mt-8 space-y-4 text-sm">
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-lime-300" />
                info@jertinetech.co.za
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-lime-300" />
                +27 79 856 7196
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-red-300" />
                Serving South African teams nationwide
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={140}>
        <div className="glass-card hover-lift sheen rounded-2xl p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...form.register('companyWebsite')} />
              <input type="hidden" {...form.register('startedAt', { valueAsNumber: true })} />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" maxLength={80} {...field} className="rounded-xl border-white/20 bg-white/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@company.com" {...field} className="rounded-xl border-white/20 bg-white/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows={5} maxLength={500} placeholder="Tell us about your software requirements and hardware support needs..." {...field} className="rounded-xl border-white/20 bg-white/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-full bg-lime-400 text-black hover:bg-lime-300" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
