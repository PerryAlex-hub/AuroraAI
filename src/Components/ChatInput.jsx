import {useState} from "react";
// import {Chatbot} from "supersimpledev";
import ReactMarkdown from "react-markdown";
import { GoogleGenAI } from "@google/genai";
import "./ChatInput.css";

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setinputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const ai = new GoogleGenAI({ apiKey: "AIzaSyD6BsFRsOfY_VMEeVh7OYjl9lJ1j9BsNGU" });
  
  // async function main() {
  //   const response = await ai.models.generateContent({
  //     model: "gemini-2.5-flash",
  //     contents: "Explain how AI works in a few words",
  //   });
  //   console.log(response.text);
  // }
  
  // main();

  function changeInputText(event) {
    setinputText(event.target.value);
  }

  const message = inputText;

  async function sendMessage() {

    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: message,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            className="loading-gif"
            src="https://supersimple.dev/images/loading-spinner.gif"
            alt="Loading..."
          />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setinputText("");

    // const response = await Chatbot.getResponseAsync(message);
      const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: inputText,
    });

    setChatMessages([
      ...newChatMessages,
      {
        message: <ReactMarkdown>{response.text}</ReactMarkdown>,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === "click") {
      sendMessage();
    } else if (event.key === "Escape") {
      setinputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.removeItem('messages');
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message Chatbot"
        onKeyDown={handleKeyDown}
        size="30"
        type="text"
        value={inputText}
        onChange={changeInputText}
      />
      <button className="send-button" onClick={sendMessage}>
        {" "}
        Send{" "}
      </button>
      <button className="clear-button" onClick={clearMessages}>
        {" "}
        Clear{" "}
      </button>
    </div>
  );
}

export default ChatInput;
