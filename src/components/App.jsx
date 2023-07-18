import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as API from 'services/api';
import { useState, useEffect, memo } from 'react';
import styles from './App.module.css';

export const App = memo(function App() {
  const [img, setImg] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    if (page === 1) {
      setImg([]);
      setError('');
    }

    async function renderImages() {
      setLoading(true);

      try {
        const data = await API.fetchImages(query, page);
        const images = data.map(el => ({
          id: el.id,
          webformatURL: el.webformatURL,
          largeImageURL: el.largeImageURL,
          tags: el.tags,
        }));
        images[0].total = data[0].total;
        page === 1
          ? setImg(images)
          : setImg(prevImg => [...prevImg, ...images]);
      } catch (e) {
        page === 1
          ? setError('There is no such images')
          : setError('Something goes bad... Please, try later');
      } finally {
        setLoading(false);
      }
    }
    renderImages();
  }, [query, page]);

  const incrementPage = () => {
    setPage(prevPage => ++prevPage);
  };

  const submitHandler = query => {
    setQuery(query);
    setPage(1);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={submitHandler} />
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <ImageGallery
          img={img}
          onLoadMore={incrementPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
});
