import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  multiple?: boolean;
  images: string[];
  onChange: (images: string[]) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  multiple = false,
  images,
  onChange,
  className = ''
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) return;

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (multiple) {
          onChange([...images, result]);
        } else {
          onChange([result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          id={`file-${label}`}
        />
        
        <label
          htmlFor={`file-${label}`}
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <Upload className="h-10 w-10 text-gray-400" />
          <div className="text-sm text-gray-600">
            <span className="text-blue-600 font-medium">Click to upload</span>
            {' or drag and drop'}
          </div>
          <div className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB {multiple && '(multiple files)'}
          </div>
        </label>
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};