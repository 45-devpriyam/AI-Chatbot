# AI Chatbot Web Application

A full-stack AI-powered web application that combines conversational AI, intelligent text summarization, and creative image generation in one seamless interface.

## Features

- **AI Chat** - Engage in real-time conversations with an advanced AI assistant
- **Text Summarization** - Convert long texts into concise, easy-to-read bullet points
- **AI Image Generation** - Create stunning images from text descriptions using AI
- **Modern UI** - Clean, responsive interface with dark mode support
- **Real-time Processing** - Fast API responses with loading indicators

## Tech Stack

### Frontend
- **React.js** - Modern JavaScript framework for building user interfaces
- **HTML5 & CSS3** - Semantic markup and responsive styling
- **JavaScript (ES6+)** - Modern JavaScript features and syntax
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework for Node.js
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing middleware

### APIs & Services
- **OpenRouter API** - AI model integration for chat and summarization
- **Pollinations API** - Free AI image generation service
- **Firebase Authentication** - User authentication and authorization

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/ai-chatbot.git
cd ai-chatbot
```

### Step 2: Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd ../ai-app
npm install
```

### Step 3: Environment Setup

Create a `.env` file in the `backend` directory:

```env
# OpenRouter API Key
# Get your API key from https://openrouter.ai/keys
OPENROUTER_KEY=your_openrouter_api_key_here

# Server Configuration
PORT=5000
```

### Step 4: Run the Application

#### Start Backend Server
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:5000`

#### Start Frontend Application
```bash
cd ai-app
npm start
```
The frontend application will run on `http://localhost:3000`

## .env Example

```env
# OpenRouter API Configuration
OPENROUTER_KEY=sk-or-v1-your-api-key-here

# Server Port
PORT=5000
```

**Note:** Replace `your_openrouter_api_key_here` with your actual OpenRouter API key. You can get a free API key from [OpenRouter](https://openrouter.ai/keys).

## API Integration

### OpenRouter API
The application uses OpenRouter for AI-powered features:

- **Chatbot** - Uses `meta-llama/llama-3-8b-instruct` model for conversational AI
- **Text Summarizer** - Uses `openai/gpt-3.5-turbo` model with custom system prompts
- **Fallback Support** - Automatic model switching for reliability

### Image Generation API
- **Pollinations AI** - Free, no-API-key required image generation
- **Direct URL Generation** - Instant image URLs from text prompts
- **Fallback System** - Automatic fallback to placeholder images

## Screenshots

### Chat Interface
![Chat Interface](screenshots/chat-interface.png)

### Text Summarization
![Text Summarization](screenshots/text-summarization.png)

### Image Generation
![Image Generation](screenshots/image-generation.png)

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)

## Future Improvements

- [ ] **User Authentication** - Implement Firebase Auth for user accounts
- [ ] **Chat History** - Save and retrieve conversation history
- [ ] **Image Gallery** - Store and manage generated images
- [ ] **Export Features** - Download chat logs and summaries
- [ ] **Voice Input** - Add speech-to-text for chat input
- [ ] **Mobile App** - React Native mobile application
- [ ] **API Rate Limiting** - Implement user-based rate limiting
- [ ] **Dark Mode** - Enhanced dark theme customization
- [ ] **Multi-language Support** - Internationalization (i18n)
- [ ] **Advanced Image Options** - Image style and size customization

## Author

**Developed by [Your Name]**

- **Portfolio:** [Your Portfolio Link]
- **GitHub:** [Your GitHub Profile]
- **LinkedIn:** [Your LinkedIn Profile]
- **Email:** [Your Email Address]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you have any questions or need support, please open an issue on GitHub or contact the author directly.

---

**Built with React, Node.js, and modern AI technologies**
