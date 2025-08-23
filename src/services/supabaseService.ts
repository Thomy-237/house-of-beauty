
import { supabase } from "@/integrations/supabase/client";

// -------- PRODUITS --------
export const addProduit = async (produit: any) => {
  const { data, error } = await supabase
    .from('products')
    .insert([produit]);
  if (error) {
    console.error('Erreur création produit:', error);
    throw error;
  }
  return data;
};

export const getProduits = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(name)
    `)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Erreur récupération produits:', error);
    throw error;
  }
  return data;
};

export const updateProduit = async (id: string, updatedFields: any) => {
  const { data, error } = await supabase
    .from('products')
    .update(updatedFields)
    .eq('id', id);
  if (error) {
    console.error('Erreur mise à jour produit:', error);
    throw error;
  }
  return data;
};

export const deleteProduit = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('Erreur suppression produit:', error);
    throw error;
  }
  return data;
};

// -------- CATÉGORIES --------
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  if (error) {
    console.error('Erreur récupération catégories:', error);
    throw error;
  }
  return data;
};

export const addCategory = async (category: any) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([category]);
  if (error) {
    console.error('Erreur création catégorie:', error);
    throw error;
  }
  return data;
};

// -------- TÉMOIGNAGES --------
export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Erreur récupération témoignages:', error);
    throw error;
  }
  return data;
};

export const addTestimonial = async (testimonial: any) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial]);
  if (error) {
    console.error('Erreur ajout témoignage:', error);
    throw error;
  }
  return data;
};

// -------- VIDÉOS --------
export const getVideos = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Erreur récupération vidéos:', error);
    throw error;
  }
  return data;
};
