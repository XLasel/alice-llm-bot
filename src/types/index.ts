import express from "express";
import bodyParser from "body-parser";
import { callLLM } from "./services/llm.js";
import { AliceRequest, AliceResponse } from "./types/alice.js";

const app = express();
app.use(bodyParser.json());

app.post("/alice", async (req, res) => {
  const body = req.body as AliceRequest;

  try {
    const userMessage = body.request?.command || "Привет!";
    const answer = await callLLM(userMessage);

    const response: AliceResponse = {
      version: "1.0",
      session: body.session,
      response: {
        text: answer.slice(0, 1024),
        end_session: false,
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error:", error);

    const response: AliceResponse = {
      version: "1.0",
      session: body.session,
      response: {
        text: "Ошибка при обращении к LLM. Попробуй позже.",
        end_session: false,
      },
    };

    res.json(response);
  }
});

app.get("/", (_, res) => {
  res.send("Alice → LLM bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
