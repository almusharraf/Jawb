import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import GameSetup from './pages/GameSetup';
import CategorySelect from './pages/CategorySelect';
import Game from './pages/Game';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-primary-50 font-arabic">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<GameSetup />} />
          <Route path="/category-select" element={<CategorySelect />} />
          <Route path="/game" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;