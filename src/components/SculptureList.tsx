import React, { useState, FormEvent, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { ImStarEmpty } from 'react-icons/im';
import siteStore from '../store/siteStore';
import { Sculpture } from '../sculptures';
import { useTranslation } from "react-i18next";
import { SupportedLanguages } from './LanguageSwitcher';

interface SculptureListProps {
  sculptures: Sculpture[];
  onDelete: (sculptureId: string) => void;
  onSculptureClick: (sculpture: Sculpture) => void;
}

const SculptureList: React.FC<SculptureListProps> = ({ sculptures, onDelete, onSculptureClick }) => {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const { i18n } = useTranslation(); // Get i18n instance
  const lang = i18n.language as SupportedLanguages;

  const handleDelete = (sculptureId: string) => {
    setConfirmDelete(sculptureId);
  };

  const confirmDeletion = (sculptureId: string) => {
    onDelete(sculptureId);
    setConfirmDelete(null);
  };

  const handleSculptureClick = (sculpture: Sculpture) => {
    onSculptureClick(sculpture); // Call the new prop function
  };

  const changeStar = async (sculpture: Sculpture) => {
    const data = new FormData();
    if(!sculpture.is_starred) {
      data.append('is_starred', 'true');
    }
      
      const response = await fetch('/api/sculptures', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${siteStore.token}`, // Use the token from the site store
        },
      });
      const result = await response;
      if(response.ok){
        setToggle(!toggle);
      }
      else{
        
      }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <h2 className="text-xl font-bold mb-4">Current Sculptures</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sculptures && sculptures.map((sculpture) => (
          <div key={sculpture.sculpture_id}>
              <div key={sculpture.sculpture_id} className="group relative p-4 bg-white rounded shadow">
                <div className="aspect-[3/4] overflow-hidden" onClick={() => handleSculptureClick(sculpture)}>
                  <img src={sculpture.image} alt={sculpture.title[lang]} className="w-full h-full object-cover mb-2 rounded" />
                </div>

              <div className="flex justify-center p-3">
                  <h3 className="text-lg font-semibold">{sculpture.title[lang]} 
                  </h3>
                  <div >
                  {sculpture.is_starred ? <FaStar /> : ''}
                  </div>
              </div>
                <p className="text-gray-600">{sculpture.description[lang]}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(sculpture.sculpture_id); }}
                  className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
              {confirmDelete === sculpture.sculpture_id && (
                  <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md text-center">
                      <p>Are you sure you want to delete this sculpture?</p>
                      <button
                        onClick={() => confirmDeletion(sculpture.sculpture_id)}
                        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SculptureList;
