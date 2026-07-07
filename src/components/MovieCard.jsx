import React from 'react';
import { getImageUrl } from '../api/tmdb';
import { useWishlist } from '../context/WishlistContext';

function MovieCard({ movie, onClick }) {
  const { title, poster_path, release_date, vote_average } = movie;
  
  const { isWishlisted, toggleWishlist } = useWishlist();

  const releaseYear = release_date ? release_date.split('-')[0] : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const posterUrl = getImageUrl(poster_path, 'w300');
  
  const wishlisted = isWishlisted(movie.id);

  // Determine rating badge color class
  let ratingClass = 'rating-low';
  if (vote_average >= 7.5) {
    ratingClass = 'rating-high';
  } else if (vote_average >= 5.0) {
    ratingClass = 'rating-mid';
  }

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Avoid triggering the card click (opening details modal)
    toggleWishlist(movie);
  };

  return (
    <div className="movie-card" onClick={onClick} title={`Click to view details of ${title}`}>
      <div className="poster-container">
        {/* Floating Wishlist Button */}
        <button 
          className={`wishlist-card-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? '💖' : '🤍'}
        </button>

        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={`${title} Poster`} 
            className="movie-poster"
            loading="lazy" 
          />
        ) : (
          <div className="poster-placeholder">
            <span>🎬</span>
            <p>{title}</p>
          </div>
        )}
        <div className="movie-overlay">
          <p className="overview-snippet">{movie.overview || 'No overview available.'}</p>
          <button className="view-details-btn">View Details</button>
        </div>
        <div className={`rating-badge ${ratingClass}`}>
          {rating}
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <span className="movie-year">{releaseYear}</span>
      </div>
    </div>
  );
}

export default MovieCard;
