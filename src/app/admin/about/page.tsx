"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, FileText, Upload, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/lib/supabase/AuthContext';
import { getAboutInfo, updateAboutInfo, type AboutInfo } from '@/lib/api';

export default function AboutAdminPage() {
  const { session } = useAuth();
  const [aboutData, setAboutData] = useState<AboutInfo | null>(null);
  const [aboutText, setAboutText] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAboutInfo()
      .then((res) => {
        if (res.success && res.data) {
          setAboutData(res.data);
          setAboutText(res.data.about_text || '');
          setGithubUrl(res.data.github_url || '');
          setLinkedinUrl(res.data.linkedin_url || '');
          setTwitterUrl(res.data.twitter_url || '');
        }
      })
      .catch((err) => {
        toast.error("Failed to load about data: " + err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.access_token) {
      toast.error("You must be logged in to update profile info");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await updateAboutInfo(formData, session.access_token);
      if (res.success) {
        toast.success("Profile information updated successfully");
        if (res.data) {
          setAboutData(res.data);
        }
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred while updating");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-lime" />
        <span className="text-xs font-mono text-content-secondary uppercase">
          Loading profile data...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="font-mono text-xs text-lime uppercase tracking-wider block mb-1">
          Identity & Biography
        </span>
        <h1 className="text-3xl font-display font-bold text-content-primary">
          About & Profile Management
        </h1>
        <p className="text-content-secondary text-sm mt-1">
          Update your public bio, social links, profile picture, and uploaded resume document.
        </p>
      </div>

      <Card className="bg-surface border-surface-border">
        <CardHeader>
          <CardTitle className="text-lg font-display font-bold text-content-primary">
            Profile Details
          </CardTitle>
          <CardDescription className="text-content-secondary text-xs">
            Changes submitted here are directly saved to the NestJS backend and Supabase storage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* About Text */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-content-secondary">
                Biographical Narrative (About Text) <span className="text-lime">*</span>
              </label>
              <Textarea
                name="aboutText"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                required
                rows={6}
                placeholder="Write your comprehensive developer narrative..."
                className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary leading-relaxed"
              />
            </div>

            {/* Current Assets Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-elevated border border-surface-border">
              {/* Profile Image Preview */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-content-secondary uppercase block">
                  Current Profile Portrait
                </span>
                {aboutData?.profile_image_url ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={aboutData.profile_image_url}
                      alt="Current avatar"
                      className="w-16 h-16 rounded-full object-cover border border-surface-border shadow-md"
                    />
                    <a
                      href={aboutData.profile_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-lime hover:underline inline-flex items-center gap-1 font-mono"
                    >
                      View Full <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <p className="text-xs text-content-muted">No profile image uploaded yet.</p>
                )}
              </div>

              {/* Resume Document Preview */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-content-secondary uppercase block">
                  Current Resume PDF
                </span>
                {aboutData?.resume_url ? (
                  <div className="flex items-center gap-2 pt-1">
                    <FileText className="w-5 h-5 text-lime" />
                    <a
                      href={aboutData.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-content-primary hover:text-lime underline inline-flex items-center gap-1 font-mono truncate max-w-[200px]"
                    >
                      Download Active Resume <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <p className="text-xs text-content-muted">No resume PDF uploaded yet.</p>
                )}
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-content-secondary flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-lime" /> Replace Profile Picture (Image)
                </label>
                <Input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  className="bg-surface-elevated border-surface-border file:bg-surface file:text-content-primary file:border-0 file:rounded-md file:text-xs file:font-mono file:mr-3 file:py-1 file:px-2 hover:file:bg-surface-elevated cursor-pointer"
                />
                <span className="text-[11px] text-content-muted block">
                  PNG, JPG, or WebP. Leave empty to keep the existing picture.
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-content-secondary flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-lime" /> Replace Resume Document (PDF)
                </label>
                <Input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  className="bg-surface-elevated border-surface-border file:bg-surface file:text-content-primary file:border-0 file:rounded-md file:text-xs file:font-mono file:mr-3 file:py-1 file:px-2 hover:file:bg-surface-elevated cursor-pointer"
                />
                <span className="text-[11px] text-content-muted block">
                  PDF format only. Leave empty to keep the existing document.
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-content-secondary">
                  GitHub Profile URL
                </label>
                <Input
                  name="githubUrl"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/lord-joeh"
                  className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-content-secondary">
                  LinkedIn Profile URL
                </label>
                <Input
                  name="linkedinUrl"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-content-secondary">
                  Twitter / X URL
                </label>
                <Input
                  name="twitterUrl"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  placeholder="https://x.com/..."
                  className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-surface-border flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-lime text-canvas hover:bg-lime/90 font-medium px-6 h-11 shadow-[0_0_20px_rgba(213,255,98,0.2)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Changes...
                  </>
                ) : (
                  'Save Profile Info'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
