import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    // store messages as an array for simpler append operations
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      // allow either full payload (object with messages) or an array
      if (Array.isArray(action.payload)) {
        state.messages = action.payload;
      } else if (action.payload?.messages) {
        state.messages = action.payload.messages;
      } else {
        state.messages = action.payload;
      }
    },
    appendMessage: (state, action) => {
      state.messages = state.messages || [];
      state.messages.push(action.payload);
    },
  },
});
export const { setMessages, appendMessage } = messageSlice.actions;
export default messageSlice.reducer;
