const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.use(bodyParser.json());
app.use(express.static('public'));

let combinations = {};

// Load combinations from JSON file if it exists
if (fs.existsSync('combinations.json')) {
  combinations = JSON.parse(fs.readFileSync('combinations.json', 'utf-8'));
}

app.post('/combine', async (req, res) => {
  const { item1, item2 } = req.body;
  const key = [item1, item2].sort().join('-');

  if (combinations[key]) {
    res.json({ result: combinations[key], message: '' });
  } else {
    const prompt = `Combine ${item1} and ${item2} into a single word and emoji. Use No Formatting. Also make it creative, like fire plus ice equals water, not fireice`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const combinedResult = response.text();
    
    combinations[key] = combinedResult;

    fs.writeFileSync('combinations.json', JSON.stringify(combinations, null, 2));

    res.json({ result: combinedResult, message: 'You are the first person to combine this!' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
