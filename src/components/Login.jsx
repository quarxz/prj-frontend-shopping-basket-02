import styles from "./Login.module.css";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useOutletContext } from "react-router-dom";

export function Login() {
  const { user, login, logout } = useContext(UserContext);

  const [localUserName, setLocalUserName] = useState("");
  const { tofu } = useOutletContext();

  return (
    <>
      <h2>Login</h2>
      <h3>Context Value</h3>

      {/* <p>{tofu}</p> */}

      {user ? <p>{user.email}</p> : <p>Not logged in</p>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          login(localUserName);
        }}
      >
        <input
          type="text"
          value={localUserName}
          onChange={(event) => setLocalUserName(event.target.value)}
          // onChange={(event) => setLocalUserName("falk@test.com")}
        />
        <button>Submit</button>
      </form>
    </>
  );
}
