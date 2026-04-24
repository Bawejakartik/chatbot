import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Message from './Message'
import { useSelector ,useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
const Homepage = () => {
  const{authUser} = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   useEffect(()=>{
//  if(!authUser){
//   navigate("/login");
  
//  }
//   },[])



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://chatbot-rj8b.onrender.com/api/v8/me", {
          method: "GET",
          credentials: "include", // ⬅️ very important to send cookie
        });

        const data = await res.json();

        if (data.success) {
          dispatch({ type: "SET_AUTH_USER", payload: data.user });
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    if (!authUser) fetchUser();
  }, []);

  
return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-3xl '>
 <Sidebar/>
 <Message/>
    </div>
  )
}

export default Homepage
