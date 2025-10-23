import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "../../redux_toolkit/reducers/chatReducer";
import { askActions } from "../../redux_toolkit/reducers/AskReducer";
import {
  BellIcon,
  BoltIcon,
  LogOutIcon,
  MessageSquareTextIcon,
  NotebookPenIcon,
  UserPlus2Icon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const LoggedInNavLinks = ({
  setFindPeople,
  setMessages,
  setNotes,
  setNotifications,
}) => {
  const { totalUnseenMessages } = useSelector(chatSelector);
  const dispatch = useDispatch();
  return (
    <>
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
            className="text-white hover:text-[#0dbeea]"
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
          <BellIcon className="text-white  hover:text-[#0dbeea] " size={20} />
        </button>
      </li>
      <li>
        <NavLink to={"/dashboard"}>
          <BoltIcon className="text-white  hover:text-[#0dbeea]" size={20} />
        </NavLink>
      </li>
      <li>
        <button
          onClick={() =>
            dispatch(askActions.setPopup("Do you want to Logout?"))
          }
        >
          <LogOutIcon
            className="text-white  hover:text-[#dd0c75] cursor-pointer"
            size={20}
          />
        </button>
      </li>
    </>
  );
};

export default LoggedInNavLinks;
