import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal';

import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage, alt }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <GalleryItem>
        <GalleryImage
          src={smallImage}
          alt={alt}
          onClick={toggleModal}
        ></GalleryImage>
      </GalleryItem>
      {showModal && <Modal src={largeImage} alt={alt} onClose={toggleModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
