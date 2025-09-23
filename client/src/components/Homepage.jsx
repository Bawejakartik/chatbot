import React from 'react'
import Sidebar from './Sidebar'
import Message from './Message'
const Homepage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-3xl '>
 <Sidebar/>
 <Message/>
    </div>
  )
}

export default Homepage
