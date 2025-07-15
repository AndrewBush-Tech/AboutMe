import React from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import botAvatar from "../assets/bot-avatar.png";
import "./ChatBot.css";

async function fetchAIResponse(message) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", response.status, errorText);
      return "Sorry, I couldn't get a response.";
    }

    const data = await response.json();
    return data.response || "No response from AI.";
  } catch (err) {
    console.error("fetchAIResponse error:", err);
    return "Error contacting the AI.";
  }
}

function ChatBot() {
  async function handleNewUserMessage(msg) {
    addResponseMessage("...thinking...");
    const reply = await fetchAIResponse(msg);
    addResponseMessage(reply);
  }

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={botAvatar}
      title="Ask Me Anything"
      subtitle="AI Resume Assistant"
    />
  );
}

export default ChatBot;
