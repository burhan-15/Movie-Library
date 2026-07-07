import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

function Header({ theme, toggleTheme }) {
  const { wishlist } = useWishlist();

  return (
    <header className="app-header">
      <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
        <span className="brand-icon">🎬</span>
        <h1 className="brand-name">CinePulse</h1>
      </Link>

      {/* View Selection Tabs */}
      <nav className="view-tabs">
        <NavLink 
          to="/" 
          className={({ isActive }) => `view-tab-btn ${isActive ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          🎥 Movies
        </NavLink>
        <NavLink 
          to="/wishlist" 
          className={({ isActive }) => `view-tab-btn ${isActive ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          💖 Wishlist ({wishlist.length})
        </NavLink>
      </nav>
      
      {/* Theme Toggle Switch */}
      <button 
        className={`theme-toggle-switch ${theme}`} 
        onClick={toggleTheme} 
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle Theme"
      >
        <div className="theme-toggle-handle">
          {theme === 'dark' ? '🌙' : '☀️'}
        </div>
      </button>
    </header>
  );
}

export default Header;
