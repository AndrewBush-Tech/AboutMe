import React from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import botAvatar from "../assets/bot-avatar.png";
import "./ChatBot.css";

const HF_TOKEN = "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"; // Replaced .env variable with a direct token (read only) for deployment on GitHub Pages.
// Note: In production, it's better to use environment variables or a secure vault for sensitive tokens.
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

async function fetchAIResponse(message) {
  try {
    const prompt = `
You are a helpful AI assistant trained to answer questions about Andrew Bush’s resume, skills, experience, and projects. Use the context below to answer clearly and concisely. Do NOT include the question or any labels in your answer.

Context:
Andrew Bush is a Computer Science graduate skilled in Python, SQL, JavaScript, React, Flask, AWS, C, and C++.
He interned at Levrum Data Technologies, working on an AI trading bot.
Projects include an augmented reality web app, a self-watering plant system using Arduino and Raspberry Pi, and a mobile-connected mini drone.
He’s passionate about autonomous driving, AI glasses, and contributing to open-source projects.

User question: ${message}
`.trim();

    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
          top_p: 0.9,
          stop: ["User question:"], // optional stopping point
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF error:", response.status, errorText);
      throw new Error(`HF error ${response.status}`);
    }

    const data = await response.json();
    console.log("HF response:", data);

    let reply = data?.[0]?.generated_text || "Sorry, I didn't understand that.";

    // Remove prompt from the start if echoed
    if (reply.startsWith(prompt)) {
      reply = reply.substring(prompt.length).trim();
    }

    return reply || "Sorry, I couldn't generate a response.";
  } catch (e) {
    console.error("fetchAIResponse error:", e);
    return "Sorry, something went wrong with the AI.";
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
      senderPlaceHolder="Type a question..."
      showCloseButton
      showEmoji={true}
    />
  );
}

export default ChatBot;
