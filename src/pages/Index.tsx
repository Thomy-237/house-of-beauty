
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Leaf, Heart, Star, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  const categories = [
    {
      title: 'Soins du Visage',
      description: 'Révélez l\'éclat naturel de votre peau avec nos soins visage bio et naturels.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
      href: '/products?category=soins-visage',
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      title: 'Soins des Cheveux',
      description: 'Nourrissez et sublimez vos cheveux avec nos formules aux actifs naturels.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      href: '/products?category=cheveux',
      icon: <Leaf className="h-6 w-6" />
    },
    {
      title: 'Maquillage Bio',
      description: 'Exprimez votre beauté avec notre maquillage aux pigments naturels.',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
      href: '/products?category=maquillage',
      icon: <Heart className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-custom text-center space-y-8 relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-hero-title mb-6">
              La Beauté Naturelle
              <span className="block text-luxury-heading">Révélée</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Découvrez notre collection exclusive de cosmétiques naturels et luxueux, 
              pour sublimer votre beauté authentique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Link to="/products">
              <Button className="btn-luxury text-lg px-8 py-4">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Découvrir la Collection
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="btn-outline-luxury text-lg px-8 py-4">
                Nous Contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Naturel</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Produits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">4.9</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center">
                <Star className="h-4 w-4 text-luxury-gold mr-1" fill="currentColor" />
                Note Moyenne
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-luxury-gold/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-natural-green/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-cream-50 dark:bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-4">Nos Catégories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explorez nos gammes de produits soigneusement sélectionnés pour répondre à tous vos besoins beauté.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={category.title} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-section-title mb-4">Produits Vedettes</h2>
              <p className="text-muted-foreground">
                Nos coups de cœur sélectionnés pour vous
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="btn-outline-luxury">
                Voir Tout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-cream-900 dark:bg-background text-cream-50 dark:text-foreground">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-4 text-cream-50 dark:text-foreground">Nos Valeurs</h2>
            <p className="text-lg text-cream-200 dark:text-muted-foreground max-w-2xl mx-auto">
              Chez House Of Beauty, nous nous engageons pour une beauté responsable et authentique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-luxury-gradient rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-cream-50 dark:text-foreground">100% Naturel</h3>
              <p className="text-cream-200 dark:text-muted-foreground">
                Tous nos produits sont formulés avec des ingrédients naturels et biologiques certifiés.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-natural-gradient rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-cream-50 dark:text-foreground">Éthique</h3>
              <p className="text-cream-200 dark:text-muted-foreground">
                Nous respectons l'environnement et nos partenaires dans toute notre chaîne de production.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-luxury-gradient rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-cream-50 dark:text-foreground">Excellence</h3>
              <p className="text-cream-200 dark:text-muted-foreground">
                Qualité premium et efficacité prouvée pour des résultats visibles et durables.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
