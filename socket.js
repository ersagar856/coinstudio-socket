const { Server } = require("socket.io");
const { app } = require("./app.js");
const http = require("http");

// Create an HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server);

// // Serve static files (optional)
// app.use(express.static('public'));

// // Basic route
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// Handle Socket.IO connections
io.on("connection", (socket) => {
   console.log(`User connected: ${socket.id}`);

   // Listen for incoming messages
   socket.on("chat message", (msg) => {
      console.log(`Message from ${socket.id}: ${msg}`);

      // Broadcast the message to all connected clients
      io.emit("chat message", msg);
   });

   // Handle disconnection
   socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
   });
});

module.exports = { server };
