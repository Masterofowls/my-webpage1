import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue, push } from "firebase/database";
import { useAuth } from "../hooks/useAuth";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    const unsubscribe = onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        const chatMessages = data
          ? Object.values(data).sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            )
          : [];
        setMessages(chatMessages);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching messages: ", error);
        alert("Failed to load messages. Please try again later.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      text: newMessage,
      user: currentUser?.email || "Anonymous",
      timestamp: new Date().toISOString(),
    })
      .then(() => setNewMessage(""))
      .catch((error) => {
        console.error("Error sending message: ", error);
        alert("Failed to send message. Please try again.");
      });
  };

  if (!currentUser) {
    return <div className="chat-login-prompt">Please log in to access the chat.</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Room</div>
      {loading ? (
        <div className="chat-loading">Loading messages...</div>
      ) : (
        <div className="chat-dialogue-window">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.user === currentUser?.email ? "sent" : "received"
                }`}
              >
                <div className="chat-user">{msg.user}</div>
                <div className="chat-text">{msg.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="chat-send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
