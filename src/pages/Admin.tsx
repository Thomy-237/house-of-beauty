
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogOut, Plus, Edit, Trash2, Eye, EyeOff, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/hooks/useCart';
import { getCategories, getTestimonials, addCategory, updateProduit, deleteProduit, addProduit } from '@/services/supabaseService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Admin = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { products, fetchProducts } = useProducts();
  const navigate = useNavigate();
  
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    image_url: '',
    description: '',
    category_id: '',
    video_url: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchCategories();
      fetchTestimonials();
    }
  }, [isAuthenticated]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data || []);
    } catch (error) {
      console.error('Erreur chargement témoignages:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginForm.username, loginForm.password);
    if (success) {
      toast.success('Connexion réussie !');
    } else {
      toast.error('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Déconnexion réussie');
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      price: '',
      image_url: '',
      description: '',
      category_id: '',
      video_url: ''
    });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    resetProductForm();
    setIsProductDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      image_url: product.image,
      description: product.description,
      category_id: product.category,
      video_url: product.video_url || ''
    });
    setIsProductDialogOpen(true);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      image_url: productForm.image_url,
      description: productForm.description,
      category_id: productForm.category_id,
      video_url: productForm.video_url || null
    };

    try {
      if (editingProduct) {
        await updateProduit(editingProduct.id, productData);
        toast.success('Produit modifié !');
      } else {
        await addProduit(productData);
        toast.success('Produit ajouté !');
      }
      
      setIsProductDialogOpen(false);
      resetProductForm();
      fetchProducts();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      try {
        await deleteProduit(product.id);
        toast.success('Produit supprimé !');
        fetchProducts();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCategory(categoryForm);
      toast.success('Catégorie ajoutée !');
      setIsCategoryDialogOpen(false);
      setCategoryForm({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de la catégorie');
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="section-padding">
          <div className="container-custom max-w-md mx-auto">
            <Card className="card-luxury">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Accès Administration</CardTitle>
                <CardDescription>
                  Connectez-vous pour gérer House Of Beauty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom d'utilisateur</label>
                    <Input
                      type="text"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="admin"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Mot de passe</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="beauty2024"
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-luxury">
                    <Lock className="mr-2 h-4 w-4" />
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-hero-gradient py-12 border-b border-border">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-luxury-heading text-3xl md:text-4xl mb-2">
                Administration
              </h1>
              <p className="text-lg text-muted-foreground">
                Gérez House Of Beauty
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Produits ({products.length})</TabsTrigger>
              <TabsTrigger value="categories">Catégories ({categories.length})</TabsTrigger>
              <TabsTrigger value="testimonials">Témoignages ({testimonials.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Gestion des Produits</h2>
                <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={handleAddProduct} className="btn-luxury">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un produit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmitProduct} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Nom *</label>
                          <Input
                            value={productForm.name}
                            onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Prix (€) *</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Catégorie *</label>
                        <Select
                          value={productForm.category_id}
                          onValueChange={(value) => setProductForm(prev => ({ ...prev, category_id: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">URL de l'image *</label>
                        <Input
                          type="url"
                          value={productForm.image_url}
                          onChange={(e) => setProductForm(prev => ({ ...prev, image_url: e.target.value }))}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">URL de la vidéo</label>
                        <Input
                          type="url"
                          value={productForm.video_url}
                          onChange={(e) => setProductForm(prev => ({ ...prev, video_url: e.target.value }))}
                          placeholder="https://youtube.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <Textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                          required
                        />
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <Button type="submit" className="flex-1 btn-luxury">
                          {editingProduct ? 'Modifier' : 'Ajouter'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsProductDialogOpen(false)}
                          className="flex-1"
                        >
                          Annuler
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Image</th>
                        <th className="text-left p-4">Nom</th>
                        <th className="text-left p-4">Prix</th>
                        <th className="text-left p-4">Catégorie</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="p-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="p-4 font-medium">{product.name}</td>
                          <td className="p-4 font-bold text-luxury-gold">
                            {formatPrice(product.price)}
                          </td>
                          <td className="p-4">
                            <span className="bg-natural-green/10 text-natural-green px-2 py-1 rounded text-xs">
                              {product.category}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleEditProduct(product)}
                                className="w-8 h-8"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleDeleteProduct(product)}
                                className="w-8 h-8 text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Gestion des Catégories</h2>
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="btn-luxury">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter une catégorie
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter une catégorie</DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmitCategory} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom *</label>
                        <Input
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          value={categoryForm.description}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button type="submit" className="flex-1 btn-luxury">
                          Ajouter
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsCategoryDialogOpen(false)}
                          className="flex-1"
                        >
                          Annuler
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Gestion des Témoignages</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className={testimonial.is_approved ? 'border-green-200' : 'border-orange-200'}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        {testimonial.is_approved ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{testimonial.message}</p>
                      {testimonial.email && (
                        <p className="text-xs text-muted-foreground">Email: {testimonial.email}</p>
                      )}
                      {testimonial.phone && (
                        <p className="text-xs text-muted-foreground">Tél: {testimonial.phone}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Statut: {testimonial.is_approved ? 'Approuvé' : 'En attente'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
