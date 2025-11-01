import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messagesURL, usersURL } from "../../../functions/urls/backendAPI";
import toast from "react-hot-toast";

import {
  chatSelector,
  chatActions,
} from "../../../redux_toolkit/reducers/chatReducer";
import OverlayLayout from "../../../layouts/OverlayLayout/Index";
import Left from "./Left";
import Right from "./Right/index";

function Messages({ close }) {
  const scrollableDivRef = useRef(null);
  const { totalUnseenMessages, onlineUsers } = useSelector(chatSelector);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  // for users in message queue;
  const handleChatClick = async (selectedContact) => {
    dispatch(chatActions.setCurrentlyChattingTo(selectedContact));
    dispatch(chatActions.removeSeenMessages(selectedContact.sender._id));
    if (scrollableDivRef.current)
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    console.log(selectedContact);
    try {
      const getAllPreviousMessages = await fetch(
        `${messagesURL}/read/${selectedContact.sender._id}`,
        { credentials: "include", method: "GET" }
      );
      const data1 = await getAllPreviousMessages.json();
      if (data1.success) {
        console.log(data1.messages);
        dispatch(chatActions.setMessages(data1.messages));
      }
    } catch (error) {
      console.log(error);
      toast.error("error loadng chats");
    }
  };
  //for users in normal
  const handleChatClickNormal = async (userItem) => {
    dispatch(chatActions.setCurrentlyChattingTo(userItem));

    console.log("chat clicked");
    try {
      const getAllPreviousMessages = await fetch(
        `${messagesURL}/read/${userItem._id}`,
        { credentials: "include", method: "GET" }
      );
      const data1 = await getAllPreviousMessages.json();
      if (data1.success) {
        dispatch(chatActions.setMessages(data1.messages));
        if (scrollableDivRef.current) {
          scrollableDivRef.current.scrollTo({
            bottom: scrollableDivRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("error loadng chats");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${usersURL}/all`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        console.log(
          "Total Users on db except for loggedin user : " + data.users.length
        );
        setUsers(data.users);
      }
    };
    if (Object.keys(totalUnseenMessages).length === 0) {
      fetchUsers();
    }
  }, [totalUnseenMessages]);
  return (
    <OverlayLayout label={"Messages"} close={close}>
      <div className="flex justify-between h-[95%] box-border ">
        <Left
          handleChatClick={handleChatClick}
          handleChatClickNormal={handleChatClickNormal}
          users={users}
        />

        <Right onlineUsers={onlineUsers} />
      </div>
    </OverlayLayout>
  );
}

export default Messages;
