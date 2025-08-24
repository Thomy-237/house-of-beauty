
import React, { useState, useCallback } from 'react';
import { siteConfig } from '@/config/site.config';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  showLoader?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallback = siteConfig.assets.fallbackImage,
  alt = '',
  className = '',
  showLoader = true,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  }, [imgSrc, fallback]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (hasError) {
    return (
      <div className={`bg-cream-100 dark:bg-cream-200 flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && showLoader && (
        <div className={`absolute inset-0 bg-cream-100 dark:bg-cream-200 animate-pulse ${className}`} />
      )}
      <img
        {...props}
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
};

export default ImageWithFallback;
