import React from "react";
import Sidebar from "./Components/SideBar/Sidebar.jsx";
import MainContent from "./Components/Main/MainContent.jsx";
import { useState } from "react";
import "./index.css";

const App = () => {
  const [answer, setAnswer] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const loadChat = (chat) => {
    setMessages(chat.messages);
    setAnswer(true);
  };
  const deleteChat = (id) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    setMessages([]);
    setAnswer(false);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };
  const handleNewChat = () => {
    if (messages.length > 0) {
      setChats((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: messages[0].prompt,
          messages: messages,
        },
      ]);
    }
    setMessages([]);
    setAnswer(false);
  };
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <Sidebar onNewChat={handleNewChat} chats={chats} loadChat={loadChat} deleteChat={deleteChat} toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <MainContent
        messages={messages}
        setMessages={setMessages}
        answer={answer}
        setAnswer={setAnswer}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
    </div>
  );
};

export default App;
