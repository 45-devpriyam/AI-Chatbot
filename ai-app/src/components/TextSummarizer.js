import React, { useState } from 'react';
import { summarizeText } from '../services/openai';

const TextSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryLength, setSummaryLength] = useState('medium');

  const handleSummarize = async () => {
    if (inputText.trim() === '') return;

    setIsSummarizing(true);
    
    try {
      // Send to backend summarization API
      const aiResponse = await summarizeText(inputText);
      setSummary(aiResponse);
      setIsSummarizing(false);
    } catch (error) {
      console.error('Error summarizing text:', error);
      setSummary(`Error: ${error.message}`);
      setIsSummarizing(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setSummary('');
  };

  const wordCount = inputText.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex-shrink-0 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Text Summarizer</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Get concise summaries of your text using AI</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Enter your text to summarize
              </label>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Word count: {wordCount}</span>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Summary length:</label>
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste or type your text here..."
                className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-300"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSummarize}
                disabled={inputText.trim() === '' || isSummarizing}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isSummarizing ? 'Summarizing...' : 'Summarize'}
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Summary Result */}
          {(summary || isSummarizing) && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">Summary</h2>
              {isSummarizing ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">{summary}</p>
                </div>
              )}
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">â¡</span>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">Fast Processing</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Get summaries in seconds with our AI-powered engine</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">ð</span>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">Multiple Lengths</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Choose from short, medium, or long summaries</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">ð</span>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">Accurate Results</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Preserve key information while reducing text length</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSummarizer;
