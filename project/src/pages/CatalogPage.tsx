import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

import { productCategories } from '../data/productCategories';
import ProductCard from '../components/products/ProductCard';
import { useFurnitureData } from '../hooks/useFurnitureData';
import FilterSidebar from '../components/ui/FilterSidebar';

const CatalogPage: React.FC = () => {
  const { products, isLoading, error } = useFurnitureData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setPriceRange([0, 100000]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-neutral-50"
    >
      {/* Header */}
      <div className="bg-wood-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Furniture Collection
          </h1>
          <p className="text-neutral-100 text-lg max-w-2xl">
            Browse our extensive catalog of premium furniture. Use AR to visualize any piece in your space.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filter Button (Mobile) */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden flex items-center gap-2 bg-white border border-neutral-200 py-3 px-4 rounded-md"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>

          {/* Category Pills (Desktop) */}
          <div className="hidden md:flex items-center gap-3 overflow-x-auto py-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              All
            </button>
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < 100000) && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-neutral-500">Active filters:</span>
            {searchQuery && (
              <span className="bg-neutral-100 text-neutral-700 text-sm py-1 px-3 rounded-full flex items-center gap-1">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="bg-neutral-100 text-neutral-700 text-sm py-1 px-3 rounded-full flex items-center gap-1">
                {productCategories.find(c => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory(null)}>
                  <X size={14} />
                </button>
              </span>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 100000) && (
              <span className="bg-neutral-100 text-neutral-700 text-sm py-1 px-3 rounded-full flex items-center gap-1">
                ₹{priceRange[0]} - ₹{priceRange[1]}
                <button onClick={() => setPriceRange([0, 100000])}>
                  <X size={14} />
                </button>
              </span>
            )}
            <button 
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Products Grid and Sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar (Desktop) */}
          <div className="hidden md:block w-64 shrink-0">
            <FilterSidebar 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              clearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Error loading products. Please try again later.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-neutral-600">No products match your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-primary-600 hover:text-primary-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <FilterSidebar 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              clearFilters={clearFilters}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CatalogPage;