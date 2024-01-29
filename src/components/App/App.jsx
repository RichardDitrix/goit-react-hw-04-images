import { useEffect, useState } from 'react';

import { fetchImages } from '../../services/images-api';
import { ImageGallery } from '../ImageGallery';
import { Loader } from '../Loader';
import { Searchbar } from '../Searchbar';

import { LoadButton } from '../ImageGallery/ImageGallery.styled';
import { Container } from './App.styled';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export const App = () => {
  const [search, setSearch] = useState('');
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

  const onSubmit = search => {
    setSearch(search.trim());
  };

  return (
    <>
      {status === STATUS.rejected && <div>{error.message}</div>}

      <Container>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={images} />

        {status === STATUS.resolved && images.length !== total && (
          <LoadButton type="button" onClick={loadMore}>
            Load more
          </LoadButton>
        )}
      </Container>

      {status === STATUS.pending && <Loader />}
    </>
  );
};
