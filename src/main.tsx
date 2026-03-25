import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {FavoritesProvider, GenresProvoder} from "./context/FavoritesContext";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <GenresProvoder>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </GenresProvoder>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);
