import {useParams, useNavigate} from "react-router-dom";
import {getMovie, getMovieCredits, BACKDROP_URL} from "../../api/tmdb";
import { useFavorite } from "../../context/FavoritesContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../locales/translate";
import GenreDiv from "../../components/GenreDiv/GenreDiv";
import InfoItem from "../../components/InfoItem/InfoItem";
import { useFetch } from "../../hooks/useFetch";

import styles from './MoviePage.module.css'

function MoviePage(){
    const {id} = useParams();
    const {language} = useLanguage()
    const navigate = useNavigate();
    const {isFavorite, favoriteToggle} = useFavorite();

    const t = translations[language].moviePage;


    const {data: movie, loading} = useFetch(() => getMovie(id!, language), language);
    const {data: credits} = useFetch(() => getMovieCredits(id!, language), language);

    const director = credits?.crew?.find((p: any) => p.job === 'Director')?.name || t.unknown;

    if (loading) return <p>{t.loading}</p>;
    if (!movie) return <p>{t.notFounded}</p>;

    return(
        <div className="moviePageDiv">
            <div className={styles.backdrop}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>{t.back}</button>
                {movie.backdrop_path && 
                <img  src={`${BACKDROP_URL}${movie.backdrop_path}`} alt={movie.title} />}
                <div className={styles.backdropOverlay}>
                    <h1 className={styles.title}>{movie.title}</h1>
                </div>
            </div>
            

            <div className={styles.infoDiv}>
                <InfoItem label={t.rate} value={movie.vote_average.toFixed(1)} prefix={'star'}/>
                <InfoItem label={t.year} value={movie.release_date?.slice(0, 4)}/>
                <InfoItem label={t.duration} value={`${movie.runtime} ${t.min}`}/>
                <InfoItem label={t.director} value={director}/>
            </div>

            <div className={styles.dopInfo}>
                <p className={styles.overview}>{movie.overview}</p>
                <div className={styles.addDiv}>
                    <button className={isFavorite(movie.id) ? styles.isFav : styles.isntFav} onClick={() => favoriteToggle(movie.id)}>
                        {isFavorite(movie.id) ? <img src="/favorite_24dp_C8F135.svg" alt="" /> : <img src="/favorite_border_24dp_666666.svg" alt="" />}
                        {isFavorite(movie.id) ? t.isFav : t.notFav}
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