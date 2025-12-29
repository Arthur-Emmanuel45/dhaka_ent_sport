import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sports from './pages/Sports.';
import WeeklyUpdates from './pages/WeeklyUpdates';
import Technology from './pages/Technology';
import Video from './pages/Videos';
import Article from './pages/Article';

function App() {
  return (
      <Router>
        <div className="app-root">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/weekly-Updates" element={<WeeklyUpdates />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/videos" element={<Video />} />
              <Route path="/article/:id" element={<Article />} />
            </Routes>
          </main>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
