import { useState, useEffect } from 'react';
import { Item } from '../types/Item';

const STORAGE_KEY = 'items-storage';

// Static initial items for demonstration
const initialItems: Item[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    type: 'Shirt',
    description: 'A comfortable, high-quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a relaxed fit.',
    coverImage: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
    additionalImages: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Running Sneakers',
    type: 'Shoes',
    description: 'Professional running shoes with advanced cushioning technology. Perfect for both casual walks and intense workouts.',
    coverImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    additionalImages: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Denim Jeans',
    type: 'Pant',
    description: 'Classic blue denim jeans with a modern fit. Made from premium denim fabric with excellent durability and comfort.',
    coverImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
    additionalImages: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    createdAt: new Date('2024-01-08')
  }
];

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Load items from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedItems = JSON.parse(stored).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt)
        }));
        setItems(parsedItems);
      } else {
        // If no stored items, use initial items
        setItems(initialItems);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialItems));
      }
    } catch (error) {
      console.error('Error loading items:', error);
      setItems(initialItems);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loading]);

  const addItem = (item: Omit<Item, 'id' | 'createdAt'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const getItemById = (id: string) => {
    return items.find(item => item.id === id);
  };

  return {
    items,
    loading,
    addItem,
    getItemById
  };
};