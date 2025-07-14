const axios = require("axios");

module.exports = async (req, res) => {
  const { componentName } = req.body;

  if (!componentName) {
    return res.status(400).json({ error: "componentName required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Generate clean and valid JSX code for a Figma UI component named "${componentName}".`,
        max_tokens: 200,
        temperature: 0.2,
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        timeout: 15000
      }
    );

    res.status(200).json({
      componentName,
      code: response.data.choices[0].text.trim(),
    });

  } catch (error) {
    console.error("OpenAI API Error:", error.message);
    res.status(500).json({ error: "OpenAI request failed", details: error.message });
  }
};
