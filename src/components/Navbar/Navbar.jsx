import { NavLink, Outlet } from "react-router-dom";
import styles from "./navbar.module.css";
import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  BellIcon,
  BoltIcon,
  BookOpenIcon,
  HouseHeartIcon,
  HouseIcon,
  LogInIcon,
  LogOutIcon,
  MessageSquareTextIcon,
  NotebookPenIcon,
  UserPlus2Icon,
} from "lucide-react";
import Ask from "../Overlays/Ask";
import {
  askSelector,
  askActions,
} from "../../redux_toolkit/reducers/AskReducer";
import { useState } from "react";
import Messages from "../Overlays/Messages";
import Notes from "../Overlays/Notes";
import Notifications from "../Overlays/Notifications";
import FindPeople from "../Overlays/FindPeople";
import { chatSelector } from "../../redux_toolkit/reducers/chatReducer";
// import { useSelector } from "react-redux";
function Navbar() {
  const { loggedIn } = useSelector(authSelector);
  const { opened } = useSelector(askSelector);
  const [messagesDiv, setMessages] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [notes, setNotes] = useState(false);
  const [findPeople, setFindPeople] = useState(false);
  const { totalUnseenMessages } = useSelector(chatSelector);
  const { onlineUsers, currentlyChattingTo } = useSelector(chatSelector);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.info}>
          <div className={styles.logo}></div>
          <div className={styles.text}>
            <h1 className={styles.heading}>F3 chat</h1>
            <p>
              <button
                className="text-white"
                onClick={() =>
                  console.log(
                    totalUnseenMessages,
                    onlineUsers,
                    currentlyChattingTo
                  )
                }
              >
                click
              </button>
            </p>
          </div>
        </div>
        <nav>
          <ul className="">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                {!loggedIn ? (
                  <HouseIcon className="text-white h-[1rem] hover:text-[#14d6e3]" />
                ) : (
                  <HouseHeartIcon className="text-white h-[1rem] hover:text-pink-500" />
                )}
              </NavLink>
            </li>

            {loggedIn ? (
              <>
                <li>
                  <button onClick={() => setFindPeople(true)}>
                    <UserPlus2Icon className="text-white h-[1rem] hover:text-[#0dbeea]" />
                  </button>
                </li>
                <li>
                  <button onClick={() => setNotes(true)}>
                    <NotebookPenIcon className="text-white h-[1rem] hover:text-[#0dbeea]" />
                  </button>
                </li>
                <li className="relative">
                  <button onClick={() => setMessages(true)}>
                    <MessageSquareTextIcon className="text-white h-[1rem] hover:text-[#0dbeea] " />
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
                    <BellIcon className="text-white h-[1rem] hover:text-[#0dbeea] " />
                  </button>
                </li>
                <li>
                  <NavLink to={"/dashboard"}>
                    <BoltIcon className="text-white h-[1rem] hover:text-[#0dbeea]" />
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() =>
                      dispatch(askActions.setPopup("Do you want to Logout?"))
                    }
                  >
                    <LogOutIcon className="text-white h-[1rem] hover:text-[#dd0c75] cursor-pointer" />
                  </button>
                </li>
                <li>
                  <NavLink to={"/docs"}>
                    <BookOpenIcon className="text-white h-[1rem] hover:text-[#e616f5]" />
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to={"/action/login"}>
                  <LogInIcon className="text-white h-[1rem] hover:text-[#0dea14]" />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
      {opened && <Ask />}
      {messagesDiv && <Messages close={setMessages} />}
      {notes && <Notes close={setNotes} />}
      {notifications && <Notifications close={setNotifications} />}
      {findPeople && <FindPeople close={setFindPeople} />}
    </>
  );
}

export default Navbar;
