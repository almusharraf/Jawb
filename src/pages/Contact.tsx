import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4">تواصل معنا</h2>
        </div>
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">الاسم</label>
              <input type="text" className="w-full bg-white/5 border border-white/20 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-white mb-2">البريد الإلكتروني</label>
              <input type="email" className="w-full bg-white/5 border border-white/20 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-white mb-2">الرسالة</label>
              <textarea className="w-full bg-white/5 border border-white/20 rounded-xl p-3 text-white h-32"></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl">
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 