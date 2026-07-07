# CinePulse 🎬 - Premium Movie Library

CinePulse is a highly colorful, vibrant, and interactive single-page movie application. Powered by **React**, **Vite**, **Axios**, and customized **Vanilla CSS**, it fetches and renders rich details of popular and trending movies in real-time from the **TMDB (The Movie Database) API v3**.

---

## ✨ Features

- 🌌 **Cyber Cinematic Aesthetic**: Premium dark-mode mesh gradients, ambient backdrop glow spots, neon hover borders, and smooth transitions.
- 🔥 **Live Feed Filters**: Instantly toggle between **Trending Today** and **Popular** feeds.
- 🔍 **Debounced Search**: Perform real-time movie searches with built-in input debouncing to minimize redundant API requests.
- 📋 **Detailed Showcases**: Click on any movie card to load a gorgeous overlay modal with high-res backdrops, original titles, voter counts, star scores, languages, popularity ratings, and detailed plot overviews.
- ⚡ **Optimized Performance**: Lazy-loaded poster grids, responsive flex layouts, and optimized client build workflows.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **HTTP Client**: [Axios](https://github.com/axios/axios)
- **Styling**: Vanilla CSS (Cyberpunk/Cinematic theme, Outfit Google Fonts, backdrop filter blurs, CSS Grid)

---

## 🚀 Installation & Setup

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### 2. Clone and Install Dependencies
Navigate to the project root and run:
```bash
npm install
```

### 3. Environment Variables Config
Create a file named `.env` in the root of the project:
```env
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token_here
```
*(A default developer token has been configured for the project layout already).*

---

## 💻 Commands

Inside the project directory, you can run the following scripts:

- **Start Development Server**: Runs the app in development mode at `http://localhost:5173/`.
  ```bash
  npm run dev
  ```
- **Production Build**: Compiles and minifies the code into the `dist/` directory for deployment.
  ```bash
  npm run build
  ```
- **Lint Files**: Checks javascript formatting issues.
  ```bash
  npm run lint
  ```
- **Preview Production Build**: Runs the compiled bundle locally for verification.
  ```bash
  npm run preview
  ```

---

## 📂 Project Structure

```text
movie-library/
├── src/
│   ├── api/
│   │   └── tmdb.js          # Axios configuration and API helper requests
│   ├── components/
│   │   ├── MovieCard.jsx    # Component rendering basic movie card details
│   │   └── MovieDetailsModal.jsx # Detailed view popup overlay
│   ├── App.css              # App wrapper styles
│   ├── App.jsx              # Application state and control assembly
│   ├── index.css            # Cinematic design tokens and global layout
│   └── main.jsx             # React entry mount point
├── .env                     # Local environment keys (ignored in Git)
├── package.json             # Core scripts and dependencies
├── vite.config.js           # Vite server rules
└── README.md                # Project documentation
```

---

## 📘 TMDB API Integration Reference

TMDB (The Movie Database) exposes a REST API v3. 

### API Host Configuration
- **Base Request URL**: `https://api.themoviedb.org/3`
- **Image Server URL**: `https://image.tmdb.org/t/p`

### Request Authentication
Pass the Read Access Token in the request's `Authorization` header:
```javascript
headers: {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`
}
```

### Compiling Poster and Backdrop Images
API responses return partial paths (e.g. `"/vZ5sLg4Cg4597D59wW8t5q3.jpg"`). Compose full image URLs using:
`https://image.tmdb.org/t/p/{size}/{relative_path}`

- **Poster Sizes**: `w185`, `w342`, `w500`, `w780`
- **Backdrop Sizes**: `w300`, `w780`, `w1280`, `original`
