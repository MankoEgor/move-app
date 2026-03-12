import {Route, Routes} from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return(
    <Routes>
      <Route path="/" element={<SearchPage/>}/>;
      <Route path="/movie/:id" element={<MoviePage/>}/>;
      <Route path="/favorites" element={<FavoritesPage/>}/>;
    </Routes>
  );
}

export default App
