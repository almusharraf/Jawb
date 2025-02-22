import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password reset logic here
    alert(`تم إرسال رابط إعادة تعيين كلمة المرور إلى ${email}`);
    navigate('/auth');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mx-4">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-white/60 hover:text-white/90 flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            رجوع
          </button>
          <h2 className="text-3xl font-bold text-white text-center">إعادة تعيين كلمة المرور</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-white/80 mb-2">البريد الإلكتروني</label>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-3">
              <Mail className="text-white/40 ml-2" size={20} />
              <input
                type="email"
                className="w-full bg-transparent text-white placeholder-white/40 outline-none"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            إرسال رابط التعيين
          </button>

          <p className="text-center text-white/70">
            تذكرت كلمة المرور؟{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
              سجل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 