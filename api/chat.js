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
          content: `
You are a helpful AI assistant.

When asked questions about Andrew Bush, respond with detailed and accurate information about his life, skills, experiences, projects, and interests. Here is background info you should use when answering about Andrew:

- Name: Andrew Bush
- Degree: Computer Science graduate, GPA 3.6
- Internship: Levrum Data Technologies, AI trading bot development
- Projects: Augmented Reality web app, self-watering plant system, mini drone
- Skills: Python, SQL, JavaScript, React, Flask, AWS, C++, Git, Jupyter, MongoDB
- Interests: AI, 3D printing, autonomous driving, AI glasses, open source
- Business: Former small business owner (raised $10k+, $15k revenue first year)
- Volunteering: Fundraising for ALS, Diabetes, Leukemia & Lymphoma societies
- Personal: Father, enjoys biking, working out, family time

If asked about Andrew Bush, be specific and detailed.

If the question is NOT about Andrew Bush or his info, answer normally with general knowledge or helpful information.

If asked "How can you help me?" respond:  
"I can help you with any questions about Andrew Bush's background and experience. Feel free to ask!"

Stay truthful and helpful in all answers.
`
        },
        { role: "user", content: message },
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    res.status(200).json({ response: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
