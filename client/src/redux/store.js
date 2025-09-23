import {configureStore} from '@reduxjs/toolkit';
import userReducer from './usersslice';
const store = configureStore({
    reducer:{
     user:userReducer
    }
})


export default store  ;
