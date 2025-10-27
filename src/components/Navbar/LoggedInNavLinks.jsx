import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "../../redux_toolkit/reducers/chatReducer";
import { askActions } from "../../redux_toolkit/reducers/AskReducer";
import {
  BellIcon,
  BoltIcon,
  HouseHeartIcon,
  MessageSquareTextIcon,
  NotebookPenIcon,
  UserPlus2Icon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import { useState } from "react";
import { imagesURL } from "../../functions/urls/cloudinary";

const LoggedInNavLinks = ({
  setFindPeople,
  setMessages,
  setNotes,
  setNotifications,
}) => {
  const { totalUnseenMessages } = useSelector(chatSelector);
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <li>
        <NavLink to={"/"}>
          <HouseHeartIcon
            className="text-black dark:text-white hover:text-pink-500"
            size={20}
          />
        </NavLink>
      </li>

      <li>
        <button onClick={() => setFindPeople(true)}>
          <UserPlus2Icon
            className="text-black dark:text-white hover:text-[#0dbeea]"
            size={20}
          />
        </button>
      </li>
      <li>
        <button onClick={() => setNotes(true)}>
          <NotebookPenIcon
            className="text-black dark:text-white hover:text-[#0dbeea]"
            size={20}
          />
        </button>
      </li>
      <li className="relative">
        <button onClick={() => setMessages(true)}>
          <MessageSquareTextIcon
            className="text-black dark:text-white hover:text-[#0dbeea]"
            size={20}
          />
        </button>
        {Object.keys(totalUnseenMessages)?.length > 0 && (
          <div className="absolute top-4 right-2 text-[0.8rem] flex justify-center items-center bg-[#ff00d0] rounded-2xl h-[1rem] w-[1rem]">
            {Object.keys(totalUnseenMessages).length > 9
              ? "9+"
              : Object.keys(totalUnseenMessages).length}
          </div>
        )}
      </li>
      <li>
        <button onClick={() => setNotifications(true)}>
          <BellIcon
            className="text-black dark:text-white  hover:text-[#0dbeea] "
            size={20}
          />
        </button>
      </li>
      <li>
        <NavLink to={"/dashboard"}>
          <BoltIcon
            className="text-black dark:text-white  hover:text-[#0dbeea]"
            size={20}
          />
        </NavLink>
      </li>
      <li className="bg-gray-500 h-[1.5rem] w-[1.5rem] rounded-full flex justify-center items-center relative">
        {/* {user?.fullName[0]} */}
        <img
          className="w-full h-full cursor-pointer rounded-full"
          src={`${imagesURL}/${user.profilePic}`}
          onClick={() => setVisible((prev) => !prev)}
          alt="asas"
        />
        {visible && (
          <div className="absolute top-6 right-0 dark:bg-gray-500 bg-white  p-2 rounded-md border-1 dark:border-white border-black">
            <button
              className=" font-bold text-[0.8rem] dark:text-white text-black hover:bg-amber-400 dark:hover:bg-black px-2"
              onClick={() =>
                dispatch(askActions.setPopup("Do you want to Logout?"))
              }
            >
              Logout
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default LoggedInNavLinks;
