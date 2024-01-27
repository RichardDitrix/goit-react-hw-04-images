import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Form, Header, ButtonLabel, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const onSearchChange = event => {
    setSearch(event.target.value);
  };

  const onSearch = event => {
    event.preventDefault();
    onSubmit(search);
  };

  return (
    <Header>
      <Form className="form" onSubmit={onSearch}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          className="input"
          type="text"
          autoсomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={onSearchChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
