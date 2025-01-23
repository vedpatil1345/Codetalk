# CodeTalk

The Online Code Analysis and Debugging Platform - A comprehensive development environment powered by LLaMA 3.3 70B and Gemini AI for intelligent code analysis, debugging, and optimization.

[Preview](https://codetalk-2.vercel.app)
## Overview

CodeTalk is an advanced web application that combines cutting-edge AI technologies with modern development tools to create a powerful coding assistant. Built with React and TypeScript, it offers developers an intelligent platform for code analysis, debugging, and optimization, leveraging the latest advancements in AI technology.

## Key Features

### Intelligent Code Analysis & Processing
- **Real-time Analysis Engine**
  - Instant code structure evaluation
  - Syntax error detection
  - Performance bottleneck identification
  - Code quality assessment
  - Best practices recommendations

- **AI-Powered Code Processing**
  - LLaMA 3.3 70B integration for deep code understanding
  - Context-aware code suggestions
  - Intelligent error resolution
  - Pattern recognition and optimization proposals
  - Code documentation generation

- **Image-to-Code Conversion**
  - Gemini AI integration for image processing
  - UI mockup to code conversion
  - Design pattern recognition
  - Responsive layout generation
  - Component structure suggestions

### Interactive Development Environment

- **Advanced Code Editor**
  - Syntax highlighting
  - Auto-completion
  - Code formatting
  - Multiple language support
  - Real-time error indicators

- **Voice Integration**
  - Voice-to-code conversion
  - Hands-free coding support
  - Voice command recognition
  - Multi-language voice input
  - Customizable voice triggers

- **Chat Interface**
  - Context-aware code discussions
  - Real-time AI responses
  - Code snippet sharing
  - Historical conversation tracking
  - Clear chat functionality
  - Message persistence

### User Interface & Experience

- **Responsive Design**
  - Desktop-optimized layout
  - Mobile-friendly interface
  - Adaptive component sizing
  - Touch-friendly controls
  - Cross-device synchronization

- **Theme System**
  - Dark/light mode toggle
  - Customizable color schemes
  - Syntax highlighting themes
  - High-contrast options
  - Persistent theme preferences

- **Navigation & Layout**
  - Timeline-based interface
  - Intuitive tool organization
  - Quick access shortcuts
  - Breadcrumb navigation
  - Context-sensitive menus

## Technical Architecture

### Frontend Technology Stack

- **Core Framework**
  - React 18.2.0
  - TypeScript 5.3.3
  - Vite build system
  - React Router v6 for navigation

- **Styling & UI**
  - Tailwind CSS for utility-first styling
  - ShadCN UI component library
  - Custom theme provider
  - Responsive grid system
  - CSS-in-JS solutions

- **State Management**
  - React Context API
  - Custom hooks for state logic
  - Local storage integration
  - Session management
  - Real-time state synchronization

### AI Integration

- **LLaMA 3.3 70B**
  - Integration via Groq API
  - Streaming response handling
  - Error recovery mechanisms
  - Rate limiting management
  - Performance optimization

- **Gemini AI**
  - Image processing capabilities
  - Visual recognition system
  - Code generation from images
  - Layout analysis
  - Component detection

- **LangChain Framework**
  - AI chain management
  - Prompt engineering
  - Response processing
  - Context management
  - Memory systems

### Authentication & Security

- **Firebase Integration**
  - User authentication
  - Session management
  - Security rules
  - Data persistence
  - Real-time updates

- **Protected Routes**
  - Auth context provider
  - Route guards
  - Permission management
  - Session validation
  - Secure redirects

## Project Structure

```bash
src/
├── assets/              # Static assets and resources
├── components/          # Reusable React components
│   ├── auth/           # Authentication components
│   │   ├── AuthContext.tsx
│   │   ├── AuthPage.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── UserMenu.tsx
│   ├── pages/          # Page components
│   │   ├── CodeAnalysisPage.tsx
│   │   ├── CodeWithAi.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ErrorAnalysisPage.tsx
│   │   ├── HelpPage.tsx
│   │   ├── Home.tsx
│   │   ├── Image2CodePage.tsx
│   │   ├── PlayGround.tsx
│   │   └── TranslatePage.tsx
│   └── theme/          # Theming components
│       ├── ThemeProvider.tsx
│       └── ThemeToggle.tsx
├── hooks/              # Custom React hooks
├── lib/               # Third-party library configurations
├── types/             # TypeScript type definitions
└── utils/             # Utility functions and helpers
```

## Setup Guide

### Prerequisites
- Node.js ≥ 14.0.0
- npm ≥ 6.0.0
- Modern web browser with WebSocket support

### Environment Configuration
Create a `.env` file in the project root:

```bash
# AI Service Configuration
VITE_GROQ_API_KEY=your_groq_api_key
VITE_GEMINI_API=your_gemini_api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/vedpatil1345/Codetalk.git
cd Codetalk
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init
```

4. Start development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

### Firebase Setup Details

1. Create a Firebase project
2. Enable Authentication services
3. Configure security rules
4. Set up Firestore database
5. Initialize Firebase in your app

## Core Implementation Details

### AI Integration Implementation
```typescript
const llm = new ChatGroq({
  modelName: 'llama-3.3-70b-versatile',
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  temperature: 0.7
});
```

### Application Routing Structure
```typescript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="auth" element={<AuthPage />} />
    <Route path="playground" element={<PlayGround />}>
      <Route index element={<PlayGroundPage />} />
      <Route path="code-analysis" element={<CodeAnalysisPage />} />
      <Route path="error-analysis" element={<ErrorAnalysisPage />} />
      <Route path="img-code" element={<Image2CodePage />} />
      <Route path="code-translation" element={<TranslatePage />} />
      <Route path="chat" element={<CodeWithAi />} />
    </Route>
  </Route>
</Routes>
```

## Contributing

We welcome contributions to improve CodeTalk! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## Support and Contact

### Lead Developer
Ved Patil
- Email: vedpatil13042005@gmail.com
- LinkedIn: [Ved Patil](https://www.linkedin.com/in/ved-patila71968250)
