// Central configuration: values are read from environment variables.
require("dotenv").config();

const config = {
  port: Number.parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  siteName: process.env.SITE_NAME || "Yashant Chaudhary | Portfolio",
  contactEmail: process.env.CONTACT_EMAIL || ""
};

module.exports = config;
