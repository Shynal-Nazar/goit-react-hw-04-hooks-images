import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './App.styled';
import Api from 'components/services/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

export class App extends Component {
  state = {
    searchbar: '',
    images: [],
    status: 'idle',
  };

  componentDidUpdate(_, PrevState) {
    const prevSearch = PrevState.searchbar;
    const nextSearch = this.state.searchbar;
    const page = 1;
    if (prevSearch !== nextSearch) {
      this.setState({ status: 'pending', page: 1 });
      this.fatchImages(nextSearch, page, this.initImages, false);
    }
  }

  loadMore = () => {
    const page = this.state.page + 1;
    this.fatchImages(this.state.searchbar, page, this.addImages, true);
  };

  fatchImages = (nextSearch, page, callBackFunc, toscrol) => {
    Api.fatchImage(nextSearch, page)
      .then(images => {
        callBackFunc(images, nextSearch);
      })
      .then(() => {
        if (toscrol) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  initImages = (images, nextSearch) => {
    if (images.total === 0) {
      toast.error('No any picture');
      this.setState({ error: 'No any picture', status: 'rejected' });
    } else {
      this.setState({
        images: images.hits,
        fetchLength: images.total,
        status: 'resolved',
        page: 1,
        searchbar: nextSearch,
      });
    }
  };

  addImages = images => {
    this.setState(prevState => ({
      images: [...prevState.images, ...images.hits],
      page: prevState.page + 1,
    }));
  };

  modalOpen = (moduleUrl, moduleAlt) => {
    this.setState({
      largeImageURL: moduleUrl,
      alt: moduleAlt,
    });
  };

  modalClose = () => {
    this.setState({ largeImageURL: '', alt: '' });
  };

  onFormSubmit = searchName => {
    if (searchName) {
      this.setState({ searchbar: searchName });
    }
    return;
  };

  getImegesGallaryChildren = (status, images) => {
    if (status === 'idle') {
      return <p>Enter the name of the picture</p>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <p>{this.state.error}</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={images} modalOpen={this.modalOpen} />
          {this.state.images.length !== this.state.fetchLength && (
            <Button onClick={this.loadMore} />
          )}
          {this.state.largeImageURL && (
            <Modal
              largeImageURL={this.state.largeImageURL}
              alt={this.state.alt}
              onClick={this.modalClose}
            />
          )}
        </>
      );
    }
  };

  render() {
    const { images, status } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ToastContainer autoClose={3000} />
        {this.getImegesGallaryChildren(status, images)}
      </Container>
    );
  }
}
