import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalForo } from './Modal.styled';

const Modal = ({ onClick, largeImageURL, alt }) => {
  useEffect(() => {
    window.addEventListener('keydown', cleanEventListener);
    return () => {
      window.removeEventListener('keydown', cleanEventListener);
    };
  });

  const cleanEventListener = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  return (
    <Overlay onClick={onClick}>
      <ModalForo>
        <img src={largeImageURL} alt={alt} />
      </ModalForo>
    </Overlay>
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};
