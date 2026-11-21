"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Trash2, Edit, Plus, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
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
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects,
  type Project,
} from '@/lib/api';

export default function ProjectsAdminPage() {
  const { session } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
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

  const loadProjects = () => {
    getProjects()
      .then((res) => {
        if (res.success && res.data) {
          setProjects(res.data);
        }
      })
      .catch((err) => toast.error("Failed to load projects: " + err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !session?.access_token) return;

    const oldIndex = projects.findIndex((i) => i.id === active.id);
    const newIndex = projects.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(projects, oldIndex, newIndex);
    setProjects(newItems);

    const updates = newItems.map((item, index) => ({ id: item.id, order_index: index }));
    try {
      const res = await reorderProjects(updates, session.access_token);
      if (res.success) {
        toast.success("Project order saved");
      } else {
        toast.error("Failed to save project order");
        loadProjects();
      }
    } catch {
      toast.error("Failed to save project order");
      loadProjects();
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!session?.access_token) return;
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await deleteProject(id, session.access_token);
      if (res.success) {
        toast.success("Project deleted successfully");
        loadProjects();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete project");
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
      if (editingProject) {
        const res = await updateProject(editingProject.id, formData, session.access_token);
        if (res.success) {
          toast.success("Project updated successfully");
          setIsDialogOpen(false);
          loadProjects();
        } else {
          toast.error(res.message || "Failed to update project");
        }
      } else {
        const res = await addProject(formData, session.access_token);
        if (res.success) {
          toast.success("Project created successfully");
          setIsDialogOpen(false);
          loadProjects();
        } else {
          toast.error(res.message || "Failed to create project");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Error saving project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAdd = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs text-lime uppercase tracking-wider block mb-1">
            Portfolio Work
          </span>
          <h1 className="text-3xl font-display font-bold text-content-primary">
            Projects Management
          </h1>
          <p className="text-content-secondary text-sm mt-1">
            Add, edit, reorder, or remove showcase projects. Drag cards using the handle to adjust ordering.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="rounded-xl bg-lime text-canvas hover:bg-lime/90 font-medium h-10 px-4 inline-flex items-center gap-2 self-start sm:self-auto shadow-[0_0_15px_rgba(213,255,98,0.2)]"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-surface border-surface-border text-content-primary max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-content-secondary uppercase">
                Project Title <span className="text-lime">*</span>
              </label>
              <Input
                name="title"
                defaultValue={editingProject?.title || ''}
                placeholder="e.g. AgroMarket"
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
                defaultValue={editingProject?.description || ''}
                placeholder="Describe project architecture, features, and achievements..."
                required
                rows={4}
                className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-content-secondary uppercase">
                  Live Demo URL
                </label>
                <Input
                  name="link"
                  defaultValue={editingProject?.link || ''}
                  placeholder="https://example.com"
                  className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-content-secondary uppercase">
                  GitHub Repository URL
                </label>
                <Input
                  name="githubLink"
                  defaultValue={editingProject?.github_link || ''}
                  placeholder="https://github.com/lord-joeh/..."
                  className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-content-secondary uppercase">
                Technology Tags
              </label>
              <Input
                name="tags"
                defaultValue={editingProject?.tags || ''}
                placeholder="Flutter, NestJS, Redis, PostgreSQL (comma separated)"
                className="bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary"
              />
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-mono text-content-secondary uppercase flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-lime" /> Project Cover Screenshot{' '}
                {editingProject ? '(Optional: Leave blank to retain current)' : <span className="text-lime">*</span>}
              </label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                required={!editingProject}
                className="bg-surface-elevated border-surface-border file:bg-surface file:text-content-primary file:border-0 file:rounded-md file:text-xs file:font-mono file:mr-3 file:py-1 file:px-2 hover:file:bg-surface-elevated cursor-pointer"
              />
              {editingProject?.image_url && (
                <div className="flex items-center gap-2 pt-1 text-xs text-content-muted">
                  <span>Current image:</span>
                  <a
                    href={editingProject.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime hover:underline font-mono inline-flex items-center gap-1"
                  >
                    View asset <ExternalLink className="w-3 h-3" />
                  </a>
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
                ) : editingProject ? (
                  'Update Project'
                ) : (
                  'Create Project'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-lime" />
          <span className="text-xs font-mono text-content-secondary uppercase">
            Loading projects...
          </span>
        </div>
      ) : projects.length === 0 ? (
        <Card className="bg-surface border-surface-border p-12 text-center space-y-4">
          <p className="text-content-secondary text-sm">No projects recorded yet.</p>
          <Button onClick={openAdd} className="bg-lime text-canvas hover:bg-lime/90 font-medium">
            <Plus className="w-4 h-4 mr-2" /> Add Your First Project
          </Button>
        </Card>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map((p) => p.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <SortableItem key={p.id} id={p.id}>
                  <Card className="overflow-hidden h-full flex flex-col bg-surface border-surface-border hover:border-surface-border/80 transition-colors">
                    <div className="aspect-video bg-black/50 overflow-hidden relative border-b border-surface-border">
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col flex-1 space-y-4">
                      <div>
                        <h3 className="font-bold font-display text-lg text-content-primary mb-1.5">
                          {p.title}
                        </h3>
                        <p className="text-xs text-content-secondary line-clamp-3 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      {p.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.tags.split(',').map((t, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-surface-elevated border border-surface-border text-content-secondary"
                            >
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-xs pt-1">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lime hover:underline inline-flex items-center gap-1 font-mono"
                          >
                            Live Demo <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {p.github_link && (
                          <a
                            href={p.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-content-secondary hover:text-content-primary inline-flex items-center gap-1 font-mono"
                          >
                            <FaGithub className="w-3.5 h-3.5" /> Source
                          </a>
                        )}
                      </div>

                      <div className="flex gap-2 justify-end mt-auto pt-4 border-t border-surface-border">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(p)}
                          className="h-8 text-xs border-surface-border hover:border-lime/40 text-content-secondary hover:text-content-primary"
                        >
                          <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(p.id, p.title)}
                          className="h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                        </Button>
                      </div>
                    </CardContent>
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
