import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

const GameSetup = () => {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState('');
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [team1Players, setTeam1Players] = useState(1);
  const [team2Players, setTeam2Players] = useState(1);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-primary-700 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-primary-800 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center text-white mb-12">
            <h2 className="text-5xl font-bold mb-4">حدد معلومات الفرق</h2>
            <p className="text-lg opacity-80">أدخل أسماء الفرق وعدد اللاعبين</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <label className="block text-white/90 mb-2 text-lg">اسم اللعبة</label>
              <input
                type="text"
                className="w-full bg-white/5 border-2 border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:border-white/40 transition-colors outline-none"
                placeholder="أدخل اسم اللعبة"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team sections with enhanced styling */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">الفريق الأول</h3>
                <input
                  type="text"
                  className="w-full bg-white/5 border-2 border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:border-white/40 transition-colors outline-none"
                  placeholder="اسم الفريق"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                />
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-2">
                  <button 
                    onClick={() => setTeam1Players(Math.max(1, team1Players - 1))}
                    className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-6 h-6 text-white" />
                  </button>
                  <span className="text-2xl font-bold text-white">{team1Players}</span>
                  <button 
                    onClick={() => setTeam1Players(team1Players + 1)}
                    className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Similar styling for Team 2 */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">الفريق الثاني</h3>
                <input
                  type="text"
                  className="w-full bg-white/5 border-2 border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:border-white/40 transition-colors outline-none"
                  placeholder="اسم الفريق"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                />
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-2">
                  <button 
                    onClick={() => setTeam2Players(Math.max(1, team2Players - 1))}
                    className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-6 h-6 text-white" />
                  </button>
                  <span className="text-2xl font-bold text-white">{team2Players}</span>
                  <button 
                    onClick={() => setTeam2Players(team2Players + 1)}
                    className="bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/category-select')}
              className="w-full mt-12 bg-white text-primary-700 py-4 rounded-xl text-xl font-bold transition-all transform hover:scale-105 hover:bg-primary-50"
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSetup; 