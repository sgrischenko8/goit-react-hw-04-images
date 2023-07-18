import { useState } from 'react';
import { Modal } from './Modal/Modal';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ img }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const { id, webformatURL, tags, largeImageURL } = img;

  return (
    <li key={id} className={styles.gallery_item}>
      <img
        className={styles.gallery_item_image}
        src={webformatURL}
        alt={tags}
        onClick={() => toggleModal()}
      />
      {isModalOpen && (
        <Modal onClose={toggleModal} url={largeImageURL} tags={tags}></Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
