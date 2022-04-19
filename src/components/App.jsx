/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
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

export const App = () => {
  const [searchbar, setSearchbar] = useState('');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [fetchLength, setFetchLength] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (searchbar) {
      setStatus('pending');
      setPage(1);
      fatchImages(searchbar, page, initImages, false);
    }
  }, [searchbar]);

  useEffect(() => {
    fatchImages(searchbar, page, addImages, true);
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const fatchImages = (nextSearch, pageNumber, callBackFunc, toscrol) => {
    if (!nextSearch) return;

    Api.fatchImage(nextSearch, pageNumber)
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
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const initImages = (images, nextSearch) => {
    if (images.total === 0) {
      toast.error('No any picture');
      const newError = 'No any picture';
      setError(newError);
      setStatus('rejected');
    } else {
      setImages(images.hits);
      setStatus('resolved');
      setPage(1);
      setSearchbar(nextSearch);
      setFetchLength(images.total);
    }
  };

  const addImages = images => {
    setImages(prevState => [...prevState, ...images.hits]);
  };

  const modalOpen = (moduleUrl, moduleAlt) => {
    setLargeImageURL(moduleUrl);
    setAlt(moduleAlt);
  };

  const modalClose = () => {
    setLargeImageURL('');
    setAlt('');
  };

  const onFormSubmit = searchName => {
    if (searchName) {
      setSearchbar(searchName);
    }
    return;
  };

  const getImegesGallaryChildren = (status, images) => {
    if (status === 'idle') {
      return <p>Enter the name of the picture</p>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <p>{error}</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={images} modalOpen={modalOpen} />
          {images.length !== fetchLength && <Button onClick={loadMore} />}
          {largeImageURL && (
            <Modal
              largeImageURL={largeImageURL}
              alt={alt}
              onClick={modalClose}
            />
          )}
        </>
      );
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={onFormSubmit} />
      <ToastContainer autoClose={3000} />
      {getImegesGallaryChildren(status, images)}
    </Container>
  );
};
