import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function AboutAdmin({ session }: { session: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentAbout, setCurrentAbout] = useState("");
  const [currentGithub, setCurrentGithub] = useState("");
  const [currentLinkedin, setCurrentLinkedin] = useState("");
  const [currentTwitter, setCurrentTwitter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/about/info`)
      .then(res => res.json())
      .then(d => {
        if (d.data) {
          setCurrentAbout(d.data.about_text || "");
          setCurrentGithub(d.data.github_url || "");
          setCurrentLinkedin(d.data.linkedin_url || "");
          setCurrentTwitter(d.data.twitter_url || "");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    try {
      const res = await fetch(`${API_URL}/about`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: formData,
      });
      if (res.ok) toast.success('Updated successfully');
      else toast.error('Error updating');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <Card>
      <CardHeader><CardTitle>Manage About Section</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">About Text</label>
            <Textarea name="aboutText" value={currentAbout} onChange={e => setCurrentAbout(e.target.value)} required className="mt-1 min-h-[150px]" />
          </div>
          <div>
            <label className="text-sm font-medium">Upload Profile Picture (Image)</label>
            <Input type="file" name="profileImage" accept="image/*" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Upload Resume (PDF)</label>
            <Input type="file" name="resume" accept="application/pdf" className="mt-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">GitHub URL</label>
              <Input name="githubUrl" value={currentGithub} onChange={e => setCurrentGithub(e.target.value)} placeholder="https://github.com/..." className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input name="linkedinUrl" value={currentLinkedin} onChange={e => setCurrentLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Twitter URL</label>
              <Input name="twitterUrl" value={currentTwitter} onChange={e => setCurrentTwitter(e.target.value)} placeholder="https://twitter.com/..." className="mt-1" />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update About Info
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
