import {useState, useEffect} from "react";
import ChatInput from "./Components/ChatInput";
import ChatMessagesComponents from "./Components/ChatMessagesComponents";
import {Chatbot} from "supersimpledev";
import "./App.css";

function App() {
  // Initialize chatMessages from localStorage or empty array
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem('auroraai-chat-messages');
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch (error) {
      console.error('Error loading saved chat messages:', error);
      return [];
    }
  });

  // Initialize chatbot responses once
  useEffect(() => {
    Chatbot.addResponses({
      "What is AuroraAI?": "AuroraAI is an advanced AI chatbot developed by Lumora.",
      "Who developed you?": "I was developed by the team at Lumora.",
      "What can you do?":
        "I can assist with a variety of tasks including answering questions, providing recommendations, and engaging in conversations.",
      "How do I use you?":
        "Simply type your questions or messages into the chat input and I'll respond as best as I can!",
      "What technologies are you built on?":
        "I am built using state-of-the-art machine learning and natural language processing technologies.",
    });
  }, []); // Empty dependency array - only run once

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('auroraai-chat-messages', JSON.stringify(chatMessages));
    } catch (error) {
      console.error('Error saving chat messages:', error);
    }
  }, [chatMessages]); // Run whenever chatMessages changes


  return (
    <div className="app-bg">
      <div className="ai-header">
        <div className="ai-logo-glow">
          <span role="img" aria-label="AI">
            🤖
          </span>
        </div>
        <h1 className="ai-title">AuroraAI</h1>
        <span className="ai-beta-badge">Prof</span>
      </div>
      <div className="app-container">
        {chatMessages.length === 0 && (
          <div className="welcome-message">
            <h2>Welcome to AuroraAI</h2>
            <p>Ask anything, get instant answers. Powered by AI.</p>
          </div>
        )}
        <ChatMessagesComponents chatMessages={chatMessages} />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </div>
  );
}

export default App;