import {configureStore} from '@reduxjs/toolkit';
import userReducer from './usersslice';
import messageReducer from './messageslice'
const store = configureStore({
    reducer:{
     user:userReducer,
     message:messageReducer
    }
})


export default store  ;
