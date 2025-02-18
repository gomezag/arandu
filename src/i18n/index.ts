import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    fallbackLng: 'es',
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      },
      de: {
        translation: de
      }
    },
    backend: {
      loadPath: '/api/locales/{{lng}}'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;