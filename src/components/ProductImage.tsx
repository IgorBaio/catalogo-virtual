import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  width ,
  height ,
}) => {
  return (
    <div
      className="rounded-2xl shadow-md overflow-hidden border border-gray-200 bg-white"
      style={{ width, height }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default ProductImage;
