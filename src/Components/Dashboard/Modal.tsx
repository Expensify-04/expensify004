import React from "react";
import type {ModalProps} from "../../Types/Types";

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative ">
        <button
          className="absolute text-lg font-bold text-gray-500 top-2 right-3 hover:text-red-600"
          onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
