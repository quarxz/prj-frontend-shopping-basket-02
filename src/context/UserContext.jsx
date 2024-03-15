import { createContext, useState, useEffect } from "react";

import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // either null (not logged in) or
  // {userName:"xyz"}
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState(null);

  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function login(userName, password) {
    try {
      setIsLoading(true);

      const url = "https://prj-backend-shopping-basket.onrender.com";
      // const url = "http://localhost:3000";

      const response = await axios.post(`${url}/user/${userName}`);
      console.log(response.data);
      console.log(response.status);
      setUser(response.data);
      setUrl(url);
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    // setUser({ userName });
  }

  function logout() {
    setUser(null);
    setUrl("");
  }

  return (
    <UserContext.Provider value={{ user, login, logout, url }}>{children}</UserContext.Provider>
  );
}
