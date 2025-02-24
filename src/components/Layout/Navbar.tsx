import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, LogOut } from 'lucide-react';
import { getAuthData, clearAuthData } from '../../services/mutations/auth/storage';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userGames, setUserGames] = useState(0);

  useEffect(() => {
    const checkAuth = () => {
      const { access, first_name } = getAuthData();
      const loggedIn = access !== null;
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        setUserName(first_name || '');
        const games = localStorage.getItem('userGames');
        setUserGames(games ? parseInt(games, 10) : 0);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    clearAuthData();
    window.dispatchEvent(new Event('storage'));
    navigate('/', { replace: true });
    setIsLoggedIn(false);
    setUserName('');
    setUserGames(0);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 bg-opacity-90 backdrop-blur-md border-b border-white/10 shadow-lg py-4">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3 mb-3 md:mb-0">
          <Link to="/" className="flex items-center gap-2">
            <Crown className="h-10 w-10 text-yellow-400" />
            <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              جاوب
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/combined-game-setup" 
            className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
          >
            ابدأ اللعب
          </Link>
          <Link 
            to="/about" 
            className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
          >
            عن اللعبة
          </Link>
          <Link 
            to="/contact" 
            className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
          >
            تواصل معنا
          </Link>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-white">
                  مرحباً، {userName}
                </span>
                <span className="text-xs text-white/70">
                  عدد الألعاب: {userGames}
                </span>
              </div>
              <button
                onClick={() => navigate('/my-games')}
                className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                ألعابي
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                <LogOut className="w-5 h-5" />
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/auth" 
                className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
              >
                تسجيل الدخول
              </Link>
              <Link 
                to="/combined-game-setup" 
                className="bg-white text-indigo-900 hover:bg-gray-200 px-6 py-2 rounded-full transition-colors font-bold text-lg"
              >
                العب
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
