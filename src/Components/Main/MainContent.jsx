import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./MainContent.css";
import UserIcon from "../../assets/user_icon.png";
import GeminiLogo from "./GeminiLogo.svg";
import CompassIcon from "../../assets/compass_icon.png";
import BulbIcon from "../../assets/bulb_icon.png";
import MessageIcon from "../../assets/message_icon.png";
import CodeIcon from "../../assets/code_icon.png";
import GalleryIcon from "../../assets/gallery_icon.png";
import MicIcon from "../../assets/mic_icon.png";
import SendIcon from "../../assets/send_icon.png";
import { runGemini } from "../../Config/Gemini.js";
import darkmode from "../../assets/darkmode.png";
import lightmode from "../../assets/lightmode.png";
import "../../index.css";

const MainContent = ({
  messages,
  setMessages,
  answer,
  setAnswer,
  toggleDarkMode,
  darkMode,
  setDarkMode,
}) => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const cardPrompts = [
    {
      text: "Suggest beautiful places to see on an upcoming road trip",
      icon: CompassIcon,
      alt: "Compass Icon",
    },
    {
      text: "Briefly summarise this concept: Urban Planning",
      icon: BulbIcon,
      alt: "Bulb Icon",
    },
    {
      text: "Brainstorm team bonding activities for our work retreat",
      icon: MessageIcon,
      alt: "Message Icon",
    },
    {
      text: "Improve the readability of the following code",
      icon: CodeIcon,
      alt: "Code Icon",
    },
  ];

  const handleSend = async (selectedPrompt = prompt) => {
    if (selectedPrompt.trim() === "") {
      return;
    } else {
      setLoading(true);
      try {
        const response = await runGemini(selectedPrompt);
        setResult(response);
        setAnswer(true);
        setPrompt("");
        setLoading(false);
        setMessages((prev) => [
          ...prev,
          { prompt: selectedPrompt, result: response },
        ]);
        console.log(response);
      } catch (error) {
        setResult(`Error: ${error.message}`);
        setAnswer(false);
        setLoading(false);
        setPrompt("");
      }
    }
  };

  return (
    <div id="main">
      <div id="nav">
        <p className="gemini-title">
          <span className="gemini-title-text">Google Gemini</span>
          <img
            src={GeminiLogo}
            alt="Gemini Logo"
            id="gemini-logo"
            className="h-15 w-15"
          />
        </p>
        <div id="nav-actions">
          <img
            src={darkMode ? lightmode : darkmode}
            alt="Toggle dark mode"
            id="appearance"
            onClick={toggleDarkMode}
          />
          <img src={UserIcon} alt="User Icon" id="user-icon" />
        </div>
      </div>
      <div id="main-container">
        <div id="content-area">
          {!answer && !loading && (
            <div id="greet">
              <p>
                <span>Hi Arnab</span>
              </p>
              <p id="secondPtag">
                Welcome to Google Gemini! How can I assist you today?
              </p>
            </div>
          )}
          <div id="cards">
            {!answer && !loading && (
              <>
                {cardPrompts.map((card, index) => (
                  <div
                    id="card"
                    key={index}
                    onClick={() => {
                      handleSend(card.text);
                    }}
                  >
                    <p>{card.text}</p>
                    <img src={card.icon} alt={card.alt} id="card-icon" />
                  </div>
                ))}
              </>
            )}
          </div>
          {loading && (
            <div id="loading">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          {answer && !loading && messages.length > 0 && (
            <div id="result">
              {messages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <div className="user-message">
                    <img src={UserIcon} alt="User" className="chat-icon" />
                    <p>{msg.prompt}</p>
                  </div>

                  <div className="gemini-message">
                    <img src={GeminiLogo} alt="Gemini" className="chat-icon" />

                    <div className="gemini-text">
                      <ReactMarkdown>{msg.result}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div id="main-bottom">
          <div id="search-box">
            <input
              type="text"
              placeholder="Enter your prompt here..."
              id="search-input"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <div>
              <img src={GalleryIcon} alt="Gallery Icon" id="gallery-icon" />
              <img src={MicIcon} alt="Microphone Icon" id="mic-icon" />
              <img
                src={SendIcon}
                alt="Send Icon"
                id="send-icon"
                onClick={handleSend}
              />
            </div>
          </div>
          <p id="bottom-info">
            Gemini may display inaccurate info including about people, so double
            check it's response before using it. Your Privacy is our priority.
          </p>
        </div>
      </div>
    </div>
  );
};
export default MainContent;
