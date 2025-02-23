import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useLoginUser } from '../services/mutations/auth/useLoginUser';
import { useSignupUser } from '../services/mutations/auth/useSignupUser';
import toast from 'react-hot-toast';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to toggle between login and signup modes
  const [isLogin, setIsLogin] = useState(true);

  // Common fields
  const [email, setEmail] = useState('alotaishan@gmail.com');
  const [password, setPassword] = useState('Abood665@');

  // Signup-specific fields
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Mutation hooks
  const { mutate: loginMutate, isLoading: loginLoading } = useLoginUser();
  const { mutate: signupMutate, isLoading: signupLoading } = useSignupUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login flow
      loginMutate(
        { email, password },
        {
          onSuccess: () => {
            toast.success('تم تسجيل الدخول بنجاح');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            // Force a storage event to update navbar
            window.dispatchEvent(new Event('storage'));

            navigate(location.state?.redirectTo || '/', { 
              state: location.state?.gameData 
            });
          },
          onError: (err: any) => {
            console.error('Login error:', err);
            toast.error('فشل تسجيل الدخول. تأكد من صحة بيانات الاعتماد.');
          },
        }
      );
    } else {
      // Signup flow: Check if passwords match
      if (password !== confirmPassword) {
        toast.error('كلمة المرور غير متطابقة');
        return;
      }

      signupMutate(
        { first_name: name, email, password, confirm_password: confirmPassword },
        {
          onSuccess: () => {
            toast.success('تم إنشاء الحساب بنجاح');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            // Force a storage event to update navbar
            window.dispatchEvent(new Event('storage'));

            navigate(location.state?.redirectTo || '/', { 
              state: location.state?.gameData 
            });
          },
          onError: (err: any) => {
            console.error('Signup error:', err);
            toast.error('فشل التسجيل. الرجاء المحاولة مرة أخرى.');
          },
        }
      );
    }
  };

  // Determine loading state based on mode
  const isLoading = isLogin ? loginLoading : signupLoading;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mx-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              {/* Full Name input for Signup */}
              <div className="group">
                <label className="block text-white/80 mb-2">الاسم الكامل</label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-3">
                  <User className="text-white/40 ml-2" size={20} />
                  <input
                    type="text"
                    className="w-full bg-transparent text-white placeholder-white/40 outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Email input */}
          <div className="group">
            <label className="block text-white/80 mb-2">البريد الإلكتروني</label>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-3">
              <Mail className="text-white/40 ml-2" size={20} />
              <input
                type="email"
                className="w-full bg-transparent text-white placeholder-white/40 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="group">
            <label className="block text-white/80 mb-2">كلمة المرور</label>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-3">
              <Lock className="text-white/40 ml-2" size={20} />
              <input
                type="password"
                className="w-full bg-transparent text-white placeholder-white/40 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password input for Signup */}
          {!isLogin && (
            <div className="group">
              <label className="block text-white/80 mb-2">تأكيد كلمة المرور</label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-3">
                <Lock className="text-white/40 ml-2" size={20} />
                <input
                  type="password"
                  className="w-full bg-transparent text-white placeholder-white/40 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading
              ? isLogin
                ? 'جاري تسجيل الدخول...'
                : 'جاري إنشاء الحساب...'
              : isLogin
              ? 'تسجيل الدخول'
              : 'إنشاء حساب'}
          </button>

          <p className="text-center text-white/70">
            {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              {isLogin ? 'سجل الآن' : 'سجل الدخول'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
