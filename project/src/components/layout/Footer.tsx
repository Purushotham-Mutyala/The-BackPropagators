import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Facebook, Instagram, Twitter, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Camera className="h-8 w-8 text-primary-500" />
              <span className="font-serif text-xl font-bold ml-2">AR Furnish</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Experience furniture in your space before you buy with our cutting-edge AR technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/ar-how-it-works" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  How AR Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog?category=living-room" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Living Room
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=bedroom" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Bedroom
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=dining" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Dining Room
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=office" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Home Office
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=outdoor" className="text-neutral-400 hover:text-primary-500 transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Outdoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-neutral-400 flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary-500" />
                <span>123 Furniture Lane, Mumbai, Maharashtra, 400001, India</span>
              </li>
              <li className="text-neutral-400 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="text-neutral-400 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-500" />
                <a href="mailto:info@arfurnish.com" className="hover:text-primary-500 transition-colors">
                  info@arfurnish.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-neutral-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-1">Subscribe to Our Newsletter</h3>
              <p className="text-neutral-400">Stay updated with our latest products and offers</p>
            </div>
            <div className="w-full md:w-96">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-l-md focus:outline-none bg-neutral-800 text-white"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 rounded-r-md transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-neutral-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm">&copy; 2025 AR Furnish. All rights reserved.</p>
            <div className="mt-2 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li>
                  <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;