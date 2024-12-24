import React from 'react';
import WebpageDesign from './components/WebpageDesign';
import Footer from './components/Footer';
import './App.css'; // Optional global styles
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider> {/* Wrap your application in the AuthProvider */}
      <div className="app-container"> {/* Add a wrapper for consistent styling */}
        <WebpageDesign />
              </div>
    </AuthProvider>
  );
}

export default App;
