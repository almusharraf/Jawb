import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For demo, we'll just check if email/password are not empty
      if (!email || !password) {
        toast.error('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      
      // Force a storage event to update navbar
      window.dispatchEvent(new Event('storage'));
      
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/game-setup', { replace: true });
    } catch (error) {
      toast.error('حدث خطأ أثناء تسجيل الدخول');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">تسجيل الدخول</h2>
          <form onSubmit={handleLogin} className="space-y-6">
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              تسجيل الدخول
            </button>

            <div className="text-center mt-4">
              <Link 
                to="/forgot-password" 
                className="text-purple-300 hover:text-purple-200 font-medium flex items-center justify-center gap-2 text-sm"
              >
                <span className="border-b border-dashed border-purple-400 pb-1">
                  نسيت كلمة المرور؟
                </span>
              </Link>
            </div>

            <p className="text-white/70 text-center text-sm">
              ليس لديك حساب؟{' '}
              <Link to="/signup" className="text-white font-medium hover:underline">
                سجل الآن
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 