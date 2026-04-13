# AI Chatbot Backend Server

A simple Node.js + Express backend server for the AI Productivity Chatbot.

## Features

- Express server running on port 5000
- POST endpoint `/api/chat` for AI chat functionality
- Integration with OpenRouter API
- Uses `mistralai/mistral-7b-instruct` model
- CORS enabled for frontend communication
- Environment variable configuration
- Comprehensive error handling

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` file and add your OpenRouter API key:
```
OPENROUTER_KEY=your_actual_openrouter_api_key_here
PORT=5000
```

### 3. Get OpenRouter API Key
1. Go to [OpenRouter.ai](https://openrouter.ai/keys)
2. Sign up or log in
3. Generate a new API key
4. Copy the key and add it to your `.env` file

### 4. Start the Server
```bash
node server.js
```

The server will start on port 5000 with the following endpoints:
- Health check: `http://localhost:5000/health`
- Chat endpoint: `http://localhost:5000/api/chat`

## API Endpoints

### POST /api/chat
Accepts a chat message and returns AI response.

**Request Body:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "response": "AI response message here",
  "model": "mistralai/mistral-7b-instruct"
}
```

### GET /health
Health check endpoint to verify server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "AI Chatbot Backend is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Error Handling

The server includes comprehensive error handling for:
- Missing API key
- Invalid input
- Network errors
- API errors
- Server errors

## Dependencies

- `express` - Web framework
- `axios` - HTTP client for API calls
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management

## Usage with Frontend

The frontend should make POST requests to `http://localhost:5000/api/chat` with the user message in the request body.
