import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getMovie, IMAGE_BASE_URL} from "../api/tmdb";

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
        <div>
            <button onClick={() => navigate(-1)}>← Назад</button>
            {movie.poster_path && 
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
            }
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>РЕЙТИНГ: {movie.vote_average}</p>
            <p>ГОД: {movie.release_date?.slice(0, 4)}</p>
            <p>ДЛИТЕЛЬНОСТЬ: {movie.runtime} мин</p>
        </div>
    );
};

export default MoviePage;