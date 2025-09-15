import {useState} from "react";
import {Chatbot} from "supersimpledev";
import "./ChatInput.css";

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setinputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    const response = await Chatbot.getResponseAsync(message);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
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
    </div>
  );
}

export default ChatInput;
