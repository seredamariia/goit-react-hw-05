const MovieReviewsItem = ({ dataReviews: { author, content } }) => {
  return (
    <>
      <h3>Author: {author}</h3>
      <p>{content}</p>
    </>
  );
};

export default MovieReviewsItem;
