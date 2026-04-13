import React from 'react';

const Sidebar = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'chatbot', icon: 'ð¤', label: 'Chatbot' },
    { id: 'summarizer', icon: 'ð', label: 'Text Summarizer' },
    { id: 'generator', icon: 'ð', label: 'Image Generator' }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col transition-colors duration-300">
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 transition-colors duration-300">AI Tools</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeItem === item.id
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
