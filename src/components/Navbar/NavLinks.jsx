import { HouseHeartIcon, HouseIcon, LogInIcon } from "lucide-react";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import LoggedInNavLinks from "./LoggedInNavLinks";

function NavLinks({ setFindPeople, setMessages, setNotes, setNotifications }) {
  const { loggedIn } = useSelector(authSelector);

  return (
    <ul className="flex gap-[1rem] items-center">
      <li>
        <NavLink to="/">
          {!loggedIn ? (
            <HouseIcon
              className="text-black dark:text-white hover:text-[#14d6e3]"
              size={20}
            />
          ) : (
            <HouseHeartIcon
              className="text-black dark:text-white hover:text-pink-500"
              size={20}
            />
          )}
        </NavLink>
      </li>

      {loggedIn ? (
        <LoggedInNavLinks
          setFindPeople={setFindPeople}
          setMessages={setMessages}
          setNotifications={setNotifications}
          setNotes={setNotes}
        />
      ) : (
        <li>
          <NavLink to={"/action/login"}>
            <LogInIcon
              className="text-black dark:text-white hover:text-[#0dea14]"
              size={20}
            />
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
