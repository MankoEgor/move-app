import {Route, Routes} from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import FavoritesPage from "./pages/FavoritePage/FavoritesPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return(
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<SearchPage/>}/>;
        <Route path="/movie/:id" element={<MoviePage/>}/>;
        <Route path="/favorites" element={<FavoritesPage/>}/>;
      </Routes>
    </>
  );
}

export default App
