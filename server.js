// DigitalOcean product showcase + multimodal Serverless Inference demo.
//
// - GET  /api/products         static catalog of DO's products (for the grid)
// - POST /api/chat             text via /v1/chat/completions
// - POST /api/image            image via /v1/images/generations
//
// Both /api/chat and /api/image go through ONE client/base URL/API key —
// https://inference.do-ai.run/v1 — only the model + SDK method differ. The
// product grid is just content; clicking a card pre-fills a prompt into
// whichever AI panel you choose, so the two things stay visually connected
// without pretending the catalog itself is AI-generated.

import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import { PRODUCTS } from "./products.js";

const MODEL_ACCESS_KEY = process.env.MODEL_ACCESS_KEY;
const TEXT_MODEL = process.env.TEXT_MODEL || "gemma-4-31B-it";
const IMAGE_MODEL = process.env.IMAGE_MODEL || "openai-gpt-image-1";
const PORT = process.env.PORT || 8080;
const BASE_URL = "https://inference.do-ai.run/v1";

if (!MODEL_ACCESS_KEY) {
  console.error(
    "Missing MODEL_ACCESS_KEY. Copy .env.example to .env and add your key.\n" +
      "Docs: https://docs.digitalocean.com/products/inference/how-to/manage-model-access-keys/"
  );
  process.exit(1);
}

const client = new OpenAI({ baseURL: BASE_URL, apiKey: MODEL_ACCESS_KEY });

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.static("public"));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/config", (_req, res) => {
  res.json({ baseUrl: BASE_URL, textModel: TEXT_MODEL, imageModel: IMAGE_MODEL });
});

app.get("/api/products", (_req, res) => {
  res.json({ categories: PRODUCTS });
});

// ---- Text (chat completions) ----
app.post("/api/chat", async (req, res) => {
  const prompt = (req.body?.prompt || "").trim();
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  try {
    const completion = await client.chat.completions.create({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant knowledgeable about DigitalOcean's product lineup. Be concise.",
        },
        { role: "user", content: prompt },
      ],
      max_completion_tokens: 400,
      temperature: 0.7,
    });
    res.json({
      text: completion.choices[0].message.content,
      model: completion.model,
      usage: completion.usage,
      endpoint: `${BASE_URL}/chat/completions`,
    });
  } catch (err) {
    console.error("chat error:", err.message || err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

// ---- Image (images.generate) — same client/base URL/API key as above ----
app.post("/api/image", async (req, res) => {
  const prompt = (req.body?.prompt || "").trim();
  const size = req.body?.size || "1024x1024";
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  try {
    const result = await client.images.generate({
      model: IMAGE_MODEL,
      prompt,
      size,
      n: 1,
    });
    const b64 = result.data[0].b64_json;
    res.json({
      image: `data:image/png;base64,${b64}`,
      model: IMAGE_MODEL,
      usage: result.usage,
      endpoint: `${BASE_URL}/images/generations`,
    });
  } catch (err) {
    console.error("image error:", err.message || err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`DO Product Showcase + Inference demo listening on :${PORT}`);
  console.log(`Text model: ${TEXT_MODEL} | Image model: ${IMAGE_MODEL} | Base: ${BASE_URL}`);
});
