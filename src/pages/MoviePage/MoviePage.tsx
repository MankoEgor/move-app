import {useParams, useNavigate} from "react-router-dom";
import {getMovie, getMovieCredits, BACKDROP_URL} from "../../api/tmdb";
import { useFavorite } from "../../context/FavoritesContext";
import GenreDiv from "../../components/GenreDiv/GenreDiv";
import { useFetch } from "../../hooks/useFetch";

import styles from './MoviePage.module.css'

function MoviePage(){
    const {id} = useParams();
    const navigate = useNavigate();
    const {isFavorite, favoriteToggle} = useFavorite();

    const {data: movie, loading} = useFetch(() => getMovie(id!));
    const {data: credits} = useFetch(() => getMovieCredits(id!));

    const director = credits?.crew?.find((p: any) => p.job === 'Director')?.name || 'Неизвестен';

    if (loading) return <p>Загрузка...</p>;
    if (!movie) return <p>Фильм не найден...</p>;

    return(
        <div className="moviePageDiv">
            <div className={styles.backdrop}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>← НАЗАД</button>
                {movie.backdrop_path && 
                <img  src={`${BACKDROP_URL}${movie.backdrop_path}`} alt={movie.title} />}
                <div className={styles.backdropOverlay}>
                    <h1 className={styles.title}>{movie.title}</h1>
                </div>
            </div>
            

            <div className={styles.infoDiv}>
                <div className={styles.infoItem}>
                    <p className={styles.titleInfo}>РЕЙТИНГ</p>
                    <p className={styles.info}><span>star</span> {movie.vote_average.toFixed(1)}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.titleInfo}>ГОД </p>
                    <p className={styles.info}>{movie.release_date?.slice(0, 4)}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.titleInfo}>ДЛИТЕЛЬНОСТЬ</p>
                    <p className={styles.info}>{movie.runtime} мин</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.titleInfo}>ПРОДЮСЕР</p>
                    <p className={styles.infoDir}>{director}</p>
                </div>
            </div>

            <div className={styles.dopInfo}>
                <p className={styles.overview}>{movie.overview}</p>
                <div className={styles.addDiv}>
                    <button className={isFavorite(movie.id) ? styles.isFav : styles.isntFav} onClick={() => favoriteToggle(movie.id)}>
                        {isFavorite(movie.id) ? <img src="/favorite_24dp_C8F135.svg" alt="" /> : <img src="/favorite_border_24dp_666666.svg" alt="" />}
                        {isFavorite(movie.id) ? 'УБРАТЬ ИЗ ИЗБРАННОГО' : 'В ИЗБРАННОЕ'}
                    </button>
                    <div className={styles.infoGenre}>
                        {movie.genres?.map((g: any)=> (
                            <GenreDiv key={g.id} name={g.name} />
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MoviePage;