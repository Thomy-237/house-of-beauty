
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Tags,
  Package
} from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  product_count: number;
  created_at: string;
}

const CategoriesTab = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    // Simulate loading categories
    const mockCategories: Category[] = [
      {
        id: '1',
        name: 'Soins du Visage',
        slug: 'soins-visage',
        description: 'Produits pour nettoyer, hydrater et protéger votre visage',
        image_url: '/placeholder.svg',
        product_count: 12,
        created_at: '2024-01-01'
      },
      {
        id: '2',
        name: 'Soins du Corps',
        slug: 'soins-corps',
        description: 'Hydratation et soins pour tout le corps',
        image_url: '/placeholder.svg',
        product_count: 8,
        created_at: '2024-01-02'
      },
      {
        id: '3',
        name: 'Maquillage',
        slug: 'maquillage',
        description: 'Sublimez votre beauté avec notre gamme de maquillage',
        image_url: '/placeholder.svg',
        product_count: 15,
        created_at: '2024-01-03'
      }
    ];
    
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Le nom est obligatoire');
      return;
    }

    try {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        slug: formData.slug || generateSlug(formData.name),
        product_count: 0,
        created_at: new Date().toISOString()
      };

      if (editingId) {
        setCategories(prev => prev.map(c => 
          c.id === editingId 
            ? { ...newCategory, id: editingId, product_count: prev.find(p => p.id === editingId)?.product_count || 0 }
            : c
        ));
        toast.success('Catégorie mise à jour !');
      } else {
        setCategories(prev => [...prev, newCategory]);
        toast.success('Catégorie ajoutée !');
      }
      
      resetForm();
    } catch (error) {
      console.error('Erreur sauvegarde catégorie:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image_url: category.image_url || ''
    });
    setEditingId(category.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    const category = categories.find(c => c.id === id);
    if (category?.product_count > 0) {
      toast.error('Impossible de supprimer une catégorie contenant des produits');
      return;
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;
    
    try {
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success('Catégorie supprimée !');
    } catch (error) {
      console.error('Erreur suppression catégorie:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image_url: ''
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
        <h2 className="text-2xl font-bold">Gestion des Catégories</h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="btn-luxury"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une catégorie
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {editingId ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
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
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Nom de la catégorie"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="slug-automatique"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Généré automatiquement à partir du nom
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description de la catégorie..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL de l'image</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://exemple.com/image.jpg"
                />
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
        {categories.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Tags className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune catégorie trouvée</p>
            </CardContent>
          </Card>
        ) : (
          categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-luxury-gradient flex items-center justify-center">
                        <Tags className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">
                          <Package className="mr-1 h-3 w-3" />
                          {category.product_count} produits
                        </Badge>
                        <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {category.slug}
                        </code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(category.id)}
                      className="text-destructive"
                      disabled={category.product_count > 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {category.description && (
                  <p className="text-muted-foreground mb-2">{category.description}</p>
                )}
                
                <div className="text-xs text-muted-foreground">
                  Créée le {new Date(category.created_at).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesTab;
