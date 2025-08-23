
import { create } from 'zustand';
import { Product } from './useCart';
import { getProduits, addProduit, updateProduit, deleteProduit } from '@/services/supabaseService';

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
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getProduits();
      const formattedProducts: Product[] = data?.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        image: product.image_url,
        category: product.categories?.name || 'Non classé',
        video_url: product.video_url
      })) || [];
      
      set({ products: formattedProducts, loading: false });
    } catch (error) {
      set({ error: 'Erreur lors du chargement des produits', loading: false });
    }
  },

  addProduct: async (product) => {
    set({ loading: true });
    try {
      const productData = {
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image,
        category_id: null // À implémenter avec la sélection de catégorie
      };
      
      await addProduit(productData);
      // Recharger les produits après ajout
      await get().fetchProducts();
    } catch (error) {
      set({ error: 'Erreur lors de l\'ajout du produit', loading: false });
    }
  },

  updateProduct: async (id, updatedProduct) => {
    set({ loading: true });
    try {
      const productData = {
        ...(updatedProduct.name && { name: updatedProduct.name }),
        ...(updatedProduct.description && { description: updatedProduct.description }),
        ...(updatedProduct.price && { price: updatedProduct.price }),
        ...(updatedProduct.image && { image_url: updatedProduct.image }),
      };
      
      await updateProduit(id, productData);
      // Recharger les produits après modification
      await get().fetchProducts();
    } catch (error) {
      set({ error: 'Erreur lors de la mise à jour du produit', loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await deleteProduit(id);
      // Recharger les produits après suppression
      await get().fetchProducts();
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
