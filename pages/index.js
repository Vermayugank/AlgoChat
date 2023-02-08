import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import linkedinLogo from "../assets/linkedin-logo.png";
import { useState } from "react";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // const callGenerateEndpoint = async () => {
  //   setIsGenerating(true);

  //   console.log("Calling OpenAI...");
  //   const response = await fetch("/api/generate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userInput }),
  //   });

  //   const data = await response.json();
  //   const { output } = data;
  //   console.log("OpenAI replied...", output.text);

  //   setApiOutput(`${output.text}`);
  //   setIsGenerating(false);
  // };

  const getReply = async (ques) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usrInput:ques }),
    });

    const data = await response.json();
    return data.output.text;
  };

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      {/* <Navbar /> */}
      <Chat getReply={getReply}/>

      {/* <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Question Bot</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask him about</h2>
          </div>
        </div>

        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div> */}


      <div className="badge-container grow">
        <a
          href="https://www.linkedin.com/in/yugank-verma-4376b2201"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={linkedinLogo} alt="Linkedin logo" />
            <p>Linkedin-Yugank Verma</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
