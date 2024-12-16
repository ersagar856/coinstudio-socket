const express = require("express");
const http = require("http");
const cors = require("cors");
var logger = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
const app = express();

app.use(
   cors({
      origin: process.env.CORS_ORIGIN || "*",
   })
);

const limiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 100,
   message: {
      status: 429,
      message: "Too many requests, please try again later.",
   },
   standardHeaders: true,
   legacyHeaders: false,
});

app.use(limiter);
app.use(logger("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Import and use routes
const categoryRoutes = require("./routes/categoryRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const algorithm = require("./routes/algorithmRoutes");
const platform = require("./routes/platformRoutes");
const industry = require("./routes/industryRoutes");
const exchange = require("./routes/ExchangeRoutes.js");
const funding = require("./routes/fundingRoutes.js");
const nftRoutes = require("./routes/nftRoutes.js");
const homeRoutes = require("./routes/homeRoutes.js");
const homeSearch = require("./routes/searchRoutes.js");

// Routes declaration
app.use("/api/category", categoryRoutes);
app.use("/api/cryptocurrency", cryptoRoutes);
app.use("/api/algorithm", algorithm);
app.use("/api/platform", platform);
app.use("/api/industry", industry);
app.use("/api/exchange", exchange);
app.use("/api/funding", funding);
app.use("/api/nft", nftRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/search", homeSearch);

module.exports = { app };
