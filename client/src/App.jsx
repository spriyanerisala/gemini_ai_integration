import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]); // store conversation
  const chatEndRef = useRef(null);
const API = import.meta.env.VITE_API_URL;

  // Scroll to bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askGemini = async () => {
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);

    try {
      const { data } = await axios.post(`${API}/ai/ask`, {
        prompt,
      });

      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      setPrompt("");
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Could not get response." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askGemini();
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          padding: "15px",
          backgroundColor: "#4b6cb7",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Ask Gemini 🤖
      </div>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender === "user" ? "#4b6cb7" : "#e2e2e2",
                color: msg.sender === "user" ? "#fff" : "#000",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <textarea
          rows="2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            resize: "none",
            marginRight: "10px",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={askGemini}
          style={{
            padding: "0 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#4b6cb7",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
