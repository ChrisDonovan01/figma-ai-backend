const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();

// Explicitly enable robust CORS handling for Figma plugin compatibility
app.use(cors({ origin: true }));

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/generate-component', async (req, res) => {
  const { componentName } = req.body;

  const prompt = `
  Generate concise JSX (React) code explicitly for a UI component called "${componentName}". 
  Optimize for executive-level usability in healthcare analytics, 
  ensuring strategic alignment, clarity, measurable ROI, and excellent UX.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 1000
    });

    res.json({ code: response.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Explicit root endpoint for quick testing
app.get('/', (req, res) => {
  res.send('Server is running.');
});

// Export the Express app for Vercel serverless functions
module.exports = app;