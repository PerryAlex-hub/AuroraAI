import {useState} from "react";
import ChatInput from "./Components/ChatInput";
import ChatMessagesComponents from "./Components/ChatMessagesComponents";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="app-bg">
      <div className="ai-header">
        <div className="ai-logo-glow">
          <span role="img" aria-label="AI">
            🤖
          </span>
        </div>
        <h1 className="ai-title">AuroraAI</h1>
        <span className="ai-beta-badge">BETA</span>
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
