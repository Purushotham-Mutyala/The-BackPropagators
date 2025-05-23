import { useState, useEffect } from 'react';
import { FurnitureProduct } from '../types/furniture';
import { furnitureData } from '../data/furnitureData';

export const useFurnitureData = () => {
  const [products, setProducts] = useState<FurnitureProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setProducts(furnitureData);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductById = (id: string): FurnitureProduct | undefined => {
    return products.find(product => product.id === id);
  };

  const getFeaturedProducts = (limit: number = 6): FurnitureProduct[] => {
    return products
      .filter(product => product.isFeatured)
      .slice(0, limit);
  };

  const getSimilarProducts = (productId: string, limit: number = 4): FurnitureProduct[] => {
    const currentProduct = getProductById(productId);
    
    if (!currentProduct) return [];
    
    return products
      .filter(product => 
        product.id !== productId && 
        product.category === currentProduct.category
      )
      .slice(0, limit);
  };

  const filterProductsByCategory = (category: string | null): FurnitureProduct[] => {
    if (!category) return products;
    return products.filter(product => product.category === category);
  };

  const filterProductsByPriceRange = (minPrice: number, maxPrice: number): FurnitureProduct[] => {
    return products.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  };

  return {
    products,
    isLoading,
    error,
    getProductById,
    getFeaturedProducts,
    getSimilarProducts,
    filterProductsByCategory,
    filterProductsByPriceRange
  };
};