let io;
const usersocketmap = {}; // userId -> socketId

const initSocket = (server) => {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const UserId = socket.handshake.query.UserId;
    if (UserId !== undefined) {
      usersocketmap[UserId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(usersocketmap));

    socket.on("sendMessage", (data) => {
      console.log("New message:", data);
      io.emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      delete usersocketmap[UserId];
      io.emit("getOnlineUsers", Object.keys(usersocketmap));
    });
  });
};

const getReceiverSocketId = (receiverId) => {
  return usersocketmap[receiverId];
};

const getIo = () => io;

module.exports = { initSocket, getReceiverSocketId, getIo };
