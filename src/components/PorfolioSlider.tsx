import React, { useState, useEffect } from 'react';
import sculpturesPromise, { Sculpture } from '../sculptures';

interface PortfolioSliderProps {
  interval?: number;
  onImagesLoaded?: () => void;  // Callback function to notify when all images load
}

const PortfolioSlider: React.FC<PortfolioSliderProps> = ({ interval = 5000, onImagesLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);  // Track loaded images count
  const [sculptures, setSculptures] = useState<Sculpture[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await sculpturesPromise; // Await here inside useEffect
      setSculptures(data.filter(sculpture => sculpture.is_starred));
    }
    loadData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sculptures.length);
    }, interval);

    return () => clearInterval(timer);
  }, [sculptures.length, interval]);
  
  useEffect(() => {
    if (loadedImages === sculptures.length && sculptures.length > 0 && onImagesLoaded) {
      onImagesLoaded();
    }
  }, [loadedImages, sculptures, onImagesLoaded]);

  return (
    <div className="relative w-full h-full overflow-hidden z-0">
      {sculptures.filter(sculpture => sculpture.is_starred).map((image, index) => (
        <div
          key={image.sculpture_id}  // Use a unique key for better performance
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={image.image}
            alt={image.sculpture_id}
            className="w-full h-full object-cover object-top"
            onLoad={() => {
              setLoadedImages((prev) => {
                return prev + 1;
              });}}
          />
        </div>
      ))}
    </div>
  );
};

export default PortfolioSlider;