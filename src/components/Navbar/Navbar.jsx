import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import {
  authActions,
  authSelector,
} from "../../redux_toolkit/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { usersURL } from "../../functions/urls/backendAPI";
function Navbar() {
  const { loggedIn } = useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = async () => {
    await fetch(`${usersURL}/logout`);
    dispatch(authActions.logoutUser());
    navigate("/action/login");
    toast.success("Logged out successfully");
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.info}>
          <div className={styles.logo}></div>
          <div className={styles.text}>
            <h1 className={styles.heading}>F3 chat</h1>
            <h2></h2>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>

            {loggedIn ? (
              <>
                <li>
                  <NavLink to={"/dashboard"}>Dashboard</NavLink>
                </li>
                <li onClick={logoutUser}>
                  <NavLink>Logout</NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to={"/action/login"}>Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to={"/docs"}>Docs</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
