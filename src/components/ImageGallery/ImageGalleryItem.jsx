import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemFoto } from './ImageGallery.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, modalOpen }) => {
  return (
    <GalleryItem
      onClick={() => {
        modalOpen(largeImageURL, tags);
      }}
    >
      <GalleryItemFoto src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  modalOpen: PropTypes.func,
  tags: PropTypes.string,
};
