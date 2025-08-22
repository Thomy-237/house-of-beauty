
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, image, href, icon }) => {
  return (
    <Link to={href} className="group block">
      <div className="card-luxury h-full overflow-hidden">
        {/* Image */}
        <div className="relative h-48 bg-cream-100 dark:bg-cream-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Icon */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-luxury-gold">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-section-title text-xl">{title}</h3>
            <ArrowRight className="h-5 w-5 text-luxury-gold group-hover:translate-x-1 transition-transform" />
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          <div className="pt-2">
            <span className="inline-flex items-center text-luxury-gold font-medium text-sm group-hover:underline">
              Découvrir la gamme
              <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
