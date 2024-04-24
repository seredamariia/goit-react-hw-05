import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getMoviesSearch } from '../../movies-api.js';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader.jsx';
import toast, { Toaster } from 'react-hot-toast';
import style from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    const searchData = async query => {
      try {
        setLoading(true);

        const response = await getMoviesSearch(query);
        setSearchResults(response.results);

        if (!response.total_results) {
          toast('Sorry, there are no films for your request.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      searchData(searchQuery);
    }
  }, [searchQuery]);
  return (
    <main>
      <section className={style.moviesSearch}>
        <SearchBar onSubmit={query => setSearchParams({ search: query })} />
        <Toaster position="top-right" reverseOrder={false} />
        {loading && <Loader />}
        {searchResults.length !== 0 && <MovieList filmsList={searchResults} />}
      </section>
    </main>
  );
};

export default MoviesPage;
