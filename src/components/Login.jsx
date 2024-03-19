import styles from "./Login.module.css";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useOutletContext } from "react-router-dom";

export function Login() {
  const { user, login, logout } = useContext(UserContext);

  const [localUserName, setLocalUserName] = useState("");
  const { tofu } = useOutletContext();

  return (
    <section className={styles.login}>
      <h2>
        {user ? "Welcome " + user.name.charAt(0).toUpperCase() + user.name.substring(1) : "Login"}
      </h2>

      {/* <p>{tofu}</p> */}

      {user ? <h3>Logged in as: {user.email}</h3> : <h3>Not logged in</h3>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          login(localUserName);
        }}
      >
        <input
          type="text"
          value={localUserName}
          // onChange={(event) => setLocalUserName(event.target.value)}
          // onChange={(event) => setLocalUserName("falk@test.com")}
          // onChange={(event) => setLocalUserName("sonja@test.com")}
          onChange={(event) => setLocalUserName("oleksii@test.com")}
        />

        {user ? "" : <button>Login</button>}
      </form>
    </section>
  );
}
