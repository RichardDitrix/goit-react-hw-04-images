import { useState } from 'react';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';

import { Container } from './App.styled';

export const App = () => {
  const [search, setSearch] = useState('');

  const onSubmit = search => {
    setSearch(search.trim());
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery search={search} />
    </Container>
  );
};
