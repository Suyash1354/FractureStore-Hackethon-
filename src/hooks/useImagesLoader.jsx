import { useState, useEffect } from 'react';

const useImagesLoader = (imagePaths) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (!imagePaths || imagePaths.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedImages = 0;
    const totalImages = imagePaths.length;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      const imagePromises = imagePaths.map(async (src) => {
        try {
          await loadImage(src);
          loadedImages++;
          setLoadedCount(loadedImages);
          return src;
        } catch (error) {
          console.warn(`Failed to load image: ${src}`);
          loadedImages++;
          setLoadedCount(loadedImages);
          return null;
        }
      });

      await Promise.allSettled(imagePromises);
      
      // Images loaded, remove loading screen immediately
      setImagesLoaded(true);
    };

    loadAllImages();
  }, [imagePaths]);

  return { imagesLoaded, loadedCount, totalImages: imagePaths?.length || 0 };
};

export default useImagesLoader;