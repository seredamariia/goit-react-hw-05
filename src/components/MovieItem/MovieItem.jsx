import style from './MovieItem.module.css';

const MovieItem = ({ dataFilm: { poster_path, title, vote_average } }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const voteAverage = Number(vote_average).toFixed(2);
  return (
    <div>
      <img className={style.poster} src={imgUrl} alt={title} />
      <div className={style.info}>
        <h3>{title}</h3>
        <p>Rating: {voteAverage}</p>
      </div>
    </div>
  );
};

export default MovieItem;
