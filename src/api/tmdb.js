import axios from 'axios';

// Get token from Vite environment variables
const TMDB_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// Create an Axios instance configured for TMDB API
const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

// Cache base poster sizes and images url
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Helper to construct full poster or backdrop URLs.
 * @param {string} path - The relative path from the API response (e.g. /poster.jpg)
 * @param {string} size - The size code (e.g. w500, w300, w1280, original)
 * @returns {string} The full image URL
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Fetch daily trending movies
 * API Endpoint: GET /trending/movie/day
 */
export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await tmdbClient.get('/trending/movie/day', {
      params: { page },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

/**
 * Fetch popular movies
 * API Endpoint: GET /movie/popular
 */
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbClient.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

/**
 * Search movies by title/query
 * API Endpoint: GET /search/movie
 */
export const searchMovies = async (query, page = 1) => {
  if (!query || !query.trim()) {
    return { results: [], total_results: 0, total_pages: 0 };
  }
  try {
    const response = await tmdbClient.get('/search/movie', {
      params: {
        query: query.trim(),
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching movies for "${query}":`, error);
    throw error;
  }
};

export default tmdbClient;
