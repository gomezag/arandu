import { siInstagram, siWhatsapp, siGmail } from 'simple-icons';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import PortfolioCarousel from '../components/PortfolioCarousel';
import sculptures from '../sculptures';

const Home = () => {
  const { t } = useTranslation();
  const heroSculptures = sculptures.filter(sculpture => sculpture.hero);

  return (
    <Layout>

      {/* Hero Section */}
      <Hero />
      <div className="relative z-10 mt-screen">
      {/* <section className="max-h-30 py-20 px-4 md:px-8 bg-white bg-opacity-75 rounded-mt max-w-6xl mx-auto mb-0 mt-8 mb-5">
          <h2 className="text-3xl font-light mb-12 text-center">{t('hero.works')}</h2>

          <PortfolioCarousel sculptures={heroSculptures} />

      </section> */}
      {/* Content Section */}
        {/* Contact Section */}
        <section className="py-20 px-4 md:px-8 bg-stone-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-8">{t('contact.title')}</h2>
            <div className="flex justify-center gap-8 text-gray-600">
              <a href="mailto:aranduayalahornung@gmail.com" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(siGmail.svg)}`} alt="Email" className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/aranduescultura" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(siInstagram.svg)}`} alt="Instagram" className="w-5 h-5" />
              </a>
              <a href="https://wa.me/595986560210" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(siWhatsapp.svg)}`} alt="WhatsApp" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
    </div>
    </Layout>
  );
};

export default Home;