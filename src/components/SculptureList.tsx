import React, { useState, useEffect } from 'react';
import SculptureForm from './SculptureForm'; // Import the SculptureForm component
import siteStore from '../store/siteStore';
interface Sculpture {
  sculptureId: string;
  title: string;
  description: string;
  image: string;
}

interface SculptureListProps {
  sculptures: Sculpture[];
  onDelete: (sculptureId: string) => void;
  onSculptureClick: (sculpture: Sculpture) => void; // New prop
}

const SculptureList: React.FC<SculptureListProps> = ({ sculptures, onDelete, onSculptureClick }) => {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [selectedSculpture, setSelectedSculpture] = useState<Sculpture | null>(null); // State to manage selected sculpture

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

  const closeFormPopup = () => {
    setSelectedSculpture(null); // Close the form popup
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setConfirmDelete(null);
        closeFormPopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-w-screen p-4 bg-gray-100">
            {siteStore.token && <h2 className="text-xl font-bold mb-4">Current Sculptures</h2>                }

        {siteStore.token && (            
            sculptures.map((sculpture) => (
            <div key={sculpture.sculptureId} className="mb-4 p-4 bg-white rounded shadow" onClick={() => handleSculptureClick(sculpture)}>
            <img src={sculpture.image} alt={sculpture.title} className="w-full h-32 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{sculpture.title}</h3>
            <p className="text-gray-600">{sculpture.description}</p>
            <button
                onClick={(e) => { e.stopPropagation(); handleDelete(sculpture.sculptureId); }}
                className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Delete
            </button>
            {confirmDelete === sculpture.sculptureId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md shadow-md text-center">
                    <p>Are you sure you want to delete this sculpture?</p>
                    <button
                    onClick={() => confirmDeletion(sculpture.sculptureId)}
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
        )))}
      {selectedSculpture && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-h-screen overflow-y-auto">
          <div className="bg-white p-8 rounded-md shadow-md">
            <SculptureForm
              sculpture={selectedSculpture}
              onFormSubmit={closeFormPopup}
            />
            <button
              onClick={closeFormPopup}
              className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SculptureList;
