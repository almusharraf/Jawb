import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-md border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Game Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">جاوب</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              لعبة ثقافية تنافسية تختبر معلوماتك ومهاراتك بطريقة تفاعلية وممتعة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/combined-game-setup" className="text-white/70 hover:text-white transition-colors">
                  ابدأ اللعب
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  عن اللعبة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  تواصل معنا
                </Link>
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
                'التاريخ',
                'الثقافة',
                'الرياضة',
                'الفنون'
              ].map((category) => (
                <span 
                  key={category}
                  className="bg-white/10 text-white/70 text-sm px-3 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()} جاوب
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
