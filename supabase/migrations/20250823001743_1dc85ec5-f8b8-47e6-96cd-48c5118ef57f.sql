
-- Créer la table des catégories
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table des produits
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  video_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table des témoignages
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table des vidéos
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour permettre la lecture publique des catégories
CREATE POLICY "Tout le monde peut voir les catégories" ON public.categories
  FOR SELECT USING (true);

-- Politiques RLS pour permettre la lecture publique des produits
CREATE POLICY "Tout le monde peut voir les produits" ON public.products
  FOR SELECT USING (true);

-- Politiques RLS pour permettre la lecture publique des témoignages approuvés
CREATE POLICY "Tout le monde peut voir les témoignages approuvés" ON public.testimonials
  FOR SELECT USING (is_approved = true);

-- Permettre l'insertion de témoignages par tous
CREATE POLICY "Tout le monde peut ajouter des témoignages" ON public.testimonials
  FOR INSERT WITH CHECK (true);

-- Politiques RLS pour permettre la lecture publique des vidéos
CREATE POLICY "Tout le monde peut voir les vidéos" ON public.videos
  FOR SELECT USING (true);

-- Trigger pour mettre à jour updated_at sur les produits
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insérer les catégories par défaut
INSERT INTO public.categories (name, description) VALUES
  ('Cosmétiques', 'Des produits de maquillage et soins pour révéler votre beauté naturelle tout en respectant votre peau.'),
  ('Soins', 'Des solutions hydratantes et nourrissantes adaptées à tous types de peaux, pour une routine beauté saine.'),
  ('Savons', 'Des savons artisanaux à base d''ingrédients naturels pour une peau douce, propre et éclatante.');

-- Insérer les produits par défaut
INSERT INTO public.products (name, description, price, image_url, category_id) VALUES
  ('Crème Éclat Naturel', 'Une crème hydratante qui redonne éclat et vitalité à votre peau grâce à ses ingrédients naturels soigneusement sélectionnés.', 34.99, 'https://images.pexels.com/photos/5938282/pexels-photo-5938282.jpeg', (SELECT id FROM public.categories WHERE name = 'Soins')),
  ('Huile Sublime Bio', 'Huile précieuse aux vertus nourrissantes pour une peau douce et un teint lumineux, certifiée biologique.', 29.90, 'https://images.pexels.com/photos/3737594/pexels-photo-3737594.jpeg', (SELECT id FROM public.categories WHERE name = 'Soins')),
  ('Savon Douceur Karité', 'Savon artisanal enrichi au beurre de karité pour nettoyer en douceur et hydrater votre peau au quotidien.', 9.99, 'https://images.pexels.com/photos/7564545/pexels-photo-7564545.jpeg', (SELECT id FROM public.categories WHERE name = 'Savons')),
  ('Masque Purifiant Argile', 'Masque à l''argile verte qui purifie les pores et laisse la peau fraîche et éclatante de santé.', 19.99, 'https://images.pexels.com/photos/7796843/pexels-photo-7796843.jpeg', (SELECT id FROM public.categories WHERE name = 'Soins')),
  ('Palette Nude Élégance', 'Palette de maquillage aux tons nude pour un look naturel et élégant adapté à toutes les occasions.', 24.99, 'https://images.pexels.com/photos/3762876/pexels-photo-3762876.jpeg', (SELECT id FROM public.categories WHERE name = 'Cosmétiques')),
  ('Sérum Anti-Âge Botanique', 'Sérum concentré aux extraits botaniques pour lutter contre les signes du vieillissement et revitaliser la peau.', 49.90, 'https://images.pexels.com/photos/3992867/pexels-photo-3992867.jpeg', (SELECT id FROM public.categories WHERE name = 'Soins'));

-- Insérer les témoignages par défaut (tous approuvés)
INSERT INTO public.testimonials (name, message, is_approved) VALUES
  ('Sophie L.', 'J''adore ces produits ! Ma peau n''a jamais été aussi douce.', true),
  ('Karine M.', 'Livraison rapide et emballage parfait. Merci House Of Beauty !', true),
  ('Julien P.', 'Les soins sont incroyables, odeur et texture au top.', true),
  ('Camille D.', 'Service client impeccable et produits de qualité.', true),
  ('Sarah N.', 'Enfin des cosmétiques qui respectent ma peau sensible.', true),
  ('Olivier R.', 'Je recommande fortement ! Résultat visible dès la première semaine.', true),
  ('Anaïs B.', 'Le masque à l''argile est mon coup de cœur.', true),
  ('David K.', 'Produits bio et efficaces, je suis fan.', true),
  ('Claire V.', 'Les savons sentent tellement bon, un vrai plaisir sous la douche.', true),
  ('Nathalie G.', 'Un site fiable avec des prix raisonnables.', true),
  ('Isabelle F.', 'Ma routine beauté a changé grâce à vos sérums.', true),
  ('Marc T.', 'Ma compagne adore, et moi aussi !', true),
  ('Julie S.', 'Enfin une marque qui tient ses promesses.', true),
  ('Sandrine P.', 'Le packaging est super élégant, parfait pour offrir.', true),
  ('Vanessa D.', 'Je rachèterai sans hésiter, un vrai coup de cœur.', true);
