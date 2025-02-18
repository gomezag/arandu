import { useTranslation } from 'react-i18next';
import PortfolioGrid from '../components/PortfolioGrid';
import sculptures from '../sculptures';
import Layout from '../components/Layout';
import dormision from '../assets/dormision.jpeg';

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <Layout background={dormision}>
        <section className="py-20 px-4 md:px-8 bg-white bg-opacity-75 rounded-md max-w-6xl mx-auto mt-8 mb-5">
        <h2 className="text-3xl font-light mb-12 text-center">{t('portfolio.title')}</h2>
          <PortfolioGrid sculptures={sculptures} />
        </section>
    </Layout>
  );
};

export default Portfolio;
