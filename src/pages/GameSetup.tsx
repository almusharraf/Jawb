import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, ChevronRight } from 'lucide-react';
import { getAuthData } from '../services/mutations/auth/storage';  // Import getAuthData

const GameSetup = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(['', '']);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Debug: Log the current login state to console
    const { access } = getAuthData();
    console.log("Logged in:", access);  // Add this line to log and check

    if (!access) {
      // If not logged in, redirect to login page
      navigate('/auth', { 
        state: { from: '/game-setup' },
        replace: true
      });
    }
  }, [navigate]);  // Adding `navigate` as a dependency to avoid React warnings

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

  const handleContinue = () => {
    // Debug: Log the current login state to console
    const { access } = getAuthData();
    console.log("Access token on continue:", access);  // Add this line to check

    // Check if user is logged in before proceeding
    if (!access) {
      navigate('/auth', { replace: true });
      return; // Don't continue if not logged in
    }
    
    // Proceed to the category selection page
    navigate('/category-select', { 
      state: { 
        teams: teams.filter(t => t.trim()) 
      } 
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`w-3 h-3 rounded-full ${currentStep === step ? 'bg-purple-400' : 'bg-white/20'}`} />
          ))}
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">إعداد المجموعات</h2>
          
          <div className="space-y-4">
            {teams.map((team, index) => (
              <div key={index} className="group flex items-center bg-white/5 rounded-xl p-3 border border-white/10 hover:border-purple-400/30 transition-all">
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
              onClick={handleContinue}
              disabled={!teams.every(t => t.trim()) || teams.length < 2}
              className="w-full flex items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>التالي</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Mode Cards - Remove individual play */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="bg-gradient-to-br from-white/5 to-white/2 p-4 rounded-xl border border-white/10 hover:border-purple-400/30 transition-all cursor-pointer">
            <Users className="h-6 w-6 text-purple-400 mb-2" />
            <h3 className="text-white font-medium mb-1">المجموعات</h3>
            <p className="text-white/60 text-sm">٢-٤ فرق تنافسية</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
