import { useState, useEffect } from 'react';
import Login from '../components/Login';
import SculptureForm from '../components/SculptureForm';
import LanguageSwitcher from '../components/LanguageSwitcher';
import SculptureList from '../components/SculptureList';
import i18next from 'i18next';
import siteStore from '../store/siteStore'; // Import the site store

const Admin = () => {
  const [language, setLanguage] = useState<string>(i18next.language);
  const [sculptures, setSculptures] = useState<any[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [selectedSculpture, setSelectedSculpture] = useState<any>(null);

  const fetchSculptures = async () => {
    try {
      const response = await fetch('/api/sculptures');
      const data = await response.json();
      setSculptures(data);
    } catch (error) {
      console.error('Error fetching sculptures', error);
    }
  };

  const deleteSculpture = async (sculptureId: string) => {
    try {
      const response = await fetch(`/api/sculptures?sculpture_id=${sculptureId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${siteStore.token}`, // Use the token from the site store
        },
      });
      if (response.ok) {
        fetchSculptures();
        setPopupMessage('Sculpture deleted successfully');
      } else {
        setPopupMessage('Error deleting sculpture');
      }
    } catch (error) {
      setPopupMessage('Error deleting sculpture');
      console.error('Error deleting sculpture', error);
    }
  };

  const handleSculptureClick = (sculpture: any) => {
    setSelectedSculpture(sculpture);
  };

  useEffect(() => {
    fetchSculptures();
  }, []);

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
    <div className="flex">
      <div className="w-1/4 h-screen overflow-y-auto">
        <SculptureList sculptures={sculptures} onDelete={deleteSculpture} onSculptureClick={handleSculptureClick} />
      </div>
      <div className="w-3/4 p-4 fixed right-0 h-screen overflow-y-auto">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        {siteStore.token ? (
          <SculptureForm sculpture={selectedSculpture} onFormSubmit={fetchSculptures} />
        ) : (
          <Login onLogin={setLoggedIn} />
        )}
      </div>
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <p>{popupMessage}</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;