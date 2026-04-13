import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logout clicked - starting logout process');
    console.log('Current user before logout:', user?.email);
    
    try {
      console.log('Calling signOut(auth)...');
      await signOut(auth);
      console.log('SignOut successful, navigating to login');
      navigate('/login');
    } catch (error) {
      console.error('Logout error details:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Show user-friendly error message based on error type
      let errorMessage = 'Logout failed. Please try again.';
      if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      }
      
      alert(errorMessage);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 w-full transition-colors duration-300">
      <div className="px-6 py-4 flex justify-between items-center w-full">
        {/* Left: App Title */}
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
            AI Productivity
          </h2>
        </div>

        {/* Right: User Info and Controls */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          {/* User Email and Logout */}
          {user && (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">
                {user.email}
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
