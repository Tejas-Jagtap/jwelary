import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="text-xl font-bold">Jwelary</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted destination for exquisite jewelry. We specialize in creating timeless pieces that celebrate life's precious moments.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=rings" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/products?category=necklaces" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/products?category=earrings" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/products?category=bracelets" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-yellow-400" />
                <span className="text-gray-300 text-sm">123 Jewelry Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-yellow-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-yellow-400" />
                <span className="text-gray-300 text-sm">info@jwelary.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Jwelary. All rights reserved. Made with ❤️ for jewelry lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
