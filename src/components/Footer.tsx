
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ExternalLink } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Footer = () => {
  const { contactInfo, socialLinks } = useSiteSettings();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <footer className="bg-luxury-brown text-cream-50">
      {/* Section principale */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-luxury-gold">House of Beauty</h3>
            <p className="text-cream-200 leading-relaxed">
              Votre beauté naturelle révélée par des produits d'exception. 
              Découvrez notre collection exclusive de soins luxueux et naturels.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream-50">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-cream-200 hover:text-luxury-gold transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/products" className="text-cream-200 hover:text-luxury-gold transition-colors">
                  Nos Produits
                </a>
              </li>
              <li>
                <a href="/testimonials" className="text-cream-200 hover:text-luxury-gold transition-colors">
                  Témoignages
                </a>
              </li>
              <li>
                <a href="/contact" className="text-cream-200 hover:text-luxury-gold transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream-50">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                <span className="text-cream-200 text-sm">{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-luxury-gold flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-cream-200 hover:text-luxury-gold transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-luxury-gold flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-cream-200 hover:text-luxury-gold transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream-50">Suivez-nous</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-cream-200/10 rounded-full flex items-center justify-center text-cream-200 hover:text-luxury-gold hover:bg-luxury-gold/20 transition-all duration-300"
                  aria-label={`Suivez-nous sur ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
            <p className="text-cream-300 text-sm">
              Restez connecté pour découvrir nos nouveautés et conseils beauté !
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-cream-200/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream-300 text-sm">
              © 2024 House of Beauty. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-cream-300 hover:text-luxury-gold transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-cream-300 hover:text-luxury-gold transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-cream-300 hover:text-luxury-gold transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
