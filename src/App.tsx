import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import GameSetup from './pages/GameSetup';
import CategorySelect from './pages/CategorySelect';
import Game from './pages/Game';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import { Toaster } from 'react-hot-toast';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Optionally set default options here (e.g., staleTime, retry, etc.)
    },
    mutations: {
      // Optionally set default options for mutations if needed
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e1b4b',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#4ade80',
                secondary: '#1e1b4b',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1e1b4b',
              },
            },
          }}
        />
        <div className="min-h-screen bg-primary-50 font-arabic">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Signup />} />
            <Route path="/game-setup" element={<GameSetup />} />
            <Route path="/category-select" element={<CategorySelect />} />
            <Route path="/game" element={<Game />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
