import {useState, useEffect, useRef, useCallback, useMemo} from "react";
import { searchMovies, getTopRated, getMoviesByGenre } from "../../api/tmdb";
import MovieCard from "../../components/MovieCard/MovieCard";
import GenreButton from "../../components/GenreButton/GenreButton";
import { useGenres } from "../../context/GenreContext";
import { translations } from "../../locales/translate";

import s from './SearchPage.module.css'
import { useLanguage } from "../../context/LanguageContext";

function SearchPage(){
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1)
    const [movies, setMovies] = useState<any[]>([]);
    const [allMovies, setAllMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const {language} = useLanguage();
    const timerRef = useRef<number | null>(null);

    const t = translations[language].search

    const {genres} = useGenres();

     const heandleOnClickFilter = useCallback((genreId: number | null) => {
        setSelectedGenre(genreId);
        setPage(1);
        if(!genreId)
            setMovies(allMovies);
            return;
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
        getTopRated(page, language).then(({ results, totalPages }) => {
            if (Array.isArray(results)) {
                setMovies(prev => page === 1 ? results : [...prev, ...results]);
                setAllMovies(prev => page === 1 ? results : [...prev, ...results]);
                setTotalPages(totalPages);
            }
    })}, [page, query, language])

    useEffect(() => {
        if(!query) return;

        let cancelled: boolean = false;

        setLoading(true);

        searchMovies(query, page, language)
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
    }, [query, page, language]);

    useEffect(() => {
        if(!selectedGenre) return;
        
        getMoviesByGenre(selectedGenre, page, language)
            .then(({results, totalPages}) => {
                if(Array.isArray(results)){
                    setMovies(prev => page === 1 ? results : [...prev, ...results]);
                    setTotalPages(totalPages);
                }
            })
    }, [selectedGenre, page, language]);

    const filteredMovies = useMemo(() =>  
            selectedGenre 
        ? movies.filter((m: any) => m.genre_ids?.includes(selectedGenre))
        : movies, [movies, selectedGenre])


    return(
        <div className={s.searchPageDiv}>
            <div className={s.warning}>
                ⚠️ Для работы сайта необходим VPN — TMDB API заблокирован в РБ/РФ
            </div>
            <h1 className={s.findFilmTitle}>{t.title}</h1>
            <input 
            type="text"
            placeholder={t.placeholder}
            onChange={e => heandleOnClick(e.target.value)} />

            {loading && <p>{t.loading}</p>}

            <div className={s.filterButtons}>
                <button className={s.genreButton} onClick={() => heandleOnClickFilter(null)}>
                    <p className={s.pGenreButton}>{t.all}</p>
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
                    {t.loadMore}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchPage;

