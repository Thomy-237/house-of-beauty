
# House of Beauty - Site E-commerce de Cosmétiques

## 🌟 À propos

House of Beauty est un site e-commerce moderne spécialisé dans les cosmétiques et produits de beauté naturels de luxe. Le site offre une expérience utilisateur premium avec un design élégant et des fonctionnalités avancées.

## 🚀 Fonctionnalités

- **Catalogue produits** avec recherche et filtres avancés
- **Panier d'achat** intelligent avec persistance
- **Système de commande** via WhatsApp intégré
- **Témoignages clients** avec système de vérification
- **Administration complète** pour gérer le contenu
- **Design responsive** et optimisé mobile
- **Thème personnalisable** facilement
- **Performance optimisée** (Core Web Vitals)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Supabase (pour la base de données)

## 🛠 Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd house-of-beauty
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env
```

Remplir les variables dans `.env` :
```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-publique-supabase
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🏗 Build et déploiement

### Build de production
```bash
npm run build
```

### Prévisualisation du build
```bash
npm run preview
```

### Déploiement

Le site peut être déployé sur :
- **Vercel** (recommandé)
- **Netlify** 
- **Hébergement classique** (Apache/Nginx)

#### Déploiement Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Hébergement classique
1. Exécuter `npm run build`
2. Uploader le contenu du dossier `dist/` sur votre serveur
3. Configurer le serveur pour servir `index.html` pour toutes les routes

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base
│   ├── admin/          # Composants d'administration
│   └── ...
├── pages/              # Pages principales
├── hooks/              # Hooks personnalisés
├── services/           # Services API
├── config/             # Configuration du site
│   ├── site.config.ts  # Configuration générale
│   └── theme.config.ts # Configuration du thème
├── integrations/       # Intégrations externes
└── styles/            # Styles globaux
```

## 🎨 Personnalisation

### Modifier les couleurs et le thème

Éditer `src/config/theme.config.ts` :

```typescript
export const themeConfig = {
  colors: {
    primary: {
      500: 'hsl(35, 91%, 50%)', // Couleur principale
      // ...
    },
    luxury: {
      gold: 'hsl(45, 85%, 58%)', // Or de luxe
      // ...
    }
  }
}
```

### Modifier les informations du site

Éditer `src/config/site.config.ts` :

```typescript
export const siteConfig = {
  name: "Votre Nom de Site",
  contact: {
    phone: "+33123456789",
    email: "votre@email.com",
    whatsapp: "+33123456789"
  }
  // ...
}
```

### Remplacer les images par défaut

1. Placer vos images dans `public/`
2. Modifier les chemins dans `src/config/site.config.ts`

```typescript
assets: {
  logo: "/votre-logo.png",
  favicon: "/votre-favicon.ico",
  heroImage: "/votre-hero.jpg"
}
```

## 🔧 Administration

Accéder à l'interface d'administration via `/admin` pour gérer :

- **Produits** : Ajouter, modifier, supprimer
- **Catégories** : Organiser les produits
- **Témoignages** : Modérer les avis clients
- **Paramètres du site** : Contact, paiements, réseaux sociaux

## 🛒 Fonctionnement des commandes

1. **Client ajoute des produits** au panier
2. **Remplit le formulaire** de commande
3. **Sélectionne pays et méthode** de paiement
4. **Clic "Finaliser"** → Redirection WhatsApp automatique
5. **Message généré** avec tous les détails
6. **Traitement manuel** via WhatsApp

## 🔍 SEO et performance

### Optimisations incluses
- Meta tags dynamiques
- Images optimisées avec lazy loading
- Code splitting automatique
- Compression des assets
- Cache headers configurés

### Améliorer le référencement
1. Remplir les meta descriptions dans chaque page
2. Ajouter un sitemap.xml
3. Configurer Google Analytics
4. Optimiser les images (WebP recommandé)

## 🚨 Résolution des problèmes

### Images qui ne s'affichent pas
- Vérifier les chemins dans `/public/`
- Utiliser le composant `ImageWithFallback`
- S'assurer que les formats sont supportés

### Erreurs de build
```bash
# Nettoyer le cache
rm -rf node_modules package-lock.json
npm install

# Vérifier les types TypeScript
npm run type-check
```

### Problèmes de performance
- Optimiser les images (compression, format WebP)
- Réduire les bundles JavaScript
- Utiliser le lazy loading

## 📦 Dépendances principales

- **React 18** - Framework UI
- **TypeScript** - Typage statique  
- **Tailwind CSS** - Styling
- **Zustand** - Gestion d'état
- **React Router** - Navigation
- **Supabase** - Backend et base de données
- **Vite** - Build tool moderne

## 📄 Licences

- **Code** : MIT License
- **Design** : Usage commercial autorisé
- **Images par défaut** : Placeholder images (remplacer en production)
- **Icônes** : Lucide React (MIT License)

## 🤝 Support

Pour toute question technique :
1. Vérifier la documentation
2. Consulter les logs dans la console
3. Vérifier les configurations Supabase

## 📊 Monitoring

### Métriques à surveiller
- Core Web Vitals (LCP, FID, CLS)
- Temps de chargement des pages
- Taux de conversion du panier
- Erreurs JavaScript

### Outils recommandés
- Google PageSpeed Insights
- Google Analytics
- Supabase Dashboard pour la DB

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2024  
**Contact** : mirakosmetics@gmail.com
