const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';

export const searchMovies = async(query: string, page: number = 1) => {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ru&page=${page}`
    );
    const data = await res.json();
    return { results: data.results, totalPages: data.total_pages}
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

export const getTopRated = async (page: number = 1) => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ru&page=${page}`);
  const data = await res.json();
  return { results: data.results, totalPages: data.total_pages };
}

export const getGenres = async () => {   
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru`);
    const data = await res.json();
    return data.genres;
}

export const getMoviesByGenre = async (genreId: number, page: number = 1) => {
    const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=ru&page=${page}&sort_by=vote_average.desc&vote_count.gte=1000`);
        const data = await res.json();
        return {results: data.results, totalPages: data.total_pages};

}