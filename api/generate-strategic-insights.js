const cors = require('cors')({
  origin: ['https://cs-poc-pr0n8qqumo0fl7jqn1n8qhk.web.app', 'http://localhost:3000'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
});

module.exports = (req, res) => {
  cors(req, res, () => {
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method === 'POST') {
      const { componentName, userPrompt } = req.body;

      // Explicit TEMPORARY valid JSX for testing frontend visibility
      const aiGeneratedCode = {
        jsx: `<div style="padding:20px; color:green; font-size:20px;">
                Explicitly generated JSX is loading correctly!
              </div>`,
        css: `/* Temporary explicit test CSS */`,
        insights: "Temporary explicit test insights."
      };

      res.status(200).json({
        success: true,
        ...aiGeneratedCode
      });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  });
};
