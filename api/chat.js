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
      throw new Error(`Backend error ${response.status}`);
    }

    const data = await response.json();
    return data.response || "Sorry, I didn't understand that.";
  } catch (e) {
    console.error("fetchAIResponse error:", e);
    return "Sorry, something went wrong.";
  }
}

function ChatBot() {
  async function handleNewUserMessage(msg) {
    addResponseMessage("...thinking...");
    const answer = await fetchAIResponse(msg);
    addResponseMessage(answer);
  }

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={botAvatar}
      title="Ask Me Anything"
      subtitle="AI Resume Assistant"
      senderPlaceHolder="Type your question..."
      showCloseButton
      showEmoji={true}
    />
  );
}

export default ChatBot;
