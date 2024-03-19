import styles from "./RootLayout.module.css";
import { Outlet, NavLink } from "react-router-dom";

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function RootLayout() {
  const { user, logout } = useContext(UserContext);
  const getNavClass = ({ isActive }) => (isActive ? styles["nav-active"] : undefined);

  return (
    <>
      <nav className={styles["main-nav"]}>
        <ul>
          <li title="Home">
            <NavLink className={getNavClass} to="/">
              Home
            </NavLink>
          </li>
          <li title="Products">
            <NavLink className={getNavClass} to="/products">
              Products
            </NavLink>
          </li>

          <li title="Landingpage">
            <NavLink className={getNavClass} to="/landingpage">
              Landingpage
            </NavLink>
          </li>

          {user ? (
            <li title="Basket">
              <NavLink className={getNavClass} to="/basket">
                Shopping-Basket
              </NavLink>
            </li>
          ) : undefined}

          <li title="Basket">
            {user ? (
              <NavLink className={getNavClass} to="/login" onClick={logout}>
                Logout
              </NavLink>
            ) : (
              <NavLink className={getNavClass} to="/login">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
      <Outlet context={{ tofu: "test" }} />
      <footer>
        <p>&copy; 2024 - tak soft</p>
      </footer>
    </>
  );
}
