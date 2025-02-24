import { useState, useRef } from "react";

interface Sculpture {
  image: string;
}

interface PortfolioCarouselProps {
  sculptures: Sculpture[];
}

export default function PortfolioCarousel({ sculptures }: PortfolioCarouselProps) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const totalSlides = sculptures.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full max-w-3xl mx-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="flex items-center justify-center gap-4 overflow-hidden"
      >
        <div
          className="relative flex w-full flex-shrink-0 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {sculptures.map((sculpture, sculptureIndex) => (
            <div key={sculptureIndex} className="w-full flex-shrink-0">
              <img src={sculpture.image} alt={`Sculpture ${sculptureIndex + 1}`} className="w-full rounded-lg shadow-lg object-cover" loading="lazy"/>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition"
      >
        &#9664;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition"
      >
        &#9654;
      </button>
    </div>
  );
}
