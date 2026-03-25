import { useState, useContext, createContext, useEffect } from 'react';
import { getGenres } from '../api/tmdb';

interface Genre {
    id: number,
    name: string
}

interface GenreContextType{
    genres: Genre[]
}

const GenresContext = createContext<GenreContextType | null>(null);

export function GenresProvoder({children}: {children: React.ReactNode}){
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getGenres().then(data => setGenres(data));
    }, []);

    return (
        <GenresContext.Provider value={{ genres }}>
            {children}
        </GenresContext.Provider>
    )
}

export function useGenres(){
    return useContext(GenresContext)!;
}