// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { appendMessage } from "../redux/messageslice";

// const useGetRealTimeMessage = () => {
//   const { socket } = useSelector((store) => store.socket);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!socket) return;

//     const handler = (newMessage) => {
//       // Dispatch a typed action that appends the incoming message to the store
//       dispatch(appendMessage(newMessage));
//     };

//     socket.on("newMessage", handler);

//     return () => {
//       socket.off("newMessage", handler);
//     };
//   }, [socket, dispatch]);
// };
// export default useGetRealTimeMessage;


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appendMessage } from "../redux/messageslice";
import { setOnlineUsers } from "../redux/usersslice"; // ✅ ADD THIS

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    // ✅ handle new message
    const messageHandler = (newMessage) => {
      dispatch(appendMessage(newMessage));
    };

    // ✅ handle online users (NEW)
    const onlineUsersHandler = (users) => {
      console.log("🔥 Online users:", users);
      dispatch(setOnlineUsers(users));
    };

    // register events
    socket.on("newMessage", messageHandler);
    socket.on("getOnlineUsers", onlineUsersHandler);

    // cleanup
    return () => {
      socket.off("newMessage", messageHandler);
      socket.off("getOnlineUsers", onlineUsersHandler);
    };
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;