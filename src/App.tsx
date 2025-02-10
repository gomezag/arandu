import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Mail } from 'lucide-react';
import { siInstagram } from 'simple-icons';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Hero from './components/Hero';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import PortfolioGrid from './components/PortfolioGrid';
import ContactForm from './components/ContactForm';
import sculptures from './sculptures';

function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18next.language);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-stone-50">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        
        {/* Hero Section */}
        <Hero />

        {/* Content Section */}
        <div className="relative z-10 mt-screen">
          {/* About Section */}
          <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto bg-white">
            <h2 className="text-3xl font-light mb-8 text-center">{t('about.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </section>

          {/* Portfolio Grid */}
          <section className="py-20 bg-white"> {/* bg-white bg-stone-100 */}
            <PortfolioGrid sculptures={sculptures} />
          </section>

        {/* Contact Form Section 
          <section className="py-20 px-4 md:px-8 bg-stone-100">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-light mb-8">{t('contact.title')}</h2>
              <ContactForm />
            </div>
          </section>
        */}
        {/* Contact Section */}
        <section className="py-20 px-4 md:px-8 bg-stone-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-8">{t('contact.title')}</h2>
            <div className="flex justify-center gap-8 text-gray-600">
              <a href="mailto:aranduayalahornung@gmail.com" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <Mail className="w-5 h-5" />
                <span>{t('contact.email')}</span>
              </a>
              <a href="https://www.instagram.com/aranduesculturas" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(siInstagram.svg)}`} alt="Instagram" className="w-5 h-5" />
                <span>{t('contact.instagram')}</span>
              </a>
            </div>
          </div>
        </section>

          {/* Footer */}
          <footer className="py-6 text-center text-gray-600 text-sm bg-stone-100">
            <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </footer>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;