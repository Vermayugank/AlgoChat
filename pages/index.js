import Head from "next/head";
import Image from "next/image";
import algoLogo from "../assets/algo-logo.png";
import { useState, useEffect } from "react";
import Chat from "./components/Chat";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const getReply = async (ques) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usrInput: ques }),
    });

    const data = await response.json();
    return data.output.text;
  };

  return (
    <div className="root">
      <Chat getReply={getReply} />

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
