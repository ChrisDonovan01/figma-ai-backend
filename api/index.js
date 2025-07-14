const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();
const serverless = require('serverless-http');

const app = express();

// Enable robust CORS handling for Figma plugin compatibility
app.use(cors({ origin: true }));
app.use(express.json());

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key in environment variables.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate Component Endpoint
app.post('/generate-component', async (req, res) => {
  const { componentName } = req.body;

  if (!componentName) {
    return res.status(400).json({ error: 'componentName is required' });
  }

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
    console.error('Error generating component:', error);
    res.status(500).json({ error: error.message || 'Failed to generate component.' });
  }
});

// Simplified Root Endpoint for Testing
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Vercel handler for Express
module.exports = serverless(app);

// Local Development Server (only runs outside of Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}