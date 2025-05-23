import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Sofa, RotateCcw, PanelTop, ChevronRight } from 'lucide-react';

import Banner from '../components/ui/Banner';
import FeaturedProducts from '../components/products/FeaturedProducts';
import ARExplanation from '../components/sections/ARExplanation';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="container mx-auto px-4 z-10 text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">Reimagine Your Space</h1>
            <p className="text-xl mb-8">
              Experience furniture in your home before you buy with AR technology
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/catalog" 
                className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center"
              >
                Explore Catalog <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/ar-demo" 
                className="bg-white hover:bg-neutral-100 text-primary-900 font-medium py-3 px-6 rounded-md transition duration-300 flex items-center"
              >
                Try AR Demo <Camera className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Experience the Future of Shopping</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              AR Furnish brings your space to life with innovative augmented reality technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-soft"
            >
              <div className="bg-primary-100 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                <Camera className="h-7 w-7 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">See It In Your Space</h3>
              <p className="text-neutral-600">
                Use your device's camera to place furniture in your room and see exactly how it fits
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-soft"
            >
              <div className="bg-primary-100 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                <RotateCcw className="h-7 w-7 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visualize in 3D</h3>
              <p className="text-neutral-600">
                Interact with furniture in 3D, rotate, reposition, and view from any angle
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-soft"
            >
              <div className="bg-primary-100 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                <Sofa className="h-7 w-7 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Extensive Collection</h3>
              <p className="text-neutral-600">
                Browse through hundreds of furniture items with accurate dimensions and prices
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <ARExplanation />

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Popular Furniture</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Discover our most-loved pieces, ready to transform your space
            </p>
          </div>
          
          <FeaturedProducts />
          
          <div className="text-center mt-12">
            <Link 
              to="/catalog" 
              className="inline-block bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-6 rounded-md transition duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Banner */}
      <Banner />
    </motion.div>
  );
};

export default HomePage;