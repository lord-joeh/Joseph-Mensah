"use client";

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Mail, Calendar, User, Search, RefreshCw, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/lib/supabase/AuthContext';
import { getNotifications, type ContactNotification } from '@/lib/api';

export default function NotificationsAdminPage() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState<ContactNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMessage, setActiveMessage] = useState<ContactNotification | null>(null);

  const loadNotifications = useCallback(() => {
    if (!session?.access_token) return;
    setLoading(true);

    getNotifications(session.access_token)
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setNotifications(res.data);
        } else {
          setNotifications([]);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch contact inquiries: " + err.message);
      })
      .finally(() => setLoading(false));
  }, [session?.access_token]);

  useEffect(() => {
    if (session?.access_token) {
      loadNotifications();
    }
  }, [session?.access_token, loadNotifications]);

  const filtered = notifications.filter(
    (n) =>
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs text-lime uppercase tracking-wider block mb-1">
            Inbound Inquiries
          </span>
          <h1 className="text-3xl font-display font-bold text-content-primary">
            Contact Messages & Leads
          </h1>
          <p className="text-content-secondary text-sm mt-1">
            Review inbound inquiries submitted through your public portfolio contact form.
          </p>
        </div>
        <Button
          onClick={loadNotifications}
          variant="outline"
          className="rounded-xl border-surface-border text-content-secondary hover:text-content-primary hover:border-lime/40 h-10 px-4 inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-content-muted absolute left-3.5 top-3.5 pointer-events-none" />
        <Input
          placeholder="Search by name, email or message keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 bg-surface border-surface-border focus-visible:ring-lime text-content-primary"
        />
      </div>

      {/* Message Inspection Dialog */}
      <Dialog open={Boolean(activeMessage)} onOpenChange={(open) => !open && setActiveMessage(null)}>
        <DialogContent className="max-w-lg bg-surface border-surface-border text-content-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-lime" /> Message Details
            </DialogTitle>
          </DialogHeader>
          {activeMessage && (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-content-muted">Sender:</span>
                  <span className="text-content-primary font-bold">{activeMessage.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-content-muted">Email:</span>
                  <a
                    href={`mailto:${activeMessage.email}`}
                    className="text-lime hover:underline font-mono"
                  >
                    {activeMessage.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-content-muted">Received:</span>
                  <span className="text-content-secondary">
                    {new Date(activeMessage.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-content-secondary">
                  Message Content
                </label>
                <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border text-sm text-content-primary whitespace-pre-wrap leading-relaxed font-sans">
                  {activeMessage.message}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button
                  asChild
                  className="rounded-xl bg-lime text-canvas hover:bg-lime/90 font-medium px-5"
                >
                  <a href={`mailto:${activeMessage.email}?subject=Re: Your message via Joseph Mensah Portfolio`}>
                    Reply via Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-lime" />
          <span className="text-xs font-mono text-content-secondary uppercase">
            Loading inquiries...
          </span>
        </div>
      ) : filtered.length === 0 ? (
        <Card className="bg-surface border-surface-border p-12 text-center space-y-3">
          <MessageSquare className="w-10 h-10 text-content-muted mx-auto" />
          <p className="text-content-secondary text-sm">
            {searchQuery ? 'No matching inquiries found.' : 'No contact form submissions recorded yet.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <Card
              key={msg.id}
              onClick={() => setActiveMessage(msg)}
              className="bg-surface border-surface-border hover:border-lime/30 transition-all cursor-pointer p-4 group"
            >
              <CardContent className="p-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-lime" />
                    <span className="font-display font-semibold text-sm text-content-primary">
                      {msg.name}
                    </span>
                    <span className="text-xs font-mono text-content-muted">
                      ({msg.email})
                    </span>
                  </div>
                  <p className="text-xs text-content-secondary line-clamp-1 max-w-2xl">
                    {msg.message}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-content-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(msg.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-lime group-hover:bg-lime/10 h-8 px-2.5 rounded-lg"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
