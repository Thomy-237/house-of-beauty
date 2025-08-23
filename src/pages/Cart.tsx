
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useCurrency } from '@/contexts/CurrencyContext';
import CheckoutForm from '@/components/CheckoutForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success('Produit supprimé', {
      description: `${productName} a été retiré de votre panier.`,
    });
  };

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 50 ? 0 : 4.90;
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-cream-100 dark:bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Votre panier est vide</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Découvrez notre collection de produits de beauté naturels et luxueux.
              </p>
              <Link to="/products">
                <Button className="btn-luxury">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Découvrir nos produits
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-hero-gradient py-12">
        <div className="container-custom">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/products">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-luxury-heading text-3xl md:text-4xl">Mon Panier</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Finalisez votre commande de produits de beauté naturels
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">
                  Articles ({items.length})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    clearCart();
                    toast.success('Panier vidé');
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vider le panier
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="card-luxury p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="w-full md:w-32 h-32 bg-cream-100 dark:bg-cream-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          <span className="inline-block mt-2 text-xs bg-natural-green/10 text-natural-green px-2 py-1 rounded-full capitalize">
                            {item.category.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-muted-foreground">Quantité:</span>
                            <div className="flex items-center border border-border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 rounded-none"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-4 py-2 text-center min-w-[3rem] text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 rounded-none"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-lg font-bold text-luxury-gold">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {formatPrice(item.price)} × {item.quantity}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="text-destructive hover:text-destructive w-8 h-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-foreground mb-6">Récapitulatif</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-natural-green">Gratuite</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <div className="text-xs text-muted-foreground bg-cream-100 dark:bg-cream-200 p-3 rounded-lg">
                      Livraison gratuite à partir de 50 €
                    </div>
                  )}
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-xl text-luxury-gold">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <CheckoutForm />
                  
                  <Link to="/products" className="block">
                    <Button variant="outline" className="w-full btn-outline-luxury">
                      Continuer mes achats
                    </Button>
                  </Link>
                </div>

                {/* Payment Methods Preview */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    Contact : mirakosmetics@gmail.com
                  </p>
                  <div className="flex justify-center space-x-2 opacity-50">
                    <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-[8px] flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white text-[7px] flex items-center justify-center font-bold">
                      MC
                    </div>
                    <div className="w-8 h-5 bg-gradient-to-r from-green-600 to-green-400 rounded text-white text-[6px] flex items-center justify-center font-bold">
                      MoMo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
