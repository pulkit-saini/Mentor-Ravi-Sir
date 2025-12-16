import { useEffect } from 'react';

/**
 * Preload images for better performance
 */
export const useImagePreload = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);
};

/**
 * Preload critical hero images
 */
export const useHeroImagePreload = () => {
  useImagePreload([
    '/src/assets/hero-background.jpg',
    '/src/assets/hero-image.jpg',
  ]);
};
