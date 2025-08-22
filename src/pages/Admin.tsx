
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogOut, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/hooks/useCart';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Admin = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: ''
  });

  const categories = [
    { value: 'soins-visage', label: 'Soins du visage' },
    { value: 'cheveux', label: 'Soins des cheveux' },
    { value: 'maquillage', label: 'Maquillage' },
    { value: 'soins-corps', label: 'Soins du corps' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginForm.username, loginForm.password);
    if (success) {
      toast.success('Connexion réussie !', {
        description: 'Bienvenue dans l\'interface d\'administration.',
      });
    } else {
      toast.error('Identifiants incorrects', {
        description: 'Vérifiez votre nom d\'utilisateur et mot de passe.',
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Déconnexion réussie');
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      price: '',
      image: '',
      description: '',
      category: ''
    });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category
    });
    setIsDialogOpen(true);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      image: productForm.image,
      description: productForm.description,
      category: productForm.category
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success('Produit modifié !', {
          description: `${productData.name} a été mis à jour avec succès.`,
        });
      } else {
        await addProduct(productData);
        toast.success('Produit ajouté !', {
          description: `${productData.name} a été ajouté au catalogue.`,
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Erreur', {
        description: 'Une erreur est survenue lors de la sauvegarde.',
      });
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      try {
        await deleteProduct(product.id);
        toast.success('Produit supprimé !', {
          description: `${product.name} a été retiré du catalogue.`,
        });
      } catch (error) {
        toast.error('Erreur', {
          description: 'Une erreur est survenue lors de la suppression.',
        });
      }
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
                  Connectez-vous pour gérer les produits de House Of Beauty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                      Nom d'utilisateur
                    </label>
                    <Input
                      id="username"
                      type="text"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Entrez votre nom d'utilisateur"
                      required
                      className="input-luxury"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Entrez votre mot de passe"
                        required
                        className="input-luxury pr-10"
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
                
                <div className="mt-6 p-4 bg-cream-100 dark:bg-cream-200 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Démo:</strong> admin / beauty2024
                  </p>
                </div>
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
      
      {/* Admin Header */}
      <section className="bg-hero-gradient py-12 border-b border-border">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-luxury-heading text-3xl md:text-4xl mb-2">
                Administration
              </h1>
              <p className="text-lg text-muted-foreground">
                Gérez votre catalogue de produits House Of Beauty
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="btn-outline-luxury">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </section>

      {/* Products Management */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Actions Bar */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Gestion des Produits ({products.length})
            </h2>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddProduct} className="btn-luxury">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un produit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct 
                      ? 'Modifiez les informations du produit ci-dessous.'
                      : 'Remplissez les informations du nouveau produit.'
                    }
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <div>
                    <label htmlFor="product-name" className="block text-sm font-medium text-foreground mb-2">
                      Nom du produit *
                    </label>
                    <Input
                      id="product-name"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Sérum Vitamine C Bio"
                      required
                      className="input-luxury"
                    />
                  </div>

                  <div>
                    <label htmlFor="product-price" className="block text-sm font-medium text-foreground mb-2">
                      Prix (€) *
                    </label>
                    <Input
                      id="product-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="45.00"
                      required
                      className="input-luxury"
                    />
                  </div>

                  <div>
                    <label htmlFor="product-category" className="block text-sm font-medium text-foreground mb-2">
                      Catégorie *
                    </label>
                    <Select
                      value={productForm.category}
                      onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="input-luxury">
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="product-image" className="block text-sm font-medium text-foreground mb-2">
                      URL de l'image *
                    </label>
                    <Input
                      id="product-image"
                      type="url"
                      value={productForm.image}
                      onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      required
                      className="input-luxury"
                    />
                  </div>

                  <div>
                    <label htmlFor="product-description" className="block text-sm font-medium text-foreground mb-2">
                      Description *
                    </label>
                    <Textarea
                      id="product-description"
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description détaillée du produit..."
                      rows={3}
                      required
                      className="input-luxury resize-none"
                    />
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="flex-1 btn-luxury">
                      {editingProduct ? 'Modifier' : 'Ajouter'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Products Table */}
          <Card className="card-luxury overflow-hidden">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Nom</th>
                    <th>Prix</th>
                    <th>Catégorie</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg bg-cream-100 dark:bg-cream-200"
                        />
                      </td>
                      <td className="font-medium">{product.name}</td>
                      <td className="font-bold text-luxury-gold">
                        {formatPrice(product.price)}
                      </td>
                      <td>
                        <span className="inline-block bg-natural-green/10 text-natural-green px-2 py-1 rounded-full text-xs capitalize">
                          {product.category.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="max-w-xs">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </td>
                      <td>
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
                            className="w-8 h-8 text-destructive hover:text-destructive"
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

          {products.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-cream-100 dark:bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Aucun produit</h3>
              <p className="text-muted-foreground">
                Commencez par ajouter votre premier produit au catalogue.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
