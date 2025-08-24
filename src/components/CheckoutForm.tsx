
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, User, MapPin, CreditCard, MessageCircle } from 'lucide-react';
import { useCart, CartItem } from '@/hooks/useCart';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import CountrySelector from '@/components/CountrySelector';
import { toast } from 'sonner';

const CheckoutForm: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { contactInfo, paymentMethods } = useSiteSettings();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', // Ne pas pré-remplir
    phone: '',
    address: '',
    city: '',
    country: '',
    paymentMethod: '',
    notes: ''
  });

  const totalAmount = getTotalPrice();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleCountryChange = (country: string) => {
    setFormData(prev => ({
      ...prev,
      country
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const generateWhatsAppMessage = () => {
    const itemsList = items.map(item => 
      `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€`
    ).join('\n');

    return encodeURIComponent(`
🛍️ *NOUVELLE COMMANDE - House of Beauty*

👤 *Informations client:*
Nom: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Téléphone: ${formData.phone}

📍 *Adresse de livraison:*
${formData.address}
${formData.city}, ${formData.country}

🛒 *Produits commandés:*
${itemsList}

💰 *TOTAL: ${totalAmount.toFixed(2)}€*

💳 *Méthode de paiement choisie:*
${formData.paymentMethod}

📝 *Notes:* ${formData.notes || 'Aucune note'}

---
Merci de confirmer cette commande et de m'envoyer les instructions de paiement.
    `.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'country', 'paymentMethod'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (items.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    // Redirection WhatsApp
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Vider le panier après redirection
    clearCart();
    toast.success('Commande envoyée ! Vous allez être redirigé vers WhatsApp.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container-custom">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Panier vide</h2>
              <p className="text-muted-foreground mb-4">
                Votre panier est actuellement vide. Découvrez nos produits !
              </p>
              <Button 
                onClick={() => window.location.href = '/products'}
                className="btn-luxury"
              >
                Découvrir nos produits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-luxury-heading text-3xl md:text-4xl mb-4">
              Finaliser ma commande
            </h1>
            <p className="text-muted-foreground">
              Remplissez vos informations pour finaliser votre achat
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informations personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange('firstName')}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange('lastName')}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        placeholder="+33 1 23 45 67 89"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Adresse de livraison */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Adresse de livraison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Adresse complète *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange('address')}
                        placeholder="123 Rue de la Paix"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange('city')}
                        placeholder="Paris"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Pays *</Label>
                      <CountrySelector
                        value={formData.country}
                        onChange={handleCountryChange}
                        placeholder="Sélectionnez votre pays"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Méthode de paiement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Méthode de paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="paymentMethod">Choisir un moyen de paiement *</Label>
                      <Select value={formData.paymentMethod} onValueChange={handlePaymentMethodChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un moyen de paiement" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.name}>
                              <div>
                                <div className="font-medium">{method.name}</div>
                                {method.description && (
                                  <div className="text-sm text-muted-foreground">{method.description}</div>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes (optionnel)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={handleInputChange('notes')}
                        placeholder="Instructions spéciales, questions, etc."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full btn-luxury">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Finaliser ma commande sur WhatsApp
                </Button>
              </form>
            </div>

            {/* Récapitulatif */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Récapitulatif de commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item: CartItem) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.price}€ x {item.quantity}
                        </p>
                      </div>
                      <div className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)}€
                      </div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-luxury-gold">{totalAmount.toFixed(2)}€</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>• Frais de livraison calculés selon la destination</p>
                    <p>• Paiement sécurisé via WhatsApp</p>
                    <p>• Confirmation par message</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
