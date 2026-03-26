import { useFavorite } from "../../context/FavoritesContext";
import { useLanguage } from "../../context/LanguageContext";
import {useEffect, useState} from "react";
import { getMovie } from "../../api/tmdb";
import { translations } from "../../locales/translate";
import MovieCard from "../../components/MovieCard/MovieCard";
import EmptyFavPage from "../../components/EmptyFavPage/EmptyFavPage";

import s from './FavoritePage.module.css';

function FavoritesPage() {
    const {favorites} = useFavorite();
    const {language} = useLanguage()
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const t = translations[language];
    

    useEffect(() => {
        if(favorites.length === 0){
            setMovies([]);
            return;
        }

        setLoading(true);

        Promise.all(favorites.map(id => getMovie(String(id), language)))
            .then(result => {
                setMovies(result);
                setLoading(false);
            })
    }, [favorites, language]);

    if(loading) return <p>{t.search.loading}</p>;
    if(movies.length === 0 ) return <EmptyFavPage/>

    return (
        <div className={s.favoritePageDiv}>
            <h1 className={s.favoriteFilmTitle}>{t.nav.favTitle}</h1>
            <div className={s.favoriteDiv}>
                {movies.map(movie => (
                <MovieCard 
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average}
                />
                ))} 
            </div> 
        </div>
    );
};

export default FavoritesPage;