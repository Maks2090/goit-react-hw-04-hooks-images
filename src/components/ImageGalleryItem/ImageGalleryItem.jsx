import PropTypes from 'prop-types';

export default function ImageGalleryItem({writeSrcState, onModal, imageGallery }) {
    const writeState = (e) => {
        writeSrcState(e.target.dataset.src);
        onModal(true);
    };

    return (
        imageGallery.length !== 0 &&
        imageGallery.map((image) => (
            <li key={image.id}>
                <img
                    className="ImageGalleryItem-image"
                    src={image.webformatURL}
                    alt={image.tags}
                    data-src={image.largeImageURL}
                    onClick={writeState}
                />
            </li>
        ))
    );
}


ImageGalleryItem.propTypes = {
    imageGallery: PropTypes.arrayOf(PropTypes.object),
    onModal: PropTypes.func,
    writeSrcState: PropTypes.func,
  };