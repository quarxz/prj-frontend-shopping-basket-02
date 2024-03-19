import styles from "./Landingpage.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import axios from "axios";

import qrcode from "../assets/img/promo10.png";

export function Landingpage() {
  const { url, user } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <>
      <h3>Scan to activate 10% Promo!</h3>
      <div>
        <img src={qrcode} width="200px" />
      </div>
      <div>
        <ul>
          {user?.promotion ? (
            <li>
              <span
                className={styles.deactivate}
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    console.log("Hello aus deactivate Discount");
                    await axios.post(
                      `${url}/users/${user.id}/deactivatepromotion`,
                      {
                        actionId: "PROMO10",
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                  } catch (err) {
                    setIsError(true);
                    console.log(err);
                  } finally {
                    setIsLoading(false);
                    console.log("DeActivated - You have to logout first!");
                  }
                }}
              >
                deactivate
              </span>
            </li>
          ) : (
            <li>
              <span
                className={styles.activate}
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    console.log("Hello aus activate Discount");
                    await axios.post(
                      `${url}/users/${user.id}/activatepromotion`,
                      {
                        actionId: "PROMO10",
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                  } catch (err) {
                    setIsError(true);
                    console.log(err);
                  } finally {
                    setIsLoading(false);
                    console.log("Activated - You have to logout first!");
                  }
                }}
              >
                activate
              </span>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
