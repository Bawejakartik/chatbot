import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Verifyotp = () => {
  const [otp, setOtp] = useState("");
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://chatbot-rj8b.onrender.com/api/v8/verify-otp",
        { otp },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setOtp("");
      navigate("/setnewpassword");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🔑 Verify Your OTP
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className=" text-black border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verifyotp;
