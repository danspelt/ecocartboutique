import React from 'react';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center">
      <Image
       src={product.image} 
       alt={product.name} 
       className="max-w-xs h-auto" 
       width={200}
       height={200}       
       />
       <h3 className="mt-2 font-bold">{product.name}</h3>
      <p className="mt-1">${product.price}</p>
    </div>
  );
};

export default ProductCard;
