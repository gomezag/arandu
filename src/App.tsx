import React, { useState, useEffect } from 'react';
import { Hammer, Mail, Instagram, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';

import sagradaFamiliaImage from './assets/sagradaFamilia.jpeg';
import sleepingCatsImage from './assets/sleepingCats.jpeg';
import sirenSongImage from './assets/sirenSong.jpeg';

const sculptures = [
  {
    key: "sagradaFamilia",
    image: sagradaFamiliaImage
  },
  {
    key: "sleepingCats",
    image: sleepingCatsImage
  },
  {
    key: "sirenSong",
    image: sirenSongImage
  }
];

function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18next.language);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <div className="min-h-screen bg-stone-50">
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <header className="relative h-screen">
        <div className="absolute inset-0 bg-black/100">
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-4">{t('hero.title')}</h1>
          <p className="text-xl md:text-2xl font-light tracking-wide">{t('hero.subtitle')}</p>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-light mb-8 text-center">{t('about.title')}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t('about.description')}
        </p>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-light mb-12 text-center">{t('portfolio.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sculptures.map((sculpture) => (
              <div key={sculpture.key} className="group relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={sculpture.image} 
                    alt={t(`portfolio.sculptures.${sculpture.key}.title`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-light">{t(`portfolio.sculptures.${sculpture.key}.title`)}</h3>
                  <p className="text-gray-600">{t(`portfolio.sculptures.${sculpture.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 bg-stone-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8">{t('contact.title')}</h2>
          <div className="flex justify-center gap-8 text-gray-600">
            <a href="mailto:aranduayala@gmail.com" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <Mail className="w-5 h-5" />
              <span>{t('contact.email')}</span>
            </a>
            <a href="https://www.instagram.com/aranduesculturas" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
              <Instagram className="w-5 h-5" />
              <span>{t('contact.instagram')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
}

export default App;