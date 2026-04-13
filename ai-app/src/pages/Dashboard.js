import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import TextSummarizer from '../components/TextSummarizer';
import ImageGenerator from '../components/ImageGenerator';
import { ThemeProvider } from '../contexts/ThemeContext';

const Dashboard = ({ user }) => {
  const [activeItem, setActiveItem] = useState('chatbot');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'chatbot':
        return <Chatbot />;
      case 'summarizer':
        return <TextSummarizer />;
      case 'generator':
        return <ImageGenerator />;
      default:
        return <Chatbot />;
    }
  };

  return (
    <ThemeProvider>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
        {/* Fixed Navbar at top */}
        <div className="flex-shrink-0">
          <Navbar user={user} />
        </div>
        
        {/* Main content area with sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Fixed Sidebar */}
          <div className={`
            flex-shrink-0 z-50
            fixed md:relative inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Main content area - doesn't overlap sidebar */}
          <main className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
