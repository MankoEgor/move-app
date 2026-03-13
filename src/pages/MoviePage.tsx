import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getMovie, BACKDROP_URL} from "../api/tmdb";

import styles from '../pages/MoviePage.module.css'

function MoviePage(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovie(id!)
            .then(data => {
                setMovie(data);
                setLoading(false);
            })
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (!movie) return <p>Фильм не найден...</p>;

    return(
        <div className="moviePageDiv">
            <div className={styles.backdrop}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>← НАЗАД</button>
                {movie.backdrop_path && 
                <img  src={`${BACKDROP_URL}${movie.backdrop_path}`} alt={movie.title} />}
                <div className={styles.backdropOverlay}>
                    <h1>{movie.title}</h1>
                </div>
            </div>
            

            <div className={styles.infoDiv}>
                <div className={styles.infoItem}>
                    <p className={styles.titleInfo}>РЕЙТИНГ</p>
                    <p className={styles.info}><span>star</span> {movie.vote_average}</p>
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
                    <p className={styles.info}>{movie.director}</p>
                </div>
            </div>

            <div className="dopInfo">
                <p>{movie.overview}</p>
                <button></button>
            </div>
            
        </div>
    );
};

export default MoviePage;