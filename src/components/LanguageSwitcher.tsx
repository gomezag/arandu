import React from 'react';
import i18next from 'i18next';
import { FaGlobe } from 'react-icons/fa';

export const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' }
];

export type SupportedLanguages = "es" | "en" | "de";

interface LanguageSwitcherProps {
  language: SupportedLanguages;
  setLanguage: (language: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const handleChange = (event: { target: { value: any; }; }) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18next.changeLanguage(selectedLanguage);
  };

  return (
    <div className="flex items-center space-x-2">
      <FaGlobe className="text-gray-800" /> 
      <select
        value={language}
        onChange={handleChange}
        className="bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-md border border-gray-300"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;