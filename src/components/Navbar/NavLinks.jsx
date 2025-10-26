import { useSelector } from "react-redux";
import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import LoggedInNavLinks from "./LoggedInNavLinks";
import LoggedOutNavLinks from "./LoggedOutNavLinks";

function NavLinks({ setFindPeople, setMessages, setNotes, setNotifications }) {
  const { loggedIn } = useSelector(authSelector);

  return (
    <ul className="flex gap-[1rem] align-middle">
      {!loggedIn ? (
        <LoggedOutNavLinks />
      ) : (
        <LoggedInNavLinks
          setFindPeople={setFindPeople}
          setMessages={setMessages}
          setNotifications={setNotifications}
          setNotes={setNotes}
        />
      )}
    </ul>
  );
}

export default NavLinks;
