import React, { useEffect } from "react";
import Sendinput from "./Sendinput";
import Usermessages from "./Usermessages";
import { useDispatch, useSelector } from "react-redux";


const Message = () => {
  const { SelectedUser ,authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();


  return (
    <>
      {SelectedUser !== null ? (
        <div className="md:min-w-[450px] flex flex-col">
          <div className="flex gap-2 items-center bg-gray-900 rounded-xl p-2 cursor-pointer">
            <div className="avatar avatar-online text-white px-2 py-2">
              <div className="w-10 rounded-full overflow-hidden">
                <img src={SelectedUser?.profileimage} alt="User Profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-semibold text-white">
                {SelectedUser?.fullname}
              </p>
            </div>
          </div>

          <Usermessages />

          <Sendinput />
        </div>
      ) : (
        <div className="'md:min-w-[500px] flex flex-col justify-center items-center">
        <h3>Hi {authUser?.fullname || "Guest"}</h3>
          <h1 className="text-center text-gray-500 mt-4">

            Let's start a conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default Message;
