
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Message from './Message';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 🔥 STEP 1: Extract token from URL and store in localStorage
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
    }

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔥 get token

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("https://chatbot-rj8b.onrender.com/api/v8/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 send token
          },
        });

        const data = await res.json();

        if (data.success) {
          dispatch({ type: "SET_AUTH_USER", payload: data.user });
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    if (!authUser) fetchUser();
  }, []);

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-3xl'>
      <Sidebar />
      <Message />
    </div>
  );
};

export default Homepage;
