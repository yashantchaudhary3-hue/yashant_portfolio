# Yashant Chaudhary — Public Portfolio

A responsive personal portfolio with a static frontend and an Express API for contact messages.

## Deploy publicly on Render

1. Create a GitHub repository and upload the **contents of this folder** (so `package.json` and `render.yaml` are at the repository root).
2. Sign in to [Render](https://render.com/) and choose **New → Blueprint**.
3. Connect the GitHub repository. Render reads `render.yaml` and creates the web service.
4. Wait for the deploy to finish. Render will provide a public `*.onrender.com` URL.
5. Open the URL and test the contact form and `/api/health` endpoint.

The included Render blueprint provisions a persistent disk for `data/messages.json`, so contact submissions survive service restarts. A persistent disk may require a paid Render plan; check Render's current pricing before deploying. Without persistent storage, local file writes on many hosting platforms are temporary.

## Run locally

Requires Node.js 18+.

```bash
npm install
cp .env.example .env   # Windows PowerShell: Copy-Item .env.example .env
npm start
```

Open http://localhost:3000.

## API

- `GET /api/health` — health check.
- `POST /api/contact` — validates and stores a contact message in `data/messages.json`.

## Before sharing your site

- Review the university, location and learning details in `public/index.html` so they are current.
- Replace placeholder project entries with real projects and working repository/demo links.
- Add your preferred public contact or social links if you want them displayed.
- Contact form messages are stored on the server; this starter does not email or notify you. Check `data/messages.json` on the host or add an email integration if you want notifications.
- Skill progress bars are illustrative, not measured proficiency scores.

Never commit `.env`, passwords, API keys or other secrets.
