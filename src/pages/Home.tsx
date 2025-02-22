import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Zap, Clock, Trophy, Sparkles, Users } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16 animate-float">
            <Crown className="h-24 w-24 mx-auto mb-8 text-purple-400" />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent mb-6">
              جاوب
            </h1>
            <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              منصة التحديات الثقافية الذكية - اختبر معرفتك في المملكة العربية السعودية
            </p>
            <button 
              onClick={() => navigate('/game-setup')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-purple-500/20"
            >
              ابدأ التحدي الآن ⚡
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-gradient-to-br from-white/5 to-white/2 p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
              <Zap className="h-12 w-12 mb-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white mb-4">تحدي سريع</h3>
              <p className="text-white/80 leading-relaxed">
                جولة سريعة 5 دقائق مع أسئلة عشوائية من مختلف الفئات
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/2 p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
              <Trophy className="h-12 w-12 mb-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white mb-4">بطولات أسبوعية</h3>
              <p className="text-white/80 leading-relaxed">
                تنافس مع اللاعبين عبر المملكة وتصدر القائمة الشرفية
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/2 p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
              <Sparkles className="h-12 w-12 mb-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white mb-4">مزايا حصرية</h3>
              <p className="text-white/80 leading-relaxed">
                مكافآت خاصة للفائزين وخصومات من شركائنا
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold text-white mb-16 text-center">كيف تعمل المنصة؟</h2>
            <div className="flex flex-col gap-24">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-6 rounded-2xl w-max">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                      01
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">اختر نمط اللعبة</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    اختر بين التحدي الفردي، المنافسة الجماعية، أو البطولة الأسبوعية
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 order-2 md:order-1">
                  <h3 className="text-3xl font-bold text-white mb-4">حدد الفئات</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    اختر من بين 50+ فئة مختلفة تغطي جميع جوانب الثقافة السعودية
                  </p>
                </div>
                <div className="flex-1 order-1 md:order-2 text-right">
                  <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-6 rounded-2xl w-max ml-auto">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                      02
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-6 rounded-2xl w-max">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                      03
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">ابدأ التحدي</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    اجب عن الأسئلة بسرعة وكسب النقاط لتتصدر القائمة
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-purple-500/30 to-blue-500/30 p-12 rounded-3xl backdrop-blur-2xl border border-white/10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">جاهز للإنضمام؟</h2>
              <p className="text-white/80 text-xl mb-8">
                سجل الآن واكسب نقاطًا إضافية في أول تحدٍ لك
              </p>
              <button 
                onClick={() => navigate('/game-setup')}
                className="bg-white text-gray-900 px-14 py-5 rounded-xl text-xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
              >
                ابدأ مجانًا الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 