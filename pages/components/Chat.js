import { useState, useRef, useEffect } from "react";
import BouncingDotsLoader from "./Loader";
import TypingText from "./TextTyping";

const Chat = ({ getReply }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(scrollToBottom, [loading]);

  const handleSpeak = async (text) => {
    setIsSpeaking(true);
    let voices;
    voices = window.speechSynthesis.getVoices();
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = voices[6];
    speech.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(speech);
  };

  const addUserMessage = async () => {
    const msg1 = {
      text: message,
      sender: "user",
    };

    let msg = data;
    msg.push(msg1);
    setData(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;
    await addUserMessage();
    setLoading(true);

    const output = await getReply(message);
    console.log(output);

    const msg2 = {
      text: output,
      sender: "ai",
    };

    let msg = data;
    msg.push(msg2);
    setData(msg);
    setLoading(false);
    handleSpeak(output);
    setMessage("");
  };

  return (
    <div className="chat__container">
      <div className="chat__header">AlgoBot</div>
      <div className="chat__body">
        <p className="ai__chat">Hii there!</p>
        {data.map((item, index) => (
          <p
            key={index}
            className={item.sender == "ai" ? "ai__chat" : "user__chat"}
          >
            {item.sender == "ai" ? (
              <TypingText inputText={item.text} />
            ) : (
              item.text
            )}
          </p>
        ))}
        {loading && (
          <p className="ai__chat">
            <BouncingDotsLoader />
          </p>
        )}
      </div>

      <div className="input__form">
        <form>
          <label htmlFor="chat_input"></label>
          <input
            autoFocus
            className="input"
            type="chat_input"
            name="chat_input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSubmit} className="send_chat">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
