import React, { useState } from 'react';

const ProductCard = ({ image, previewImage, title, description, btnText, onBuy }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-[420px] sm:h-[500px] bg-white rounded-xl overflow-hidden shadow-lg flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="w-full h-full relative">
        {/* Main Image */}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out rounded-xl ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Preview Image on hover */}
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out rounded-xl ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Overlay Info */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-xl">
        <h2 className="text-sm sm:text-lg font-[OblivionFutureFree]">{title}</h2>
        <p className="text-[10px] sm:text-xs font-[Excon-Regular] mb-2">{description}</p>
        <button
          onClick={onBuy}
          className="bg-white cursor-pointer text-black px-3 py-1 rounded-full text-[10px] sm:text-xs font-[Excon-Regular] w-fit"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
