import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchPopularMovies, searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

function MovieLibraryPage({ onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedType, setFeedType] = useState('trending'); // 'trending' or 'popular'
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounced movie loading trigger (fires when searchQuery, feedType, or page changes)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadMovies(page);
    }, searchQuery.trim() ? 450 : 0);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, feedType, page]);

  const loadMovies = async (targetPage = page) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (searchQuery.trim()) {
        data = await searchMovies(searchQuery, targetPage);
      } else if (feedType === 'trending') {
        data = await fetchTrendingMovies(targetPage);
      } else {
        data = await fetchPopularMovies(targetPage);
      }
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to load movies:', err);
      setError('Failed to fetch movies from the library API. Please verify your token and network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(1);
  };

  const getPageNumbers = () => {
    const pageLimit = Math.min(totalPages, 500);
    const pages = [];
    const range = 1; // number of pages to show before and after current page

    pages.push(1);

    let start = Math.max(2, page - range);
    let end = Math.min(pageLimit - 1, page + range);

    if (start > 2) {
      pages.push('ellipsis-start');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < pageLimit - 1) {
      pages.push('ellipsis-end');
    }

    if (pageLimit > 1) {
      pages.push(pageLimit);
    }

    return pages;
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
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
              onClick={() => {
                setFeedType('trending');
                setPage(1);
              }}
            >
              🔥 Trending
            </button>
            <button
              className={`category-btn ${feedType === 'popular' ? 'active' : ''}`}
              onClick={() => {
                setFeedType('popular');
                setPage(1);
              }}
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
          <button className="retry-btn" onClick={() => loadMovies(page)}>
            Retry Connection
          </button>
        </div>
      )}

      {/* Movie Grid */}
      {!loading && !error && movies.length > 0 && (
        <>
          <div className="movie-grid animate-fade-in">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => onMovieClick(movie)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="pagination-btn arrow-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous Page"
              >
                ← Prev
              </button>

              <div className="pagination-pages">
                {getPageNumbers().map((pageNum, index) => {
                  if (pageNum === 'ellipsis-start' || pageNum === 'ellipsis-end') {
                    return (
                      <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-btn page-num ${page === pageNum ? 'active' : ''}`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn arrow-btn"
                disabled={page === Math.min(totalPages, 500)}
                onClick={() => setPage((p) => Math.min(Math.min(totalPages, 500), p + 1))}
                aria-label="Next Page"
              >
                Next →
              </button>
            </div>
          )}
        </>
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
