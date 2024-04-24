import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../movies-api.js';
import MovieCastItem from '../MovieCastItem/MovieCastItem';
import Loader from '../Loader/Loader.jsx';
import style from './MovieCast.module.css';

const MovieCast = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handelClick = async () => {
      try {
        setLoading(true);
        setInfo([]);
        const infoData = await getMovieDetails(id, '/credits');
        setInfo(infoData.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handelClick();
  }, [id]);

  return (
    <section>
      {loading && <Loader />}
      {info && (
        <ul className={style.castList}>
          {info.map(cast => (
            <li className={style.castItem} key={cast.id}>
              <MovieCastItem dataCast={cast} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieCast;
