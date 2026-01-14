import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Page Not Found</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg transition-transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;