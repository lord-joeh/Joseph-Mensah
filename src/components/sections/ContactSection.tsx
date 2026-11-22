"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, Send, Mail, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { submitContactForm } from '@/lib/api';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const res = await submitContactForm(values);
      if (res.success) {
        toast.success('Message sent successfully! I will reply shortly.');
        setSubmitSuccess(true);
        form.reset();
      } else {
        toast.error(res.message || 'Failed to dispatch message. Please try again.');
      }
    } catch (e: any) {
      toast.error(e.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
        <SectionHeading
          eyebrow="HAVE AN IDEA?"
          title="Let's build something meaningful."
          description="Have an idea, a product to build, or an interesting engineering opportunity? Let's talk."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Contact Details & Availability Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-surface border border-surface-border space-y-6">
              <span className="font-mono text-xs uppercase text-lime tracking-widest block">
                Direct Communication
              </span>

              <p className="text-sm text-content-secondary leading-relaxed">
                Whether you need a full-stack web application, a cross-platform mobile app,
                or a scalable backend architecture, I am available to collaborate on projects
                with ambitious goals.
              </p>

              <div className="space-y-4 pt-4 border-t border-surface-border text-xs font-mono">
                <div className="flex items-center gap-3 text-content-secondary">
                  <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-lime">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-content-muted block uppercase">Direct Inquiry</span>
                    <span className="text-content-primary">josephmensahtetteh001@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-content-secondary">
                  <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-lime">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-content-muted block uppercase">Location</span>
                    <span className="text-content-primary">Accra, Ghana</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-content-secondary">
                  <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-lime">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-content-muted block uppercase">Response Time</span>
                    <span className="text-content-primary">Typically within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-surface border border-surface-border relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-72 h-72 bg-lime/5 rounded-full blur-3xl pointer-events-none -z-10" />

              {submitSuccess ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime/30 text-lime flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-content-primary">
                      Message Dispatched
                    </h3>
                    <p className="text-sm text-content-secondary max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out! Your message was delivered and an automated
                      confirmation was generated. I will respond to your inquiry shortly.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    variant="outline"
                    className="border-surface-border hover:border-lime/40 text-content-primary hover:bg-surface-elevated rounded-full text-xs font-mono tracking-wider px-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-content-secondary">
                            Your Name
                          </label>
                          <FormControl>
                            <Input
                              placeholder="e.g. John Doe"
                              className="h-12 bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary text-sm px-4 rounded-xl"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400 font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-content-secondary">
                            Email Address
                          </label>
                          <FormControl>
                            <Input
                              placeholder="e.g. john@example.com"
                              type="email"
                              className="h-12 bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary text-sm px-4 rounded-xl"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400 font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-content-secondary">
                            Project Details &amp; Message
                          </label>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your product requirements, engineering challenges, or timeline..."
                              rows={5}
                              className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary resize-none text-sm p-4 rounded-xl leading-relaxed"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400 font-mono" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-lime text-canvas hover:bg-lime/90 rounded-xl font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(213,255,98,0.22)] transition-all hover:shadow-[0_0_30px_rgba(213,255,98,0.35)]"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> DISPATCHING MESSAGE...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          SEND MESSAGE <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
