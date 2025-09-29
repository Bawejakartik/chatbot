import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/usersslice";

const Otheruser = ({ user }) => {
  const dispatch = useDispatch();
const { SelectedUser } = useSelector(store=>store.user);
  // const user = props.user;
  const selectedUserHandler = (user) => {
    console.log(user);
    dispatch(setSelectedUser(user));
  };
  return (
    <div>
      <div
        onClick={() => selectedUserHandler(user)}
        className={` ${SelectedUser?._id ===user?._id ? 'bg-gray-900': ''} flex gap-2 items-center hover:bg-gray-900 rounded-xl p-2 cursor-pointer`}>
        <div className="avatar avatar-online">
          <div className="w-10 rounded-full">
            <img src={user?.profilephoto} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2 flex-2"></div>
          <p>{user?.fullname}</p>
        </div>
      </div>
      <div>
        <div className="divider my-0 py-0 h-1"></div>
      </div>
    </div>
  );
};

export default Otheruser;
