import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// ────────── Movies ────────── //
export const getMovies = () => api.get("/movies");
export const getMovieById = (id) => api.get(`/movies/${id}`);
export const createMovie = (payload) => api.post("/movies", payload);
export const updateMovie = (id, payload) => api.put(`/movies/${id}`, payload);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

// ────────── Favorites (localStorage) ────────── //
const KEY = "filmography_favorites";

const readFav = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const writeFav = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

export const getFavorites = () => readFav();
export const toggleFavorite = (id) => {
  const fav = readFav();
  const idx = fav.indexOf(id);
  if (idx === -1) fav.push(id);
  else fav.splice(idx, 1);
  writeFav(fav);
  return fav;
};
export const isFavorite = (id) => readFav().includes(id);