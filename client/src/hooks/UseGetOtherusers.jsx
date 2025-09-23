import React,{useEffect} from 'react';

import axios from 'axios';



const UseGetOtherusers = () => {

useEffect(() =>{
  const fetchotherusers = async()=>{
    try{
        axios.defaults.withCredentials=true
    const res = await axios.get(`http://localhost:4000/api/v8/`);
   console.log(res);
   
    }catch(err){
        console.log(err);
    }
  }
  fetchotherusers();

},[])
}

export default UseGetOtherusers
