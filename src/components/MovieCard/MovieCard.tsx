import {useNavigate} from "react-router-dom";
import {useFavorite} from "../../context/FavoritesContext.tsx";
import {IMAGE_BASE_URL} from "../../api/tmdb.ts";

import s from '../MovieCard/MovieCard.module.css';

interface movieCardProps{
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

function MovieCard({id, title, poster_path, vote_average}: movieCardProps){
    const navigate = useNavigate();
    const {isFavorite, favoriteToggle} = useFavorite();
    return(
        <div className={s.movieCard} onClick={() => navigate(`/movie/${id}`)}>
            <div className={s.movieCardImage}>
                <button onClick={(e) => {
                    e.stopPropagation()
                    favoriteToggle(id)
                }}>
                {isFavorite(id) ? <img src="/favorite_24dp_C8F135.svg" alt="" /> : <img src="/favorite_border_24dp_C8F135.svg" alt="" />}
            </button>
                {poster_path 
            ? <img src={`${IMAGE_BASE_URL}${poster_path}`} alt={title} /> 
            : <div>No Image</div>}
            </div>
            
            <div className={s.movieInfo}>
                <p>{title}</p>
                <div className={s.average}>
                    <p>{vote_average.toFixed(1)}</p>
                    <img className={s.star} src="/star_24dp_78A75A.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default MovieCard;