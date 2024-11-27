const express = require("express");
const router = express.Router();
const { Server } = require("socket.io");

const { handleSocketConnection,triggerSocketEvent  } = require("../controllers/socketController");

const initializeSocketRoutes = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    handleSocketConnection(socket);
  });


  router.post("/trigger-event", (req, res) => {
    console.log('first');
    const { event, data } = req.body;
    triggerSocketEvent(io, event, data);  
    res.json({ message: `Event '${event}' triggered successfully.` });
  });

  return router;
};

module.exports = initializeSocketRoutes;