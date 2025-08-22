
import { create } from 'zustand';
import { Product } from './useCart';

// Mock products data - à remplacer par Supabase plus tard
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sérum Vitamine C Bio',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    description: 'Sérum anti-âge enrichi en vitamine C naturelle pour un éclat lumineux.',
    category: 'soins-visage'
  },
  {
    id: '2',
    name: 'Crème Hydratante Aloe Vera',
    price: 32.50,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    description: 'Crème hydratante quotidienne à base d\'aloe vera bio pour tous types de peau.',
    category: 'soins-visage'
  },
  {
    id: '3',
    name: 'Shampooing Naturel Argan',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    description: 'Shampooing nourrissant à l\'huile d\'argan pour cheveux secs et abîmés.',
    category: 'cheveux'
  },
  {
    id: '4',
    name: 'Rouge à Lèvres Mat Bio',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    description: 'Rouge à lèvres longue tenue aux pigments naturels, fini mat velours.',
    category: 'maquillage'
  },
  {
    id: '5',
    name: 'Masque Purifiant Argile Verte',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
    description: 'Masque purifiant à l\'argile verte pour peaux mixtes à grasses.',
    category: 'soins-visage'
  },
  {
    id: '6',
    name: 'Huile Capillaire Coco Bio',
    price: 22.50,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    description: 'Huile capillaire nourrissante à l\'huile de coco vierge bio.',
    category: 'cheveux'
  },
  {
    id: '7',
    name: 'Fond de Teint Naturel',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    description: 'Fond de teint couvrance modulable aux extraits botaniques.',
    category: 'maquillage'
  },
  {
    id: '8',
    name: 'Gommage Corps Sucre Canne',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=400&h=400&fit=crop',
    description: 'Gommage exfoliant doux au sucre de canne et huiles essentielles.',
    category: 'soins-corps'
  }
];

interface ProductsStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
}

export const useProducts = create<ProductsStore>((set, get) => ({
  products: mockProducts,
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ products: mockProducts, loading: false });
    } catch (error) {
      set({ error: 'Erreur lors du chargement des produits', loading: false });
    }
  },

  addProduct: async (product) => {
    set({ loading: true });
    try {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
      };
      set(state => ({
        products: [...state.products, newProduct],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Erreur lors de l\'ajout du produit', loading: false });
    }
  },

  updateProduct: async (id, updatedProduct) => {
    set({ loading: true });
    try {
      set(state => ({
        products: state.products.map(product =>
          product.id === id ? { ...product, ...updatedProduct } : product
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Erreur lors de la mise à jour du produit', loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      set(state => ({
        products: state.products.filter(product => product.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Erreur lors de la suppression du produit', loading: false });
    }
  },

  getProductsByCategory: (category) => {
    return get().products.filter(product => product.category === category);
  },

  searchProducts: (query) => {
    const products = get().products;
    if (!query.trim()) return products;
    
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  },
}));
