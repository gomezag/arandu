import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Login from '../components/Login';
import SculptureForm from '../components/SculptureForm';
import SculptureList from '../components/SculptureList';
import siteStore from '../store/siteStore';
import Layout from '../components/Layout';


const Admin = () => {
  const [sculptures, setSculptures] = useState<any[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [selectedSculpture, setSelectedSculpture] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!siteStore.token);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const fetchSculptures = async () => {
    try {
      const response = await fetch('/api/sculptures');
      const data = await response.json();
      setSculptures(data);
    } catch (error) {
      console.error('Error fetching sculptures', error);
    }
  };

  const onFormSubmit = async (message: string | null) => {
    setPopupMessage(message);
    setIsLoggedIn(!!siteStore.token);
    if(isLoggedIn){
      fetchSculptures();
    }
  };

  const deleteSculpture = async (sculptureId: string) => {
    try {
      const response = await fetch(`/api/sculptures?sculpture_id=${sculptureId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${siteStore.token}`,
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
    setIsFormOpen(true);
  };

  const openForm = () => {
    setSelectedSculpture(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
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

  const handleLogin = (message: string | null) => {
    setPopupMessage(message);
    setIsLoggedIn(!!siteStore.token);
  };

  const clearForm = async () => {
    setSelectedSculpture(null);
  };
  
  return (
    <Layout>
      <div className="flex flex-col h-screen w-screen">
        {isLoggedIn ? (
          <div className="flex-1 overflow-y-auto">
            <SculptureList sculptures={sculptures} onDelete={deleteSculpture} onSculptureClick={handleSculptureClick} />
          </div>
        ):
        <Login onLogin={ handleLogin }></Login>
       }
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-md shadow-md text-center m-5">
              <button
                onClick={closeForm}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                &times;
              </button>
              <SculptureForm sculpture={selectedSculpture} onFormSubmit={onFormSubmit} onFormClean={clearForm} />
            </div>
          </div>
        )}
        {popupMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-md shadow-md text-center"
                 >
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none close-button"
              >
                &times;
              </button>
              <p>{popupMessage}</p>
            </div>
          </div>
        )}
        {isLoggedIn && (
          <button
            onClick={openForm}
            className="fixed bottom-4 right-4 bg-green-600 text-white p-10 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaPlus />
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Admin;