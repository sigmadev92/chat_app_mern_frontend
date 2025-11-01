import { useSelector } from "react-redux";
import { chatSelector } from "../../../redux_toolkit/reducers/chatReducer";
import ChatItem from "../../other/ChatItem";

const Left = ({ handleChatClick, handleChatClickNormal, users }) => {
  const { totalUnseenMessages, onlineUsers } = useSelector(chatSelector);
  return (
    <div className="w-[45%] py-2 pl-3 pr-[1rem] h-[95%] overflow-auto">
      {Object.keys(totalUnseenMessages).length > 0 ? (
        <div>
          <h3 className="mb-3">
            New Messages ({Object.keys(totalUnseenMessages).length})
          </h3>
          <ul className="flex flex-col list-none">
            {Object.keys(totalUnseenMessages).map((userId) => (
              <li
                key={userId}
                className=" text-[12px] cursor-pointer hover:bg-[#5384ee96] p-1"
                onClick={() => {
                  console.log(totalUnseenMessages);
                  handleChatClick(totalUnseenMessages[userId]);
                }}
              >
                {/* {totalUnseenMessages[userId]} */}
                <div className="flex gap-1 items-center">
                  <h3>{totalUnseenMessages[userId].sender?.fullName}</h3>
                  {onlineUsers.includes(totalUnseenMessages[userId]._id) && (
                    <div className="h-[5px] w-[5px] bg-green-400 rounded-2xl"></div>
                  )}
                </div>
                <p>
                  <span>
                    {totalUnseenMessages[userId].messages?.length +
                      " New Message" +
                      (totalUnseenMessages[userId].messages?.length > 1
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
          <h3 className="mb-3">Recent Chats</h3>
          <ul className="list-none ">
            {users.map((userItem, idx) => (
              <ChatItem
                key={idx}
                userItem={userItem}
                onlineUsers={onlineUsers}
                handleChatClickNormal={handleChatClickNormal}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Left;
