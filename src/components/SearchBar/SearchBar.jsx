import { Field, Form, Formik } from 'formik';
import style from './SearchBar.module.css';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    if (!values.search.trim()) {
      toast.error('The search field cannot be empty!');
      return;
    }
    onSubmit(values.search.trim().toLowerCase());
    actions.resetForm();
  };

  return (
    <div className={style.container}>
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field
            className={style.inputSearch}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
