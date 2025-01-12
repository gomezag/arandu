import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        className="bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-md border border-gray-300"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}