import {
  CameraIcon,
  ChevronLeftIcon,
  CircleXIcon,
  EllipsisVerticalIcon,
  MessageCircleIcon,
  PhoneIcon,
  SendIcon,
  VideoIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messagesURL, usersURL } from "../../../functions/urls/backendAPI";
import toast from "react-hot-toast";

import { authSelector } from "../../../redux_toolkit/reducers/authReducer";
import {
  chatSelector,
  chatActions,
} from "../../../redux_toolkit/reducers/chatReducer";

function Messages({ close }) {
  const scrollableDivRef = useRef(null);
  const { onlineUsers } = useSelector(chatSelector);
  const { currentlyChattingTo, totalUnseenMessages } =
    useSelector(chatSelector);
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const [users, setUsers] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

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
    <section className="w-[100%] h-[100vh] bg-[#26252683] absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[90%] lg:w-[50%] rounded-2xl outline-blue-300 outline-1 h-[80%] px-2">
        <div className="flex px-3 justify-between items-center py-2">
          <div className="flex gap-2 text-white text-[12px]">
            <span className="">Messages</span>
            <div className="flex gap-1 items-center">
              <div className="w-[5px] h-[5px] rounded-2xl bg-green-400"></div>
              <span className=""> {onlineUsers.length - 1} Active</span>
            </div>
          </div>
          <button onClick={() => close(false)}>
            <CircleXIcon className="text-red-400 hover:text-red-800 h-[1rem]" />
          </button>
        </div>
        <div className="flex justify-between h-[95%] box-border text-white">
          <div className="w-[45%] py-2 pl-3 pr-[1rem] h-[95%] overflow-auto">
            {Object.keys(totalUnseenMessages).length > 0 ? (
              <div>
                <ul className="flex flex-col list-none">
                  {Object.keys(totalUnseenMessages).map((userId) => (
                    <li
                      key={userId}
                      className=" text-[12px] cursor-pointer hover:bg-[#5384ee96] p-1"
                      onClick={() =>
                        handleChatClick(totalUnseenMessages[userId])
                      }
                    >
                      <div className="flex gap-1 items-center">
                        <h3>{totalUnseenMessages[userId].sender.fullName}</h3>
                        {onlineUsers.includes(
                          totalUnseenMessages[userId]._id
                        ) && (
                          <div className="h-[5px] w-[5px] bg-green-400 rounded-2xl"></div>
                        )}
                      </div>
                      <p>
                        <span>
                          {totalUnseenMessages[userId].messages.length +
                            " New Message" +
                            (totalUnseenMessages[userId].messages.length > 1
                              ? "s"
                              : "")}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <ul className="list-none text-white">
                  {users.map((userItem, idx) => (
                    <li
                      key={idx}
                      className=" text-[12px] flex items-center gap-1 cursor-pointer hover:bg-[#5384ee96] p-1"
                      onClick={() => handleChatClickNormal(userItem)}
                    >
                      <h3>{userItem.fullName}</h3>
                      {onlineUsers.includes(userItem._id) && (
                        <div className="h-[5px] w-[5px] bg-green-400 rounded-2xl"></div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="w-[50%] flex justify-center items-center h-[95%] text-white pr-2">
            {currentlyChattingTo.user ? (
              <div className="outline-white outline-1 rounded-xl w-[100%] h-[100%] overflow-hidden">
                <div
                  id="header"
                  className="h-[10%] p-1 flex gap-1 bg-[#ed3cd872] box-border"
                >
                  <div className="h-[100%] w-[10%] flex justify-center items-center">
                    <button
                      className="hover:bg-[#f1e3e335] rounded-2xl h-[1.5rem] w-[1.5rem]"
                      onClick={() => {
                        dispatch(chatActions.setCurrentlyChattingTo(null));
                        dispatch(chatActions.setMessages([]));
                      }}
                    >
                      <ChevronLeftIcon className="h-[1rem] hover:text-[#ac11f9]" />
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[10%]">
                    <div className="logo h-[1.5rem] w-[1.5rem] outline-1 outline-amber-100 rounded-3xl overflow-hidden">
                      <img
                        alt="sender"
                        src={currentlyChattingTo.user.profileImg?.url || null}
                        className="w-[100%] h-[100%]"
                      />
                    </div>
                  </div>
                  <div className="text-[0.8rem] w-[50%]">
                    <h3 className="mb-[2px]">
                      {currentlyChattingTo.user.fullName}
                    </h3>
                    <div className="flex gap-1 items-center text-[0.5rem]">
                      {onlineUsers.includes(currentlyChattingTo.user._id) ? (
                        <>
                          <div className="h-[5px] w-[5px] bg-green-400 rounded-2xl"></div>
                          <p>Active Now</p>
                        </>
                      ) : (
                        <p>Last seen Yesterday</p>
                      )}{" "}
                    </div>
                  </div>
                  <div className="w-[30%] flex justify-between items-center text-white">
                    <button className="hover:bg-[#f1e3e335] rounded-2xl h-[1.5rem] w-[1.5rem]">
                      <PhoneIcon className="h-[1rem] hover:text-[#f50977]" />
                    </button>
                    <button className="hover:bg-[#f1e3e335] rounded-2xl h-[1.5rem] w-[1.5rem]">
                      <VideoIcon className="h-[1rem] hover:text-[#f50977]" />
                    </button>
                    <button className="hover:bg-[#f1e3e335] rounded-2xl h-[1.5rem] w-[1.5rem]">
                      <EllipsisVerticalIcon className="h-[1rem] hover:text-[#f50977]" />
                    </button>
                  </div>
                </div>
                <div
                  id="messageDisplay"
                  ref={scrollableDivRef}
                  className="h-[80%] p-2 overflow-auto"
                >
                  {currentlyChattingTo.messages.length > 0 ? (
                    <ul className="list-none w-full px-1.5">
                      {currentlyChattingTo.messages.map((msg) => (
                        <li key={msg._id} className="text-[0.7rem] mb-[0.5rem]">
                          {msg.senderId === user._id ? (
                            <div className="flex justify-end">
                              <div className="max-w-[70%]">
                                <div className="bg-blue-500 max-w-full p-1 rounded-[0.1rem] rounded-l-[0.4rem]">
                                  {msg.text}
                                </div>
                                <div>
                                  <span className="text-[0.6rem]">
                                    {
                                      new Date(msg.createdAt)
                                        .toLocaleString()
                                        .split(", ")[1]
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="w-fit max-w-[70%]">
                                <div className="bg-pink-500 p-1 rounded-[0.1rem] rounded-r-[0.4rem]">
                                  {msg.text}
                                </div>
                                <div>
                                  <span className="text-[0.6rem]">
                                    {
                                      new Date(msg.createdAt)
                                        .toLocaleString()
                                        .split(", ")[1]
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{new Date().toISOString().split(", ")[1]}</p>
                  )}
                </div>
                <div
                  id="inputPanel"
                  className="h-[10%] p-1 flex justify-between items-center"
                >
                  <button className="rounded-full bg-pink-600 p-1 hover:bg-[#a81fec] h-[2rem] w-[2rem]">
                    <CameraIcon className="h-[1rem] text-white " />
                  </button>
                  <textarea
                    onChange={(e) => setInputMessage(e.target.value)}
                    value={inputMessage}
                    className={`${
                      inputMessage.length > 0 ? "w-[75%]" : "w-[88%]"
                    } h-[95%] rounded-2xl bg-white py-1 text-[0.8rem] placeholder:text-[#00000094] resize-none px-3 focus:outline-none text-[#000]`}
                    placeholder="type a message"
                  ></textarea>
                  {inputMessage.length > 0 && (
                    <button
                      disabled={inputMessage.length == 0}
                      className="rounded-full bg-pink-600 p-1 hover:bg-[#a81fec]"
                      onClick={() => {
                        sendMessageBtn();
                      }}
                    >
                      <SendIcon className="text-white h-[1rem]" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2">
                <MessageCircleIcon className="h-[4rem] " />
                <p className="text-[0.8rem] text-[aqua] text-center">
                  Select A chat to view messages and start conversation{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Messages;
