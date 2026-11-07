const express = require("express");
const helmet = require("helmet");
const fs = require("node:fs");
const path = require("node:path");
const config = require("./config");

const app = express();
const DATA_DIR = path.join(__dirname, "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  }
}));
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", site: config.siteName, environment: config.nodeEnv });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (
    typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" || message.trim().length < 10 || message.trim().length > 2000
  ) {
    return res.status(400).json({ ok: false, message: "Please enter a valid name, email and message (at least 10 characters)." });
  }

  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
      if (!Array.isArray(messages)) messages = [];
    }
    messages.push({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      receivedAt: new Date().toISOString()
    });
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), { mode: 0o600 });
    return res.status(201).json({ ok: true, message: "Thanks! Your message has been saved." });
  } catch (error) {
    console.error("Could not save contact message:", error.message);
    return res.status(500).json({ ok: false, message: "Sorry, the message could not be saved right now." });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = app.listen(config.port, "0.0.0.0", () => {
  console.log(`${config.siteName} running on port ${config.port}`);
});

process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT", () => server.close(() => process.exit(0)));
