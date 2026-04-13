import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    console.log('Received chat message:', message);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log('Chat response received');
    res.json(response.data);

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    
    // Handle different types of errors
    if (error.response) {
      console.error('API Error Status:', error.response.status);
      console.error('API Error Data:', error.response.data);
      
      res.status(error.response.status || 500).json({
        error: 'Chat API error',
        details: error.response.data?.error?.message || 'Unknown API error'
      });
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.message);
      res.status(500).json({
        error: 'Network error',
        details: 'Failed to connect to AI service'
      });
    } else {
      // Other error
      console.error('Unknown Error:', error.message);
      res.status(500).json({
        error: 'Server error',
        details: 'An unexpected error occurred'
      });
    }
  }
});

app.post("/api/summarize", async (req, res) => {
  try {
    // Debug: Log entire request body
    console.log('=== SUMMARIZE ENDPOINT DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    const { text } = req.body;

    // Validate input - prevent empty submission
    if (!text) {
      console.error('Validation Error: No text provided');
      return res.status(400).json({ 
        error: 'Text is required for summarization',
        details: 'Please provide text in the request body as { "text": "your text here" }'
      });
    }

    // Additional validation for empty or whitespace-only text
    if (text.trim() === '') {
      console.error('Validation Error: Empty text provided');
      return res.status(400).json({ 
        error: 'Text cannot be empty',
        details: 'Please provide non-empty text for summarization'
      });
    }

    console.log('Text length:', text.length);
    console.log('Text preview (first 100 chars):', text.substring(0, 100));
    
    // Debug API key (masked for security)
    const apiKey = process.env.OPENROUTER_KEY;
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    console.log('API Key preview:', apiKey ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}` : 'N/A');

    // Primary model configuration
    const primaryModel = "openai/gpt-3.5-turbo";
    const fallbackModel = "mistralai/mistral-7b-instruct";
    
    let response;
    let modelUsed = primaryModel;
    
    try {
      console.log(`Attempting primary model: ${primaryModel}`);
      
      // Prepare request body
      const requestBody = {
        model: primaryModel,
        messages: [
          {
            role: "system",
            content: "You are an expert summarizer. Summarize the given text in clear, concise bullet points. Keep it under 100 words."
          },
          {
            role: "user",
            content: `Summarize the following text in bullet points, keep it concise and under 100 words:\n${text}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      };
      
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      console.log('Calling OpenRouter API...');

      response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI App"
          },
          timeout: 30000 // 30 second timeout
        }
      );
      
      console.log(`Primary model ${primaryModel} succeeded`);
      
    } catch (primaryError) {
      console.error(`Primary model ${primaryModel} failed:`, primaryError.message);
      
      // Try fallback model
      try {
        console.log(`Attempting fallback model: ${fallbackModel}`);
        
        const fallbackRequestBody = {
          model: fallbackModel,
          messages: [
            {
              role: "system",
              content: "You are an expert summarizer. Summarize the given text in clear, concise bullet points. Keep it under 100 words."
            },
            {
              role: "user",
              content: `Summarize the following text in bullet points, keep it concise and under 100 words:\n${text}`
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        };
        
        response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          fallbackRequestBody,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:3000",
              "X-Title": "AI App"
            },
            timeout: 30000
          }
        );
        
        modelUsed = fallbackModel;
        console.log(`Fallback model ${fallbackModel} succeeded`);
        
      } catch (fallbackError) {
        console.error(`Fallback model ${fallbackModel} also failed:`, fallbackError.message);
        throw fallbackError; // Re-throw to be caught by outer catch
      }
    }

    console.log('OpenRouter API response status:', response.status);
    console.log('OpenRouter API response data:', JSON.stringify(response.data, null, 2));
    
    // Validate response structure
    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      console.error('Invalid API response structure:', response.data);
      return res.status(500).json({
        error: 'Invalid API response',
        details: 'The AI service returned an invalid response format'
      });
    }

    // Extract clean summary
    const summary = response.data.choices[0].message.content;
    
    if (!summary) {
      console.error('No summary content in response');
      return res.status(500).json({
        error: 'No summary generated',
        details: 'The AI service did not return a summary'
      });
    }

    console.log(`Summarization completed successfully using ${modelUsed}`);
    console.log('Summary length:', summary.length);
    console.log('Summary preview:', summary.substring(0, 100));
    
    // Return clean response
    res.json({
      summary: summary.trim(),
      model: modelUsed,
      tokens_used: response.data.usage?.total_tokens || 0
    });

  } catch (error) {
    console.error('=== SUMMARIZE ENDPOINT ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    
    // Handle different types of errors
    if (error.response) {
      // API responded with error status
      console.error('API Error Status:', error.response.status);
      console.error('API Error Data:', error.response.data);
      
      res.status(error.response.status || 500).json({
        error: 'Summarization failed',
        details: error.response.data?.error?.message || 'Unknown API error',
        status: error.response.status
      });
    } else if (error.request) {
      // Network error - request was made but no response received
      console.error('Network Error - No response received');
      res.status(500).json({
        error: 'Summarization failed',
        details: 'Failed to connect to AI service. Please check your internet connection.'
      });
    } else {
      // Other error - request setup error
      console.error('Request Setup Error:', error.message);
      res.status(500).json({
        error: 'Summarization failed',
        details: 'An unexpected error occurred during request setup'
      });
    }
  }
});

app.post("/api/image", async (req, res) => {
  try {
    const { prompt, style = 'realistic', size = 'medium' } = req.body;

    // Validate input
    if (!prompt) {
      return res.status(400).json({ 
        error: 'Prompt is required' 
      });
    }

    console.log('Received image generation request:', { prompt, style, size });

    // Get API key from environment variables
    const apiKey = process.env.OPENROUTER_KEY;
    if (!apiKey) {
      console.error('OpenRouter API key not found in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    // Enhance prompt with style information
    const enhancedPrompt = `${prompt}, ${style} style, high quality, detailed`;

    // Prepare request to OpenRouter API for image generation
    const requestData = {
      model: "stability-ai/stable-diffusion-2-1",
      prompt: enhancedPrompt,
      n: 1,
      size: "512x512",
      response_format: "url"
    };

    console.log('Calling OpenRouter Image API...');

    // Make request to OpenRouter API
    const response = await axios.post('https://openrouter.ai/api/v1/images/generations', requestData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'AI Productivity Image Generator'
      }
    });

    console.log('OpenRouter Image API response received');

    // Extract image URL from response
    const imageUrl = response.data.data[0].url;

    if (!imageUrl) {
      throw new Error('No image URL received from API');
    }

    // Send response back to frontend
    res.json({
      imageUrl: imageUrl,
      model: "stability-ai/stable-diffusion-2-1"
    });

  } catch (error) {
    console.error('Error in image generation endpoint:', error);

    // Handle different types of errors
    if (error.response) {
      // API responded with error status
      console.error('API Error Status:', error.response.status);
      console.error('API Error Data:', error.response.data);
      
      res.status(error.response.status || 500).json({
        error: 'AI image service error',
        details: error.response.data?.error?.message || 'Unknown API error'
      });
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.message);
      
      // Fallback to placeholder image if API fails
      const seed = prompt.replace(/\s+/g, '').toLowerCase();
      const fallbackUrl = `https://picsum.photos/seed/${seed}/512/512.jpg`;
      
      res.json({
        imageUrl: fallbackUrl,
        model: 'fallback-placeholder',
        isFallback: true
      });
    } else {
      // Other error
      console.error('Unknown Error:', error.message);
      res.status(500).json({
        error: 'Server error',
        details: 'An unexpected error occurred'
      });
    }
  }
});

// Simple Image Generation Endpoint
app.post("/api/generate-image", (req, res) => {
  const { prompt } = req.body;

  // Validate input
  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ 
      error: 'Prompt is required for image generation'
    });
  }

  // Encode prompt for URL
  const encodedPrompt = encodeURIComponent(prompt.trim());
  
  // Generate Pollinations AI URL
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
  
  // Return simple response
  res.json({ image: imageUrl });
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});