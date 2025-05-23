import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-neutral-50 flex items-center justify-center p-4"
    >
      <div className="max-w-md text-center">
        <h1 className="font-serif text-9xl font-bold text-primary-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
        <p className="text-neutral-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          <Link
            to="/catalog"
            className="bg-neutral-800 hover:bg-neutral-900 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
          >
            <Search className="mr-2 h-5 w-5" />
            Browse Catalog
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;