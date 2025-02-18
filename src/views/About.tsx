import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import madreDeDos from '../assets/madreDeDos.jpeg';

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout>
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${madreDeDos})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
    >
      <section className="py-20 px-4 md:px-8 bg-white bg-opacity-75 rounded-md max-w-6xl mx-auto">
        <h2 className="text-3xl font-light mb-8 text-center">{t('about.title')}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {t('about.description')}
        </p>
      </section>
    </div>
    </Layout>
  );
};

export default About;
