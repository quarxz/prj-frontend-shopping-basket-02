import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export function Contact() {
  const { logout } = useContext(UserContext);
  const { tofu } = useOutletContext();
  return (
    <>
      <h1>Contact</h1>
      <p>This is the contact page</p>
      <p>{tofu}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
