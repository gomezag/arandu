import React, { useState, useEffect } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(i18next.language);
  const { t } = useTranslation();

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="absolute top-0 right-0 m-4 text-black focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <div
        className={`absolute right-5 mt-12 w-48 bg-white rounded-md shadow-lg z-20 transition-transform transform origin-top-right ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <ul className="py-1">
          <li>
            <a
              href="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={toggleMenu}
            >
              {t('nav.home')}
            </a>
          </li>
          <li>
            <a
              href="/portfolio"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={toggleMenu}
            >
              {t('nav.portfolio')}
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={toggleMenu}
            >
              {t('nav.about')}
            </a>
          </li>
          {/* <li>
            <a
              href="/contact"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={toggleMenu}
            >
              {t('nav.contact')}
            </a>
          </li> */}
          <li>
            <div className="px-4 py-2">
              <LanguageSwitcher language={language} setLanguage={setLanguage} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;