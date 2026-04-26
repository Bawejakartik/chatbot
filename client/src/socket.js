import { io } from "socket.io-client";

let socket = null;

export const initSocket = (userId) => {
  if (!userId) {
    console.warn("No userId provided");
    return null;
  }

  if (!socket) {
    socket = io("https://chatbot-rj8b.onrender.com", {
      query: {
        UserId: userId, 
      },
      transports: ["polling", "websocket"], 
      withCredentials: true,
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Error:", err.message);
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Disconnected");
    });
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};