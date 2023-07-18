import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { memo } from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = memo(function ImageGallery({
  img,
  onLoadMore,
  isLoading,
}) {
  return (
    <>
      <ul className={styles.gallery}>
        {img.map(el => (
          <ImageGalleryItem key={el.id} img={el} />
        ))}
      </ul>

      {isLoading && <Loader />}

      {!isLoading && img.length !== 0 && img[0].total !== img.length && (
        <Button onLoadMore={onLoadMore} />
      )}
    </>
  );
});

ImageGallery.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  img: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      total: PropTypes.number,
    })
  ).isRequired,
};
