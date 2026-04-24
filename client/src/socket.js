import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  if (!socket) {
    // server expects `UserId` (capital U) on the handshake query
    socket = io("https://chatbot-rj8b.onrender.com", {
      query: { UserId: userId },
      withCredentials: true,
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
