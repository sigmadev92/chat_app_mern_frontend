import NavLinks from "./NavLinks";
import SideLinks from "./SideLinks";

const Nav = ({ setFindPeople, setMessages, setNotes, setNotifications }) => {
  return (
    <nav className="flex gap-3 items-center">
      <SideLinks />
      <NavLinks
        setFindPeople={setFindPeople}
        setNotes={setNotes}
        setNotifications={setNotifications}
        setMessages={setMessages}
      />
    </nav>
  );
};

export default Nav;
