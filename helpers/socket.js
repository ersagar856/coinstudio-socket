const WebSocket = require("ws");
const {
   EXTERNAL_SOCKET_URI,
   EXTERNAL_SOCKET_ORIGIN,
} = require("../utils/constants.js");

const wsOptions = {
   headers: {
      "User-Agent":
         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      Origin: EXTERNAL_SOCKET_ORIGIN,
   },
};
const externalSocketURL = EXTERNAL_SOCKET_URI;

let ws = null;
let io = null;

function initExternalWebSocket(subscriptionMessage) {
   ws = new WebSocket(externalSocketURL, wsOptions);

   ws.on("open", () => {
      console.log("Connected to external WebSocket server");

      ws.send(subscriptionMessage);
      console.log(
         "Subscription message sent to external WebSocket:",
         subscriptionMessage
      );
   });

   ws.on("message", (data) => {
      try {
         const parsedData = JSON.parse(data);
         // io.emit("crypto_update", modifyData(parsedData));
      } catch (err) {
         console.error(
            "Error parsing external WebSocket message:",
            err,
            "Raw data:",
            data
         );
      }
   });

   ws.on("error", (err) => {
      console.error("External WebSocket error:", err);
   });

   ws.on("close", (code, reason) => {
      console.log(
         `External WebSocket connection closed. Code: ${code}, Reason: ${reason}`
      );
   });
}
function modifyData(data) {
   data.sagar = "data modified successfully";
   data.modified = true;
   data.timestamp = new Date();
   return data;
}

function setupSocket(socketIO) {
   io = socketIO;
   io.on("connection", (socket) => {
      console.log("A new user has connected:", socket.id);

      socket.on("subscribe", (subscriptionMessage) => {
         console.log(
            "Received subscription message from client:",
            subscriptionMessage
         );

         // initExternalWebSocket(subscriptionMessage);
      });

      socket.on("disconnect", () => {
         console.log("User disconnected:", socket.id);
      });
   });
}

module.exports = {setupSocket };
