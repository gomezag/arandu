import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import sculptures from '../sculptures';
import CustomSlider from './CustomSlider';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const heroSculptures = sculptures.filter(sculpture => sculpture.hero);

  return (
    <header className="relative h-screen overflow-hidden">
      <Helmet>
        <title>Arandu Ayala - Escultor</title>
      </Helmet>
      <div className="fixed inset-0 w-full h-full z-0">
        <CustomSlider images={heroSculptures} />
      </div>
      <div className="absolute inset-0" />
      <div className="relative z-5 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-light mb-4">{t('hero.title')}</h1>
        <p className="text-xl md:text-2xl font-light tracking-wide">{t('hero.subtitle')}</p>
      </div>
    </header>
  );
};

export default Hero;