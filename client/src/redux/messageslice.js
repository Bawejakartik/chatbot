import { createSlice } from "@reduxjs/toolkit";

const messageslice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  // Inside your message reducer:
  reducers: {
    setMessages: (state, action) => {
      // For fetching initial messages
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      // THIS IS CRUCIAL: Add the new message to the array
      if (state.messages && state.messages.messages) {
        state.messages.messages.push(action.payload);
      } else {
        // Handle initial state if messages is empty
        state.messages = { messages: [action.payload] };
      }
    },
  },

});

export const { setMessages,addMessage } = messageslice.actions;
export default messageslice.reducer;
