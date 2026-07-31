import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function CertificatesAdmin({ session }: { session: any }) {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchCertificates = () => {
    fetch(`${API_URL}/certificates`)
      .then(r => r.json())
      .then(d => setCertificates(d.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCertificates(); }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCertificates((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        const updates = newItems.map((item, index) => ({ id: item.id, order_index: index }));
        fetch(`${API_URL}/certificates/reorder`, {
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
      const res = await fetch(`${API_URL}/certificates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) { toast.success("Deleted"); fetchCertificates(); }
      else toast.error("Delete failed");
    } catch { toast.error("Delete failed"); }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const method = editingCert ? 'PATCH' : 'POST';
    const url = editingCert ? `${API_URL}/certificates/${editingCert.id}` : `${API_URL}/certificates`;
    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: formData,
      });
      if (res.ok) {
        toast.success(editingCert ? 'Updated' : 'Added');
        setIsDialogOpen(false);
        fetchCertificates();
      } else toast.error('Error saving');
    } finally { setIsSubmitting(false); }
  };

  const openAdd = () => { setEditingCert(null); setIsDialogOpen(true); }
  const openEdit = (c: any) => { setEditingCert(c); setIsDialogOpen(true); }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certificates</h2>
        <Button onClick={openAdd}>Add Certificate</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle>{editingCert ? 'Edit Certificate' : 'Add Certificate'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="title" defaultValue={editingCert?.title} placeholder="Title" required />
            <Textarea name="description" defaultValue={editingCert?.description} placeholder="Description" required />
            <Input type="date" name="issueDate" defaultValue={editingCert?.issue_date ? new Date(editingCert.issue_date).toISOString().split('T')[0] : ''} className="mt-1" />
            <div>
              <label className="text-sm font-medium">Certificate Image {editingCert && "(Leave empty to keep current)"}</label>
              <Input type="file" name="file" accept="image/*" className="mt-1" required={!editingCert} />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingCert ? 'Update' : 'Save'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {loading ? <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div> : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={certificates.map(c => c.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map(c => (
                <SortableItem key={c.id} id={c.id}>
                  <Card className="flex flex-col items-center p-6 text-center h-full">
                    <img src={c.image_url} alt={c.title} className="w-24 h-24 object-contain mb-4" />
                    <h3 className="font-bold mb-2">{c.title}</h3>
                    <div className="flex gap-2 mt-auto pt-4">
                      <Button variant="outline" size="sm" onClick={() => openEdit(c)}><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
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
