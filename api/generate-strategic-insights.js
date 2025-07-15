// Explicit redeployment trigger comment: (2025-07-15)
const cors = require('cors')({
  origin: ['https://cs-poc-pr0n8qqumo0fl7jqn1n8qhk.web.app', 'http://localhost:3000'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
});

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method === 'POST') {
      const { componentName, additionalParams } = req.body;

      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You explicitly generate only pure JSX code snippets for healthcare analytics components. Never include markdown, explanations, backticks, import statements, export statements, or any non-JSX content.',
            },
            {
              role: 'user',
              content: `Explicitly generate a pure JSX code snippet for the component: ${componentName}. Additional parameters: ${JSON.stringify(additionalParams)}`
            },
          ],
          temperature: 0.2,
          max_tokens: 1024,
        });

        const jsxCode = completion.choices[0].message.content.trim();

        res.status(200).json({
          success: true,
          jsx: jsxCode,
          insights: "Explicitly AI-generated JSX insights."
        });

      } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ success: false, error: 'Failed to explicitly generate AI insights.' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  });
};
