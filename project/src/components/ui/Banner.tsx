import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Banner: React.FC = () => {
  return (
    <section className="bg-primary-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0 md:max-w-md"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Experience the Future of Furniture Shopping</h2>
            <p className="mb-6">Join thousands of satisfied customers who have transformed their homes with AR Furnish</p>
            <Link 
              to="/catalog" 
              className="inline-flex items-center bg-white text-primary-900 hover:bg-neutral-100 font-medium py-3 px-6 rounded-md transition duration-300"
            >
              Explore Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-800 p-5 rounded-lg">
                <p className="font-serif text-2xl font-bold mb-1">98%</p>
                <p className="text-primary-100">Satisfied Customers</p>
              </div>
              <div className="bg-primary-800 p-5 rounded-lg">
                <p className="font-serif text-2xl font-bold mb-1">500+</p>
                <p className="text-primary-100">Furniture Items</p>
              </div>
              <div className="bg-primary-800 p-5 rounded-lg">
                <p className="font-serif text-2xl font-bold mb-1">30 Days</p>
                <p className="text-primary-100">Return Policy</p>
              </div>
              <div className="bg-primary-800 p-5 rounded-lg">
                <p className="font-serif text-2xl font-bold mb-1">4.8/5</p>
                <p className="text-primary-100">Customer Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;