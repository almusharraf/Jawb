import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold mb-6">جاوب</h1>
          <p className="text-xl opacity-90 mb-8">لعبة جماعية تفاعلية تختبر معرفتكم وثقافتكم</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/play')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
            >
              لعبة جديدة
            </button>
            <button 
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all"
            >
              ألعابي
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">ترفيه</h3>
            <p className="opacity-80">استمتع بوقتك مع الأصدقاء</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">متعة</h3>
            <p className="opacity-80">تحدي ومنافسة</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">ذكاء</h3>
            <p className="opacity-80">اختبر معلوماتك</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">تحدي</h3>
            <p className="opacity-80">نافس أصدقائك</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 