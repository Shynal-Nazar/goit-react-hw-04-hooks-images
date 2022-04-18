import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  SearchLable,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchbar: '',
  };

  inputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    if (!this.state.searchbar.trim()) {
      toast.error('Please write the name of the picture ');
      return;
    }
    this.props.onSubmit(this.state.searchbar);
    this.setState({ searchbar: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.submit}>
          <SearchButton type="submit">
            <SearchLable>Search</SearchLable>
          </SearchButton>
          <SearchInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchbar"
            value={this.state.searchbar}
            onChange={this.inputChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
