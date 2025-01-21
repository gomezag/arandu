import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ModalImage from './ModalImage';

interface Sculpture {
  key: string;
  image: string;
}

interface PortfolioGridProps {
  sculptures: Sculpture[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ sculptures }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const sculpturesPerPage = 3;
  const [displayedSculptures, setDisplayedSculptures] = useState<Sculpture[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setDisplayedSculptures(sculptures.slice(0, sculpturesPerPage));
  }, [sculptures]);

  const lastSculptureElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && displayedSculptures.length < sculptures.length) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );
      if (node) observer.current.observe(node);
    },
    [displayedSculptures, sculptures]
  );

  useEffect(() => {
    const newSculptures = sculptures.slice(0, currentPage * sculpturesPerPage);
    setDisplayedSculptures(newSculptures);
  }, [currentPage, sculptures]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-light mb-12 text-center">{t('portfolio.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedSculptures.map((sculpture, index) => {
            if (index === displayedSculptures.length - 1) {
              return (
                <div key={sculpture.key} className="group relative" ref={lastSculptureElementRef}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <ModalImage 
                      src={sculpture.image} 
                      alt={t(`portfolio.sculptures.${sculpture.key}.title`)}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-light">{t(`portfolio.sculptures.${sculpture.key}.title`)}</h3>
                    <p className="text-gray-600">{t(`portfolio.sculptures.${sculpture.key}.description`)}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={sculpture.key} className="group relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <ModalImage 
                      src={sculpture.image} 
                      alt={t(`portfolio.sculptures.${sculpture.key}.title`)}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-light">{t(`portfolio.sculptures.${sculpture.key}.title`)}</h3>
                    <p className="text-gray-600">{t(`portfolio.sculptures.${sculpture.key}.description`)}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;