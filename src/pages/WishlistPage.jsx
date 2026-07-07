import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import MovieCard from '../components/MovieCard';

function WishlistPage({ onMovieClick }) {
  const { wishlist } = useWishlist();

  return (
    <>
      {/* Wishlist Title */}
      <div className="section-title-wrapper" style={{ marginTop: '2.5rem' }}>
        <h2 className="section-title">Your Movie Wishlist</h2>
      </div>

      {/* Grid of Wishlisted Movies */}
      {wishlist.length > 0 ? (
        <div className="movie-grid animate-fade-in">
          {wishlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>💖</span>
          <h2>Wishlist is Empty</h2>
          <p>You haven't added any movies to your wishlist yet. Explore movies and tap the heart icon to save your favorites!</p>
          <Link to="/" className="retry-btn" style={{ textDecoration: 'none' }}>
            Browse Movies
          </Link>
        </div>
      )}
    </>
  );
}

export default WishlistPage;
