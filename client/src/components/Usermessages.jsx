// import React from "react";
// import Singlemessages from "./Singlemessages";

// import useGetMessages from "../hooks/useGetMessages";
// import { useSelector } from "react-redux";
// import useGetRealTimeMessage from "../hooks/useGetRealTmeMessage";
// const Usermessages = () => {
//   useGetMessages();
//   useGetRealTimeMessage();


//   const { messages } = useSelector((store) => store.message);

//   const messageList = Array.isArray(messages?.messages) ? messages.messages : [];
// // const messageList = Array.isArray(messages) ? messages : [];
  
//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {messageList.map((message) => (
//         <Singlemessages key={message._id} message={message} />

//       ))}
//     </div>

//     // <div className="px-4 flex-1 overflow-auto">
//     //   {
//     //     messages && messages?.map((message)=>{
//     //       return (
//     //         <Singlemessages key={message._id} message={message}/>
//     //       )
//     //     })
//     //   }
//     // </div>
//   );
// };

// export default Usermessages;



import React, { useEffect, useRef } from "react"; // Added useEffect and useRef for auto-scrolling
import Singlemessages from "./Singlemessages";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTmeMessage";

const Usermessages = () => {
  // 1. Fetch messages on component mount/update
  useGetMessages();
  // 2. Listen for real-time message updates
  useGetRealTimeMessage();

  // 3. Select messages from the Redux store
  const { messages } = useSelector((store) => store.message);

  // 4. Safely extract the message list
  // Assumes 'messages' is an object { messages: [...] } or null/undefined
  const messageList = Array.isArray(messages?.messages)
    ? messages.messages
    : [];

  // --- Enhancement for better UX: Auto-Scroll ---
  const lastMessageRef = useRef(null);

  // Scrolls to the last message whenever the messageList changes
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);
  // ----------------------------------------------

  return (
    // 'flex-1' and 'overflow-auto' are perfect for a scrollable chat area
    <div className="px-4 flex-1 overflow-auto">
      {/* 5. Check for messages and map over the list */}
      {messageList.map((message, index) => (
        <div
          key={message._id}
          ref={index === messageList.length - 1 ? lastMessageRef : null}>
          <Singlemessages message={message} />
        </div>
      ))}
      {/* 6. Optional: Add a helper message if there are no messages */}
      {messageList.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          Start a conversation! 💬
        </p>
      )}
    </div>
  );
};

export default Usermessages;
