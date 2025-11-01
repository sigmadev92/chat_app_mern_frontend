import { _default } from "../../functions/urls/images";

const ChatItem = ({ userItem, onlineUsers, handleChatClickNormal }) => {
  return (
    <li
      className="text-[12px] flex gap-2 cursor-pointer hover:bg-[#1357eb96] p-1 py-2 border-b-[1px]"
      onClick={() => handleChatClickNormal(userItem)}
    >
      <div className="relative w-[2rem] h-[2rem]  flex justify-center items-center">
        <img
          src={userItem.profilePic || _default.profile_Pic}
          className="rounded-full w-full h-full"
        />
        {onlineUsers.includes(userItem._id) && (
          <div className="absolute bottom-0 right-0 h-[6px] w-[6px] bg-green-400 rounded-2xl"></div>
        )}
      </div>
      <div className=" w-[calc(100%-3rem)]">
        <h3 className="font-bold">{userItem.fullName}</h3>
        <p className="text-[10px] italic">
          {userItem.lastMessage?.info || "Tap to view"}
        </p>
      </div>
    </li>
  );
};

export default ChatItem;
