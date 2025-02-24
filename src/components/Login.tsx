import React, { useState, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import siteStore from '../store/siteStore';

interface LoginProps {
  onLogin: (message: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
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
        try {
          const data = await response.json();
          siteStore.setToken(data.token);
          onLogin(t('login.success'));
        } catch(error){
          onLogin(t('login.error'));
        }
      } else {
        onLogin(t('login.error'));
      }
    } catch (error) {
      if (error instanceof Error) {
        onLogin(`${t('login.error')}: ${error.message}`);
      } else {
        onLogin(t('login.error'));
      }
    }
  };

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
    </div>
  );
};

export default Login;