// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative ">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg font-bold"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
