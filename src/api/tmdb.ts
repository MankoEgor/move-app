const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';

export const searchMovies = async(query: string) => {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ru`
    );
    const data = await res.json();
    return data.results;
}

export const getMovie = async(id: string) => {
    const res = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ru`
    );
    return res.json();
}

export const getMovieCredits = async(id: string) => {
    const res = await fetch(
        `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=ru`
    );
    return res.json();
}

export const getTopRated = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ru`);
  return res.json();
}