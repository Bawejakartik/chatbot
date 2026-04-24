
import React, {   useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/usersslice";

const Login = () => {
  const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  document.cookie = `token=${token}; path=/;`;
  localStorage.setItem("token", token);
}

  const navigate = useNavigate();
  const dispatch = useDispatch();
const triggerlogin = () => {
  window.location.href="https://chatbot-rj8b.onrender.com/api/v8/google";
}
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });



  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://chatbot-rj8b.onrender.com/api/v8/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
       

        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        navigate("/homepage");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed");
    }

    setUser({ username: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-violet-400">
          Welcome Back 👋
        </h1>
        <form onSubmit={onsubmithandler} className="space-y-5">
        
          <div>
            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

         
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

      
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-3 rounded-lg bg-violet-600 hover:bg-violet-700 transition font-semibold">
            Login
          </button>

        
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

      
          <div className="space-y-3">
            <button
              type="button"
              onClick={triggerlogin}
              className="flex items-center justify-center w-full py-2 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-200 transition">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "https://chatbot-rj8b.onrender.com/api/v8/auth/github")
              }
              className="flex items-center justify-center w-full py-2 rounded-lg bg-gray-800 border border-gray-600 font-semibold hover:bg-gray-700 transition">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="w-5 h-5 mr-2"
              />
              Sign in with GitHub
            </button>
          </div>

          {/* Links */}
          <div className="flex justify-between items-center text-sm mt-5">
            <p>
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-violet-400 hover:underline font-semibold">
                Signup
              </Link>
            </p>
            <Link
              to="/forget-password"
              className="text-red-400 hover:underline font-semibold">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

