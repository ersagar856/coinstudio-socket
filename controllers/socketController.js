
exports.handleSocketConnection = (socket) => {
    console.log(`Client connected: ${socket.id}`);
  
    // Listen to events from the client
    socket.on("message", (data) => {
      console.log(`Message received from ${socket.id}:`, data);
      // Emit a response back to the client
      socket.emit("messageResponse", { message: "Server received your message" });
    });
  
    // Handle custom events
    socket.on("customEvent", (data) => {
      console.log(`Custom event data from ${socket.id}:`, data);
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  };



exports.triggerSocketEvent = (io, event, data) => {
    io.emit(event, data);  
    console.log(`Emitted event: ${event} with data:`, data);
  };
  
