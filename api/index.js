const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();
const serverless = require('serverless-http');

const app = express();

// Enable CORS for compatibility with Figma plugin
app.use(cors({ origin: true }));
app.use(express.json());

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: Missing OpenAI API key in environment variables.');
  throw new Error('Missing OpenAI API key in environment variables.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate Component Endpoint
app.post('/generate-component', async (req, res) => {
  const { componentName } = req.body;
  console.log('Request received for /generate-component with componentName:', componentName);

  if (!componentName) {
    console.error('Error: componentName is required');
    return res.status(400).json({ error: 'componentName is required' });
  }

  const prompt = `Generate concise JSX code for a component named "${componentName}"`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 1000
    });

    console.log('OpenAI response:', response.choices[0].message.content.trim());
    res.json({ code: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error generating component:', error);
    res.status(500).json({ error: error.message || 'Failed to generate component.' });
  }
});

// Simplified Root Endpoint for Debugging
app.get('/', (req, res) => {
  console.log('Root endpoint accessed.');
  res.send('Root endpoint is working!');
});

// Vercel handler for Express
module.exports = serverless(app);

// Local Development Server (only runs outside of Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}