import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import CombinedGameSetup from './pages/CombinedGameSetup';
import Game from './pages/Game';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Auth from './pages/Auth';
import MyGames from './pages/MyGames';
import ForgotPassword from './pages/ForgotPassword';
import { Toaster } from 'react-hot-toast';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {},
  },
});

// Layout component to conditionally render Navbar and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isGameRoute = location.pathname === '/game';

  return (
    <div className="min-h-screen bg-primary-50 font-arabic flex flex-col">
      {!isGameRoute && <Navbar />}
      <div className="flex-grow">{children}</div>
      {!isGameRoute && <Footer />}
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Signup />} />
        <Route path="/combined-game-setup" element={<CombinedGameSetup />} />
        <Route path="/game" element={<Game />} />
        <Route path="/my-games" element={<MyGames />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Layout>
  );
};

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
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
