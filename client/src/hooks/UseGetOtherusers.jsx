// import React, { useEffect } from "react";
// import {useDispatch} from 'react-redux';


// import axios from "axios";
// import { setOtherUsers } from "../redux/usersslice";

// const UseGetOtherusers = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchotherusers = async () => {
//       try {
//         axios.defaults.withCredentials = true;
//         const res = await axios.get(`https://chatbot-rj8b.onrender.com/api/v8/`);
//         // console.log(res);
//         //store
//         // dispatch(setOtherUser(res.data));
//          dispatch(setOtherUsers(res.data.otheruser || []));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchotherusers();
//   }, []);
// };

// export default UseGetOtherusers;


// UseGetOtherusers.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOtherUsers } from "../redux/usersslice";

const UseGetOtherusers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchotherusers = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // 🔥 CHECK IF TOKEN EXISTS
        if (!token) {
          console.warn("No token found - user not authenticated");
          return;
        }

        const res = await axios.get(
          "https://chatbot-rj8b.onrender.com/api/v8/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true, // For cookies if needed
          }
        );

        console.log("Users fetched:", res.data);
        dispatch(setOtherUsers(res.data.otheruser || []));
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
        
        // 🔥 IF 401, TOKEN IS INVALID - CLEAR IT
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          console.log("Token invalid, cleared from storage");
        }
      }
    };

    fetchotherusers();
  }, [dispatch]); // Added dispatch to dependency array

  return null;
};

export default UseGetOtherusers;
