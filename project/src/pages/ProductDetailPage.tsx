import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCw, Camera, ShoppingCart, Heart, Share2, ArrowRight } from 'lucide-react';
import { useFurnitureData } from '../hooks/useFurnitureData';
import Model3DViewer from '../components/ar/Model3DViewer';
import ProductSpecifications from '../components/products/ProductSpecifications';
import SimilarProducts from '../components/products/SimilarProducts';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getSimilarProducts } = useFurnitureData();
  const [isRotating, setIsRotating] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specifications' | 'reviews'>('details');

  const product = getProductById(id || '');
  const similarProducts = getSimilarProducts(id || '', 4);

  useEffect(() => {
    if (!product) {
      navigate('/catalog');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-neutral-50"
    >
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/catalog" className="flex items-center text-neutral-600 hover:text-primary-700">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Catalog
        </Link>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Product Images & 3D Model */}
            <div className="p-6 lg:p-8">
              <div className="bg-neutral-100 rounded-lg h-[400px] mb-6 relative overflow-hidden">
                {product.modelUrl ? (
                  <Model3DViewer url={product.modelUrl} isRotating={isRotating} />
                ) : (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                )}
                
                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={() => setIsRotating(!isRotating)}
                    className={`p-2 rounded-full ${isRotating ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'} shadow-md`}
                    title="Rotate model"
                  >
                    <RotateCw size={20} />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-neutral-100 rounded-md h-20 cursor-pointer border-2 border-primary-500">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                {product.galleryImages?.map((img, index) => (
                  <div key={index} className="bg-neutral-100 rounded-md h-20 cursor-pointer hover:border-2 hover:border-primary-300">
                    <img 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="p-6 lg:p-8">
              <div className="mb-6">
                <h1 className="font-serif text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-neutral-600 mb-4">{product.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-5 w-5 ${i < product.rating ? 'text-gold-dark' : 'text-neutral-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-neutral-600 text-sm">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-neutral-900">₹{product.price.toLocaleString()}</span>
                  {product.oldPrice && (
                    <span className="ml-2 text-lg line-through text-neutral-400">
                      ₹{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="ml-2 bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                      {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-neutral-700 mb-2">Available Colors</h3>
                  <div className="flex gap-2">
                    {product.colors?.map((color, index) => (
                      <button
                        key={index}
                        className={`h-8 w-8 rounded-full border-2 ${index === 0 ? 'border-primary-500' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                        title={`Color option ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-neutral-700 mb-2">Dimensions</h3>
                  <p className="text-neutral-600">
                    W: {product.dimensions?.width}cm × 
                    D: {product.dimensions?.depth}cm × 
                    H: {product.dimensions?.height}cm
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    to={`/ar-view/${product.id}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    View in Your Space
                  </Link>
                  <button className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </button>
                </div>

                <div className="flex gap-4">
                  <button className="text-neutral-600 hover:text-primary-700 flex items-center">
                    <Heart className="mr-1 h-5 w-5" />
                    Save
                  </button>
                  <button className="text-neutral-600 hover:text-primary-700 flex items-center">
                    <Share2 className="mr-1 h-5 w-5" />
                    Share
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-t border-neutral-200 pt-6">
                <div className="flex border-b border-neutral-200">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-3 px-4 font-medium text-sm ${
                      activeTab === 'details'
                        ? 'text-primary-700 border-b-2 border-primary-700'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('specifications')}
                    className={`pb-3 px-4 font-medium text-sm ${
                      activeTab === 'specifications'
                        ? 'text-primary-700 border-b-2 border-primary-700'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 px-4 font-medium text-sm ${
                      activeTab === 'reviews'
                        ? 'text-primary-700 border-b-2 border-primary-700'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Reviews
                  </button>
                </div>

                <div className="py-4">
                  {activeTab === 'details' && (
                    <div>
                      <p className="text-neutral-700 mb-4">
                        {product.fullDescription || product.description}
                      </p>
                      <ul className="list-disc pl-5 text-neutral-700 space-y-2">
                        {product.features?.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'specifications' && (
                    <ProductSpecifications product={product} />
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div className="text-center py-8">
                      <p className="text-neutral-600">Reviews will be available soon.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-2xl font-bold">Similar Products</h2>
          <Link to="/catalog" className="text-primary-600 hover:text-primary-800 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <SimilarProducts products={similarProducts} />
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;