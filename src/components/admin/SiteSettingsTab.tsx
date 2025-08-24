
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, Phone, Mail, MapPin, Globe, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const SiteSettingsTab = () => {
  const {
    contactInfo,
    socialLinks,
    paymentMethods,
    updateContactInfo,
    addSocialLink,
    removeSocialLink,
    addPaymentMethod,
    removePaymentMethod,
    updateSocialLinks,
    updatePaymentMethods
  } = useSiteSettings();

  const [newPaymentMethod, setNewPaymentMethod] = useState({ name: '', description: '' });
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });

  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod.name) {
      toast.error('Veuillez saisir un nom pour le moyen de paiement');
      return;
    }

    addPaymentMethod(newPaymentMethod);
    setNewPaymentMethod({ name: '', description: '' });
    toast.success('Moyen de paiement ajouté !');
  };

  const handleAddSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    addSocialLink(newSocialLink);
    setNewSocialLink({ platform: '', url: '' });
    toast.success('Lien social ajouté !');
  };

  const handleSaveContactInfo = () => {
    toast.success('Informations de contact sauvegardées !');
  };

  const handleSavePaymentMethods = () => {
    toast.success('Moyens de paiement sauvegardés !');
  };

  const handleSaveSocialLinks = () => {
    toast.success('Liens sociaux sauvegardés !');
  };

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
                  onChange={(e) => updateContactInfo({ phone: e.target.value })}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => updateContactInfo({ email: e.target.value })}
                  placeholder="contact@houseofbeauty.fr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp</label>
                <Input
                  value={contactInfo.whatsapp}
                  onChange={(e) => updateContactInfo({ whatsapp: e.target.value })}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Adresse</label>
                <Textarea
                  value={contactInfo.address}
                  onChange={(e) => updateContactInfo({ address: e.target.value })}
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
                      onClick={() => removePaymentMethod(method.id)}
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
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{link.platform}</p>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-luxury-gold flex items-center gap-1"
                        >
                          Voir le profil
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => removeSocialLink(link.id)}
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
