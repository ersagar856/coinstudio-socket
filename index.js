const dotenv = require("dotenv");
const https = require("https");
const http = require("http");
const connectDB = require("./config/database");
const { app } = require("./app.js");
const { setupSocket } = require("./helpers/socket.js");
const fs = require("fs");
dotenv.config({ path: "./.env" });

const server = http.createServer(app);

const host = process.env.HOST || "localhost";
const port = process.env.SERVER_PORT || 8000;

// Initialize Socket.IO with the same server
const io = require("socket.io")(server, {
   transports: ["polling", "websocket"],
   allowEIO3: true,
});

connectDB()
   .then(() => {
      console.log("Database connection established...");

      setupSocket(io);
      // start the express server
      server.listen(port, () => {
         const fullUrl = `http://${host}:${port}`;
         console.log(`Server is running at: ${fullUrl}`);
      });
   })
   .catch((err) => {
      console.error("Database cannot be connected!!", err);
   });
