import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Singlemessages = ({ message }) => {
  const scrollRef = useRef();
  const { authUser, SelectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" }); // auto scroll
  }, [message]);

  const isSender = authUser?._id === message?.senderId;

  return (
    <div ref={scrollRef}>
      <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
        {/* Avatar */}
        <div className="chat-image avatar">
          <div className="w-10 rounded-full overflow-hidden">
            <img
              alt="User"
              src={
                isSender ? authUser?.profileimage : SelectedUser?.profileimage
              }
            />
          </div>
        </div>

        
        <div className="chat-header">
          {isSender ? authUser?.fullname : SelectedUser?.fullname}
          <time className="text-xs opacity-50 ml-2">12:45</time>
        </div>

        <div className="chat-bubble">{message?.message}</div>
      </div>
    </div>
  );
};

export default Singlemessages;
