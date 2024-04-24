import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTrendingMovies } from '../../movies-api.js';
import Loader from '../../components/Loader/Loader';
import style from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handelSearch = async () => {
    try {
      setLoading(true);
      setMovies([]);
      const dataFilms = await getTrendingMovies();
      setMovies(dataFilms);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handelSearch();
  }, []);

  return (
    <main>
      <h1 className={style.title}>Trending today</h1>
      {loading && <Loader />}
      <MovieList filmsList={movies} />
    </main>
  );
};

export default HomePage;
