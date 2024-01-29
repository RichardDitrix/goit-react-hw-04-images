import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images = [] }) => {
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImage={webformatURL}
          largeImage={largeImageURL}
          alt={tags}
        />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
};
