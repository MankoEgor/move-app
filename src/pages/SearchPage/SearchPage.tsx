import {useState, useEffect, useRef, useCallback, useMemo} from "react";
import { searchMovies, getTopRated, getMoviesByGenre } from "../../api/tmdb";
import MovieCard from "../../components/MovieCard/MovieCard";
import GenreButton from "../../components/GenreButton/GenreButton";
import { useGenres } from "../../context/FavoritesContext";

import s from './SearchPage.module.css'

function SearchPage(){
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1)
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);

    const {genres} = useGenres();

     const heandleOnClickFilter = useCallback((genreId: number | null) => {
        setSelectedGenre(genreId);
        setPage(1);
        if(!genreId) setMovies([]);
    }, []);

    const heandleOnClick = (query: string) => {
        if(timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setPage(1);
            setQuery(query);
        }, 500)
    }

    useEffect(() => {
        if(query) return;
        getTopRated(page).then(({ results, totalPages }) => {
            if (Array.isArray(results)) {
                setMovies(prev => page === 1 ? results : [...prev, ...results])
                setTotalPages(totalPages);
            }
    })}, [page, query])

    useEffect(() => {
        if(!query) return;

        let cancelled: boolean = false;

        setLoading(true);

        searchMovies(query, page)
            .then(({results, totalPages}) => {
                if(!cancelled){
                    setMovies(prev => page === 1 ? 
                        (Array.isArray(results) ? results : []) 
                        : [...prev, ...(Array.isArray(results) ? results : [])])

                    console.log(results);
                    console.log(totalPages);
                    setTotalPages(totalPages || 1);
                    setLoading(false);
                }
            }
        );
        
        return () => {
            cancelled = true;
        }
    }, [query, page]);

    useEffect(() => {
        if(!selectedGenre) return;
        
        getMoviesByGenre(selectedGenre, page)
            .then(({results, totalPages}) => {
                if(Array.isArray(results)){
                    setMovies(prev => page === 1 ? results : [...prev, ...results]);
                    setTotalPages(totalPages);
                }
            })
    }, [selectedGenre, page]);

    const filteredMovies = useMemo(() =>  
            selectedGenre 
        ? movies.filter((m: any) => m.genre_ids?.includes(selectedGenre))
        : movies, [movies, selectedGenre])


    return(
        <div className={s.searchPageDiv}>
            <div className={s.warning}>
                ⚠️ Для работы сайта необходим VPN — TMDB API заблокирован в РБ/РФ
            </div>
            <h1 className={s.findFilmTitle}>НАЙДИ ФИЛЬМ</h1>
            <input 
            type="text"
            placeholder="ПОИСК ФИЛЬМА..."
            onChange={e => heandleOnClick(e.target.value)} />

            {loading && <p>Загрузка...</p>}

            <div className={s.filterButtons}>
                <button className={s.genreButton} onClick={() => heandleOnClickFilter(null)}>
                    <p className={s.pGenreButton}>ВСЕ</p>
                </button>
                {
                    genres.map(g => (
                        <GenreButton
                        key={g.id}
                        name={g.name}
                        onClick={() => heandleOnClickFilter(g.id)}
                        isActive={selectedGenre == g.id}/>
                    ))
                }
            </div>

            <div className={s.moviesDiv}>
                {filteredMovies.map((movie: any) => (
                    <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average} />
                ))}
            </div>

            {page < totalPages && (
                <div className={s.buttonDiv}>
                    <button className={s.moreButton} onClick={() => setPage(prev => prev + 1)}>
                    Загрузить ещё
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchPage;

