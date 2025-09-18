import { NavLink, Outlet } from "react-router-dom";
import styles from "./navbar.module.css";
import React from "react";
function Navbar() {
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
            <li>
              <NavLink to={"/action/login"}>Login</NavLink>
            </li>
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
