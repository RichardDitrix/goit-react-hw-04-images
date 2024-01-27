import { useState } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Loader } from 'components/Loader';

import { fetchImages } from 'services/images-api';

import { GalleryList, LoadButton } from './ImageGallery.styled';
import { useEffect } from 'react';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export const ImageGallery = ({ search }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState(STATUS.idle);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery(search);
    setImages([]);
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (query === '') return;

    async function searchImages() {
      setStatus(STATUS.pending);

      try {
        const response = await fetchImages(query, page);
        setImages(images => [...images, ...response.hits]);
        setTotal(response.total);
        setStatus(STATUS.resolved);
      } catch (error) {
        setError(error);
      }
    }
    searchImages();
  }, [query, page]);

  useEffect(() => {
    if (page === 1) return;

    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  }, [page, images]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      {status === STATUS.idle && <div></div>}

      {status === STATUS.rejected && <div>{error.message}</div>}

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

      {status === STATUS.pending && <Loader />}

      {status === STATUS.resolved && images.length !== total && (
        <LoadButton type="button" onClick={loadMore}>
          Load more
        </LoadButton>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
};
