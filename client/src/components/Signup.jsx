import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate =useNavigate();

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
        `http://localhost:4000/api/v8/signup`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login"); 

        toast.success(res.data.message);
      }
      console.log(res);
     
    } catch (err) {
      console.log(err);
       toast.error(err.response.data.message);
    }
    // console.log(user);

    // Reset form
    setUser({
      fullname: "",
      username: "",
      email: "",
      gender: "",
      password: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full w-full bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center bg-violet-600 ">
          Signup
        </h1>
        <form onSubmit={onsubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter your Name "
              required 
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full input input-bordered h-10"
              type="email"
              placeholder="Enter your Email"
              required 
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter your Username "
              required 
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter your Password "
              required

            />
          </div>

          {/* Gender Selection */}
          <div className="flex items-center p-5">
            <div className="flex items-center mx-2">
              <p>Male</p>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                className="radio mx-2"
                
              />
            </div>
            <div className="flex items-center mx-2">
              <p>Female</p>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                className="radio mx-2"
              

              />
            </div>
          </div>

          <div className="w-full mx-auto flex p-5">
            <p>Already have an account ?</p>
            <Link to="/login" className="ml-1 text-blue-400">
              Login
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-80 btn btn-outline btn-primary mt-2 mb-5 border-slate-700">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
