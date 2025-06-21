import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus, Search, Package, Calendar, Tag } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { ItemModal } from '../components/ItemModal';
import { Toast } from '../components/Toast';
import { Item } from '../types/Item';

export const ViewItems: React.FC = () => {
  const { items, loading } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnquiryToast, setShowEnquiryToast] = useState(false);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleEnquire = (item: Item) => {
    // Simulate sending email enquiry
    console.log(`Sending enquiry email for: ${item.name}`);
    
    // In a real application, you would make an API call here:
    // await fetch('/api/enquiry', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     itemId: item.id,
    //     itemName: item.name,
    //     userEmail: 'customer@example.com',
    //     message: `I'm interested in learning more about ${item.name}.`
    //   })
    // });

    setShowModal(false);
    setShowEnquiryToast(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Item Inventory</h1>
              <p className="text-gray-600">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} in your collection
              </p>
            </div>
            
            <Link
              to="/add-item"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Item</span>
            </Link>
          </div>

          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items by name, type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {items.length === 0 ? 'No items yet' : 'No items found'}
            </h2>
            <p className="text-gray-600 mb-6">
              {items.length === 0 
                ? "Start building your inventory by adding your first item!"
                : "Try adjusting your search terms or add a new item."
              }
            </p>
            <Link
              to="/add-item"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Item</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{item.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ItemModal
        item={selectedItem}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onEnquire={handleEnquire}
      />

      <Toast
        message="Enquiry sent successfully! We'll get back to you soon."
        type="success"
        isVisible={showEnquiryToast}
        onClose={() => setShowEnquiryToast(false)}
      />
    </div>
  );
};