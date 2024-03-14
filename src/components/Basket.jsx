import styles from "./Basket.module.css";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { ProductBasketItem } from "./ProductBasketItem";
import axios from "axios";

export function Basket() {
  const location = useLocation();

  const { user, url } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      console.log("Load Data");
      try {
        setIsLoading(true);
        if (url) {
          const response = await axios.post(`${url}/user/${user.id}`);
          console.log(response.data.products);
          console.log(response.status);
          setProducts(response.data.products);
        } else {
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

  return (
    <>
      <h2>The Shopping Basket!</h2>

      {products.length === 0 ? (
        <p>Keine Producte im Warenkorb</p>
      ) : isloading ? (
        <span className="loader"></span>
      ) : (
        products.map((product, index) => {
          return <ProductBasketItem key={index} product={product} />;
        })
      )}
    </>
  );
}
