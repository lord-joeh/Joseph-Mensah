"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Trash2, Edit, Plus, Image as ImageIcon } from 'lucide-react';
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
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
  type Skill,
} from '@/lib/api';

export default function SkillsAdminPage() {
  const { session } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
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

  const loadSkills = () => {
    getSkills()
      .then((res) => {
        if (res.success && res.data) {
          setSkills(res.data);
        }
      })
      .catch((err) => toast.error("Failed to load skills: " + err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !session?.access_token) return;

    const oldIndex = skills.findIndex((i) => i.id === active.id);
    const newIndex = skills.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(skills, oldIndex, newIndex);
    setSkills(newItems);

    const updates = newItems.map((item, index) => ({ id: item.id, order_index: index }));
    try {
      const res = await reorderSkills(updates, session.access_token);
      if (res.success) {
        toast.success("Skill order saved");
      } else {
        toast.error("Failed to save skill order");
        loadSkills();
      }
    } catch {
      toast.error("Failed to save skill order");
      loadSkills();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!session?.access_token) return;
    if (!confirm(`Are you sure you want to remove skill "${name}"?`)) return;

    try {
      const res = await deleteSkill(id, session.access_token);
      if (res.success) {
        toast.success("Skill deleted successfully");
        loadSkills();
      } else {
        toast.error("Failed to delete skill");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete skill");
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
      if (editingSkill) {
        const res = await updateSkill(editingSkill.id, formData, session.access_token);
        if (res.success) {
          toast.success("Skill updated successfully");
          setIsDialogOpen(false);
          loadSkills();
        } else {
          toast.error(res.message || "Failed to update skill");
        }
      } else {
        const res = await addSkill(formData, session.access_token);
        if (res.success) {
          toast.success("Skill created successfully");
          setIsDialogOpen(false);
          loadSkills();
        } else {
          toast.error(res.message || "Failed to create skill");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Error saving skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAdd = () => {
    setEditingSkill(null);
    setIsDialogOpen(true);
  };

  const openEdit = (s: Skill) => {
    setEditingSkill(s);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs text-lime uppercase tracking-wider block mb-1">
            Stack Competencies
          </span>
          <h1 className="text-3xl font-display font-bold text-content-primary">
            Technical Skills Management
          </h1>
          <p className="text-content-secondary text-sm mt-1">
            Add, update, reorder or remove technologies in your technical ecosystem.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="rounded-xl bg-lime text-canvas hover:bg-lime/90 font-medium h-10 px-4 inline-flex items-center gap-2 self-start sm:self-auto shadow-[0_0_15px_rgba(213,255,98,0.2)]"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </Button>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-surface border-surface-border text-content-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold">
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-content-secondary uppercase">
                Skill / Technology Name <span className="text-lime">*</span>
              </label>
              <Input
                name="name"
                defaultValue={editingSkill?.name || ''}
                placeholder="e.g. NestJS, Flutter, Docker"
                required
                className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-content-secondary uppercase">
                Category <span className="text-lime">*</span>
              </label>
              <Input
                name="category"
                defaultValue={editingSkill?.category || ''}
                placeholder="e.g. Frontend, Backend, Mobile, Devops, Database"
                required
                className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
              />
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-mono text-content-secondary uppercase flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-lime" /> Technology Icon (Image){' '}
                {editingSkill ? '(Optional: Leave blank to retain current)' : <span className="text-lime">*</span>}
              </label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                required={!editingSkill}
                className="bg-surface-elevated border-surface-border file:bg-surface file:text-content-primary file:border-0 file:rounded-md file:text-xs file:font-mono file:mr-3 file:py-1 file:px-2 hover:file:bg-surface-elevated cursor-pointer"
              />
              {editingSkill?.image_url && (
                <div className="flex items-center gap-2 pt-1 text-xs text-content-muted">
                  <img
                    src={editingSkill.image_url}
                    alt={editingSkill.name}
                    className="w-5 h-5 object-contain"
                  />
                  <span>Current icon stored in Supabase</span>
                </div>
              )}
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
                ) : editingSkill ? (
                  'Update Skill'
                ) : (
                  'Create Skill'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Skills Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-lime" />
          <span className="text-xs font-mono text-content-secondary uppercase">
            Loading skills...
          </span>
        </div>
      ) : skills.length === 0 ? (
        <Card className="bg-surface border-surface-border p-12 text-center space-y-4">
          <p className="text-content-secondary text-sm">No skills added yet.</p>
          <Button onClick={openAdd} className="bg-lime text-canvas hover:bg-lime/90 font-medium">
            <Plus className="w-4 h-4 mr-2" /> Add Your First Skill
          </Button>
        </Card>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={skills.map((s) => s.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.map((s) => (
                <SortableItem key={s.id} id={s.id}>
                  <Card className="flex flex-col items-center p-4 text-center h-full bg-surface border-surface-border hover:border-surface-border/80 transition-colors group">
                    <div className="w-14 h-14 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center p-2.5 mb-3 group-hover:border-lime/30 transition-colors">
                      <img
                        src={s.image_url}
                        alt={s.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-display font-semibold text-sm text-content-primary mb-1">
                      {s.name}
                    </span>
                    <span className="text-[10px] font-mono text-content-muted uppercase tracking-wider mb-3">
                      {s.category}
                    </span>
                    <div className="flex gap-1.5 mt-auto pt-2 border-t border-surface-border/50 w-full justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(s)}
                        className="h-7 w-7 text-content-secondary hover:text-content-primary hover:bg-surface-elevated"
                        title="Edit skill"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(s.id, s.name)}
                        className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
