
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MessageCircle, Send, Shield, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTestimonials, addTestimonial } from '@/services/supabaseService';
import { toast } from 'sonner';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      // Limiter l'affichage à 12 témoignages pour éviter de surcharger la page
      setTestimonials((data || []).slice(0, 12));
    } catch (error) {
      console.error('Erreur chargement témoignages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      toast.error('Veuillez remplir au moins votre nom et votre message');
      return;
    }

    setSubmitting(true);
    try {
      await addTestimonial(formData);
      toast.success('Merci pour votre témoignage ! Il sera publié après validation.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du témoignage');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-hero-gradient py-16">
        <div className="container-custom text-center">
          <h1 className="text-luxury-heading text-4xl md:text-5xl mb-4">
            Témoignages Clients
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les avis authentiques de nos clients satisfaits
          </p>
        </div>
      </section>

      {/* Liste des témoignages */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-section-title mb-4">Avis vérifiés</h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-luxury-gold" fill="currentColor" />
              ))}
              <span className="ml-2 text-muted-foreground">4.9/5 - Basé sur {testimonials.length} avis</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="card-product">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-4 bg-cream-100 dark:bg-cream-200 rounded shimmer-effect" />
                    <div className="h-16 bg-cream-100 dark:bg-cream-200 rounded shimmer-effect" />
                    <div className="h-4 bg-cream-100 dark:bg-cream-200 rounded w-1/2 shimmer-effect" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun témoignage pour le moment</h3>
              <p className="text-muted-foreground">Soyez le premier à partager votre expérience !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="card-product animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-luxury-gold" fill="currentColor" />
                        ))}
                      </div>
                      {testimonial.is_approved && (
                        <div className="ml-auto flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                          <span className="text-xs text-blue-500 ml-1">Vérifié</span>
                        </div>
                      )}
                    </div>
                    
                    <blockquote className="text-muted-foreground mb-4 italic">
                      "{testimonial.message}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      {testimonial.image_url ? (
                        <img 
                          src={testimonial.image_url} 
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-luxury-gradient mr-3 flex items-center justify-center text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">{testimonial.name}</p>
                        <div className="flex items-center">
                          <p className="text-sm text-muted-foreground">Client</p>
                          {testimonial.is_approved && (
                            <Shield className="h-3 w-3 text-blue-500 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Formulaire de témoignage - Déplacé en bas */}
      <section className="section-padding bg-cream-50 dark:bg-cream-100">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-section-title mb-4">Partagez votre expérience</h2>
            <p className="text-muted-foreground">
              Votre avis nous aide à nous améliorer et aide d'autres clients à faire leur choix
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Votre numéro de téléphone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Votre témoignage *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Partagez votre expérience avec nos produits..."
                    rows={4}
                    required
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <div className="flex items-center text-blue-700 dark:text-blue-300">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Note importante</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    L'ajout de photos ou vidéos nécessite un compte membre vérifié. 
                    Tous les témoignages sont vérifiés avant publication.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="btn-luxury w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer mon témoignage
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
