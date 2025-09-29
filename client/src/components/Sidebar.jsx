import React,{use, useState} from "react";
import { IoEllipseSharp, IoSearch } from "react-icons/io5";
import Otherusers from "./Otherusers";
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import { setOtherUser } from "../redux/usersslice";

const Sidebar = () => {
  const {otherUsers} =useSelector(store =>store.user);
const dispatch = useDispatch();

  const [search,setSearch] =useState("");
     
  const searchSubmitHandler = (e) => {
    e.preventDefault();
 
     const conversationuser = otherUsers?.find((user) => user.fullname.toLowerCase().includes(search.toLowerCase()));
     if(conversationuser){
      dispatch(setOtherUser([conversationuser]));

     }else{
      toast.error("user not found "); 

     }

  };
  const navigate = useNavigate();

  const logoutHandler =async() =>{
    try{
   const res = await axios.get("http://localhost:4000/api/v8/logout");
   navigate('/login');
console.log(res);

   toast.success(res.data.message);
     

    }
    catch(err){
      console.log(err);
       
    }
  }
  return (
    <div className="border-r border-blue-500 p-4 flex flex-col">
      <form action="" className="flex items-center p-5 gap-4" onSubmit={searchSubmitHandler}>
        <input
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
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
        <button type="submit" className="btn btn-small "  onClick={logoutHandler}>Logout</button>

      </div>
    </div>
  );
};

export default Sidebar;
