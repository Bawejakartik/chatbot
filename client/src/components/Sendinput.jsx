import React from "react";
import { IoIosSend } from "react-icons/io";

const Sendinput = () => {
  return (
    <form className="p-3 my-5">
      <div className="w-full relative">
        <input
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
