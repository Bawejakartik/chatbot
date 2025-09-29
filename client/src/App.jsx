import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import  {io } from 'socket.io-client';

function App() {
  const { authUser } = useSelector((store) => store.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:4000/api/v8", {
        withCredentials: true,
      });
      setSocket(socket);
    }
  }, [authUser]);

  const router = createBrowserRouter([
    {
      path: "/",
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
  ]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
