import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    gender: "",
    password: "",
  });

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://chatbot-rj8b.onrender.com/api/v8/signup`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed!");
    }

    setUser({
      fullname: "",
      username: "",
      email: "",
      gender: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h1>

        <form onSubmit={onsubmitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Full Name
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              type="text"
              placeholder="Enter a username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-center gap-6 text-gray-300 text-sm mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                className="accent-violet-600"
              />
              Male
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                className="accent-violet-600"
              />
              Female
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg py-2 mt-4 transition duration-300">
            Sign Up
          </button>

          <div className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-500 hover:text-violet-400 font-medium">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
