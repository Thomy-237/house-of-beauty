
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream-900 dark:bg-background text-cream-50 dark:text-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-luxury-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-luxury font-bold">H</span>
              </div>
              <h3 className="font-luxury text-xl font-bold">House Of Beauty</h3>
            </div>
            <p className="text-cream-200 dark:text-muted-foreground text-sm leading-relaxed">
              Votre destination pour des cosmétiques naturels et luxueux. 
              Découvrez notre gamme de produits de beauté authentiques et respectueux de l'environnement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream-200 hover:text-luxury-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream-200 hover:text-luxury-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream-200 hover:text-luxury-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-luxury text-lg font-semibold">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-cream-200 dark:text-muted-foreground hover:text-luxury-gold transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-cream-200 dark:text-muted-foreground hover:text-luxury-gold transition-colors text-sm">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-200 dark:text-muted-foreground hover:text-luxury-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-cream-200 dark:text-muted-foreground hover:text-luxury-gold transition-colors text-sm">
                  À Propos
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-luxury text-lg font-semibold">Catégories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cream-200 dark:text-muted-foreground hover:text-luxury-gold transition-colors text-sm">
                  Soins du Visage
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 dark:text-muted-foreground hover:text-luxury-gold transition-colors text-sm">
                  Soins des Cheveux
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 dark:text-muted-foreground hover:text-luxury-gold transition-colors text-sm">
                  Maquillage
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-200 dark:text-muted-foreground hover:text-luxury-gold transition-colors text-sm">
                  Parfums
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-luxury text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-cream-200 dark:text-muted-foreground text-sm">
                    +33 1 23 45 67 89
                  </p>
                  <p className="text-xs text-cream-300 dark:text-muted-foreground/70">
                    Lun - Ven: 9h - 18h
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-cream-200 dark:text-muted-foreground text-sm">
                    contact@houseofbeauty.fr
                  </p>
                  <p className="text-xs text-cream-300 dark:text-muted-foreground/70">
                    Réponse sous 24h
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-cream-200 dark:text-muted-foreground text-sm">
                    123 Rue de la Beauté
                  </p>
                  <p className="text-cream-200 dark:text-muted-foreground text-sm">
                    75001 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream-700 dark:border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-cream-300 dark:text-muted-foreground text-sm">
              © 2024 House Of Beauty. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-cream-300 dark:text-muted-foreground hover:text-luxury-gold transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="text-cream-300 dark:text-muted-foreground hover:text-luxury-gold transition-colors">
                Conditions d'Utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
