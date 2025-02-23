// src/pages/CombinedGameSetup.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAuthData } from '../services/mutations/auth/storage';
import { useCategories } from '../services/queries/categoryQueries';
import { useStartGameMutation, StartGamePayload } from '../services/mutations/game/game';

const CombinedGameSetup = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Step 1: Teams Setup, Step 2: Category Selection
  const [step, setStep] = useState(1);

  // Teams state: must have 2 to 4 teams.
  const [teams, setTeams] = useState<string[]>(['', '']);

  // New state for game name
  const [gameName, setGameName] = useState<string>('');

  // For category selection
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [authData, setAuthData] = useState<{
    access: string | null;
    refresh: string | null;
    first_name: string | null;
    email: string | null;
    userGames?: string | null;
  } | null>(null);

  // Load auth data on mount.
  useEffect(() => {
    const storedAuth = getAuthData();
    setAuthData(storedAuth);
  }, []);

  // We no longer auto-redirect on mount so that users can fill in info.
  // Instead, we check for token only when "ابدأ اللعب" is clicked.

  const { data: categories, isLoading, isError } = useCategories();
  const { mutate: startGameMutation } = useStartGameMutation();

  // TEAM SETUP FUNCTIONS
  const addTeam = () => {
    if (teams.length < 4) {
      setTeams([...teams, '']);
    }
  };

  const updateTeam = (index: number, value: string) => {
    const newTeams = [...teams];
    newTeams[index] = value;
    setTeams(newTeams);
  };

  const handleTeamsContinue = () => {
    // Validate team names and game name
    if (!teams.every((t) => t.trim()) || teams.length < 2) {
      toast.error('يرجى إدخال أسماء جميع المجموعات (على الأقل مجموعتين).');
      return;
    }
    if (!gameName.trim()) {
      toast.error('يرجى إدخال اسم اللعبة.');
      return;
    }
    setStep(2);
  };

  // CATEGORY SELECTION FUNCTIONS
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
    const payload: StartGamePayload = {
      categories: selectedCategories.map(id => parseInt(id, 10)),
      teams: teams.filter(t => t.trim()),
      name: gameName, // assuming your backend now accepts a "name" field.
    };

    if (!authData?.access) {
      // If not logged in, redirect to login preserving the current state.
      navigate('/auth', {
        state: {
          redirectTo: '/game',
          gameData: {
            name: gameName,
            selectedCategories,
            teams: teams.filter(t => t.trim()),
            categories: categories.filter(category =>
              selectedCategories.includes(category.id)
            ),
          },
        },
        replace: true,
      });
    } else {
      startGameMutation(payload, {
        onSuccess: (data) => {
          // Decrement the number of games left in localStorage.
          let currentGames = localStorage.getItem('userGames');
          if (currentGames) {
            const newGames = parseInt(currentGames, 10) - 1;
            localStorage.setItem('userGames', newGames.toString());
          }
          // Dispatch storage event so that Navbar picks up the change.
          window.dispatchEvent(new Event('storage'));
          setAuthData((prev) =>
            prev ? { ...prev, userGames: localStorage.getItem('userGames') } : prev
          );
          navigate('/game', { state: { gameData: data } });
        },
        onError: (error: any) => {
          console.error("Start game error:", error);
          toast.error('حدث خطأ أثناء بدء اللعبة.');
        },
      });
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
  }
  if (isError) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Error loading categories. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {step === 1 && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-center mb-6">إعداد المجموعات</h2>
            {/* Game Name Field */}
            <div className="mb-6">
              <label className="block text-center text-lg font-semibold mb-2" htmlFor="gameName">
                اسم اللعبة
              </label>
              <input
                id="gameName"
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-white/40 outline-none border border-white/10 focus:border-purple-400 transition-colors"
                placeholder="أدخل اسم اللعبة"
              />
            </div>
            {/* Teams Setup */}
            <div className="space-y-4">
              {teams.map((team, index) => (
                <div key={index} className="flex items-center bg-white/5 rounded-xl p-3 border border-white/10 hover:border-purple-400/30 transition-all">
                  <span className="text-white/60 mr-3">#{index + 1}</span>
                  <input
                    type="text"
                    className="w-full bg-transparent text-white placeholder-white/40 outline-none"
                    placeholder={`اسم المجموعة ${index + 1}`}
                    value={team}
                    onChange={(e) => updateTeam(index, e.target.value)}
                  />
                  {teams.length > 2 && (
                    <button 
                      onClick={() => setTeams(teams.filter((_, i) => i !== index))}
                      className="text-white/40 hover:text-red-400 ml-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {teams.length < 4 && (
              <button
                onClick={addTeam}
                className="w-full mt-4 flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Plus className="w-5 h-5" />
                إضافة مجموعة
              </button>
            )}
            <div className="mt-8 border-t border-white/10 pt-6">
              <button
                onClick={handleTeamsContinue}
                disabled={!teams.every(t => t.trim()) || teams.length < 2 || !gameName.trim()}
                className="w-full flex items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>التالي</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-5xl font-bold text-center mb-4">اختر الفئات</h2>
            <p className="text-center mb-6">٣ فئات لفريقك و ٣ فئات للفريق المنافس</p>
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
                  {category.image && (
                    <div className="absolute inset-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover opacity-50"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                  <div className="relative z-10">
                    {/* Fallback for icon if not provided */}
                    <div className="text-4xl mb-4">{category.icon || '📝'}</div>
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
        )}
      </div>
    </div>
  );
};

export default CombinedGameSetup;
