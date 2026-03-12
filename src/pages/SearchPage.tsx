import {useState, useEffect} from "react";
import { searchMovies } from "../api/tmdb";

function SearchPage(){
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!query) return;

        let cancelled: boolean = false;

        setLoading(true);

        searchMovies(query)
            .then(result => {
                if(!cancelled){
                    setMovies(result);
                    setLoading(false);
                }
            }
        );
        
        return () => {
            cancelled = true;
        }
    }, [query]);

    return(
        <div>
            <input 
            type="text"
            placeholder="ПОИСК ФИЛЬМА..."
            onChange={e => setQuery(e.target.value)} />

            {loading && <p>Загрузка...</p>}

            <div>
                {movies.map((movie: any) => (
                    <div key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;