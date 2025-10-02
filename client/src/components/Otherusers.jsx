import React from "react";
import Otheruser from "./Otheruser";
import UseGetOtherusers from "../hooks/UseGetOtherusers";

import { useSelector } from "react-redux";
const Otherusers = () => {
  //my custom hooks

  UseGetOtherusers();
  const { otherUsers } = useSelector((store) => store.user);

  
  if (!otherUsers) return;
if (!otherUsers || !Array.isArray(otherUsers) || otherUsers.length === 0) return null;
  return (
    <div className="overflow-auto flex-1">
      {otherUsers?.map((user) => {
        return <Otheruser  key={user._id} user={user} />;
      })}
    </div>
  );
};

export default Otherusers;
