import React, { useEffect } from "react";
import {useDispatch} from 'react-redux';


import axios from "axios";
import { setOtherUsers } from "../redux/usersslice";

const UseGetOtherusers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchotherusers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`https://chatbot-rj8b.onrender.com/api/v8/`);
        // console.log(res);
        //store
        // dispatch(setOtherUser(res.data));
         dispatch(setOtherUsers(res.data.otheruser || []));
      } catch (err) {
        console.log(err);
      }
    };
    fetchotherusers();
  }, []);
};

export default UseGetOtherusers;
