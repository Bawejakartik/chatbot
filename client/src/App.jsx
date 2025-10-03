import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Forgetpassword from "./components/Forgetpassword";
import Verifyotp from "./components/Verifyotp";
import Setnewpassword from "./components/Setnewpassword";
import { setSocket } from "./redux/socketslice";
import { setOnlineUsers } from "./redux/usersslice";
import { disconnectSocket, initSocket } from "./socket";

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = initSocket(authUser._id);
      // store socket in redux so hooks/components can access it
      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineusers) => {
        dispatch(setOnlineUsers(onlineusers));
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [authUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/homepage",
      element: <Homepage />,
    },

    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forget-password",
      element: <Forgetpassword />,
    },
    {
      path: "/verify-otp",
      element: <Verifyotp />,
    },
    {
      path: "/setnewpassword",
      element: <Setnewpassword />,
    },
  ]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
