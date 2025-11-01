import { useDispatch } from "react-redux";
import { chatActions } from "../../../../../redux_toolkit/reducers/chatReducer";
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  VideoIcon,
} from "lucide-react";
import { _default } from "../../../../../functions/urls/images";
const Header = ({ currentlyChattingTo, onlineUsers }) => {
  const dispatch = useDispatch();
  return (
    <div
      id="header"
      className="h-[10%] p-1 flex gap-1 bg-[#ed3cd872] box-border"
    >
      <div className="h-[100%] w-[10%] flex justify-center items-center">
        <button
          className="hover:bg-[#f1e3e335] rounded-2xl h-[1.5rem] w-[1.5rem]"
          onClick={() => {
            console.log(currentlyChattingTo);
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
            src={currentlyChattingTo.user.profilePic || _default.profile_Pic}
            className="w-[100%] h-[100%]"
          />
        </div>
      </div>
      <div className="text-[0.8rem] w-[50%]">
        <h3 className="mb-[2px]">{currentlyChattingTo.user.fullName}</h3>
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
      <div className="w-[30%] flex justify-between items-center ">
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
  );
};

export default Header;
