import fetch from "node-fetch";

const PROVIDER = process.env.LLM_PROVIDER || "openai"; // openai | deepseek
const MODEL = process.env.LLM_MODEL || "gpt-4o-mini";

export async function callLLM(prompt: string): Promise<string> {
  let url = "";
  let apiKey = "";

  if (PROVIDER === "openai") {
    url = "https://api.openai.com/v1/chat/completions";
    apiKey = process.env.OPENAI_API_KEY || "";
  } else if (PROVIDER === "deepseek") {
    url = "https://api.deepseek.com/v1/chat/completions";
    apiKey = process.env.DEEPSEEK_API_KEY || "";
  } else {
    throw new Error(`Unknown provider: ${PROVIDER}`);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`LLM API error: ${response.statusText}`);
  }

  const data: any = await response.json();
  return data.choices?.[0]?.message?.content || "Извини, я не знаю.";
}
