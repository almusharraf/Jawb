import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Sparkles, Trophy, Brain, Target, Crown } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Game Title */}
          <div className="text-center mb-16">
            <Crown className="h-24 w-24 mx-auto mb-8 text-purple-400" />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent mb-6">
              جاوب
            </h1>
            <p className="text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              لعبة ثقافية تنافسية عن المملكة العربية السعودية
            </p>
            <button 
              onClick={() => navigate('/game-setup')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-12 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-transform"
            >
              ابدأ اللعب
            </button>
          </div>

          {/* Game Rules */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">قوانين اللعبة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">نظام اللعب</h3>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500/20 p-2 rounded-lg">
                      <Users className="w-5 h-5 text-purple-400" />
                    </span>
                    <span>فريقان يتنافسان في الإجابة على الأسئلة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500/20 p-2 rounded-lg">
                      <Target className="w-5 h-5 text-purple-400" />
                    </span>
                    <span>كل فريق يختار 3 فئات من الأسئلة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500/20 p-2 rounded-lg">
                      <Brain className="w-5 h-5 text-purple-400" />
                    </span>
                    <span>الأسئلة متدرجة الصعوبة: 100، 300، 500 نقطة</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">نظام النقاط</h3>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500/20 p-2 rounded-lg">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </span>
                    <span>إجابة صحيحة: +100/300/500 نقطة حسب الصعوبة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500/20 p-2 rounded-lg">
                      <Trophy className="w-5 h-5 text-purple-400" />
                    </span>
                    <span>إجابة سريعة: +20% نقاط إضافية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-purple-500/20 p-2 rounded-lg">
                      <Target className="w-5 h-5 text-purple-400" />
                    </span>
                    <span>إجابة خاطئة: -50% من نقاط السؤال</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Play */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">خطوات اللعب</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'تشكيل الفرق',
                    desc: 'قم بتشكيل فريقين وتسمية كل فريق'
                  },
                  {
                    step: 2,
                    title: 'اختيار الفئات',
                    desc: 'كل فريق يختار 3 فئات من الأسئلة المتاحة'
                  },
                  {
                    step: 3,
                    title: 'اختيار الأسئلة',
                    desc: 'اختر مستوى صعوبة السؤال (100/300/500 نقطة)'
                  },
                  {
                    step: 4,
                    title: 'الإجابة والنقاط',
                    desc: 'أجب بسرعة للحصول على نقاط إضافية'
                  }
                ].map((item) => (
                  <div 
                    key={item.step}
                    className="flex items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/10"
                  >
                    <span className="text-4xl font-bold text-purple-400">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Start Game CTA */}
          <div className="text-center">
            <button 
              onClick={() => navigate('/game-setup')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-16 py-6 rounded-2xl text-xl font-bold hover:scale-105 transition-transform"
            >
              ابدأ اللعب الآن
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-white/10 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Game Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Crown className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold text-white">جاوب</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                لعبة ثقافية تنافسية تختبر معرفتك بالمملكة العربية السعودية. تم تطوير اللعبة لتعزيز المعرفة بتاريخ وثقافة المملكة بطريقة تفاعلية وممتعة.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/game-setup')}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ابدأ اللعب
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/about')}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    عن اللعبة
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    تواصل معنا
                  </button>
                </li>
              </ul>
            </div>

            {/* Game Categories */}
            <div>
              <h3 className="text-white font-bold mb-4">فئات الأسئلة</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'الأكلات الشعبية',
                  'المعالم والمدن',
                  'التاريخ السعودي',
                  'الثقافة السعودية',
                  'الرياضة',
                  'الفنون'
                ].map((category) => (
                  <span 
                    key={category}
                    className="bg-white/5 text-white/60 text-sm px-3 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/40 text-sm">
              جميع الحقوق محفوظة © {new Date().getFullYear()} جاوب
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 