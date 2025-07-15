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
              content: `
                Explicitly generate a visually appealing, interactive JSX component using React.js, Tailwind CSS, and Recharts, clearly addressing healthcare analytics dashboards. 
                Explicitly address persona Jamie Reynolds (Director of Informatics/Analytics), focusing on these pain points:
                  - Quickly identifying strategic alignment gaps.
                  - Clearly communicating analytics value to executives.
                  - Real-time visibility into analytics strategic alignment deviations.
                
                Required elements:
                  - Numeric alignment scores (0-100).
                  - Color-coded alignment status indicators (Green ≥80, Yellow 70-79, Red <70).
                  - Interactive drill-down explicitly linked to KPIs and alignment criteria.
                  - Clearly sortable/filterable analytics initiatives.

                Provide pure JSX only, explicitly omitting markdown, explanations, imports, exports, and comments.
              `,
            },
            {
              role: 'user',
              content: `Explicitly generate structured JSX for component: ${componentName}. Additional parameters: ${JSON.stringify(additionalParams)}`
            },
          ],
          temperature: 0.2,
          max_tokens: 1024,
        });

        const jsxCode = completion.choices[0].message.content.trim();

        res.status(200).json({
          success: true,
          jsx: jsxCode,
          insights: "Explicitly AI-generated structured JSX insights."
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
