import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/usersslice";

const Otheruser = ({ user }) => {
  const dispatch = useDispatch();
  const { SelectedUser, onlineUsers } = useSelector((store) => store.user);

     const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = () => {
    console.log("Selected User:", user);
    dispatch(setSelectedUser(user));
  };

  return (
    <div>
      <div
        onClick={selectedUserHandler}
        className={`${
          SelectedUser?._id === user?._id ? "bg-gray-900" : ""
        } flex gap-2 items-center hover:bg-gray-900 rounded-xl p-2 cursor-pointer`}>
        {/* Avatar */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src={user?.profileimage} alt={user?.fullname} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col flex-1">
          <p className="text-white">{user?.fullname}</p>
        </div>
      </div>

      {/* Divider */}
      <div>
        <div className="divider my-0 py-0 h-1"></div>
      </div>
    </div>
  );
};

export default Otheruser;
