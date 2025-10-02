// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     authUser: null,
//     otherUsers :[],
//     SelectedUser:null,
//     onlineUsers:null,
//   },
//   reducers: {
//     setAuthUser: (state, action) => {
//       state.authUser = action.payload;
//     },
//     setOtherUser:(state,action)=>{
//       state.otherUsers = action.payload;

//     },
//     setSelectedUser:(state,action) =>{
//       state.SelectedUser= action.payload
//     },
//     setOnlineusers: (state,action)=>{
//       state.onlineUsers = action.payload
//     },
//   },
// });
// export const {setAuthUser,setOtherUser ,setSelectedUser,setOnlineusers} = userSlice.actions;
// export default  userSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: [],      // default empty array
    SelectedUser: null,  // lowercase "s"
    onlineUsers: [],     // default empty array instead of null
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.SelectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
  setOnlineUsers,
} = userSlice.actions;
export default userSlice.reducer;

