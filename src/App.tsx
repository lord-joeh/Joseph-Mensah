import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { ExternalLink, Loader2, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormMessage } from './components/ui/form';
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog';

const API_URL = import.meta.env.VITE_API_URL;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function App() {
  const [about, setAbout] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/about/info`).then(res => res.json()).then(d => setAbout(d.data)).catch(console.error),
      fetch(`${API_URL}/projects`).then(res => res.json()).then(d => setProjects(d.data)).catch(console.error),
      fetch(`${API_URL}/skills`).then(res => res.json()).then(d => setSkills(d.data)).catch(console.error),
      fetch(`${API_URL}/certificates`).then(res => res.json()).then(d => setCertificates(d.data)).catch(console.error)
    ]).finally(() => setLoading(false));

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error("Failed to send message.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-primary">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-medium animate-pulse">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Navbar Container */}
      <div className="sticky top-4 z-50 px-4 md:px-8 pt-4">
        <nav className="max-w-5xl mx-auto flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">JM /</span>
            <span className="font-semibold hidden sm:inline">Joseph Mensah</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition text-primary">Home</a>
            <a href="#about" className="hover:text-primary transition">About</a>
            <a href="#skills" className="hover:text-primary transition">Skills</a>
            <a href="#projects" className="hover:text-primary transition">Projects</a>
            <a href="#certifications" className="hover:text-primary transition">Certifications</a>
            <a href="#contact" className="hover:text-primary transition">Contact</a>
          </div>
          <div>
            {about?.resume_url ? (
              <Button className="rounded-full bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 shadow-[0_0_15px_rgba(217,70,239,0.3)]" asChild>
                <a href={about.resume_url} target="_blank" rel="noopener noreferrer">Resume</a>
              </Button>
            ) : (
              <Button className="rounded-full bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90">Resume</Button>
            )}
          </div>
        </nav>
      </div>

      {/* Main Container - Single Column Stacked Layout */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-16 space-y-24">

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 md:p-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="flex-1 space-y-6 text-center md:text-left z-10">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">JOSEPH MENSAH</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground">Software Developer</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto md:mx-0">
              Building innovative solutions, transforming ideas into scalable code.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 shadow-[0_0_20px_rgba(217,70,239,0.4)]" onClick={() => document.getElementById('projects')?.scrollIntoView()}>VIEW PROJECTS</Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/10" onClick={() => document.getElementById('contact')?.scrollIntoView()}>CONTACT ME</Button>
            </div>
          </div>

          <div className="relative w-56 h-56 md:w-80 md:h-80 shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-cyan-400 opacity-50 blur-3xl animate-pulse" />
            {about?.profile_image_url ? (
              <img src={about.profile_image_url} alt="Joseph Mensah" className="relative w-full h-full object-cover rounded-full border-4 border-background shadow-2xl z-10" />
            ) : (
              <div className="relative w-full h-full rounded-full border-4 border-background shadow-2xl z-10 bg-muted flex items-center justify-center text-5xl font-bold">JM</div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-xl overflow-hidden p-2">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight text-center md:text-left">ABOUT ME</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {about?.about_text || "Loading..."}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-center">TECHNICAL SKILLS</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {skills.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all group text-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/20 flex items-center justify-center p-2 shadow-inner">
                  <img src={s.image_url} alt={s.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-white transition-colors">{s.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-center">FEATURED PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col">
                <div className="aspect-[16/9] overflow-hidden bg-black/40">
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 shadow-xl" />
                </div>
                <CardContent className="p-8 flex flex-col flex-1">
                  <h3 className="font-bold text-2xl mb-3">{p.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tags && p.tags.split(',').map((tag: string, idx: number) => {
                      const t = tag.trim();
                      if (!t) return null;
                      const isFirst = idx % 2 === 0;
                      return (
                        <span key={idx} className={`px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 border border-white/5 ${isFirst ? 'text-cyan-400' : 'text-primary'}`}>
                          {t}
                        </span>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-2 transition-colors">
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {p.github_link && (
                      <a href={p.github_link} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-white font-medium flex items-center gap-2 transition-colors">
                        GitHub <FaGithub className="w-5 h-5" />
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
          <h2 className="text-3xl font-bold tracking-tight text-center">CERTIFICATIONS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certificates.map((c, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 flex flex-col items-center gap-6 relative z-10 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full h-48 shrink-0 bg-white rounded-2xl p-3 flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-105 transition-transform duration-300 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <img src={c.image_url} alt={c.title} className="w-full h-full object-contain" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full bg-black/50 border-white/10 backdrop-blur-2xl p-4 flex items-center justify-center shadow-2xl">
                      <img src={c.image_url} alt={c.title} className="w-full max-h-[85vh] object-contain rounded-xl" />
                    </DialogContent>
                  </Dialog>
                  <div className="flex flex-col flex-1 w-full">
                    <h4 className="font-bold text-xl mb-1 text-foreground group-hover:text-primary transition-colors">{c.title}</h4>
                    <span className="text-xs font-semibold text-cyan-400 mb-3 tracking-wider uppercase">
                      Issued {c.issue_date ? new Date(c.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}
                    </span>
                    {c.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
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
          <h2 className="text-3xl font-bold tracking-tight text-center">GET IN TOUCH</h2>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 relative overflow-hidden p-4 md:p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl><Input placeholder="Your Name" className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary text-base" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl><Input placeholder="Your Email" className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary text-base" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl><Textarea placeholder="How can I help you?" className="min-h-[150px] bg-white/5 border-white/10 focus-visible:ring-primary resize-none text-base p-4" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                    {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> SENDING...</> : "SEND MESSAGE"}
                  </Button>
                </form>
              </Form>
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
          className="p-3 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white shadow-xl hover:scale-110 hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-medium text-muted-foreground">Built by Joseph Mensah with ❤️ &copy; {new Date().getFullYear()}</span>
          <div className="flex gap-6">
            {about?.linkedin_url && (
              <a href={about.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition"><FaLinkedin className="w-6 h-6" /></a>
            )}
            {about?.github_url && (
              <a href={about.github_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition"><FaGithub className="w-6 h-6" /></a>
            )}
            {about?.twitter_url && (
              <a href={about.twitter_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition"><FaTwitter className="w-6 h-6" /></a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
