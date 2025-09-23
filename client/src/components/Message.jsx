import React from "react";
import Sendinput from "./Sendinput";
import Usermessages from "./Usermessages";
const Message = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <div className="flex gap-2 items-center bg-gray-900 rounded-xl p-2 cursor-pointer">
        <div className="avatar avatar-online text-white px-2 py-2 pb-2">
          <div className="w-10 rounded-full">
            <img
              src="https://i.pinimg.com/originals/61/c7/7a/61c77ac5085d548b40e7ac2020143453.jpg"
              alt="User Profile"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2 flex-2"></div>
          <p>kartik baweja </p>
        </div>
      </div>
      <Usermessages/>
      <Sendinput/>
      <div>{/* <div className="divider"></div> */}</div>
    </div>
  );
};

export default Message;
