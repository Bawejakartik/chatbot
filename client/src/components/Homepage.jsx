import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Message from './Message'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Homepage = () => {
  const{authUser} = useSelector(store=>store.user);
  const navigate = useNavigate();

  useEffect(()=>{
 if(!authUser){
  navigate("/login");
  
 }
  },[])
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-3xl '>
 <Sidebar/>
 <Message/>
    </div>
  )
}

export default Homepage
