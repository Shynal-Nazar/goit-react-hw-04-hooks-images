import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Overlay, ModalForo } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.cleanEventListener);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.cleanEventListener);
  }

  cleanEventListener = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };
  render() {
    const { onClick, largeImageURL, alt } = this.props;
    return (
      <Overlay onClick={onClick}>
        <ModalForo>
          <img src={largeImageURL} alt={alt} />
        </ModalForo>
      </Overlay>
    );
  }
}
export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
