import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PorftolioImage from './PortfolioImage';
import sculpturesPromise from '../sculptures';
import { Sculpture } from '../sculptures';
import { SupportedLanguages } from './LanguageSwitcher';


const PortfolioGrid = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const sculpturesPerPage = 3;
  const [displayedSculptures, setDisplayedSculptures] = useState<Sculpture[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const { i18n } = useTranslation(); // Get i18n instance
  const lang = i18n.language as SupportedLanguages;
  const [sculptures, setSculptures] = useState<Sculpture[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await sculpturesPromise; // Await here inside useEffect
      setSculptures(data);
    }
    loadData();
  }, []);
  
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
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedSculptures.map((sculpture, index) => {
            if (index === displayedSculptures.length - 1) {
              return (
                <div key={sculpture.sculpture_id} className="group relative" ref={lastSculptureElementRef}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <PorftolioImage 
                      src={sculpture.image} 
                      alt={t(`portfolio.sculptures.${sculpture.sculpture_id}.title`)}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-light">{sculpture.title[lang]}</h3>
                    <p className="text-gray-600">{sculpture.description[lang]}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={sculpture.sculpture_id} className="group relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <PorftolioImage 
                      src={sculpture.image}
                      alt={t(`portfolio.sculptures.${sculpture.sculpture_id}.title`)}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-light">{sculpture.title[lang]}</h3>
                    <p className="text-gray-600">{sculpture.description[lang]}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
  );
};

export default PortfolioGrid;