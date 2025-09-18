import {useEffect, useRef} from "react";
import ChatMessage from "./ChatMessage";
import ReactMarkdown from 'react-markdown'
import "./ChatMessagescontainer.css";

function ChatMessagesComponents({chatMessages}) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

   const prepareMessageContent = (chatMessage) => {
    // Handle loading state
    if (chatMessage.isLoading) {
      return (
        <div className="loading-message">
          <img
            className="loading-gif"
            src="https://supersimple.dev/images/loading-spinner.gif"
            alt="Loading..."
          />
        </div>
      );
    }

    // Handle error state
    if (chatMessage.isError) {
      return (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {chatMessage.text}
        </div>
      );
    }

    // Handle markdown content (AI responses)
    if (chatMessage.isMarkdown) {
      return <ReactMarkdown>{chatMessage.text}</ReactMarkdown>;
    }

    // Handle regular text (user messages)
    return chatMessage.text;
  };

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage, index) => {
        return (
          <ChatMessage
            message={prepareMessageContent(chatMessage)}
            sender={chatMessage.sender}
            key={chatMessage.id || index}
          />
        );
      })}
    </div>
  );
}

export default ChatMessagesComponents;
