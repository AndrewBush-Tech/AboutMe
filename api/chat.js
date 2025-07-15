// /api/chat.js

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
          content: `You are a personal AI assistant that ONLY answers questions about Andrew Bush.

Do NOT give career advice, do NOT offer resume tips, do NOT provide generic help.

Respond strictly with information related to Andrew Bush's life, skills, work experience, education, projects, or interests.

Here is the background you can use to answer:

- Name: Andrew Bush
- Degree: Computer Science graduate, GPA 3.6
- Internship: Levrum Data Technologies, developed an AI trading bot
- Projects: 
   - Augmented Reality Web App (JavaScript, HTML, Groovy, Python)
   - Self-watering plant system (Arduino/Raspberry Pi)
   - Mini drone with phone connectivity
- Skills: Python, SQL, JavaScript, React, Flask, AWS, C++, Git, Jupyter, MongoDB
- Interests: AI, open-source, 3D printing, autonomous driving tech, AI glasses
- Business: Former small business owner (raised $10k+, generated $15k revenue first year)
- Volunteering: Fundraising for ALS, American Diabetes Association, Leukemia & Lymphoma Society
- Personal: Father, enjoys working out, biking, and spending time with family

If someone asks "How can you help me?" or something similar, respond:  
"I am a personal AI assistant to help you learn about Andrew Bush. Ask me anything about him."

Stay strictly within this scope.
`
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300,
      temperature: 0.5, // Lower temp for more factual, consistent replies
    });

    const aiResponse = chatCompletion.choices[0].message.content;

    res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
