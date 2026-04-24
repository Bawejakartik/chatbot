import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Setnewpassword = () => {
  const [newpassword, setNewpassword] = useState("");
const navigate = useNavigate();

  const submithandle = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post(
        "https://chatbot-rj8b.onrender.com/api/v8/setnewpassword",
        { newpassword },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setNewpassword("");
      navigate("/login");
    
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🔒 Set New Password
        </h2>
        <form onSubmit={submithandle} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter your new password"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
            className="
            text-black border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setnewpassword;
