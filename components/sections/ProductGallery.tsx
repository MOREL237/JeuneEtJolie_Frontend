// components/sections/ProductGallery.tsx
'use client';

import React, { useState } from 'react';
import { RotateCw, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  hasVideo?: boolean;
}

export const ProductGallery = ({ images, hasVideo = false }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image */}
      <div className="relative aspect-[3/4] bg-surface-container overflow-hidden rounded-xl group cursor-zoom-in">
        <img
          src={images[selectedImage]}
          alt="Produit"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay buttons */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-3">
          <button className="bg-surface/90 backdrop-blur p-3 rounded-full shadow-lg hover:bg-surface transition-all">
            <RotateCw className="w-5 h-5 text-on-surface" />
          </button>
          <button className="bg-surface/90 backdrop-blur p-3 rounded-full shadow-lg hover:bg-surface transition-all">
            <ZoomIn className="w-5 h-5 text-on-surface" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.slice(0, 3).map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index ? 'border-primary' : 'border-outline-variant hover:border-primary'
            }`}
          >
            <img src={img} alt={`Vue ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
        
        {hasVideo && (
          <button className="aspect-square rounded-lg overflow-hidden border border-outline-variant bg-surface-container flex items-center justify-center hover:border-primary transition-all">
            <span className="material-symbols-outlined text-3xl text-outline">play_circle</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;