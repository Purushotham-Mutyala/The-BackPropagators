import React from 'react';
import { FurnitureProduct } from '../../types/furniture';
import ProductCard from './ProductCard';

interface SimilarProductsProps {
  products: FurnitureProduct[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SimilarProducts;