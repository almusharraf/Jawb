// src/components/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useLoginUser } from '../services/mutations/auth/useLoginUser';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate: loginMutate, isLoading } = useLoginUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the login mutation hook
    loginMutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          // On successful login, navigate to game setup
          navigate('/game-setup');
        },
        onError: (err: any) => {
          console.error('Login error:', err);
          alert('فشل تسجيل الدخول. تأكد من صحة بيانات الاعتماد.');
        },
      }
    );
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
              disabled={isLoading}
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>

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
