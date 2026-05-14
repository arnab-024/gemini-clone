const MODEL_ID = "gemini-3-flash-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent`;

export async function runGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in your .env file.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        thinkingConfig: {
          thinkingLevel: "high",
        },
      },
    }),
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    const message =
      data?.error?.message || "Gemini request failed. Please try again.";
    throw new Error(message);
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

