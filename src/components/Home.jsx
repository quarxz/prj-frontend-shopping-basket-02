import styles from "./Home.module.css";

import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { ProductHomeItem } from "./ProductHomeItem";
import axios from "axios";

export function Home() {
  const location = useLocation();

  const { user, url } = useContext(UserContext);
  console.log(user);
  console.log(url);
  const [localUserName, setLocalUserName] = useState("");

  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      console.log("Load Data");
      try {
        setIsLoading(true);
        if (url) {
          const response = await axios.get(`${url}/products`);
          console.log(response.data);
          console.log(response.status);
          setProducts(response.data);
        } else {
          console.log(products);
          setProducts([]);
        }
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [location]);

  if (isError) {
    return (
      <>
        <h1>Componet Livecycle</h1>
        <p>oops - an error appeared!</p>
      </>
    );
  }

  return (
    <>
      <h1>Welcome to Tak Soft!</h1>
      <h2>Shopping Basket Project</h2>

      {user ? <p>Login: {user.email}</p> : <p>Not logged in!</p>}
      {user ? (
        user.promotion ? (
          <p className={styles.activ}>
            Promotion: <span>activ</span>
          </p>
        ) : (
          <p className={styles.inactiv}>
            Promotion: <span>inactiv</span>
          </p>
        )
      ) : (
        <p></p>
      )}

      {user ? <h3>Top Products:</h3> : ""}

      {isloading ? (
        <span className="loader"></span>
      ) : (
        products.map((product) => {
          if (product.top) {
            return <ProductHomeItem key={product.id} product={product} />;
          }
        })
      )}
    </>
  );
}
