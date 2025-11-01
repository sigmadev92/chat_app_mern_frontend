import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { messagesURL } from "../../functions/urls/backendAPI";

const fetchUnseenMessages = createAsyncThunk("unseenMessages", async () => {
  const result = await fetch(`${messagesURL}/unseen`, {
    method: "GET",
    credentials: "include",
  });
  const data = await result.json();

  if (data.success) {
    return {
      success: true,
      unseenMessages: data.unseenMessages,
    };
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    socket: null,
    totalUnseenMessages: {}, // store messages globally
    onlineUsers: [],
    currentlyChattingTo: {
      user: null,
      messages: [],
    },
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    addMessage: (state, action) => {
      const { sender, message } = action.payload;
      console.log(sender, message);
      if (
        state.currentlyChattingTo.user &&
        state.currentlyChattingTo.user._id === sender._id
      ) {
        state.currentlyChattingTo.messages.push(message);
      } else {
        if (state.totalUnseenMessages[sender._id]) {
          state.totalUnseenMessages[sender._id].messages.push(message);
        } else {
          state.totalUnseenMessages[sender._id] = {
            sender,
            messages: [message],
          };
        }
      }
    },
    addMessageToChat: (state, action) => {
      state.currentlyChattingTo.messages.push(action.payload);
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setCurrentlyChattingTo: (state, action) => {
      state.currentlyChattingTo.user = action.payload;
    },
    setMessages: (state, action) => {
      state.currentlyChattingTo.messages = action.payload;
    },
    removeSeenMessages: (state, action) => {
      delete state.totalUnseenMessages[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnseenMessages.fulfilled, (state, action) => {
      state.totalUnseenMessages = action.payload.unseenMessages;
      console.log(action.payload.unseenMessages);
    });
  },
});

const chatReducer = chatSlice.reducer;
const chatActions = chatSlice.actions;
const chatSelector = (state) => state.chat;
export { chatActions, chatReducer, chatSelector, fetchUnseenMessages };
