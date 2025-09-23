import React from "react";
import { IoSearch } from "react-icons/io5";
import Otherusers from "./Otherusers";
const Sidebar = () => {
  return (
    <div className="border-r border-blue-500 p-4 flex flex-col">
      <form action="" className="flex items-center p-5 gap-4">
        <input
          className="input input-bordered roudned-md "
          type="text"
          placeholder="Search...."
        />

        <button type="submit" className="   bg-blue-600">
          <IoSearch />
        </button>
      </form>
      <div className="divider px-3 "></div>
      <Otherusers/>

      <div className="m-2">
        <button type="submit" className="btn btn-small ">Logout</button>

      </div>
    </div>
  );
};

export default Sidebar;
