import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCategories } from '../services/queries/categoryQueries';
import { getAuthData } from '../services/mutations/auth/storage';

const CategorySelect = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch categories using the useCategories hook
  const { data: categories, isLoading, isError } = useCategories();

  // Check if the user is logged in
  useEffect(() => {
    const { access } = getAuthData();
    if (!access) {
      // If not logged in, redirect to login page
      navigate('/login', {
        state: { from: '/category-select' },
        replace: true,
      });
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories. Please try again later.</div>;
  }

  const handleCategorySelect = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(c => c !== id));
    } else if (selectedCategories.length < 6) {
      setSelectedCategories([...selectedCategories, id]);
      if (selectedCategories.length === 5) {
        toast.success('تم اختيار جميع الفئات! 🎮');
      }
    } else {
      toast.error('لا يمكن اختيار أكثر من 6 فئات');
    }
  };

  const handleStartGame = () => {
    navigate('/auth', {
      state: {
        redirectTo: '/game',
        gameData: {
          selectedCategories,
          teams: state?.teams || [],
          categories: categories.filter(category =>
            selectedCategories.includes(category.id)
          ),
        },
      },
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-primary-700 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-primary-800 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center text-white mb-12">
          <h2 className="text-5xl font-bold mb-4">اختر الفئات</h2>
          <p className="text-lg opacity-80">
            ٣ فئات لفريقك و ٣ فئات للفريق المنافس
          </p>
          <div className="mt-4 text-lg">
            <span className="text-white font-bold">
              {selectedCategories.length}
            </span>
            <span className="mx-2 opacity-60">/</span>
            <span className="opacity-60">6</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`
                relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-white 
                transition-all transform hover:scale-105 hover:bg-white/10
                ${selectedCategories.includes(category.id) ? 'ring-2 ring-white' : ''}
                overflow-hidden group
              `}
            >
              {/* Background image overlay */}
              {category.image && (
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
              )}
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
              <div className="relative z-10">
                {/* If you have an icon property, it will display here */}
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="opacity-80 text-sm">{category.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleStartGame}
            disabled={selectedCategories.length !== 6}
            className={`
              px-12 py-4 rounded-xl text-xl font-bold transition-all transform
              ${
                selectedCategories.length === 6
                  ? 'bg-white text-primary-700 hover:bg-primary-50 hover:scale-105'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }
            `}
          >
            ابدأ اللعب
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;
