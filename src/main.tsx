import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {FavoritesProvider} from "./context/FavoritesContext";
import { GenresProvoder } from './context/GenreContext.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <FavoritesProvider>
          <GenresProvoder>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </GenresProvoder>
        </FavoritesProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
