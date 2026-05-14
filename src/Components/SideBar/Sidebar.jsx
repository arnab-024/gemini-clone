import React from "react";
import "./Sidebar.css";
import MenuIcon from "../../assets/menu_icon.png";
import PlusIcon from "../../assets/plus_icon.png";
import MessageIcon from "../../assets/message_icon.png";
import QuestionIcon from "../../assets/question_icon.png";
import HistoryIcon from "../../assets/history_icon.png";
import SettingsIcon from "../../assets/setting_icon.png";
import DeleteIcon from "../../assets/delete.png";
import "../../index.css";

const Sidebar = ({ onNewChat, chats, loadChat, deleteChat }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      id="sidebar"
      className={collapsed ? "collapsed" : ""}
      style={{
        width: collapsed ? "80px" : "220px",
        transition: "width 0.3s ease",
      }}
    >
      <div id="sidebar-header">
        <img src={MenuIcon} alt="Logo" id="menu" onClick={toggleSidebar} />
        <div id="new-chat" onClick={onNewChat}>
          <img src={PlusIcon} alt="Plus Icon" id="plus-icon" />
          {collapsed ? null : <p id="new-chat-text">New Chat</p>}
        </div>
        <div id="recent-chats">
          <p id="recent-chats-title">{collapsed ? "" : "Recent Chats"}</p>
          {chats.map((chat) => (
            <div id="recent-entry" key={chat.id} onClick={() => loadChat(chat)}>
              {!collapsed && (
                <>
                  <img src={MessageIcon} alt="Message Icon" id="message-icon" />
                  <img src={DeleteIcon} alt="Delete Icon" id="delete-icon" onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}/>
                  <p>{chat.title}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div id="sidebar-bottom" className="gap-4">
        <div id="bottom-item">
          <img src={QuestionIcon} alt="Question Icon" id="question-icon" />
          {collapsed ? null : <p>Help</p>}
          <span className="absolute left-12 top-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Help
          </span>
        </div>
        <div id="bottom-item">
          <img src={HistoryIcon} alt="History Icon" id="history-icon" />
          {collapsed ? null : <p>Activity</p>}
        </div>
        <div id="bottom-item">
          <img src={SettingsIcon} alt="Settings Icon" id="settings-icon" />
          {collapsed ? null : <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
