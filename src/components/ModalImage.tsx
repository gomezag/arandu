import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface ModalImageProps {
  src: string;
  alt: string;
  standardWidth?: string;
  standardHeight?: string;
}

const ModalImage: React.FC<ModalImageProps> = ({ src, alt, standardWidth, standardHeight }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Thumbnail */}
      <div
        className="aspect-[3/4] overflow-hidden cursor-pointer"
        style={{ width: standardWidth, height: standardHeight }}
        onClick={openModal}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img src={src} alt={alt} className="max-w-[80vw] max-h-[80vh] w-full h-auto object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

ModalImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  standardWidth: PropTypes.string,
  standardHeight: PropTypes.string,
};

ModalImage.defaultProps = {
  standardWidth: '100%',
  standardHeight: 'auto',
};

export default ModalImage;