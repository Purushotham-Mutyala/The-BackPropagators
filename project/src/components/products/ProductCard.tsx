import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, ShoppingCart } from 'lucide-react';
import { FurnitureProduct } from '../../types/furniture';

interface ProductCardProps {
  product: FurnitureProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-soft overflow-hidden group"
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* AR Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            to={`/ar-view/${product.id}`}
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            title="View in AR"
          >
            <Camera className="h-5 w-5" />
          </Link>
        </div>
        
        {/* Sale Tag */}
        {product.oldPrice && (
          <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
            SALE
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-medium text-neutral-900 hover:text-primary-700 transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`h-4 w-4 ${i < product.rating ? 'text-gold-dark' : 'text-neutral-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-neutral-500 text-sm mb-3">{product.category}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-lg text-neutral-900">₹{product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm line-through text-neutral-400">
                ₹{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button 
            className="p-2 rounded-full bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-700 transition-colors"
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;