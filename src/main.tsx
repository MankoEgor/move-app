import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {FavoritesProvider, GenresProvoder} from "./context/FavoritesContext";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <GenresProvoder>
          <App />
        </GenresProvoder>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);
