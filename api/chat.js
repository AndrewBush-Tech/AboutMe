export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const HF_TOKEN = process.env.HF_TOKEN;
  const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

  const prompt = `
You are a helpful AI assistant trained to answer questions about Andrew Bush’s resume, skills, experience, and projects. Use the context below to answer clearly and concisely. Do NOT include the question or any labels in your answer.

Context:
Andrew Bush is a Computer Science graduate skilled in Python, SQL, JavaScript, React, Flask, AWS, C, and C++.
He interned at Levrum Data Technologies, working on an AI trading bot.
Projects include an augmented reality web app, a self-watering plant system using Arduino and Raspberry Pi, and a mobile-connected mini drone.
He’s passionate about autonomous driving, AI glasses, and contributing to open-source projects.

User question: ${req.body.message}

Answer:
`;

  try {
    const hfResponse = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
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
        },
      }),
    });

    const result = await hfResponse.json();

    if (hfResponse.status !== 200) {
      console.error("HF API error:", result);
      return res.status(hfResponse.status).json({ error: result.error || "Hugging Face API failed" });
    }

    const generatedText = result?.[0]?.generated_text || "";
    const answer = generatedText.split("Answer:")[1]?.trim() || generatedText;

    res.status(200).json({ response: answer });
  } catch (err) {
    console.error("API handler error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
