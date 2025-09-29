import React from "react";
import Singlemessages from "./Singlemessages";

import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

const Usermessages = () => {
  useGetMessages();

  const { messages } = useSelector((store) => store.message);

  const messageList = Array.isArray(messages?.messages) ? messages.messages : [];

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messageList.map((message) => (
        <Singlemessages key={message._id} message={message} />
        
      ))}
    </div>
  );
};

export default Usermessages;
