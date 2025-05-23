import React from 'react';
import { Link } from 'react-router-dom';
import { useFurnitureData } from '../../hooks/useFurnitureData';
import ProductCard from './ProductCard';

const FeaturedProducts: React.FC = () => {
  const { getFeaturedProducts } = useFurnitureData();
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;