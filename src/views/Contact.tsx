import { siInstagram, siWhatsapp, siGmail } from 'simple-icons';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import kitsune from '../assets/kitsune.jpeg';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Layout background={kitsune}>
      <section className="mt-8 mb-8 flex text-center justify-center bg-white-50">
        <div className="w-full max-w-10xl">
            <div className="py-20 px-4 md:px-8 bg-white bg-opacity-75 rounded-md max-w-6xl mx-auto">
                <div className="text-3xl font-light mb-8 text-center">{t('contact.title')}</div>
                <div className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-left">
                <p> {t('contact.description')}</p>
                </div>

            <ContactForm />
            </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-stone-100">
        <div className="max-w-6xl mx-auto text-center">
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
    </Layout>
  );
};

export default Contact;
