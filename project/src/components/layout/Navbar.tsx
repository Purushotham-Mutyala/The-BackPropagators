import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Search, Camera } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Living Room', path: '/catalog?category=living-room' },
    { name: 'Bedroom', path: '/catalog?category=bedroom' },
    { name: 'Dining', path: '/catalog?category=dining' },
    { name: 'Office', path: '/catalog?category=office' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Camera className={`h-8 w-8 ${isScrolled ? 'text-primary-700' : 'text-primary-50'}`} />
            <span className={`font-serif text-xl font-bold ml-2 ${isScrolled ? 'text-neutral-900' : 'text-white'}`}>
              AR Furnish
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? location.pathname === link.path
                      ? 'text-primary-700'
                      : 'text-neutral-700 hover:text-primary-700'
                    : 'text-white hover:text-primary-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-full ${
                isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-full ${
                isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <User className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-full ${
                isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-full ${
                isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-neutral-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`py-2 px-4 rounded-md font-medium ${
                      location.pathname === link.path
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;