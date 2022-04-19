import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  SearchLable,
  SearchInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchbar, setsearchbar] = useState('');

  const inputChange = e => {
    setsearchbar(e.currentTarget.value);
  };

  const submit = e => {
    e.preventDefault();
    if (!searchbar.trim()) {
      toast.error('Please write the name of the picture ');
      return;
    }
    onSubmit(searchbar);
    setsearchbar('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={submit}>
        <SearchButton type="submit">
          <SearchLable>Search</SearchLable>
        </SearchButton>
        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchbar"
          value={searchbar}
          onChange={inputChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
