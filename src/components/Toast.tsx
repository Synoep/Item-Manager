import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg ${
        type === 'success' 
          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
          : 'bg-red-50 border border-red-200 text-red-800'
      }`}>
        {type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600" />}
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className={`p-1 rounded-full hover:bg-opacity-20 ${
            type === 'success' ? 'hover:bg-emerald-600' : 'hover:bg-red-600'
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};