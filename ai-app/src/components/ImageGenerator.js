import React, { useState } from "react";
import { generateImage } from "../services/openai";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setImage("");

    try {
      const imageUrl = await generateImage(prompt);
      setImage(imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex-shrink-0 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">AI Image Generator</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Create stunning images from text descriptions</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Describe the image you want to generate
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A serene mountain landscape at sunset with a lake in the foreground..."
                  className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-300"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleGenerate}
                  disabled={prompt.trim() === ''}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  {loading ? 'Generating...' : 'Generate Image'}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Image */}
          {image && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">Generated Image</h2>
              <img 
                src={image} 
                alt="Generated" 
                className="w-full h-full object-cover rounded-lg transition-colors duration-300" 
                onError={(e) => {
                  console.error("Image loading error:", e);
                  console.error("Failed image URL:", image);
                  setError("Failed to load generated image");
                }}
                onLoad={() => {
                  console.log("Image loaded successfully from URL:", image);
                }}
              />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 transition-colors duration-300">Generation Failed</h2>
              <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{error}</p>
              <button
                onClick={() => setError("")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 transition-colors duration-300">
              <div className="flex flex-col items-center justify-center">
                <div className="flex space-x-2 mb-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Generating your image...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;