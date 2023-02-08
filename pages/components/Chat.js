import React, { useState, useRef, useEffect } from "react";
import BouncingDotsLoader from "./Loader";
import TypingText from "./TextTyping";
import { IoMdSend } from "react-icons/io";

const Chat = ({ getReply }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [scroll, setScroll] = useState("");

  const container = useRef(null);

  const Scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = container.current;
    if (scrollHeight <= scrollTop + offsetHeight + 100) {
      container.current?.scrollTo(0, scrollHeight);
    }
  };

  useEffect(() => {
    Scroll();
  }, [scroll]);

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
    setScroll("avs");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;
    await addUserMessage();
    setLoading(true);
    const mssg = message;
    setMessage("");
    const output = await getReply(mssg);
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
  };

  return (
    <div className="chat__container">
      <div className="chat__header">
        <span>AlgoChat</span>
      </div>
      <div className="chat__body" ref={container}>
        <p className="ai__chat">
          Hii there! You can ask me questions related to Algorand Blockchain.
        </p>
        {data.map((item, index) => (
          <p
            key={index}
            className={item.sender == "ai" ? "ai__chat" : "user__chat"}
            data-aos={item.sender == "ai" ? "fade-right" : "fade-left"}
          >
            {item.sender == "ai" ? (
              <TypingText setScroll={setScroll} inputText={item.text} />
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
            <IoMdSend size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
