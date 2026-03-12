import {useNavigate} from "react-router-dom";
import {useFavorite} from "../context/FavoritesContext";
import {IMAGE_BASE_URL} from "../api/tmdb.ts";

import "../styles/movieCard.css";

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
        <div className="movie-card" onClick={() => navigate(`/movie/${id}`)}>
            {poster_path 
            ? <img src={`${IMAGE_BASE_URL}${poster_path}`} alt={title} /> 
            : <div>No Image</div>}
            <p>{title}</p>
            <p>{vote_average}</p>
            <button onClick={
                (e) => {
                    e.stopPropagation()
                    favoriteToggle(id)
                }}>
                {isFavorite(id) ? '♥' : '♡'}
                </button>
        </div>
    );
}

export default MovieCard;