import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check auth status on mount and storage changes
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    // Force storage event
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to home
    navigate('/', { replace: true });
  };

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
            {isLoggedIn && (
              <div className="flex items-center gap-2 bg-primary-50 px-4 py-1.5 rounded-full">
                <span className="text-sm text-primary-700">النقاط: 0</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                تسجيل الخروج
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-primary-700 hover:text-primary-800 font-medium transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link 
                  to="/game-setup" 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full transition-colors font-medium"
                >
                  العب
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 