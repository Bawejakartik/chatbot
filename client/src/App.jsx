import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Signup from './components/Signup';
import Login from "./components/Login";
import Homepage from "./components/Homepage";
 


function App() {


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
  <div className='p-4 h-screen flex items-center justify-center'>
    <RouterProvider router={router}></RouterProvider>
  </div>
  );
}

export default App
