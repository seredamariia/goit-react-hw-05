import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../movies-api.js';
import MovieReviewsItem from '../MovieReviewsItem/MovieReviewsItem';
import Loader from '../Loader/Loader';
import style from './MovieReviews.module.css';

const MovieReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handelClick = async () => {
      try {
        setLoading(true);
        setReviews([]);
        const dataMovieDetails = await getMovieDetails(id, '/reviews');
        setReviews(dataMovieDetails.results);
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
      {!loading && reviews !== null && reviews.length === 0 && (
        <p>{`There are no reviews for this movie.`}</p>
      )}
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li className={style.reviewItem} key={review.id}>
              <MovieReviewsItem dataReviews={review} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieReviews;
