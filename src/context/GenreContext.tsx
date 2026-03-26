import { useState, useContext, createContext, useEffect } from 'react';
import { getGenres } from '../api/tmdb';
import { useLanguage } from './LanguageContext';

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
    const { language } = useLanguage()

    useEffect(() => {
        getGenres(language).then(data => setGenres(data));
    }, [language]);

    return (
        <GenresContext.Provider value={{ genres }}>
            {children}
        </GenresContext.Provider>
    )
}

export function useGenres(){
    return useContext(GenresContext)!;
}