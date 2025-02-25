import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import siteStore from '../store/siteStore'; // Import the site store
import { FaStar } from 'react-icons/fa';
import { Sculpture, TranslationString } from '../sculptures';
import { SupportedLanguages, languages } from './LanguageSwitcher';

interface SculptureFormProps {
  sculpture?: Sculpture;
  onFormSubmit: (message: string | null) => void;
  onFormClean: () => void;
}

interface SculptureFormData {
  sculptureId: string;
  title: TranslationString | null;
  description: TranslationString | null;
  excerpt: TranslationString | null;
  image: File | null;
  is_starred: boolean;
}

const SculptureForm: React.FC<SculptureFormProps> = ({ sculpture, onFormSubmit, onFormClean }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<SculptureFormData>({
    sculptureId: sculpture?.sculpture_id || '',
    title: { es: '', en: '', de: '' },
    description: { es: '', en: '', de: '' },
    excerpt: { es: '', en: '', de: '' },
    image:  null,
    is_starred: sculpture?.is_starred ?? false, // Use nullish coalescing for booleans
  });
  const { i18n } = useTranslation();
  const lang = i18n.language as SupportedLanguages;

  useEffect(() => {
    if (sculpture) {
      setFormData({
        sculptureId: sculpture.sculpture_id || '',
        title: sculpture.title || { es: '', en: '', de: '' },
        description: sculpture.description || { es: '', en: '', de: '' },
        excerpt: sculpture.excerpt || { es: '', en: '', de: '' },
        image: null, // Image cannot be prefilled,
        is_starred: sculpture.is_starred
      });
    }
  }, [sculpture]);

  const handleTranslatedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const lang = e.target.dataset.lang as keyof TranslationString | undefined;
    if (!lang) return; // Ensure lang is valid
  
    const { name, value } = e.target;
    const fieldName = name.replace(`_${lang}`, "") as keyof Pick<SculptureFormData, "title" | "description" >;
  
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: {
        ...(prevData[fieldName] as TranslationString), // Explicitly cast as TranslationString
        [lang]: value,
      },
    }));
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleStar = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if(checked) {
    setFormData((prevData) => ({
      ...prevData,
      is_starred: true,
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      is_starred: false,
    }));
  }
  console.log(formData);
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
    data.append('title', JSON.stringify(formData.title));
    data.append('description', JSON.stringify(formData.description));
    data.append('excerpt', JSON.stringify(formData.excerpt));
    if (formData.image) {
      data.append('image', formData.image);
    }
    if (formData.is_starred){
      data.append('is_starred', 'true');
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
        onFormSubmit(t('upload.uploaded')); // Refresh the sculpture list
      } else {
        if (response.status === 498) {
          siteStore.clearToken();
          onFormSubmit('Token expired');

        } else if (response.status === 401) {
          siteStore.clearToken();
          onFormSubmit('Invalid token');
        } else {
          onFormSubmit(`Error submitting form: ${result}`);
        }
      }
    } catch (error) {
      onFormSubmit(`Error submitting form: ${error}`);
    }
  };

  const clearForm = () => {
    setFormData({
      sculptureId: '',
      title: null,
      description: null,
      excerpt: null,
      image: null,
      is_starred: false,
    })
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    onFormClean();
  };

  return (
    <div className="max-h-70 bg-stone-50">
      <section className="py-20 px-4 md:px-8 bg-stone-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8">{t('upload.header')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
            <label className="block text-left">
              {t('upload.sculptureId')}
              <input
              type="text"
              name="sculptureId"
              placeholder="Sculpture ID"
              value={formData.sculptureId}
              onChange={handleChange}
              className={`w-full p-2 border border-gray-300 rounded mt-1 ${sculpture ? 'bg-gray-200' : ''}`}
              required
              disabled={!!sculpture}
              />
            </label>
            {languages.map((language, index)=>(
              <div
                key={"key_"+language.code}>
                <h3> {language.name} </h3>
              <label className="block text-left">
              {t('upload.title')}
              <input
                type="text"
                name={"title_"+language.code}
                data-lang={language.code}
                placeholder="Title"
                value={formData.title?.[language.code as SupportedLanguages] ?? ''}
                onChange={handleTranslatedChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            <label className="block text-left">
              {t('upload.description')}
              <textarea
                name={"description_"+language.code}
                data-lang={language.code}
                placeholder="Description"
                value={formData.description?.[language.code as SupportedLanguages] ?? ''}
                onChange={handleTranslatedChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            <label className="block text-left">
              {'Excerpt'}
              <textarea
                name={"excerpt_"+language.code}
                data-lang={language.code}
                placeholder="Excerpt"
                value={formData.excerpt?.[language.code as SupportedLanguages] ?? ''}
                onChange={handleTranslatedChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </label>
            </div>
            ))}
            
            <label className="block text-left">
              {t('upload.image')}
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required={!sculpture}
              />
            </label>
            <label className="block text-left">
              <FaStar className="inline-block" />
              <input
                type="checkbox"
                onChange={handleStar}
                name="is_starred"
                checked={formData.is_starred || false}
                className="w-full p-2 border border-gray-300 rounded mt-1"
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
    </div>
  );
};

export default SculptureForm;