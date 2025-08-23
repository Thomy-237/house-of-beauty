
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

const SiteSettingsTab = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', name: 'Mobile Money', description: 'Paiement via mobile money' },
    { id: '2', name: 'Virement bancaire', description: 'Virement bancaire sécurisé' },
    { id: '3', name: 'Espèces à la livraison', description: 'Paiement en liquide' },
    { id: '4', name: 'Carte bancaire', description: 'Paiement par carte' }
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: '1', platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' },
    { id: '2', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
    { id: '3', platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' }
  ]);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+18103552682',
    email: 'mirakosmetics@gmail.com',
    address: '123 Rue de la Beauté, 75001 Paris, France'
  });

  const [newPaymentMethod, setNewPaymentMethod] = useState({ name: '', description: '' });
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });

  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod.name) {
      toast.error('Veuillez saisir un nom pour le moyen de paiement');
      return;
    }

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      name: newPaymentMethod.name,
      description: newPaymentMethod.description
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setNewPaymentMethod({ name: '', description: '' });
    toast.success('Moyen de paiement ajouté !');
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast.success('Moyen de paiement supprimé !');
  };

  const handleAddSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: newSocialLink.platform,
      url: newSocialLink.url,
      icon: newSocialLink.platform
    };

    setSocialLinks([...socialLinks, newLink]);
    setNewSocialLink({ platform: '', url: '' });
    toast.success('Lien social ajouté !');
  };

  const handleRemoveSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
    toast.success('Lien social supprimé !');
  };

  const handleSaveContactInfo = () => {
    // Dans un vrai projet, on sauvegarderait en base de données
    localStorage.setItem('siteContactInfo', JSON.stringify(contactInfo));
    toast.success('Informations de contact sauvegardées !');
  };

  const handleSavePaymentMethods = () => {
    localStorage.setItem('sitePaymentMethods', JSON.stringify(paymentMethods));
    toast.success('Moyens de paiement sauvegardés !');
  };

  const handleSaveSocialLinks = () => {
    localStorage.setItem('siteSocialLinks', JSON.stringify(socialLinks));
    toast.success('Liens sociaux sauvegardés !');
  };

  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    const savedContactInfo = localStorage.getItem('siteContactInfo');
    const savedPaymentMethods = localStorage.getItem('sitePaymentMethods');
    const savedSocialLinks = localStorage.getItem('siteSocialLinks');

    if (savedContactInfo) {
      setContactInfo(JSON.parse(savedContactInfo));
    }
    if (savedPaymentMethods) {
      setPaymentMethods(JSON.parse(savedPaymentMethods));
    }
    if (savedSocialLinks) {
      setSocialLinks(JSON.parse(savedSocialLinks));
    }
  }, []);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="payment">Paiements</TabsTrigger>
          <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informations de Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <Input
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@houseofbeauty.fr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Adresse</label>
                <Textarea
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Rue de la Beauté, 75001 Paris, France"
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveContactInfo} className="btn-luxury">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder les informations
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Moyens de Paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nom du moyen de paiement"
                  value={newPaymentMethod.name}
                  onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Description (optionnel)"
                  value={newPaymentMethod.description}
                  onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <Button onClick={handleAddPaymentMethod} className="btn-luxury">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un moyen de paiement
              </Button>

              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{method.name}</p>
                      {method.description && (
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button onClick={handleSavePaymentMethods} className="btn-luxury">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder les moyens de paiement
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Réseaux Sociaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nom de la plateforme"
                  value={newSocialLink.platform}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, platform: e.target.value }))}
                />
                <Input
                  placeholder="URL du profil"
                  value={newSocialLink.url}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>
              <Button onClick={handleAddSocialLink} className="btn-luxury">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un lien social
              </Button>

              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{link.platform}</p>
                      <p className="text-sm text-muted-foreground">{link.url}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemoveSocialLink(link.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button onClick={handleSaveSocialLinks} className="btn-luxury">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder les liens sociaux
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsTab;
