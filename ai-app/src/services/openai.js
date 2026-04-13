import axios from "axios";

// Backend API URL
const BACKEND_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const sendMessageToAI = async (message) => {
  try {
    console.log("Sending message to backend:", message);
    
    const response = await axios.post(
      `${BACKEND_URL}/api/chat`,
      {
        message: message
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Backend response:", response.data);
    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Backend API ERROR:", error.response?.data || error.message);
    
    // Handle different types of errors
    if (error.response) {
      // Backend responded with error
      const errorMessage = error.response.data?.error || "Backend error";
      console.error("Backend error details:", error.response.data);
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network error
      console.error("Network error:", error.message);
      throw new Error("Failed to connect to backend server");
    } else {
      // Other error
      console.error("Unknown error:", error.message);
      throw new Error("An unexpected error occurred");
    }
  }
};

/**
 * Summarize text using backend API
 * @param {string} text - Text to summarize
 * @returns {Promise<string>} - Summarized text
 */
export const summarizeText = async (text) => {
  try {
    console.log("=== FRONTEND SUMMARIZE DEBUG ===");
    console.log("Input text length:", text.length);
    console.log("Input text preview (first 100 chars):", text.substring(0, 100));
    console.log("Sending request to:", `${BACKEND_URL}/api/summarize`);
    
    const requestBody = { text: text };
    console.log("Request body:", requestBody);
    
    const response = await axios.post(
      `${BACKEND_URL}/api/summarize`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Backend summarization response status:", response.status);
    console.log("Backend summarization response data:", response.data);
    
    // Validate response structure - new format: { summary, model, tokens_used }
    if (!response.data || !response.data.summary) {
      console.error("Invalid backend response structure:", response.data);
      throw new Error('Invalid response structure from backend');
    }
    
    // Extract summary from response
    const summary = response.data.summary;
    const model = response.data.model;
    const tokensUsed = response.data.tokens_used;
    
    if (!summary) {
      console.error("No summary content in backend response");
      throw new Error('No summary received from backend');
    }

    console.log("Extracted summary length:", summary.length);
    console.log("Extracted summary preview:", summary.substring(0, 100));
    console.log("Model used:", model);
    console.log("Tokens used:", tokensUsed);
    console.log("=== FRONTEND SUMMARIZE SUCCESS ===");

    return summary;

  } catch (error) {
    console.error("=== FRONTEND SUMMARIZE ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    
    if (error.response) {
      // Backend responded with error
      console.error("Backend error status:", error.response.status);
      console.error("Backend error data:", error.response.data);
      const errorMessage = error.response.data?.error || "Backend summarization error";
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network error
      console.error("Network error - request made but no response");
      console.error("Request details:", error.request);
      throw new Error("Failed to connect to backend server for summarization");
    } else {
      // Other error
      console.error("Request setup error:", error.message);
      console.error("Error stack:", error.stack);
      throw new Error("An unexpected error occurred during summarization");
    }
  }
};

/**
 * Generate image using simple Pollinations AI endpoint
 * @param {string} prompt - Image generation prompt
 * @returns {Promise<string>} - Generated image URL
 */
export const generateImage = async (prompt) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/generate-image`,
      {
        prompt: prompt
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Return image URL directly
    return response.data.image;

  } catch (error) {
    console.error("Image generation error:", error);
    throw new Error("Failed to generate image");
  }
};