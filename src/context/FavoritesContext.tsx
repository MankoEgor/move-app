import {useState, createContext, useContext} from 'react';

interface FavoritesContextType {
    favorites: number[];
    favoriteToggle: (id: number) => void;
    isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({children}: {children: React.ReactNode}) {
    const [favorites, setFavorites] = useState<number[]>([]);

    const favoriteToggle = (id: number) => {
        setFavorites(prev => 
            prev.includes(id) ? prev.filter(id => id !== id) : [...prev, id]);
    };

    const isFavorite = (id: number) => favorites.includes(id);

    return (
        <FavoritesContext.Provider value={{favorites, favoriteToggle, isFavorite}}>
            {children};
        </FavoritesContext.Provider>
    )
}

export function useFavorite(){
    return useContext(FavoritesContext)!;
};