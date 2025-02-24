import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

interface PortfolioImageProps {
  src: string;
  alt: string;
  standardWidth?: string;
  standardHeight?: string;
}

const PorftolioImage: React.FC<PortfolioImageProps> = ({ src, alt, standardWidth = '100%', standardHeight = 'auto' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const inputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {setImageSrc(img.src)};
  }, []);
  
  
  
  return (
    <div>
      {/* Thumbnail */}
      <div
        className="aspect-[3/4] overflow-hidden cursor-pointer"
        style={{ width: standardWidth, height: standardHeight }}
        onClick={openModal}
      >
      {imageSrc ? (
        <img 
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          ref={ inputRef }
        />) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
          </div>
        )}
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
            {imageSrc ? (
              <img 
                src={imageSrc}
                alt={alt}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />) : (
                <p>Loading image...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

PorftolioImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  standardWidth: PropTypes.string,
  standardHeight: PropTypes.string,
};

export default PorftolioImage;