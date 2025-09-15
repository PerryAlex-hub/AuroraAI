import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import "./ChatMessage.css";

function ChatMessage({message, sender}) {
  // const message = props.message || "No message";
  // const sender = props.sender || "No sender";

  //Destructuring
  // const {message, sender} = props;

  /*
    if (sender === "robot") {

        return (
        <div>
        <img src = {sender+".png"} width ="50" />
        {message}
        
        </div>
    );

    }
    */
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img
          className="chat-message-profile"
          src={RobotProfileImage}
          width="50"
        />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img
          className="chat-message-profile"
          src={UserProfileImage}
          width="50"
        />
      )}
    </div>
  );
}

export default ChatMessage;
