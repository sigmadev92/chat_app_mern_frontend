import {
  chatActions,
  chatSelector,
} from "../../../../../redux_toolkit/reducers/chatReducer";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../../../redux_toolkit/reducers/authReducer";
import { messagesURL } from "../../../../../functions/urls/backendAPI";
import { useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const [inputMessage, setInputMessage] = useState("");
  const { currentlyChattingTo, onlineUsers } = useSelector(chatSelector);
  const sendMessageBtn = async () => {
    const mssgbody = {
      text: inputMessage,
      receiverId: currentlyChattingTo.user._id,
    };
    console.log(mssgbody);
    setInputMessage("");
    console.log(currentlyChattingTo);
    try {
      const response = await fetch(`${messagesURL}/write`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(mssgbody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.newMssg);
        dispatch(chatActions.addMessageToChat(data.newMssg));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="dark:outline-white outline-1 rounded-xl w-[100%] h-[100%] overflow-hidden">
      <Header
        currentlyChattingTo={currentlyChattingTo}
        onlineUsers={onlineUsers}
      />

      <Body user={user} currentlyChattingTo={currentlyChattingTo} />

      <Footer
        inputMessage={inputMessage}
        sendMessageBtn={sendMessageBtn}
        setInputMessage={setInputMessage}
      />
    </div>
  );
};

export default ChatContainer;
