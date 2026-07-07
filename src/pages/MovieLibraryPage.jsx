import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchPopularMovies, searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

function MovieLibraryPage({ onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedType, setFeedType] = useState('trending'); // 'trending' or 'popular'
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced movie loading trigger (fires when searchQuery or feedType changes)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadMovies();
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, feedType]);

  const loadMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (searchQuery.trim()) {
        data = await searchMovies(searchQuery);
      } else if (feedType === 'trending') {
        data = await fetchTrendingMovies();
      } else {
        data = await fetchPopularMovies();
      }
      setMovies(data.results || []);
    } catch (err) {
      console.error('Failed to load movies:', err);
      setError('Failed to fetch movies from the library API. Please verify your token and network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      {/* Search and Feed Filter Controls */}
      <div className="controls-bar">
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search movies (e.g. Jack Reacher...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={handleClearSearch} title="Clear search">
                &times;
              </button>
            )}
          </div>
        </div>

        {!searchQuery && (
          <div className="category-selectors">
            <button
              className={`category-btn ${feedType === 'trending' ? 'active' : ''}`}
              onClick={() => setFeedType('trending')}
            >
              🔥 Trending
            </button>
            <button
              className={`category-btn ${feedType === 'popular' ? 'active' : ''}`}
              onClick={() => setFeedType('popular')}
            >
              ⭐ Popular
            </button>
          </div>
        )}
      </div>

      {/* Movie Feed Section Title */}
      <div className="section-title-wrapper">
        <h2 className="section-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : feedType === 'trending' ? 'Trending Movies' : 'Popular Movies'}
        </h2>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="loading-spinner-wrapper">
          <div className="spinner"></div>
          <p>Curating your movie shelf...</p>
        </div>
      )}

      {/* Error Message */}
      {!loading && error && (
        <div className="error-message">
          <span>⚠️</span>
          <h2>Failed to Load</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={loadMovies}>
            Retry Connection
          </button>
        </div>
      )}

      {/* Movie Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid animate-fade-in">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && movies.length === 0 && (
        <div className="empty-state">
          <span>🎬</span>
          <h2>No Movies Found</h2>
          <p>We couldn't find any movies matching your search query. Try checking for typos or searching another term.</p>
          {searchQuery && (
            <button className="retry-btn" onClick={handleClearSearch}>
              Clear Search
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default MovieLibraryPage;
