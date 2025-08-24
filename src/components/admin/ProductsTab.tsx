
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
  Package,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  in_stock: boolean;
  created_at: string;
}

const ProductsTab = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image_url: '',
    in_stock: true
  });

  useEffect(() => {
    // Simulate loading products
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Crème Hydratante Luxe',
        description: 'Une crème hydratante premium pour tous types de peau',
        price: 45.99,
        category: 'soins-visage',
        image_url: '/placeholder.svg',
        in_stock: true,
        created_at: '2024-01-15'
      },
      {
        id: '2',
        name: 'Sérum Anti-âge',
        description: 'Sérum concentré aux actifs anti-âge',
        price: 79.99,
        category: 'soins-visage',
        image_url: '/placeholder.svg',
        in_stock: true,
        created_at: '2024-01-16'
      }
    ];
    
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      toast.error('Le nom et la description sont obligatoires');
      return;
    }

    try {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString()
      };

      if (editingId) {
        setProducts(prev => prev.map(p => p.id === editingId ? { ...newProduct, id: editingId } : p));
        toast.success('Produit mis à jour !');
      } else {
        setProducts(prev => [...prev, newProduct]);
        toast.success('Produit ajouté !');
      }
      
      resetForm();
    } catch (error) {
      console.error('Erreur sauvegarde produit:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image_url: product.image_url || '',
      in_stock: product.in_stock
    });
    setEditingId(product.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    try {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Produit supprimé !');
    } catch (error) {
      console.error('Erreur suppression produit:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      image_url: '',
      in_stock: true
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
        <h2 className="text-2xl font-bold">Gestion des Produits</h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="btn-luxury"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un produit
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {editingId ? 'Modifier le produit' : 'Ajouter un produit'}
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
                    placeholder="Nom du produit"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Prix *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description du produit..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="soins-visage"
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
        {products.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun produit trouvé</p>
            </CardContent>
          </Card>
        ) : (
          products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-luxury-gradient flex items-center justify-center">
                        <Package className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={product.in_stock ? "default" : "secondary"}>
                          {product.in_stock ? 'En stock' : 'Rupture'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-luxury-gold font-semibold">
                      <DollarSign className="h-4 w-4" />
                      {product.price.toFixed(2)}€
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(product.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-2">{product.description}</p>
                
                <div className="text-xs text-muted-foreground">
                  Créé le {new Date(product.created_at).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsTab;
