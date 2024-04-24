import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieDetails } from '../../movies-api.js';
import { Suspense, useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader.jsx';
import style from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const goBackLink = location.state?.from ?? '/';

  const buildLinkClass = to => {
    return location.pathname === to;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const userScore = movie ? (Number(movie.vote_average) * 10).toFixed(0) : null;
  return (
    <section className={style.section}>
      <Link to={goBackLink}>
        <button>Go Back</button>
      </Link>
      {loading && <Loader />}
      {movie && (
        <div>
          <div className={style.container}>
            <img
              className={style.movieDetailsImg}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
              width="350"
              height="500"
            />
            <div>
              <h2>{movie.original_title}</h2>
              <p>{movie.tagline}</p>
              {userScore !== '0' && userScore !== null && (
                <div>
                  <p className={style.userScore}>User Score: {userScore}%</p>
                </div>
              )}
              <h2>Overview</h2>
              <p className={style.overview}>{movie.overview}</p>
              <h2>Genres</h2>
              <ul className={style.genresList}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <nav className={style.navigation}>
            <NavLink
              className={buildLinkClass(`/movies/${id}/cast`)}
              to={'cast'}
              state={location.state}
            >
              Cast
            </NavLink>
            <NavLink
              className={buildLinkClass(`/movies/${id}/reviews`)}
              to={'reviews'}
              state={location.state}
            >
              Reviews
            </NavLink>
          </nav>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default MovieDetailsPage;
