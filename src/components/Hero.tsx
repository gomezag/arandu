import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PortfolioSlider from './PorfolioSlider';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true); // Loading state

  return (
    <>
      <header className="relative h-screen overflow-hidden">
        <Helmet>
          <title>Arandu Ayala - Escultor</title>
        </Helmet>

        {/* Background Slider (Always Mounted) */}
        <div className="fixed inset-0 w-full h-full z-0">
          <PortfolioSlider onImagesLoaded={() => setLoading(false)} />
        </div>

        {/* Loading Animation (Overlay While Images Are Loading) */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
          </div>
        )}

        {/* Content (Only visible after loading) */}
        {!loading && (
          <div className="relative z-5 flex flex-col items-center justify-center h-full text-white px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-light mb-4">{t('hero.title')}</h1>
            <p className="text-xl md:text-2xl font-light tracking-wide">{t('hero.subtitle')}</p>
          </div>
        )}
      </header>
    </>
  );
};


export default Hero;