
let connectedSockets = {}; 

module.exports = {
    addSocket: (socketId) => {
        connectedSockets[socketId] = { id: socketId, connectedAt: new Date() };
        console.log("Socket added:", connectedSockets[socketId]);
    },
    removeSocket: (socketId) => {
        delete connectedSockets[socketId];
        console.log("Socket removed:", socketId);
    },
    getSockets: () => {
        return Object.values(connectedSockets);
    },
};
