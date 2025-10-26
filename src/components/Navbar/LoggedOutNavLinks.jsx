import { HouseIcon, LogInIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

function LoggedOutNavLinks() {
  return (
    <>
      <li>
        <NavLink to="/">
          <HouseIcon
            className="text-black dark:text-white hover:text-[#14d6e3]"
            size={20}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to={"/action/login"}>
          <LogInIcon
            className="text-black dark:text-white hover:text-[#0dea14]"
            size={20}
          />
        </NavLink>
      </li>
    </>
  );
}

export default LoggedOutNavLinks;
