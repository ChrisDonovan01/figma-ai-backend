// Explicit redeployment trigger comment: (update timestamp here)
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
      const aiGeneratedCode = {
        jsx: `<div style="padding:20px; color:green; font-size:20px;">
                Explicitly generated HTML is loading correctly!
              </div>`,
        css: `/* Explicit test CSS */`,
        insights: "Explicit test insights."
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
