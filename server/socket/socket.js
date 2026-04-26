let io;
const usersocketmap = {}; // userId -> socketId

const initSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "https://genuinechatapp.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["polling", "websocket"],
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const UserId = socket.handshake.query.UserId;

    if (UserId) {
      usersocketmap[UserId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(usersocketmap));

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      if (UserId) {
        delete usersocketmap[UserId];
      }

      io.emit("getOnlineUsers", Object.keys(usersocketmap));
    });
  });
}; // ✅ THIS WAS MISSING

// ✅ NOW OUTSIDE initSocket
const getReceiverSocketId = (receiverId) => {
  return usersocketmap[receiverId];
};

const getIo = () => io;

module.exports = { initSocket, getReceiverSocketId, getIo };