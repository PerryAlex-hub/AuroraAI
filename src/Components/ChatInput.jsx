import {useState} from "react";
import { GoogleGenAI } from "@google/genai";
import "./ChatInput.css";

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setinputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey: "AIzaSyD6BsFRsOfY_VMEeVh7OYjl9lJ1j9BsNGU" });

  function changeInputText(event) {
    setinputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText.trim() === "") {
      return;
    }

    setIsLoading(true);
    const userMessage = inputText.trim();

    // Add user message
    const newChatMessages = [
      ...chatMessages,
      {
        text: userMessage, // Changed from 'message' to 'text'
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    // Add loading message (store as text, not JSX)
    const messagesWithLoading = [
      ...newChatMessages,
      {
        text: "...", // Simple loading indicator as text
        sender: "robot",
        id: crypto.randomUUID(),
        isLoading: true, // Flag to identify loading message
      },
    ];
    setChatMessages(messagesWithLoading);

    setinputText("");

    try {
      // Get response from Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage,
      });

      // Store the raw text response, not JSX
      const finalMessages = [
        ...newChatMessages,
        {
          text: response.text, // Store raw text
          sender: "robot",
          id: crypto.randomUUID(),
          isMarkdown: true // Flag to indicate this should be rendered as markdown
        },
      ];
      setChatMessages(finalMessages);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Handle error case
      const errorMessages = [
        ...newChatMessages,
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "robot",
          id: crypto.randomUUID(),
          isError: true
        },
      ];
      setChatMessages(errorMessages);
    }

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setinputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.removeItem('auroraai-chat-messages'); // Match the key from App.jsx
  }

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        placeholder="Send a message Chatbot"
        onKeyDown={handleKeyDown}
        size="30"
        type="text"
        value={inputText}
        onChange={changeInputText}
        
      />
      <button 
        className="send-button" 
        onClick={sendMessage}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
      <button className="clear-button" onClick={clearMessages}>
        Clear
      </button>
    </div>
  );
}

export default ChatInput;