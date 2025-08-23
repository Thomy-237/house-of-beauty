
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, CreditCard, Phone } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useCurrency } from '@/contexts/CurrencyContext';
import { toast } from 'sonner';

const CheckoutForm = () => {
  const { items, getTotalPrice } = useCart();
  const { formatPrice } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: 'mirakosmetics@gmail.com',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: ''
  });

  const totalPrice = getTotalPrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address || !formData.paymentMethod) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Créer le message WhatsApp
    const orderDetails = items.map(item => 
      `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const message = `🛍️ *NOUVELLE COMMANDE - HOUSE OF BEAUTY*

👤 *Informations client :*
Nom : ${formData.firstName} ${formData.lastName}
Email : ${formData.email}
Téléphone : ${formData.phone}

📦 *Produits commandés :*
${orderDetails}

💰 *Total : ${formatPrice(totalPrice)}*

📍 *Adresse de livraison :*
${formData.address}
${formData.city}, ${formData.postalCode}
${formData.country}

💳 *Moyen de paiement souhaité :* ${formData.paymentMethod}

Merci de confirmer cette commande !`;

    const whatsappUrl = `https://wa.me/18103552682?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('Redirection vers WhatsApp...');
    setIsOpen(false);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-luxury w-full py-3" size="lg">
          <Phone className="mr-2 h-5 w-5" />
          Finaliser la commande
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Finaliser votre commande
          </DialogTitle>
          <DialogDescription>
            Remplissez vos informations pour finaliser votre commande via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Récapitulatif de commande */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Récapitulatif de commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-luxury-gold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <p className="font-bold text-lg">Total</p>
                <p className="font-bold text-xl text-luxury-gold">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prénom *</label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Votre prénom"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nom *</label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="votre@email.com"
                readOnly
                className="bg-muted"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone *</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+33 6 12 34 56 78"
                required
              />
            </div>
          </div>

          {/* Adresse de livraison */}
          <div>
            <label className="block text-sm font-medium mb-2">Adresse complète *</label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Numéro, rue, appartement..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ville *</label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Votre ville"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Code postal</label>
              <Input
                value={formData.postalCode}
                onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                placeholder="12345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pays *</label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                placeholder="France"
                required
              />
            </div>
          </div>

          {/* Moyen de paiement */}
          <div>
            <label className="block text-sm font-medium mb-2">Moyen de paiement souhaité *</label>
            <Select value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez votre moyen de paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile-money">Mobile Money</SelectItem>
                <SelectItem value="virement">Virement bancaire</SelectItem>
                <SelectItem value="especes">Espèces à la livraison</SelectItem>
                <SelectItem value="carte">Carte bancaire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1 btn-luxury">
              <Phone className="mr-2 h-4 w-4" />
              Envoyer via WhatsApp
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
