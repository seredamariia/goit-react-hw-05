import { Link, useLocation } from 'react-router-dom';
import style from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const location = useLocation();
  const goBackLink = location.state?.from ?? '/';

  return (
    <section>
      <div className={style.notFound}>
        <h1 className={style.notFoundTitle}>404</h1>
        <h2 className={style.notFoundTitleInform}>Not found</h2>
        <p className={style.notFoundMessage}>
          The resource requested cannot be found.
        </p>
        <Link to={goBackLink}>
          <button>Return to the homepage</button>
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
