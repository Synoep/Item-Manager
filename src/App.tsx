import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ViewItems } from './pages/ViewItems';
import { AddItem } from './pages/AddItem';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/view-items" replace />} />
          <Route path="/view-items" element={<ViewItems />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;