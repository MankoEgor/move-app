import {useNavigate} from "react-router-dom";

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

    return(
        <div className="movie-card" style={{backgroundImage: `url(${IMAGE_BASE_URL}${poster_path})`}} onClick={() => navigate(`/movie/${id}`)}>
            <p>{title}</p>
            <p>{vote_average}</p>
        </div>
    );
}

export default MovieCard;