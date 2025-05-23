import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Camera, RefreshCcw, ZoomIn, ZoomOut, RotateCw, Minus, Plus, PanelTop } from 'lucide-react';
import { useFurnitureData } from '../hooks/useFurnitureData';
import ARViewer from '../components/ar/ARViewer';
import CameraPermissionPrompt from '../components/ar/CameraPermissionPrompt';

const ARViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useFurnitureData();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null);
  const [scale, setScale] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  const product = getProductById(id || '');

  useEffect(() => {
    // Check if WebXR is supported
    if ('xr' in navigator) {
      // @ts-ignore - Types for WebXR might not be available
      navigator.xr?.isSessionSupported('immersive-ar')
        .then(supported => {
          setIsARSupported(supported);
        })
        .catch(() => {
          setIsARSupported(false);
        });
    } else {
      setIsARSupported(false);
    }
  }, []);

  const handlePermissionChange = (granted: boolean) => {
    setHasPermission(granted);
  };

  const increaseScale = () => setScale(prev => Math.min(prev + 0.1, 2));
  const decreaseScale = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const resetScale = () => setScale(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-600 mb-4">Product not found</p>
          <Link 
            to="/catalog"
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative bg-black"
    >
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <Link 
          to={`/product/${product.id}`}
          className="flex items-center text-white bg-black bg-opacity-40 py-2 px-4 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        
        <div className="bg-black bg-opacity-40 py-2 px-4 rounded-full">
          <h1 className="text-white font-medium">AR View: {product.name}</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="h-screen">
        {isARSupported === false && (
          <div className="h-full flex items-center justify-center bg-neutral-900 text-white p-6">
            <div className="text-center max-w-md">
              <Camera className="h-12 w-12 mx-auto mb-4 text-primary-500" />
              <h2 className="text-2xl font-bold mb-4">AR Not Supported</h2>
              <p className="mb-6">
                Your device or browser doesn't support Augmented Reality. Please use a compatible device with the latest browsers.
              </p>
              <Link 
                to={`/product/${product.id}`}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md inline-block"
              >
                Back to Product
              </Link>
            </div>
          </div>
        )}
        
        {isARSupported === true && hasPermission === null && (
          <CameraPermissionPrompt onPermissionChange={handlePermissionChange} />
        )}
        
        {isARSupported === true && hasPermission === false && (
          <div className="h-full flex items-center justify-center bg-neutral-900 text-white p-6">
            <div className="text-center max-w-md">
              <Camera className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold mb-4">Camera Access Required</h2>
              <p className="mb-6">
                AR Furnish needs camera access to show furniture in your space. Please enable camera permissions in your browser settings.
              </p>
              <button 
                onClick={() => setHasPermission(null)}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md inline-block mr-3"
              >
                Try Again
              </button>
              <Link 
                to={`/product/${product.id}`}
                className="bg-white hover:bg-neutral-100 text-neutral-900 font-medium py-3 px-6 rounded-md inline-block"
              >
                Back to Product
              </Link>
            </div>
          </div>
        )}
        
        {isARSupported === true && hasPermission === true && (
          <ARViewer 
            product={product}
            scale={scale}
            isRotating={isRotating}
          />
        )}
      </div>
      
      {/* Controls Overlay */}
      {isARSupported === true && hasPermission === true && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <div className="bg-black bg-opacity-50 rounded-full px-4 py-2 flex items-center gap-4">
            <button 
              onClick={decreaseScale}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
              aria-label="Decrease size"
            >
              <Minus size={20} />
            </button>
            
            <button 
              onClick={resetScale}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
              aria-label="Reset view"
            >
              <RefreshCcw size={20} />
            </button>
            
            <button 
              onClick={increaseScale}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
              aria-label="Increase size"
            >
              <Plus size={20} />
            </button>
            
            <button 
              onClick={() => setIsRotating(!isRotating)}
              className={`p-2 rounded-full transition ${
                isRotating 
                  ? 'bg-primary-600 text-white' 
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
              aria-label="Rotate model"
            >
              <RotateCw size={20} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ARViewPage;