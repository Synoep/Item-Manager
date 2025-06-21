import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Plus, Eye } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
            <Package className="h-6 w-6" />
            <span>ItemManager</span>
          </Link>
          
          <div className="flex space-x-1">
            <Link
              to="/view-items"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/view-items') || isActive('/')
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>View Items</span>
            </Link>
            
            <Link
              to="/add-item"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/add-item')
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};