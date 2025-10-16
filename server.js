import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());
app.use(express.static("."));

// 🔑 OpenAI API açaryň
const OPENAI_KEY = "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";

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userMessage }],
      }),
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Jogap tapylmady 😅";
    res.json({ reply });
  } catch (err) {
    res.json({ reply: "❌ Serwer bilen baglanyşyk ýok." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Maks AI Chat: http://localhost:${PORT}`));
