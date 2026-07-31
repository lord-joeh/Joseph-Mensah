import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function ProjectsAdmin({ session }: { session: any }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchProjects = () => {
    fetch(`${API_URL}/projects`)
      .then(r => r.json())
      .then(d => setProjects(d.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        const updates = newItems.map((item, index) => ({ id: item.id, order_index: index }));
        fetch(`${API_URL}/projects/reorder`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ updates }),
        }).then(res => {
          if (res.ok) toast.success("Order saved");
          else toast.error("Failed to save order");
        }).catch(() => toast.error("Failed to save order"));

        return newItems;
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) { toast.success("Deleted"); fetchProjects(); }
      else toast.error("Delete failed");
    } catch { toast.error("Delete failed"); }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const method = editingProject ? 'PATCH' : 'POST';
    const url = editingProject ? `${API_URL}/projects/${editingProject.id}` : `${API_URL}/projects`;
    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: formData,
      });
      if (res.ok) {
        toast.success(editingProject ? 'Updated' : 'Added');
        setIsDialogOpen(false);
        fetchProjects();
      } else toast.error('Error saving');
    } finally { setIsSubmitting(false); }
  };

  const openAdd = () => { setEditingProject(null); setIsDialogOpen(true); }
  const openEdit = (p: any) => { setEditingProject(p); setIsDialogOpen(true); }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={openAdd}>Add Project</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader><DialogTitle>{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="title" defaultValue={editingProject?.title} placeholder="Project Title" required />
            <Textarea name="description" defaultValue={editingProject?.description} placeholder="Description" required />
            <Input name="link" defaultValue={editingProject?.link} placeholder="Live Demo Link (URL)" />
            <Input name="githubLink" defaultValue={editingProject?.github_link} placeholder="GitHub Link (URL)" />
            <Input name="tags" defaultValue={editingProject?.tags} placeholder="Tags (comma separated, e.g. React, Node.js)" />
            <div>
              <label className="text-sm font-medium">Project Image {editingProject && "(Leave empty to keep current)"}</label>
              <Input type="file" name="file" accept="image/*" className="mt-1" required={!editingProject} />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingProject ? 'Update' : 'Save'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {loading ? <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div> : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <SortableItem key={p.id} id={p.id}>
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-video bg-black/40"><img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /></div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                      <div className="flex gap-2 justify-end mt-auto pt-4">
                        <Button variant="outline" size="sm" onClick={() => openEdit(p)}><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
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
