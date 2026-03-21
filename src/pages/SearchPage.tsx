import {useState, useEffect, useRef} from "react";
import { searchMovies, getTopRated } from "../api/tmdb";
import MovieCard from "../components/MovieCard/MovieCard";

import s from '../pages/index.module.css'

function SearchPage(){
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1)
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);

    const heandleOnClick = (query: string) => {
        if(timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setQuery(query);
        }, 500)
    }

    useEffect(() => {
        getTopRated(page).then(result => {
            if (Array.isArray(result)) {
                setMovies(prev => page === 1 ? result : [...prev, ...result])}
  })
            
    }, [page]);

    useEffect(() => {
        if(!query) return;

        let cancelled: boolean = false;

        setLoading(true);

        searchMovies(query)
            .then(result => {
                if(!cancelled){
                    setMovies(result);
                    setLoading(false);
                }
            }
        );
        
        return () => {
            cancelled = true;
        }
    }, [query]);

    return(
        <div className={s.searchPageDiv}>
            <h1 className={s.findFilmTitle}>НАЙДИ ФИЛЬМ</h1>
            <input 
            type="text"
            placeholder="ПОИСК ФИЛЬМА..."
            onChange={e => heandleOnClick(e.target.value)} />

            {loading && <p>Загрузка...</p>}

            <div className={s.moviesDiv}>
                {movies.map((movie: any) => (
                    <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average} />
                ))}
            </div>

             <div className={s.buttonDiv}>
                <button className={s.moreButton} onClick={() => setPage(p => p + 1)}>
                    Загрузить ещё
                </button>
            </div>
        </div>
    );
};

export default SearchPage;