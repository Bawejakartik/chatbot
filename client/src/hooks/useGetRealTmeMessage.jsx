import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appendMessage } from "../redux/messageslice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handler = (newMessage) => {
      // Dispatch a typed action that appends the incoming message to the store
      dispatch(appendMessage(newMessage));
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket, dispatch]);
};
export default useGetRealTimeMessage;
