# DigitalOcean Product Showcase + Inference Demo

A page listing DigitalOcean's full product lineup (AI-Native Cloud, Compute, Data
Services, Storage, Containers & Images, Networking, Management), with a live
**Serverless Inference** demo underneath — text and image generation through
the same endpoint base URL and API key.

Click **"Ask AI"** or **"Generate Icon"** on any product card to pre-fill a
prompt into the matching AI panel below (nothing auto-submits — you choose when
to spend tokens).

## Why this structure

- The product catalog is static reference content pulled from
  [docs.digitalocean.com/products](https://docs.digitalocean.com/products/) —
  it's not AI-generated, so it stays accurate.
- The AI demo is the same one-endpoint, two-modality pattern as before:
  `POST /v1/chat/completions` for text, `POST /v1/images/generations` for
  images, both via one `MODEL_ACCESS_KEY` and one `base_url`
  (`https://inference.do-ai.run/v1`).
- Connecting the two (via the per-product buttons) makes the catalog page feel
  interactive without conflating "here's what DO sells" with "here's what the AI
  made up."

## Run locally

```bash
npm install
cp .env.example .env      # fill in MODEL_ACCESS_KEY
npm start
```

Open http://localhost:8080.

## Deploying to App Platform

1. Push this folder to a GitHub repo, update `.do/app.yaml`'s `github.repo`.
2. `doctl apps create --spec .do/app.yaml` (or via the control panel: **Apps →
   Create App → GitHub**).
3. Set the `MODEL_ACCESS_KEY` secret under **App → Settings → App-Level
   Environment Variables**.
4. Verify: `curl https://<your-app>.ondigitalocean.app/health`.

## Updating the product list

Edit `products.js` — it's a plain array of `{ category, blurb, icon, items }`
served from `GET /api/products`. Cross-check against
[docs.digitalocean.com/products](https://docs.digitalocean.com/products/) since
DO's lineup changes over time.
