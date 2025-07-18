const express = require('express');
const cors = require('cors');

const app = express();

// Explicit CORS setup for your frontend domains
app.use(cors({
  origin: ['https://cs-poc-pr0n8qqumo0fl7jqn1n8qhk.web.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json());

// Explicit preflight handling
app.options('*', cors());

// Root endpoint explicitly to verify deployment
app.get('/', (req, res) => {
  res.status(200).send('Root endpoint OK');
});

// Explicit endpoint for generating strategic insights
app.post('/api/generate-strategic-insights', async (req, res) => {
  const { componentName, userPrompt } = req.body;

  // TODO: Explicitly integrate GPT-4o or Gemini AI logic here
  const aiGeneratedCode = {
    jsx: "<div>Your generated React JSX explicitly here</div>",
    css: "/* Your generated CSS explicitly here */",
    insights: "Your strategic insights explicitly generated by AI"
  };

  res.status(200).json({
    success: true,
    ...aiGeneratedCode
  });
});

// Export explicitly for Vercel deployment
module.exports = app;
