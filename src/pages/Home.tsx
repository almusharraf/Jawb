import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Sparkles, Trophy, Brain, Target, Crown } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      title: 'تشكيل الفرق',
      desc: 'قم بتشكيل بين 2 إلى 4 فرق وسمِّ كل فريق بطريقة مبتكرة.',
    },
    {
      step: 2,
      title: 'اختيار الفئات',
      desc: 'إذا كان اللعب بفريقين، يختار كل فريق 3 فئات. أما إذا كان اللعب بثلاثة أو أربعة فرق، يختار كل فريق فئتين.',
    },
    {
      step: 3,
      title: 'اختيار الأسئلة',
      desc: 'اختر مستوى الصعوبة المناسب (300/500/700 نقطة) وابدأ التحدي.',
    },
    {
      step: 4,
      title: 'الإجابة والتحدي',
      desc: 'لكل سؤال، تكون لدى الفريق الذي يبدأ دقيقة للإجابة، ثم تحصل الفرق المنافسة على فرصة للإجابة: 30 ثانية لكل فريق. في حالة وجود 3 فرق، يُعطى الفريق الأول دقيقة تامة، وتُمنح الفرق اللاحقة 15 ثانية لكل منها.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated Blob Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl opacity-30 animate-delay-2000"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-30 animate-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center">
          <Crown className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 text-yellow-400 animate-bounce" />
          <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            جاوب
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
            لعبة ثقافية تنافسية تختبر معلوماتك ومهاراتك بطريقة تفاعلية وممتعة.
          </p>
          <button
            onClick={() => navigate('/combined-game-setup')}
            className="mt-8 bg-gradient-to-r from-red-500 to-yellow-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300"
          >
            ابدأ اللعب الآن
          </button>
        </section>

        {/* Game Rules Section */}
        <section className="w-full max-w-6xl text-white">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">قوانين اللعبة</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Users className="w-10 h-10 text-yellow-400" />
              <p className="text-lg md:text-xl">
                يتنافس بين <span className="font-semibold">2 إلى 4 فرق</span>
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Target className="w-10 h-10 text-yellow-400" />
              <p className="text-lg md:text-xl">
                {`اختيار الفئات: إذا كان اللعب بفريقين، يختار كل فريق 3 فئات؛ وإذا كان اللعب بثلاثة أو أربعة فرق، يختار كل فريق فئتين.`}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Brain className="w-10 h-10 text-yellow-400" />
              <p className="text-lg md:text-xl">
                أسئلة متدرجة الصعوبة: <span className="font-semibold">300، 500، 700 نقطة</span>
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Sparkles className="w-10 h-10 text-yellow-400" />
              <p className="text-lg md:text-xl">
                لكل سؤال: الفريق المختار يبدأ بدقيقة للإجابة، ثم تُمنح الفرص للفرق المنافسة لمدة 30 ثانية لكل منها. في حال اللعب بثلاث فرق، يُمنح الفريق الأول دقيقة تامة، والفرص للفرق الأخرى تكون 15 ثانية لكل منها.
              </p>
            </div>
          </div>
          <div className="mt-12 border-t border-white/30"></div>
        </section>

        {/* How to Play Section with Timeline Roadmap */}
        <section className="w-full max-w-6xl text-white">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">خطوات اللعب</h2>
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full border-l-2 border-white/30"></div>
            <div className="space-y-12">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                  } relative`}
                >
                  {/* Timeline content */}
                  <div className="md:w-1/2 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-lg">{item.desc}</p>
                  </div>
                  {/* Timeline marker */}
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 bg-yellow-400 rounded-full border-4 border-white w-8 h-8 flex items-center justify-center font-bold text-indigo-900">
                    {item.step}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 border-t border-white/30"></div>
        </section>

        {/* Why Play With Us Section */}
        <section className="w-full max-w-6xl text-white">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">لماذا تلعب معنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <Trophy className="w-12 h-12 text-yellow-400" />
              <h3 className="text-2xl font-bold">تحدي مستمر</h3>
              <p className="text-lg">
                اختبر معلوماتك في بيئة تنافسية تجمع بين المتعة والإثارة.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <Sparkles className="w-12 h-12 text-yellow-400" />
              <h3 className="text-2xl font-bold">تفاعل اجتماعي</h3>
              <p className="text-lg">
                العب مع أصدقائك واستمتعوا بتجربة تفاعلية فريدة.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <Brain className="w-12 h-12 text-yellow-400" />
              <h3 className="text-2xl font-bold">تعليم وترفيه</h3>
              <p className="text-lg">
                تعلم واختبر معلوماتك من خلال تحديات مبتكرة ومسلية.
              </p>
            </div>
          </div>
        </section>

        {/* Final Call-to-Action */}
        <section className="text-center">
          <button
            onClick={() => navigate('/combined-game-setup')}
            className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-12 md:px-16 py-5 md:py-6 rounded-full text-2xl font-bold shadow-xl hover:scale-110 transition-transform duration-300"
          >
            ابدأ اللعب الآن
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
