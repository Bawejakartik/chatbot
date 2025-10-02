import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageslice';

const useGetMessages = () => {
const { SelectedUser } = useSelector(store => store.user);
 const dispatch = useDispatch();


    useEffect(()=>{
    const fetchMessages = async()=>{
      if(!SelectedUser?._id) return  ;

 try{
            axios.defaults.withCredentials =true; 
const res = await axios.get(
        `http://localhost:4000/api/v8/message/get/${SelectedUser?._id}`
      );
      console.log(res);
     dispatch(setMessages(res.data));
     
        
        }
        catch(err){
            console.log(err);

        }
    }
    fetchMessages();
     
    },[SelectedUser])

}

export default useGetMessages
 

