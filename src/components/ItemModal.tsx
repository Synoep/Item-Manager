import React from 'react';
import { X, Mail, Calendar, Tag } from 'lucide-react';
import { Item } from '../types/Item';
import { ImageCarousel } from './ImageCarousel';

interface ItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (item: Item) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose, onEnquire }) => {
  if (!isOpen || !item) return null;

  const handleEnquire = () => {
    onEnquire(item);
    // Simulate sending email - in real app, this would call an API
    console.log(`Enquiry sent for item: ${item.name}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-90 text-gray-600 rounded-full hover:bg-opacity-100 hover:text-gray-800 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              <div>
                <ImageCarousel
                  images={item.additionalImages.length > 0 ? item.additionalImages : [item.coverImage]}
                  className="mb-4"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Tag className="h-4 w-4" />
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>

                <div className="border-t pt-6">
                  <button
                    onClick={handleEnquire}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Enquire About This Item</span>
                  </button>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};