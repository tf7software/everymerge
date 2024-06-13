const express = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.use(express.static('public'));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/combine', async (req, res) => {
  const { word1, word2 } = req.body;

  // Custom logic for combining "woman" and "dishes"
  if ((word1.toLowerCase() === 'woman' && word2.toLowerCase() === 'dishes') || 
      (word1.toLowerCase() === 'dishes' && word2.toLowerCase() === 'woman')) {
    // Randomly choose between "dishwasher" and "wife"
    const results = ["dishwasher", "wife"];
    const result = results[Math.floor(Math.random() * results.length)];
    return res.json({ result, emoji: result === "dishwasher" ? "🧼" : "👰" });
  }

  const prompt = `What if ${word1} and ${word2} were combined?`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    res.json({ result: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating content.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
