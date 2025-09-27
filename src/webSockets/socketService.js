import { io } from "socket.io-client";
import { chatActions } from "../redux_toolkit/reducers/chatReducer";
export const initSocket = (userId, dispatch) => {
  const socket = io("http://localhost:3001", {
    query: { userId },
  });

  const { setOnlineUsers } = chatActions;

  socket.on("connect", () => {
    console.log("Connected to socket.io server");
    // dispatch(setSocket(socket));
  });

  socket.on("newMessage", ({ sender, message }) => {
    console.log(message, sender);
    dispatch(chatActions.addMessage({ message, sender }));
  });

  socket.on("getOnlineUsers", (onlineUsers) => {
    console.log(onlineUsers);
    dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket.io");
  });

  return socket;
};
