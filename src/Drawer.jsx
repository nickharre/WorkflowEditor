import React from 'react';

const Drawer = ({ isOpen, onClose, label, onLabelChange, nodeId }) => {
  if (!isOpen) return null; // Don't render if the drawer is closed

  const handleLabelChange = (e) => {
    onLabelChange(nodeId, e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-1/3">
        <h2>Edit Node Label</h2>
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          className="mt-2 p-1 w-full border"
        />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Close
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;