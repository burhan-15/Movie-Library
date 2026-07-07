import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieLibraryPage from './pages/MovieLibraryPage';
import WishlistPage from './pages/WishlistPage';
import MovieDetailsModal from './components/MovieDetailsModal';
import './App.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Theme state: initialized from localStorage or defaults to 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Apply theme class to document element on changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      {/* Header component */}
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <MovieLibraryPage 
                onMovieClick={setSelectedMovie}
              />
            } 
          />
          <Route 
            path="/wishlist" 
            element={
              <WishlistPage 
                onMovieClick={setSelectedMovie}
              />
            } 
          />
        </Routes>
      </main>

      {/* Movie Details Modal Overlay */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
