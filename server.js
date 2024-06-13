// server.js
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = 80;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/combine', async (req, res) => {
  const { word1, word2 } = req.body;
  const prompt = `Combine ${word1} and ${word2} and suggest an emoji. Use no formatting and display nothing exept the word and the emoji.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    res.json({ result: text });
  } catch (error) {
    res.status(500).send('Error generating content.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
