import React from 'react';
import { productCategories } from '../../data/productCategories';

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  clearFilters: () => void;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
  onClose
}) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPriceRange([priceRange[0], value]);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-soft">
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-3">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="min-price" className="block text-sm text-neutral-600 mb-1">
              Min Price (₹)
            </label>
            <input
              type="number"
              id="min-price"
              value={priceRange[0]}
              onChange={handleMinPriceChange}
              min="0"
              max={priceRange[1]}
              className="w-full p-2 border border-neutral-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-sm text-neutral-600 mb-1">
              Max Price (₹)
            </label>
            <input
              type="number"
              id="max-price"
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              min={priceRange[0]}
              className="w-full p-2 border border-neutral-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="pt-1">
            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500"
                style={{ 
                  width: `${((priceRange[1] - priceRange[0]) / 100000) * 100}%`,
                  marginLeft: `${(priceRange[0] / 100000) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-lg mb-3">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="category-all"
              type="radio"
              checked={selectedCategory === null}
              onChange={() => setSelectedCategory(null)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
            />
            <label htmlFor="category-all" className="ml-2 text-neutral-700">
              All Categories
            </label>
          </div>
          
          {productCategories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                id={`category-${category.id}`}
                type="radio"
                checked={selectedCategory === category.id}
                onChange={() => setSelectedCategory(category.id)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
              />
              <label htmlFor={`category-${category.id}`} className="ml-2 text-neutral-700">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={clearFilters}
          className="w-full py-2 px-4 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          Clear All Filters
        </button>
        
        {onClose && (
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Apply Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;