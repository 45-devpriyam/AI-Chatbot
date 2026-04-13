import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/openai';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await sendMessageToAI(inputMessage);
      
      const botMessage = {
        id: messages.length + 2,
        text: aiResponse.replace(inputMessage, ""),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message to user
      const errorMessage = {
        id: messages.length + 2,
        text: `Sorry, I encountered an error: ${error.message}`,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex-shrink-0 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">AI Chatbot</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Ask me anything about productivity, tasks, or get assistance!</p>
      </div>
      
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4 transition-colors duration-300">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg transition-colors duration-300 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg transition-colors duration-300">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="flex space-x-3 flex-shrink-0">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
          />
          <button
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === ''}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
