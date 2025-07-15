// /api/chat.js

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Automatically uses Vercel env variable
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { message } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant focused on Andrew Bush's resume, experience, and career development.

Andrew Bush's background:
- Computer Science graduate, 3.6 GPA
- Internship at Levrum Data Technologies: Built an AI trading bot with a team
- Developed an augmented reality web app using JavaScript, HTML, Groovy, and Python
- Built IoT projects: self-watering plant system (Arduino/Raspberry Pi) and a mini drone with phone connectivity
- Skills: Python, SQL, JavaScript, React, Flask, AWS, C++, Git, Jupyter, MongoDB
- Interests: AI, open-source projects, 3D printing, autonomous driving tech, AI glasses
- Former business owner: raised $10k+ in capital and generated $15k in first-year revenue
- Volunteer fundraiser for ALS, American Diabetes Association, and Leukemia & Lymphoma Society

Your job is to assist with resume writing, interview prep, LinkedIn profiles, technical explanations, and professional guidance. Answer concisely, but provide actionable and friendly advice.`
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300, // Increased token limit for longer, helpful replies
      temperature: 0.7,
    });

    const aiResponse = chatCompletion.choices[0].message.content;

    res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
