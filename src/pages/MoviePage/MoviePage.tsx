import {useParams, useNavigate} from "react-router-dom";
import {getMovie, getMovieCredits, BACKDROP_URL} from "../../api/tmdb";
import { useFavorite } from "../../context/FavoritesContext";
import GenreDiv from "../../components/GenreDiv/GenreDiv";
import InfoItem from "../../components/InfoItem/InfoItem";
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
                <InfoItem label={'РЕЙТИНГ'} value={movie.vote_average.toFixed(1)} prefix={'star'}/>
                <InfoItem label={'ГОД'} value={movie.release_date?.slice(0, 4)}/>
                <InfoItem label={'ДЛИТЕЛЬНОСТЬ'} value={`${movie.runtime} мин`}/>
                <InfoItem label={'ПРОДЮСЕР'} value={director}/>
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