import React, { useState } from 'react';
import sculptures from '../sculptures';
import { useTranslation } from 'react-i18next';


const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [sculpture, setSculpture] = useState(sculptures[0].key);
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:aranduayalahornung@gmail.com?subject=Query about ${sculpture}&body=Name: ${name}%0D%0AContact: ${contact}%0D%0ASculpture: ${sculpture}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          {t('contactForm.name')}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
            {t('contactForm.contact')}
        </label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sculpture">
        {t('contactForm.sculpture')}
        </label>
        <select
          id="sculpture"
          value={sculpture}
          onChange={(e) => setSculpture(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          {sculptures.map((sculpture) => (
            <option key={sculpture.key} value={sculpture.key}>
              {t(`portfolio.sculptures.${sculpture.key}.title`)}
            </option>
          ))}
          <option key="other" value="other">{t('contactForm.other')}</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
        {t('contactForm.message')}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t('contactForm.send')}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;