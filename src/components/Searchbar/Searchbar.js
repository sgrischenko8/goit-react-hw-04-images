import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import styles from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, action) => {
    if (values.query.trim() !== '') {
      onSubmit(values.query);
      action.setSubmitting(false);
    }
  };
  return (
    <header className={styles.searchbar}>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        {() => (
          <Form className={styles.form}>
            <button type="submit" className={styles.button}>
              <SearchIcon className={styles.button_icon} />
              <span className={styles.button_label}>Search</span>
            </button>

            <Field
              className={styles.input}
              name="query"
              type="search"
              autoComplete="off"
              autoFocus="on"
              placeholder="Search images and photos"
            />
          </Form>
        )}
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
