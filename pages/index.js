import Head from "next/head";
import Image from "next/image";
import algoLogo from "../assets/algo-logo.png";
import { useState } from "react";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  

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

      {/*
      </div> */}


      <div className="badge-container grow">
        <a
          href="https://developer.algorand.org/docs/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={algoLogo} alt="Algorand Logo" />
            <p>Algorand Docs</p>
            
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
