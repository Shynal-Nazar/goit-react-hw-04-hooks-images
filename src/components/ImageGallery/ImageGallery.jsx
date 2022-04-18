import ImageGalleryItem from './ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, modalOpen }) => {
  return (
    <ImageGalleryList>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            tags={image.tags}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            modalOpen={modalOpen}
          />
        );
      })}
    </ImageGalleryList>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
  modalOpen: PropTypes.func,
};
