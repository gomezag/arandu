import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import siteStore from '../store/siteStore'; // Import the site store

interface SculptureFormProps {
  sculpture?: any; // Updated prop type
  onFormSubmit: () => void;
}

const SculptureForm: React.FC<SculptureFormProps> = ({ sculpture, onFormSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    sculptureId: '',
    title: '',
    description: '',
    image: null as File | null,
  });
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const closePopup = () => {
    setPopupMessage(null);
  };

  useEffect(() => {
    if (sculpture) {
      setFormData({
        sculptureId: sculpture.sculptureId || '',
        title: sculpture.title || '',
        description: sculpture.description || '',
        image: null, // Image cannot be prefilled
      });
    }
  }, [sculpture]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append('sculpture_id', formData.sculptureId);
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch('/api/sculptures', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${siteStore.token}`, // Use the token from the site store
        },
      });
      const result = await response;
      if (response.ok) {
        setPopupMessage('Form submitted');
        onFormSubmit(); // Refresh the sculpture list
      } else {
        if (response.status === 498) {
          siteStore.clearToken();
          setPopupMessage('Token expired');

        } else if (response.status === 401) {
          siteStore.clearToken();
          setPopupMessage('Invalid token');
        } else {
          setPopupMessage(`Error submitting form: ${result}`);
        }
      }
    } catch (error) {
      setPopupMessage(`Error submitting form: ${error}`);
    }
  };

  const clearForm = () => {
    setFormData({
      sculptureId: '',
      title: '',
      description: '',
      image: null,
    });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="max-h-70 bg-stone-50">
      <section className="py-20 px-4 md:px-8 bg-stone-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8">{t('upload.title')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-left">
              {t('upload.sculptureId')}
              <input
                type="text"
                name="sculptureId"
                placeholder="Sculpture ID"
                value={formData.sculptureId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            <label className="block text-left">
              {t('upload.title')}
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            <label className="block text-left">
              {t('upload.description')}
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            <label className="block text-left">
              {t('upload.image')}
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required={!sculpture}
              />
            </label>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('upload.upload')}
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="w-full mt-2 bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {t('upload.clear')}
            </button>
          </form>
        </div>
      </section>
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

export default SculptureForm;