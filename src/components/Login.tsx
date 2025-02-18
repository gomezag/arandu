import React, { useState, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import siteStore from '../store/siteStore';

interface LoginProps {
  onLogin?: (loggedIn: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        siteStore.setToken(data.token);
        setPopupMessage(t('login.success'));
        if(onLogin) onLogin(true);

      } else {
        setPopupMessage(t('login.error'));
      }
    } catch (error) {
      if (error instanceof Error) {
        setPopupMessage(`${t('login.error')}: ${error.message}`);
      } else {
        setPopupMessage(t('login.error'));
      }
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      {siteStore.token ? (
        <p className="text-3xl font-light">{t('login.success')}</p>
      ) : (
        <form onSubmit={handleLoginSubmit} className="bg-white p-8 rounded-md shadow-md space-y-4">
          <h2 className="text-3xl font-light mb-8 text-center">{t('login.title')}</h2>
          <label className="block">
            <span className="text-gray-700">{t('login.password')}:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('login.login')}
          </button>
        </form>
      )}
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <p>{popupMessage}</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('login.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;