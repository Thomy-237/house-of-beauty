
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi - à remplacer par l'intégration réelle
    toast.success('Message envoyé !', {
      description: 'Nous vous répondrons dans les plus brefs délais.',
    });
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'WhatsApp',
      description: 'Contactez-nous directement',
      value: '+33 6 12 34 56 78',
      action: () => {
        toast.info('Fonctionnalité en cours de développement', {
          description: 'WhatsApp sera bientôt disponible.',
        });
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      description: 'Envoyez-nous un message',
      value: 'contact@houseofbeauty.fr',
      action: () => {
        window.location.href = 'mailto:contact@houseofbeauty.fr';
      },
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <PhoneCall className="h-6 w-6" />,
      title: 'Téléphone',
      description: 'Appelez-nous directement',
      value: '+33 1 23 45 67 89',
      action: () => {
        toast.info('Fonctionnalité en cours de développement', {
          description: 'L\'appel direct sera bientôt disponible.',
        });
      },
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient py-16">
        <div className="container-custom text-center">
          <h1 className="text-luxury-heading text-4xl md:text-5xl mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions 
            et vous accompagner dans votre routine beauté.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">Comment nous joindre ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choisissez le moyen de communication qui vous convient le mieux. 
              Nous nous engageons à vous répondre rapidement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={method.title} className="card-luxury group cursor-pointer" onClick={method.action}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium text-foreground">{method.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-cream-50 dark:bg-cream-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-section-title mb-6">Envoyez-nous un message</h2>
              <Card className="card-luxury">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Nom complet *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                          required
                          className="input-luxury"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                          required
                          className="input-luxury"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+33 6 12 34 56 78"
                        className="input-luxury"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Sujet *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Quel est l'objet de votre message ?"
                        required
                        className="input-luxury"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Décrivez votre demande..."
                        rows={6}
                        required
                        className="input-luxury resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full btn-luxury py-3">
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-section-title mb-6">Nos informations</h2>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Adresse</h3>
                      <p className="text-muted-foreground">
                        123 Rue de la Beauté<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-natural-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Téléphone</h3>
                      <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                      <p className="text-sm text-muted-foreground">Service client disponible</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">contact@houseofbeauty.fr</p>
                      <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-natural-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Horaires</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Lundi - Vendredi: 9h - 18h</p>
                        <p>Samedi: 10h - 17h</p>
                        <p>Dimanche: Fermé</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Card */}
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-luxury-gold" />
                    Questions fréquentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">
                        Délais de livraison ?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        2-3 jours ouvrés en France métropolitaine
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">
                        Retours et échanges ?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        30 jours pour retourner vos produits non ouverts
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">
                        Conseils beauté ?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Notre équipe vous accompagne dans le choix de vos produits
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
