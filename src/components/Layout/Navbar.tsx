import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, LogOut } from 'lucide-react';
import { getAuthData, clearAuthData } from '../../services/mutations/auth/storage'; // Import getAuthData and clearAuthData

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userGames, setUserGames] = useState(0);  // Number of games

  useEffect(() => {
    // Function to check if the user is logged in based on localStorage
    const checkAuth = () => {
      const { access, first_name } = getAuthData();
      const loggedIn = access !== null;

      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        setUserName(first_name || '');  // Set user name from localStorage
        // Fetch the user's number of games (assuming it's stored in localStorage)
        const games = localStorage.getItem('userGames');
        setUserGames(games ? parseInt(games, 10) : 0);  // Fetch number of games
      }
    };

    // Initial check on mount
    checkAuth();

    // Listen for storage changes and re-check auth status when it's updated
    window.addEventListener('storage', checkAuth);

    // Cleanup listener when component is unmounted
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    // Clear all user data from localStorage on logout
    clearAuthData();  // Clear auth data from localStorage

    // Force storage event to reflect changes
    window.dispatchEvent(new Event('storage'));

    // Navigate to home
    navigate('/', { replace: true });

    // Manually update state to reflect logout
    setIsLoggedIn(false);
    setUserName('');
    setUserGames(0);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Crown className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              جاوب
            </span>
          </Link>
          
          {isLoggedIn && (
            <div className="flex items-center gap-4 bg-primary-100 px-4 py-1.5 rounded-full">
              <span className="text-sm text-primary-700">عدد الألعاب: {userGames}</span>
            </div>
          )}
        </div>

        {/* User Info and Logout Button */}
        <div className="flex items-center gap-8">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-primary-700">مرحباً، {userName}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  تسجيل الخروج
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/auth" 
                className="text-primary-700 hover:text-primary-800 font-medium transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link 
                to="/game-setup" 
                className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-2 rounded-full transition-colors font-medium"
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
