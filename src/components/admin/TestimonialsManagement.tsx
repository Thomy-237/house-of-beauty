
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  CheckCircle2, 
  XCircle, 
  Upload,
  Play,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  getAllTestimonials, 
  addTestimonial, 
  updateTestimonial, 
  deleteTestimonial,
  approveTestimonial 
} from '@/services/supabaseService';
import ImageWithFallback from '@/components/ui/image-with-fallback';

interface Testimonial {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  image_url?: string;
  video_url?: string;
  is_approved: boolean;
  created_at: string;
}

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    image_url: '',
    video_url: '',
    is_approved: true
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await getAllTestimonials();
      setTestimonials(data || []);
    } catch (error) {
      console.error('Erreur chargement témoignages:', error);
      toast.error('Erreur lors du chargement des témoignages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      toast.error('Le nom et le message sont obligatoires');
      return;
    }

    try {
      if (editingId) {
        await updateTestimonial(editingId, formData);
        toast.success('Témoignage mis à jour !');
      } else {
        await addTestimonial(formData);
        toast.success('Témoignage ajouté !');
      }
      
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Erreur sauvegarde témoignage:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      email: testimonial.email || '',
      phone: testimonial.phone || '',
      message: testimonial.message,
      image_url: testimonial.image_url || '',
      video_url: testimonial.video_url || '',
      is_approved: testimonial.is_approved
    });
    setEditingId(testimonial.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;
    
    try {
      await deleteTestimonial(id);
      toast.success('Témoignage supprimé !');
      fetchTestimonials();
    } catch (error) {
      console.error('Erreur suppression témoignage:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleApprovalToggle = async (id: string, currentStatus: boolean) => {
    try {
      await approveTestimonial(id, !currentStatus);
      toast.success(`Témoignage ${!currentStatus ? 'approuvé' : 'désapprouvé'} !`);
      fetchTestimonials();
    } catch (error) {
      console.error('Erreur modification approbation:', error);
      toast.error('Erreur lors de la modification');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      image_url: '',
      video_url: '',
      is_approved: true
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-cream-100 dark:bg-cream-200 rounded mb-2" />
              <div className="h-16 bg-cream-100 dark:bg-cream-200 rounded mb-2" />
              <div className="h-4 bg-cream-100 dark:bg-cream-200 rounded w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Témoignages</h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="btn-luxury"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un témoignage
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {editingId ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
              <Button variant="outline" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nom du client"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Le témoignage du client..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <ImageIcon className="inline mr-1 h-4 w-4" />
                    URL de l'image
                  </label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://exemple.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Play className="inline mr-1 h-4 w-4" />
                    URL de la vidéo
                  </label>
                  <Input
                    value={formData.video_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                    placeholder="https://exemple.com/video.mp4"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_approved}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_approved: checked }))}
                />
                <label className="text-sm font-medium">Approuvé et visible publiquement</label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="btn-luxury">
                  <Save className="mr-2 h-4 w-4" />
                  {editingId ? 'Mettre à jour' : 'Ajouter'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Aucun témoignage trouvé</p>
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {testimonial.image_url ? (
                      <ImageWithFallback
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-luxury-gradient flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={testimonial.is_approved ? "default" : "secondary"}>
                          {testimonial.is_approved ? (
                            <><CheckCircle2 className="mr-1 h-3 w-3" /> Approuvé</>
                          ) : (
                            <><XCircle className="mr-1 h-3 w-3" /> En attente</>
                          )}
                        </Badge>
                        {testimonial.email && (
                          <span className="text-xs text-muted-foreground">{testimonial.email}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={testimonial.is_approved}
                      onCheckedChange={() => handleApprovalToggle(testimonial.id, testimonial.is_approved)}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <blockquote className="text-muted-foreground italic mb-4">
                  "{testimonial.message}"
                </blockquote>

                {(testimonial.image_url || testimonial.video_url) && (
                  <div className="flex gap-4 mt-4">
                    {testimonial.image_url && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ImageIcon className="h-3 w-3" />
                        Photo attachée
                      </div>
                    )}
                    {testimonial.video_url && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Play className="h-3 w-3" />
                        Vidéo attachée
                      </div>
                    )}
                  </div>
                )}

                <div className="text-xs text-muted-foreground mt-2">
                  Créé le {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialsManagement;
