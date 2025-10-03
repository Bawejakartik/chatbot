

import React, { useEffect, useRef } from "react";
import Singlemesssage from "./Singlemessages";
import useGetRealTimeMessage from "../hooks/useGetRealTmeMessage";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

const Usermessages = () => {
  useGetMessages();
  useGetRealTimeMessage();

  const { messages } = useSelector((store) => store.message);

  const messageList = Array.isArray(messages)
    ? messages
    : Array.isArray(messages?.messages)
    ? messages.messages
    : [];

  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom after DOM updates
    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timer);
  }, [messageList]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messageList.map((message) => (
        <Singlemesssage key={message._id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Usermessages;


