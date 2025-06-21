import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { ImageUpload } from '../components/ImageUpload';
import { Toast } from '../components/Toast';
import { ItemType } from '../types/Item';

const itemTypes: ItemType[] = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Accessories', 'Other'];

export const AddItem: React.FC = () => {
  const { addItem } = useItems();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    type: '' as ItemType | '',
    description: ''
  });
  
  const [coverImage, setCoverImage] = useState<string[]>([]);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.description || coverImage.length === 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addItem({
        name: formData.name,
        type: formData.type as ItemType,
        description: formData.description,
        coverImage: coverImage[0],
        additionalImages: additionalImages.length > 0 ? additionalImages : [coverImage[0]]
      });

      setShowToast(true);
      
      // Reset form
      setFormData({ name: '', type: '', description: '' });
      setCoverImage([]);
      setAdditionalImages([]);
      
      // Navigate to view items after short delay
      setTimeout(() => {
        navigate('/view-items');
      }, 2000);
      
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.type && formData.description && coverImage.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Add New Item</h1>
                <p className="text-blue-100">Fill in the details to add a new item to your inventory</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Item Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                >
                  <option value="">Select item type</option>
                  {itemTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Item Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Describe your item in detail..."
                required
              />
            </div>

            <ImageUpload
              label="Cover Image *"
              images={coverImage}
              onChange={setCoverImage}
              multiple={false}
            />

            <ImageUpload
              label="Additional Images (Optional)"
              images={additionalImages}
              onChange={setAdditionalImages}
              multiple={true}
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/view-items')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isFormValid && !isSubmitting
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Adding Item...</span>
                  </>
                ) : (
                  <>
                    <Package className="h-5 w-5" />
                    <span>Add Item</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast
        message="Item successfully added!"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};