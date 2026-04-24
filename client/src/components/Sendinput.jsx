import React, {  useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageslice";

const Sendinput = () => {


  const dispatch = useDispatch();
  const { SelectedUser } = useSelector(store=> store.user);
  const { messages } = useSelector(store => store.message);

  const [message, setMessage] = useState("");
  const onsubmitHandler = async (e) => {
   e.preventDefault();

    try {
      const res = await axios.post(
        `https://chatbot-rj8b.onrender.com/api/v8/message/send/${SelectedUser?._id}`,
        { message },
        {
          withCredentials: true,
        }
      );
  //  dispatch(setMessages([...messages, res?.data?.newMessage]));   
  console.log(res);
 const currentMessages = Array.isArray(messages) ? messages : [];
 dispatch(setMessages([...currentMessages, res?.data?.newMessage]));
    
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };
  return (
    <form className="p-3 my-5" onSubmit={onsubmitHandler}>
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) =>setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="w-full pr-12 pl-4 py-2 rounded-full border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />
        <button
         type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-400 hover:bg-amber-500 text-white p-2 rounded-full shadow-md transition flex items-center justify-center">
          <IoIosSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default Sendinput;







