import{ React,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/usersslice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[user,setUser]=useState({
    username:"",
    email:"",
    password:""
  })

  const onsubmithandler = async  (e) =>{
    e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:4000/api/v8/login`,user,{
        headers:{
             "Content-Type":'application/json'
        },
      withCredentials:true,}
      )
      if(res.data.success){
        navigate("/");
        console.log(res.data);
           dispatch(setAuthUser(res.data.user));
           
        toast.success(res.data.message);

      }
      console.log(res);


    }
catch(err){
  console.log(err);
   toast.error(err.response.data.message);
   
}
    setUser({
      username:"",
      email:"",
      password:""
    })
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full w-full bg-gray-800   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center bg-violet-600 ">Login</h1>
        <form onSubmit={onsubmithandler}>
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
            />
          </div>

          <div className="w-full mx-auto flex p-5">
            <p>Don't have an account ?</p>
            <Link to="/register">Signup</Link>
          </div>

          <div className="flex items-center justify-center">
            <button type='submit' className="w-80 btn btn-outline btn-primary mt-2 mb-5 border-slate-700">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
