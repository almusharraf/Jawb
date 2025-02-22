import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-primary-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                جاوب
              </span>
            </Link>
            <div className="flex items-center gap-2 bg-primary-50 px-4 py-1.5 rounded-full">
              <span className="text-sm text-primary-700">الألعاب المتبقية</span>
              <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              to="/play" 
              className="text-primary-700 hover:text-primary-800 font-medium transition-colors"
            >
              العب
            </Link>
            <Link 
              to="/about" 
              className="text-primary-700 hover:text-primary-800 font-medium transition-colors"
            >
              قصتنا
            </Link>
            <Link 
              to="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full transition-colors font-medium"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 