
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X, ExternalLink } from 'lucide-react';
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
    removePaymentMethod
  } = useSiteSettings();

  const [editingContact, setEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState(contactInfo);
  const [newSocial, setNewSocial] = useState({ platform: '', url: '', icon: '' });
  const [newPayment, setNewPayment] = useState({ name: '', description: '' });
  const [showSocialForm, setShowSocialForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleContactUpdate = () => {
    updateContactInfo(contactForm);
    setEditingContact(false);
    toast.success('Informations de contact mises à jour !');
  };

  const handleAddSocial = () => {
    if (!newSocial.platform || !newSocial.url) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    addSocialLink(newSocial);
    setNewSocial({ platform: '', url: '', icon: '' });
    setShowSocialForm(false);
    toast.success('Réseau social ajouté !');
  };

  const handleAddPayment = () => {
    if (!newPayment.name) {
      toast.error('Le nom du moyen de paiement est obligatoire');
      return;
    }
    addPaymentMethod(newPayment);
    setNewPayment({ name: '', description: '' });
    setShowPaymentForm(false);
    toast.success('Moyen de paiement ajouté !');
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Informations de Contact
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingContact(!editingContact)}
            >
              {editingContact ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          </CardTitle>
          <CardDescription>
            Gérez les informations de contact affichées sur le site
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editingContact ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <Input
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Adresse</label>
                <Input
                  value={contactForm.address}
                  onChange={(e) => setContactForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Rue Example, 75001 Paris"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp</label>
                <Input
                  value={contactForm.whatsapp}
                  onChange={(e) => setContactForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleContactUpdate}>
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setContactForm(contactInfo);
                    setEditingContact(false);
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Téléphone:</strong> {contactInfo.phone}</p>
              <p><strong>Email:</strong> {contactInfo.email}</p>
              <p><strong>Adresse:</strong> {contactInfo.address}</p>
              <p><strong>WhatsApp:</strong> {contactInfo.whatsapp}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Réseaux Sociaux
            <Button onClick={() => setShowSocialForm(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </CardTitle>
          <CardDescription>
            Gérez les liens vers vos réseaux sociaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showSocialForm && (
            <div className="mb-4 p-4 border rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Plateforme (ex: Facebook)"
                  value={newSocial.platform}
                  onChange={(e) => setNewSocial(prev => ({ ...prev, platform: e.target.value }))}
                />
                <Input
                  placeholder="URL (ex: https://facebook.com/page)"
                  value={newSocial.url}
                  onChange={(e) => setNewSocial(prev => ({ ...prev, url: e.target.value }))}
                />
                <Input
                  placeholder="Icône (optionnel)"
                  value={newSocial.icon}
                  onChange={(e) => setNewSocial(prev => ({ ...prev, icon: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddSocial}>Ajouter</Button>
                <Button size="sm" variant="outline" onClick={() => setShowSocialForm(false)}>Annuler</Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            {socialLinks.map((social) => (
              <div key={social.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge>{social.platform}</Badge>
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    {social.url}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => removeSocialLink(social.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Moyens de Paiement
            <Button onClick={() => setShowPaymentForm(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </CardTitle>
          <CardDescription>
            Gérez les moyens de paiement acceptés
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showPaymentForm && (
            <div className="mb-4 p-4 border rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Nom du moyen de paiement"
                  value={newPayment.name}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Description (optionnelle)"
                  value={newPayment.description}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddPayment}>Ajouter</Button>
                <Button size="sm" variant="outline" onClick={() => setShowPaymentForm(false)}>Annuler</Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
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
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsTab;
