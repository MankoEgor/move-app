import {useState, createContext, useContext, useEffect} from 'react';

import { getGenres } from '../api/tmdb';


interface FavoritesContextType {
    favorites: number[];
    favoriteToggle: (id: number) => void;
    isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({children}: {children: React.ReactNode}) {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const favoriteToggle = (id: number) => {
        setFavorites(prev => 
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const isFavorite = (id: number) => favorites.includes(id);

    return (
        <FavoritesContext.Provider value={{favorites, favoriteToggle, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorite(){
    return useContext(FavoritesContext)!;
};


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