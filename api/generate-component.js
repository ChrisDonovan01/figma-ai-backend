const axios = require("axios");

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // explicitly allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Explicitly handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { componentName } = req.body;

  if (!componentName) {
    return res.status(400).json({ error: "componentName required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content: "Generate clean and valid React JSX code explicitly for Figma UI components.",
          },
          {
            role: "user",
            content: `Generate a React JSX component explicitly named "${componentName}".`,
          },
        ],
        max_tokens: 500,
        temperature: 0.2,
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        timeout: 15000
      }
    );

    const generatedCode = response.data.choices[0].message.content.trim();

    res.status(200).json({
      componentName,
      code: generatedCode,
    });

  } catch (error) {
    console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "OpenAI request failed", details: error.message });
  }
};
