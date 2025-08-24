
import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const FeminineHeaderBand = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border-b border-pink-200/50">
      <div className="container-custom py-3">
        <div className="flex items-center justify-center gap-2 text-pink-600">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-medium">
            ✨ Découvrez notre collection exclusive de beauté naturelle ✨
          </span>
          <Heart className="h-4 w-4 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default FeminineHeaderBand;
