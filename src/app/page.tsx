"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ExternalLink, Loader2, ArrowUp, Lock, CheckCircle2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  getAboutInfo,
  getProjects,
  getSkills,
  getCertificates,
  submitContactForm,
  type AboutInfo,
  type Project,
  type Skill,
  type Certificate,
} from '@/lib/api';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function HomePage() {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    Promise.allSettled([
      getAboutInfo(),
      getProjects(),
      getSkills(),
      getCertificates(),
    ]).then(([aboutRes, projectsRes, skillsRes, certsRes]) => {
      if (aboutRes.status === 'fulfilled' && aboutRes.value.success) {
        setAbout(aboutRes.value.data);
      }
      if (projectsRes.status === 'fulfilled' && projectsRes.value.success) {
        setProjects(projectsRes.value.data);
      }
      if (skillsRes.status === 'fulfilled' && skillsRes.value.success) {
        setSkills(skillsRes.value.data);
      }
      if (certsRes.status === 'fulfilled' && certsRes.value.success) {
        setCertificates(certsRes.value.data);
      }
      setLoading(false);
    });

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const res = await submitContactForm(values);
      if (res.success) {
        toast.success("Message sent successfully! Thank you for reaching out.");
        setSubmitSuccess(true);
        form.reset();
      } else {
        toast.error(res.message || "Failed to send message. Please try again.");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center text-lime gap-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="font-mono text-xs tracking-widest text-content-secondary uppercase animate-pulse">
          Loading Portfolio...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-content-primary font-sans selection:bg-lime/20 selection:text-lime">
      {/* Navbar Container */}
      <div className="sticky top-4 z-50 px-4 md:px-8 pt-4">
        <nav className="max-w-5xl mx-auto flex items-center justify-between p-4 bg-surface/80 backdrop-blur-xl rounded-2xl border border-surface-border shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-bold text-lime">JM /</span>
            <span className="font-semibold text-content-primary hidden sm:inline">Joseph Mensah</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-content-secondary">
            <a href="#" className="hover:text-lime transition-colors text-lime font-semibold">Home</a>
            <a href="#about" className="hover:text-lime transition-colors">About</a>
            <a href="#skills" className="hover:text-lime transition-colors">Skills</a>
            <a href="#projects" className="hover:text-lime transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-lime transition-colors">Certifications</a>
            <a href="#contact" className="hover:text-lime transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            {about?.resume_url ? (
              <Button className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-medium text-xs px-4 h-9 shadow-[0_0_15px_rgba(213,255,98,0.2)]" asChild>
                <a href={about.resume_url} target="_blank" rel="noopener noreferrer">Resume</a>
              </Button>
            ) : (
              <Button className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-medium text-xs px-4 h-9">Resume</Button>
            )}
            <Link
              href="/admin"
              className="p-2 rounded-full text-content-muted hover:text-lime transition-colors"
              title="Admin Console"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-16 space-y-24">

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-surface border border-surface-border p-8 md:p-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

          <div className="flex-1 space-y-6 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-surface-border text-xs font-mono text-lime">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span>SOFTWARE ENGINEER · FULL-STACK · MOBILE</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-content-primary leading-[1.05]">
              JOSEPH MENSAH
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-content-secondary">
              Based in Accra, Ghana
            </h2>
            <p className="text-content-secondary text-base md:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
              Software engineer building thoughtful digital products, scalable full-stack architectures and mobile experiences that solve real-world problems.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Button
                size="lg"
                className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-semibold shadow-[0_0_20px_rgba(213,255,98,0.25)]"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VIEW PROJECTS
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-surface-border hover:bg-surface-elevated text-content-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                CONTACT ME
              </Button>
            </div>
          </div>

          <div className="relative w-56 h-56 md:w-80 md:h-80 shrink-0">
            <div className="absolute inset-0 rounded-full bg-lime/20 blur-3xl" />
            {about?.profile_image_url ? (
              <img
                src={about.profile_image_url}
                alt="Joseph Mensah"
                className="relative w-full h-full object-cover rounded-full border-4 border-surface-border shadow-2xl z-10"
              />
            ) : (
              <div className="relative w-full h-full rounded-full border-4 border-surface-border shadow-2xl z-10 bg-surface-elevated flex items-center justify-center text-5xl font-display font-bold text-lime">
                JM
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about">
          <Card className="bg-surface border-surface-border shadow-xl overflow-hidden p-4 md:p-6">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-display font-bold tracking-tight text-center md:text-left text-content-primary">
                ABOUT ME
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base md:text-lg text-content-secondary leading-relaxed whitespace-pre-line">
                {about?.about_text || "Software engineer based in Accra, Ghana."}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-lime uppercase tracking-wider">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-content-primary">
              TECHNICAL SKILLS
            </h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {skills.map((s) => (
              <div
                key={s.id}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface border border-surface-border hover:border-lime/40 hover:-translate-y-1 transition-all group text-center gap-2.5"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center p-2">
                  <img
                    src={s.image_url}
                    alt={s.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-xs font-semibold text-content-secondary group-hover:text-lime transition-colors">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-lime uppercase tracking-wider">Showcase</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-content-primary">
              FEATURED PROJECTS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <Card
                key={p.id}
                className="bg-surface border-surface-border overflow-hidden group hover:border-lime/50 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/9] overflow-hidden bg-black/60 relative">
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-2xl mb-2 text-content-primary group-hover:text-lime transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-content-secondary text-sm mb-6 flex-1 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags && p.tags.split(',').map((tag: string, idx: number) => {
                      const t = tag.trim();
                      if (!t) return null;
                      return (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-surface-elevated border border-surface-border text-content-secondary"
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-border">
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-lime hover:underline font-semibold flex items-center gap-1.5"
                      >
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-content-muted">Production Build</span>
                    )}
                    {p.github_link && (
                      <a
                        href={p.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-content-secondary hover:text-content-primary font-medium flex items-center gap-1.5"
                      >
                        GitHub <FaGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-lime uppercase tracking-wider">Credentials</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-content-primary">
              CERTIFICATIONS
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certificates.map((c) => (
              <Card
                key={c.id}
                className="bg-surface border-surface-border hover:border-lime/50 transition-all duration-300 relative overflow-hidden group"
              >
                <CardContent className="p-6 flex flex-col items-center gap-5 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="w-full h-48 shrink-0 bg-surface-elevated rounded-2xl p-3 flex items-center justify-center border border-surface-border group-hover:scale-105 transition-transform duration-300 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-lime"
                        aria-label={`View certificate ${c.title}`}
                      >
                        <img
                          src={c.image_url}
                          alt={c.title}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full bg-canvas/95 border-surface-border backdrop-blur-2xl p-4 flex items-center justify-center shadow-2xl">
                      <img
                        src={c.image_url}
                        alt={c.title}
                        className="w-full max-h-[85vh] object-contain rounded-xl"
                      />
                    </DialogContent>
                  </Dialog>
                  <div className="flex flex-col flex-1 w-full">
                    <h4 className="font-display font-bold text-lg mb-1 text-content-primary group-hover:text-lime transition-colors">
                      {c.title}
                    </h4>
                    <span className="text-xs font-mono text-lime mb-2 tracking-wider uppercase">
                      Issued {c.issue_date ? new Date(c.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Verified'}
                    </span>
                    {c.description && (
                      <p className="text-xs text-content-secondary leading-relaxed line-clamp-3">
                        {c.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-lime uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-content-primary">
              LET&apos;S CONNECT
            </h2>
            <p className="text-content-secondary text-sm max-w-md mx-auto">
              Have a project, opportunity, or idea in mind? Leave a message below and I&apos;ll get back to you promptly.
            </p>
          </div>

          <Card className="bg-surface border-surface-border relative overflow-hidden p-4 md:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <CardContent className="p-2 sm:p-4">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime/30 text-lime flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-content-primary">
                    Message Delivered
                  </h3>
                  <p className="text-sm text-content-secondary max-w-sm mx-auto">
                    Thank you for reaching out! A confirmation email has been dispatched and I will reply as soon as possible.
                  </p>
                  <Button
                    onClick={() => setSubmitSuccess(false)}
                    variant="outline"
                    className="border-surface-border text-content-primary hover:border-lime/40 rounded-full"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              className="h-12 bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary text-base"
                              {...field}
                            />
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
                          <FormControl>
                            <Input
                              placeholder="Your Email Address"
                              type="email"
                              className="h-12 bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary text-base"
                              {...field}
                            />
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
                          <FormControl>
                            <Textarea
                              placeholder="How can I help you? Share project specifications, questions or ideas..."
                              rows={5}
                              className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary resize-none text-base p-4 leading-relaxed"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-lime text-canvas hover:bg-lime/90 rounded-xl font-bold text-base shadow-[0_0_20px_rgba(213,255,98,0.25)] transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> SENDING MESSAGE...
                        </>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </section>

      </div>

      {/* Scroll to Top Button */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-lime text-canvas shadow-xl hover:scale-110 hover:shadow-[0_0_20px_rgba(213,255,98,0.5)] transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-surface/40 mt-16">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-content-secondary font-mono">
            <span className="text-lime font-bold">JM.</span>
            <span>&copy; {new Date().getFullYear()} Joseph Mensah. Built with Next.js &amp; NestJS.</span>
          </div>
          <div className="flex gap-6 items-center">
            {about?.linkedin_url && (
              <a
                href={about.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-secondary hover:text-lime transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            )}
            {about?.github_url && (
              <a
                href={about.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-secondary hover:text-lime transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            )}
            {about?.twitter_url && (
              <a
                href={about.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-secondary hover:text-lime transition-colors"
                aria-label="Twitter Profile"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
