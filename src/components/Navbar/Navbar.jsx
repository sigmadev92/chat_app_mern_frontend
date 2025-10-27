import { Outlet } from "react-router-dom";
import styles from "./navbar.module.css";

import { useSelector } from "react-redux";

import Ask from "../Overlays/Ask";
import { askSelector } from "../../redux_toolkit/reducers/AskReducer";
import { useState } from "react";
import Messages from "../Overlays/Messages/index.jsx";
import Notes from "../Overlays/Notes";
import Notifications from "../Overlays/Notifications";
import FindPeople from "../Overlays/FindPeople";

import SiteInfo from "./SiteInfo";
import Nav from "./Nav";
import { authSelector } from "../../redux_toolkit/reducers/authReducer.js";
import UpdateProfile from "../Overlays/UpdateProfile.jsx";

function Navbar() {
  const { opened } = useSelector(askSelector);
  const [messagesDiv, setMessages] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [notes, setNotes] = useState(false);
  const [findPeople, setFindPeople] = useState(false);

  const { updateProfileDiv, user } = useSelector(authSelector);
  // const { onlineUsers, currentlyChattingTo } = useSelector(chatSelector);
  // const navigate = useNavigate();
  return (
    <>
      <header
        className={`${styles.header} bg-white dark:bg-black dark:border-white border-b-[1px]`}
      >
        <SiteInfo />
        <Nav
          setFindPeople={setFindPeople}
          setNotes={setNotes}
          setMessages={setMessages}
          setNotifications={setNotifications}
        />
      </header>

      <main className="h-[90vh]">
        <Outlet />
      </main>
      {opened && <Ask />}
      {messagesDiv && <Messages close={setMessages} />}
      {notes && <Notes close={setNotes} />}
      {notifications && <Notifications close={setNotifications} />}
      {findPeople && <FindPeople close={setFindPeople} />}
      {updateProfileDiv && <UpdateProfile user={user} />}
    </>
  );
}

export default Navbar;
