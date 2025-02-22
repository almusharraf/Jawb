import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('كلمة المرور غير متطابقة');
      return;
    }

    // Proceed to game setup
    navigate('/game-setup');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">تسجيل جديد</h2>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-white mb-2">الاسم الأول</label>
              <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-3">
                <User className="text-white/50 ml-2" size={20} />
                <input
                  type="text"
                  className="w-full bg-transparent text-white placeholder-white/50 outline-none"
                  placeholder="أحمد محمد"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">البريد الإلكتروني</label>
              <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-3">
                <Mail className="text-white/50 ml-2" size={20} />
                <input
                  type="email"
                  className="w-full bg-transparent text-white placeholder-white/50 outline-none"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">كلمة المرور</label>
              <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-3">
                <Lock className="text-white/50 ml-2" size={20} />
                <input
                  type="password"
                  className="w-full bg-transparent text-white placeholder-white/50 outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">تأكيد كلمة المرور</label>
              <div className="flex items-center bg-white/5 border border-white/20 rounded-xl p-3">
                <Lock className="text-white/50 ml-2" size={20} />
                <input
                  type="password"
                  className="w-full bg-transparent text-white placeholder-white/50 outline-none"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              ابدأ اللعب
            </button>

            <p className="text-white/70 text-center text-sm">
              لديك حساب؟{' '}
              <Link to="/login" className="text-white font-medium hover:underline">
                سجل الدخول
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup; 