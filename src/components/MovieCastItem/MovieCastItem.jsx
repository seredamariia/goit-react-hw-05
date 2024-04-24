const MovieCastItem = ({ dataCast: { profile_path, name, character } }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w500/${profile_path}`;
  return (
    <div>
      <img src={imgUrl} alt={name} width={200} />
      <div>
        <h3>{name}</h3>
        <p>Character: {character}</p>
      </div>
    </div>
  );
};

export default MovieCastItem;
