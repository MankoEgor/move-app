import {useState, useEffect, useRef} from "react";
import { searchMovies, getTopRated } from "../api/tmdb";
import MovieCard from "../components/MoveCard";

import '../styles/index.css'

function SearchPage(){
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef<number | null>(null);

    const heandleOnClick = (query: string) => {
        if(timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setQuery(query);
        }, 500)
    }

    useEffect(() => {
        getTopRated()
            .then(result => {
                setMovies(result);
            });
    }, []);

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
        <div className="searchPageDiv">
            <h1 className="findFilmTitle">НАЙДИ ФИЛЬМ</h1>
            <input 
            type="text"
            placeholder="ПОИСК ФИЛЬМА..."
            onChange={e => heandleOnClick(e.target.value)} />

            {loading && <p>Загрузка...</p>}

            <div className="moviesDiv">
                {movies.map((movie: any) => (
                    <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;