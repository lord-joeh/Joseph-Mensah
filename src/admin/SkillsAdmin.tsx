import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { Loader2, Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function SkillsAdmin({ session }: { session: any }) {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchSkills = () => {
    fetch(`${API_URL}/skills`)
      .then(r => r.json())
      .then(d => setSkills(d.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSkills((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        const updates = newItems.map((item, index) => ({ id: item.id, order_index: index }));
        fetch(`${API_URL}/skills/reorder`, {
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
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) { toast.success("Deleted"); fetchSkills(); }
      else toast.error("Delete failed");
    } catch { toast.error("Delete failed"); }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const method = editingSkill ? 'PATCH' : 'POST';
    const url = editingSkill ? `${API_URL}/skills/${editingSkill.id}` : `${API_URL}/skills`;
    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: formData,
      });
      if (res.ok) {
        toast.success(editingSkill ? 'Updated' : 'Added');
        setIsDialogOpen(false);
        fetchSkills();
      } else toast.error('Error saving');
    } finally { setIsSubmitting(false); }
  };

  const openAdd = () => { setEditingSkill(null); setIsDialogOpen(true); }
  const openEdit = (s: any) => { setEditingSkill(s); setIsDialogOpen(true); }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button onClick={openAdd}>Add Skill</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>{editingSkill ? 'Edit Skill' : 'Add Skill'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" defaultValue={editingSkill?.name} placeholder="Skill Name" required />
            <Input name="category" defaultValue={editingSkill?.category} placeholder="Category" required />
            <div>
              <label className="text-sm font-medium">Skill Icon {editingSkill && "(Leave empty to keep current)"}</label>
              <Input type="file" name="file" accept="image/*" className="mt-1" required={!editingSkill} />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingSkill ? 'Update' : 'Save'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {loading ? <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div> : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={skills.map(s => s.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.map(s => (
                <SortableItem key={s.id} id={s.id}>
                  <Card className="flex flex-col items-center p-4 text-center h-full">
                    <img src={s.image_url} alt={s.name} className="w-12 h-12 object-contain mb-3" />
                    <span className="font-bold text-sm mb-4">{s.name}</span>
                    <div className="flex gap-2 mt-auto">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/20" onClick={() => handleDelete(s.id)}><Trash2 className="w-4 h-4" /></Button>
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
