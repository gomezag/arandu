import React, { useState, useEffect } from 'react';

interface PorfolioSliderProps {
  images: { image: string }[];
  interval?: number;
}

const PortfolioSlider: React.FC<PorfolioSliderProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden z-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={image.image} alt={`Slide ${index}`} className="w-full h-full object-cover object-top" />
        </div>
      ))}
    </div>
  );
};

export default PortfolioSlider;