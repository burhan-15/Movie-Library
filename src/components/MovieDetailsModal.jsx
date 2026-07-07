import React, { useEffect } from 'react';
import { getImageUrl } from '../api/tmdb';
import { useWishlist } from '../context/WishlistContext';

function MovieDetailsModal({ movie, onClose }) {
  if (!movie) return null;

  const { isWishlisted, toggleWishlist } = useWishlist();

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const {
    title,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    vote_average,
    vote_count,
    original_language,
    popularity,
  } = movie;

  const backdropUrl = getImageUrl(backdrop_path, 'original') || getImageUrl(backdrop_path, 'w1280');
  const posterUrl = getImageUrl(poster_path, 'w500') || getImageUrl(poster_path, 'w300');
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  
  const wishlisted = isWishlisted(movie.id);

  // Format release date nicely
  const formattedDate = release_date
    ? new Date(release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {backdropUrl && (
          <div 
            className="modal-backdrop-img" 
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}

        <div className="modal-body">
          <div className="modal-poster">
            {posterUrl ? (
              <img src={posterUrl} alt={`${title} Poster`} />
            ) : (
              <div className="modal-poster-placeholder">🎬</div>
            )}
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{title}</h2>
            
            {movie.title !== movie.original_title && (
              <h4 className="modal-original-title">Original Title: {movie.original_title}</h4>
            )}

            <div className="modal-metadata">
              <span className="metadata-item">
                <strong>Release Date:</strong> {formattedDate}
              </span>
              <span className="metadata-item">
                <strong>Language:</strong> {original_language?.toUpperCase() || 'N/A'}
              </span>
              <span className="metadata-item">
                <strong>Popularity:</strong> {popularity?.toFixed(0) || 'N/A'}
              </span>
            </div>

            <div className="modal-rating-container">
              <div className="modal-stars-wrapper">
                <span className="modal-rating-score">{rating}</span>
                <span className="modal-rating-max">/10</span>
              </div>
              <span className="modal-vote-count">({vote_count || 0} votes)</span>
              
              {/* Wishlist Button in Modal */}
              <button 
                className={`modal-wishlist-btn ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(movie)}
                title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {wishlisted ? '💖 Wishlisted' : '🤍 Wishlist'}
              </button>
            </div>

            <div className="modal-overview-section">
              <h3>Overview</h3>
              <p className="modal-overview-text">{overview || 'No overview available for this movie.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsModal;
