
import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useCart';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Produit ajouté au panier !', {
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  return (
    <div className="card-product group">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-cream-100 dark:bg-cream-200 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="secondary"
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-natural-green text-white text-xs px-2 py-1 rounded-full font-medium capitalize">
            {product.category.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-luxury-gold font-bold text-xl">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            className="btn-luxury text-sm px-4 py-2"
            onClick={handleAddToCart}
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
