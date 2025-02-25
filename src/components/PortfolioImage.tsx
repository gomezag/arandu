import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioImageProps {
  src: string;
  alt: string;
  standardWidth?: string;
  standardHeight?: string;
}

const PortfolioImage: React.FC<PortfolioImageProps> = ({ src, alt, standardWidth = '100%', standardHeight = 'auto' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const inputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(img.src);
  }, [src]);

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
            ref={inputRef}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
          </div>
        )}
      </div>

      {/* Modal with Animation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative inline-block"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
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
                  className="w-full h-full max-h-[80vh] object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <p>Loading image...</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

PortfolioImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  standardWidth: PropTypes.string,
  standardHeight: PropTypes.string,
};

export default PortfolioImage;
