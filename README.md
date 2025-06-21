# Item Management System

A modern, responsive web application built with React and TypeScript for managing inventory items. Features a clean interface for adding, viewing, and enquiring about items with image upload capabilities and persistent storage.

## 🚀 Features

### Core Features
- **Add Items**: Create new inventory items with detailed information
- **View Items**: Browse all items in a responsive grid layout
- **Item Details**: View full item details in an interactive modal
- **Image Management**: Upload cover images and additional images with drag-and-drop
- **Search Functionality**: Filter items by name, type, or description
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Bonus Features
- **Persistent Storage**: Items are saved to browser's localStorage (database simulation)
- **Email Enquiry System**: Simulated email functionality for item enquiries
- **Image Carousel**: Navigate through multiple item images
- **Toast Notifications**: User feedback for successful actions
- **Form Validation**: Comprehensive form validation with visual feedback

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router DOM for navigation
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **State Management**: React hooks with custom useItems hook
- **Storage**: Browser localStorage for data persistence

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── ImageCarousel.tsx   # Image carousel with navigation
│   ├── ImageUpload.tsx     # Drag-and-drop image upload
│   ├── ItemModal.tsx       # Item details modal
│   ├── Navigation.tsx      # Main navigation header
│   └── Toast.tsx          # Notification component
├── hooks/                  # Custom React hooks
│   └── useItems.ts        # Items state management
├── pages/                  # Main page components
│   ├── AddItem.tsx        # Add new item form
│   └── ViewItems.tsx      # Items listing and search
├── types/                  # TypeScript type definitions
│   └── Item.ts            # Item interface and types
├── App.tsx                # Main app component with routing
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## 🚦 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd item-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📖 How It Works

### Data Flow

1. **Application Initialization**
   - App loads and checks localStorage for existing items
   - If no items exist, loads demo items for demonstration
   - Items are managed through the `useItems` custom hook

2. **Adding New Items**
   - User fills out the form on the "Add Item" page
   - Images are converted to base64 for storage
   - Form validation ensures all required fields are completed
   - Item is saved to localStorage and added to the items list
   - Success notification is shown and user is redirected

3. **Viewing Items**
   - Items are displayed in a responsive grid layout
   - Search functionality filters items in real-time
   - Click on any item to open detailed modal view

4. **Item Details & Enquiry**
   - Modal displays full item information and image carousel
   - "Enquire" button simulates sending an email enquiry
   - Toast notification confirms enquiry submission

### Storage System

The application uses browser localStorage to simulate a database:

```typescript
// Data is automatically saved when items change
useEffect(() => {
  localStorage.setItem('items-storage', JSON.stringify(items));
}, [items]);

// Data is loaded when the app starts
useEffect(() => {
  const stored = localStorage.getItem('items-storage');
  if (stored) {
    setItems(JSON.parse(stored));
  }
}, []);
```

### Image Handling

Images are handled using the FileReader API:
- Files are converted to base64 strings for storage
- Drag-and-drop functionality for better user experience
- Image previews with removal capability
- Support for multiple image formats (PNG, JPG, GIF)

## 🎨 Design Features

### UI/UX Highlights
- **Modern Design**: Clean, professional interface with gradients and shadows
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Loading States**: Visual feedback during form submission and data loading

### Color Scheme
- Primary: Blue gradient (`from-blue-600 to-purple-600`)
- Success: Emerald green for positive actions
- Neutral: Gray scale for text and backgrounds
- Interactive: Blue accents for links and buttons

## 🔧 Customization

### Adding New Item Types
Edit the `itemTypes` array in `src/pages/AddItem.tsx`:
```typescript
const itemTypes: ItemType[] = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Accessories', 'Other'];
```

### Modifying Storage
To integrate with a real database, update the `useItems` hook in `src/hooks/useItems.ts` to make API calls instead of using localStorage.

### Styling Changes
The application uses Tailwind CSS. Modify classes in components or extend the theme in `tailwind.config.js`.

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Traditional Hosting**: Upload `dist` folder contents to your web server

## 🔮 Future Enhancements

### Potential Improvements
- **Real Database Integration**: Connect to PostgreSQL, MongoDB, or Firebase
- **User Authentication**: Add login/signup functionality
- **Email Service**: Integrate with SendGrid, Mailgun, or similar service
- **Image Optimization**: Compress images before storage
- **Advanced Search**: Add filters by category, date, etc.
- **Bulk Operations**: Select and manage multiple items
- **Export Functionality**: Export items to CSV or PDF
- **Admin Dashboard**: Analytics and item management tools

### API Integration Example
```typescript
// Example of how to integrate with a real API
const addItem = async (item: Omit<Item, 'id' | 'createdAt'>) => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  
  if (response.ok) {
    const newItem = await response.json();
    setItems(prev => [newItem, ...prev]);
    return newItem;
  }
};
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help with the project, please open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**