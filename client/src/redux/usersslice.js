import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers :[],
    SelectedUser:null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUser:(state,action)=>{
      state.otherUsers = action.payload;

    },
    setSelectedUser:(state,action) =>{
      state.SelectedUser= action.payload
    }
  },
});
export const {setAuthUser,setOtherUser ,setSelectedUser} = userSlice.actions;
export default  userSlice.reducer;