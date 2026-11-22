"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Trash2, Edit, Plus, Image as ImageIcon, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/admin/SortableItem';
import { useAuth } from '@/lib/supabase/AuthContext';
import {
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  reorderCertificates,
  type Certificate,
} from '@/lib/api';

export default function CertificatesAdminPage() {
  const { session } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const loadCertificates = () => {
    getCertificates()
      .then((res) => {
        if (res.success && res.data) {
          setCertificates(res.data);
        }
      })
      .catch((err) => toast.error("Failed to load certificates: " + err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !session?.access_token) return;

    const oldIndex = certificates.findIndex((i) => i.id === active.id);
    const newIndex = certificates.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(certificates, oldIndex, newIndex);
    setCertificates(newItems);

    const updates = newItems.map((item, index) => ({ id: item.id, order_index: index }));
    try {
      const res = await reorderCertificates(updates, session.access_token);
      if (res.success) {
        toast.success("Certificate order saved");
      } else {
        toast.error("Failed to save certificate order");
        loadCertificates();
      }
    } catch {
      toast.error("Failed to save certificate order");
      loadCertificates();
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!session?.access_token) return;
    if (!confirm(`Are you sure you want to remove certificate "${title}"?`)) return;

    try {
      const res = await deleteCertificate(id, session.access_token);
      if (res.success) {
        toast.success("Certificate deleted successfully");
        loadCertificates();
      } else {
        toast.error("Failed to delete certificate");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete certificate");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.access_token) {
      toast.error("Authentication required");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (editingCert) {
        const res = await updateCertificate(editingCert.id, formData, session.access_token);
        if (res.success) {
          toast.success("Certificate updated successfully");
          setIsDialogOpen(false);
          loadCertificates();
        } else {
          toast.error(res.message || "Failed to update certificate");
        }
      } else {
        const res = await addCertificate(formData, session.access_token);
        if (res.success) {
          toast.success("Certificate created successfully");
          setIsDialogOpen(false);
          loadCertificates();
        } else {
          toast.error(res.message || "Failed to create certificate");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Error saving certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAdd = () => {
    setEditingCert(null);
    setIsDialogOpen(true);
  };

  const openEdit = (c: Certificate) => {
    setEditingCert(c);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs text-lime uppercase tracking-wider block mb-1">
            Verified Credentials
          </span>
          <h1 className="text-3xl font-display font-bold text-content-primary">
            Certificates Management
          </h1>
          <p className="text-content-secondary text-sm mt-1">
            Manage certifications, professional credentials, and internship completions.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="rounded-xl bg-lime text-canvas hover:bg-lime/90 font-medium h-10 px-4 inline-flex items-center gap-2 self-start sm:self-auto shadow-[0_0_15px_rgba(213,255,98,0.2)]"
        >
          <Plus className="w-4 h-4" /> Add Certificate
        </Button>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-surface border-surface-border text-content-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold">
              {editingCert ? 'Edit Certificate' : 'Add Certificate'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-content-secondary uppercase">
                Certificate Title <span className="text-lime">*</span>
              </label>
              <Input
                name="title"
                defaultValue={editingCert?.title || ''}
                placeholder="e.g. Accra Marriott Hotel Internship"
                required
                className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-content-secondary uppercase">
                Description <span className="text-lime">*</span>
              </label>
              <Textarea
                name="description"
                defaultValue={editingCert?.description || ''}
                placeholder="Details of the credential, issuing body, and competencies verified..."
                required
                rows={3}
                className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-content-secondary uppercase">
                Issue Date
              </label>
              <Input
                type="date"
                name="issueDate"
                defaultValue={
                  editingCert?.issue_date
                    ? new Date(editingCert.issue_date).toISOString().split('T')[0]
                    : ''
                }
                className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
              />
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-mono text-content-secondary uppercase flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-lime" /> Certificate Document / Image{' '}
                {editingCert ? '(Optional: Leave blank to retain current)' : <span className="text-lime">*</span>}
              </label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                required={!editingCert}
                className="bg-surface-elevated border-surface-border file:bg-surface file:text-content-primary file:border-0 file:rounded-md file:text-xs file:font-mono file:mr-3 file:py-1 file:px-2 hover:file:bg-surface-elevated cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-surface-border flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-surface-border text-content-secondary hover:text-content-primary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-lime text-canvas hover:bg-lime/90 font-medium px-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : editingCert ? (
                  'Update Certificate'
                ) : (
                  'Create Certificate'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Certificates Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-lime" />
          <span className="text-xs font-mono text-content-secondary uppercase">
            Loading certificates...
          </span>
        </div>
      ) : certificates.length === 0 ? (
        <Card className="bg-surface border-surface-border p-12 text-center space-y-4">
          <p className="text-content-secondary text-sm">No certificates added yet.</p>
          <Button onClick={openAdd} className="bg-lime text-canvas hover:bg-lime/90 font-medium">
            <Plus className="w-4 h-4 mr-2" /> Add Your First Certificate
          </Button>
        </Card>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={certificates.map((c) => c.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((c) => (
                <SortableItem key={c.id} id={c.id}>
                  <Card className="flex flex-col p-5 bg-surface border-surface-border hover:border-surface-border/80 transition-colors h-full">
                    <div className="aspect-[4/3] rounded-xl bg-surface-elevated border border-surface-border overflow-hidden flex items-center justify-center p-3 mb-4">
                      <img
                        src={c.image_url}
                        alt={c.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="font-display font-bold text-base text-content-primary mb-1">
                      {c.title}
                    </h3>
                    {c.issue_date && (
                      <span className="text-[11px] font-mono text-lime inline-flex items-center gap-1.5 mb-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(c.issue_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    )}
                    <p className="text-xs text-content-secondary leading-relaxed line-clamp-3 mb-4">
                      {c.description}
                    </p>
                    <div className="flex gap-2 justify-end mt-auto pt-3 border-t border-surface-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(c)}
                        className="h-8 text-xs border-surface-border hover:border-lime/40 text-content-secondary hover:text-content-primary"
                      >
                        <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(c.id, c.title)}
                        className="h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                      </Button>
                    </div>
                  </Card>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
